import jsPDF from 'jspdf';
import { Element, InvoiceTemplate, TableCell, TableRow } from '@/types/Invoice';

interface PdfData {
  mainTable: Record<string, any>[];
  invoiceDetails: Record<string, any>;
  tableResume?: Record<string, any>;
  fontScaleFactor?: number; // Added configurable font scale factor
}

interface SummaryData {
  ht?: number;
  tva?: number;
  totalRem?: number;
  total: number;
}

const PX_TO_MM = 0.264583; // Conversion factor from pixels to millimeters
const DEFAULT_FONT_SCALE_FACTOR = 0.75; // Default scale to reduce font size

// Map font families to standard PDF fonts
const mapFontFamily = (fontFamily: string) => {
  if (!fontFamily) return 'helvetica';
  
  const fontFamilyLower = fontFamily.toLowerCase();
  if (fontFamilyLower.includes('arial') || fontFamilyLower.includes('helvetica') || fontFamilyLower.includes('verdana')) {
    return 'helvetica';
  } else if (fontFamilyLower.includes('times') || fontFamilyLower.includes('georgia')) {
    return 'times';
  } else if (fontFamilyLower.includes('courier')) {
    return 'courier';
  }
  return 'helvetica'; // Default font
};

// Helper function to convert pixels to millimeters
const convertPxToMm = (px: number) => px * PX_TO_MM;

export const generateInvoicePdf = async (template: InvoiceTemplate, data: PdfData) => {
  // Get font scale factor from data or use default
  const fontScaleFactor = data.fontScaleFactor || DEFAULT_FONT_SCALE_FACTOR;
  
  const doc = new jsPDF({
    unit: 'mm',
    format: 'a4',
    compress: true
  });

  if (!template) {
    console.error('Template not found');
    return;
  }

  // Convert A4 dimensions to pixels for calculations
  const A4_WIDTH = 210; // mm
  const A4_HEIGHT = 297; // mm
  const headerHeight = template.layout?.header || 30;
  const footerHeight = template.layout?.footer || 20;
  let currentY = headerHeight; // Start after the header
  const footerStartY = A4_HEIGHT - footerHeight;

  // Add header elements
  const addHeaderElements = async () => {
    await Promise.all(template.elements
      .filter(el => convertPxToMm(el.position.y) < headerHeight)
      .map(async el => await addElement(doc, el, data, currentY, fontScaleFactor)));
  };

  await addHeaderElements();

  // Find and process the main table first
  const mainTableElement = template.elements.find(el => el.type === 'table' && el.key === 'mainTable');
  let mainTableData = data.mainTable || [];
  let calculatedSummary: SummaryData | null = null;

  if (mainTableElement && mainTableData.length > 0) {
    // Calculate summary data from main table
    calculatedSummary = calculateSummaryFromMainTable(mainTableData);
    
    // Position the main table correctly at its defined position
    const mainTableY = convertPxToMm(mainTableElement.position.y);
    currentY = await processTable(
      doc, 
      mainTableElement, 
      mainTableData, 
      mainTableY,  // Use the table's actual y position
      footerStartY, 
      addHeaderElements, 
      fontScaleFactor,
      headerHeight  // Pass headerHeight parameter
    );
  }

  // Process other content elements (not tables)
  for (const el of template.elements) {
    if (el.type !== 'table' && 
        convertPxToMm(el.position.y) >= headerHeight && 
        convertPxToMm(el.position.y) <= footerStartY) {
      await addElement(doc, el, data, currentY, fontScaleFactor);
    }
  }

  // Process the summary table if it exists
  const summaryTableElement = template.elements.find(el => el.type === 'table' && el.key === 'tableResume');
  
  if (summaryTableElement) {
    // Use provided summary data or calculated summary
    const summaryData = data.tableResume || calculatedSummary || { total: 0 };
    
    // Position the summary table correctly at its defined position
    const summaryTableY = currentY - convertPxToMm(-40); // Adjust position above the last row
    
    // Check if we need a new page for the summary table
    if (summaryTableY > footerStartY) {
      doc.addPage();
  
      await addHeaderElements();
      currentY = headerHeight;
    }
    
    await processTable(
      doc,
      summaryTableElement,
      [summaryData],
      summaryTableY, // Use the adjusted position
      footerStartY,
      addHeaderElements,
      fontScaleFactor,
      headerHeight  // Pass headerHeight parameter
    );
  }
  
  // Add footer elements
  template.elements
    .filter(el => convertPxToMm(el.position.y) > footerStartY)
    .forEach(el => addElement(doc, el, data, currentY, fontScaleFactor));

  // Add page numbers
  addPageNumbers(doc, A4_WIDTH, A4_HEIGHT);

  // More reliable download approach
  try {
    // Get the PDF as base64 string
    const pdfBase64 = doc.output('datauristring');
    
    // Create an iframe to handle the download (more compatible across browsers)
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    
    // Write the PDF to the iframe and trigger download
    iframe.src = pdfBase64;
    
    // Wait for iframe to load
    await new Promise<void>((resolve) => {
      iframe.onload = () => {
        try {
          // For browsers that support iframe printing
          if (iframe.contentWindow) {
            iframe.contentWindow.print();
          }
          resolve();
        } catch (e) {
        //   console.error("Error in iframe print:", e);
          resolve();
        }
      };
      
      // Fallback if iframe doesn't load within 2 seconds
      setTimeout(resolve, 2000);
    });
    
    // Alternative direct download method as backup
    const blob = doc.output('blob');
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'invoice.pdf';
    link.target = '_blank';
    link.style.display = 'none';
    document.body.appendChild(link);
    
    // Using both click() and dispatch event for better compatibility
    link.click();
    const clickEvent = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: false
    });
    link.dispatchEvent(clickEvent);
    
    // Clean up
    setTimeout(() => {
      document.body.removeChild(iframe);
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 1000);
    
    return true;
  } catch (error) {
    console.error('Error in PDF download:', error);
    
    // Last resort fallback - save directly
    doc.save('invoice.pdf');
    return true;
  }
};

/**
 * Calculate summary data from main table contents
 */
function calculateSummaryFromMainTable(data: Record<string, any>[]): SummaryData {
  let total = 0;
  let subtotal = 0;
  let totalRemise = 0;
  
  // Try to extract and sum the values from the data
  for (const row of data) {
    // Handle different possible field names
    const rowTotal = parseFloat(row.total || row.Total || row.TOTAL || 0);
    const qty = parseFloat(row.quantity || row.qty || row.qte || row.Quantity || 1);
    const price = parseFloat(row.price || row.prix || row.prixBrut || row.PrixBrut || row.unitPrice || 0);
    const remise = parseFloat(row.remise || row.rem || row.discount || 0);
    
    if (!isNaN(rowTotal)) {
      total += rowTotal;
    } else if (!isNaN(qty) && !isNaN(price)) {
      const rowSubtotal = qty * price;
      subtotal += rowSubtotal;
      
      // Calculate discount if applicable
      if (!isNaN(remise) && remise > 0) {
        // Remise could be a percentage or absolute value
        let rowRemise = 0;
        if (remise < 1) {
          // Percentage (e.g. 0.2 for 20%)
          rowRemise = rowSubtotal * remise;
        } else if (remise <= 100) {
          // Percentage (e.g. 20 for 20%)
          rowRemise = rowSubtotal * (remise / 100);
        } else {
          // Absolute value
          rowRemise = remise;
        }
        
        totalRemise += rowRemise;
        total += (rowSubtotal - rowRemise);
      } else {
        total += rowSubtotal;
      }
    }
  }

  // Calculate VAT (assuming 20% standard rate if not specified)
  const vatRate = 0.2; // 20% VAT
  const vat = total * vatRate;
  
  return {
    ht: subtotal > 0 ? subtotal : total / (1 + vatRate), // Pre-tax amount
    tva: vat,
    totalRem: totalRemise,
    total: total + vat
  };
}

async function addElement(doc: jsPDF, element: Element, data: PdfData, currentY: number, fontScaleFactor: number) {
  const x = convertPxToMm(element.position.x);
  const y = convertPxToMm(element.position.y);
  
  // Handle dynamic content
  let content = element.content;
  if (element.status === 'dynamic' && element.key && data.invoiceDetails) {
    content = data.invoiceDetails[element.key] || element.content;
  }

  // Apply font styles with scale factor
  const fontFamily = mapFontFamily(element.style.fontFamily as string);
  const fontSize = Math.round((element.style.fontSize as number || 12) * fontScaleFactor);
  
  doc.setFont(fontFamily, element.style.fontWeight === 'bold' ? 'bold' : 'normal');
  doc.setFontSize(fontSize);
  doc.setTextColor(element.style.color as string || '#000000');

  // Calculate element dimensions with scaled font size
  const contentStr = typeof content === 'string' ? content : '';
  const textWidth = doc.getStringUnitWidth(contentStr) * fontSize / doc.internal.scaleFactor;
  const textHeight = fontSize / doc.internal.scaleFactor;
  const width = element.style.width ? convertPxToMm(parseInt(element.style.width as string)) : textWidth + 4;
  const height = element.style.height ? convertPxToMm(parseInt(element.style.height as string)) : textHeight + 4;
  
  // Handle background if specified
  if (element.style.backgroundColor && element.style.backgroundColor !== 'transparent') {
    doc.setFillColor(element.style.backgroundColor as string);
    doc.rect(x, y, width, height, 'F');
  }

  // Handle borders
  if ((element.style.borderWidth && element.style.borderWidth as any !== '0') || 
      (typeof element.style.borderWidth === 'number' && element.style.borderWidth > 0)) {
    doc.setDrawColor(element.style.borderColor as string || '#000000');
    doc.setLineWidth(convertPxToMm(parseInt(element.style.borderWidth as any) || 1));
    
    // Border style is limited in jsPDF, but we can try to approximate
    const borderStyle = element.style.borderStyle as string || 'solid';
    if (borderStyle === 'dashed') {
      doc.setLineDashPattern([2, 2], 0);
    } else if (borderStyle === 'dotted') {
      doc.setLineDashPattern([1, 1], 0);
    } else {
      doc.setLineDashPattern([], 0); // solid
    }
    
    // Draw border - unfortunately jsPDF doesn't support border radius easily
    doc.rect(x, y, width, height, 'D');
  }

  if (element.type === 'image') {
    // await addImage(doc, content as string, x, y, element.style.width);
  } else if (element.type === 'text') {
    // Apply padding for text (converted to mm)
    const paddingX = element.style.padding ? convertPxToMm(parseInt(element.style.padding as any)) : 1;
    const paddingY = element.style.padding ? convertPxToMm(parseInt(element.style.padding as any)) : 1;
    
    // Apply text alignment
    let alignX = x + paddingX;
    const textAlign = element.style.textAlign as string || 'left';
    
    if (textAlign === 'center') {
      alignX = x + (width / 2);
      doc.text(contentStr, alignX, y + paddingY + textHeight, { align: 'center' });
    } else if (textAlign === 'right') {
      alignX = x + width - paddingX;
      doc.text(contentStr, alignX, y + paddingY + textHeight, { align: 'right' });
    } else {
      // Default left alignment
      doc.text(contentStr, alignX, y + paddingY + textHeight);
    }
  }
}

// async function addImage(doc: jsPDF, url: string, x: number, y: number, width?: number | string) {
//   try {
//     if (!url || url.trim() === '') {
//       console.warn('Empty image URL provided');
//       return;
//     }
    
//     const img = new Image();
//     img.crossOrigin = "Anonymous";
//     img.src = url;
    
//     // Use proper promise handling for image loading
//     await new Promise((resolve, reject) => {
//       img.onload = resolve;
//     //   img.onerror = (e) => {
//     //     console.error('Image load error:', e);
//     //     reject(e);
//     //   };
      
//       // Add a timeout to prevent hanging
//     //   setTimeout(() => reject(new Error('Image load timeout')), 5000);
//     });
    
//     const imgWidth = typeof width === 'number' ? width * PX_TO_MM : 50;
//     const imgHeight = imgWidth * img.height / img.width;
    
//     // Convert image to data URL
//     const canvas = document.createElement('canvas');
//     canvas.width = img.width;
//     canvas.height = img.height;
//     const ctx = canvas.getContext('2d');
    
//     if (ctx) {
//       ctx.drawImage(img, 0, 0);
//       const dataUrl = canvas.toDataURL('image/jpeg');
      
//       // Uncomment this line to actually add images to the PDF
//       doc.addImage(dataUrl, 'JPEG', x, y, imgWidth, imgHeight);
//     }
//   } catch (error) {
//     console.error('Failed to add image to PDF:', error);
//     // Continue generating PDF without the image
//   }
// }

async function processTable(
  doc: jsPDF, 
  table: Element, 
  data: any[], 
  startY: number, 
  footerY: number, 
  addHeaderElements: () => Promise<void>, 
  fontScaleFactor: number,
  headerHeight: number  // Add headerHeight parameter
): Promise<number> { // Return the final Y position
  const rowHeight = 8; // mm
  let currentY = startY; // Use the provided Y position
  
  // Ensure we have rows before proceeding
  if (!(table.content as any).rows || (table.content as any).rows.length < 1) {
    console.error('Table is missing header row definitions');
    return currentY;
  }
  
  // Use row 0 for header styling and row 1 (or row 0 if only 1 row) for body styling
  const headerRow = (table.content as any).rows[0];
  const bodyRow = (table.content as any).rows.length > 1 ? 
    (table.content as any).rows[1] : (table.content as any).rows[0];
  
  // Apply table styles with scaled font size
  const fontFamily = mapFontFamily(table.style.fontFamily as string);
  const fontSize = Math.round((table.style.fontSize as number || 12) * fontScaleFactor);
  
  doc.setFont(fontFamily);
  doc.setFontSize(fontSize);
  doc.setTextColor(table.style.color as string || '#000000');

  // Calculate column widths
  const totalWidth = convertPxToMm(parseInt(table.style.width as string) || 210); // A4 width in mm
  let specifiedWidth = 0;
  let unspecifiedColumns = 0;

  headerRow.cells.forEach((cell: TableCell) => {
    if (cell.style.width && cell.style.width !== 'auto') {
      specifiedWidth += convertPxToMm(parseFloat(cell.style.width as string));
    } else {
      unspecifiedColumns++;
    }
  });

  const remainingWidth = totalWidth - specifiedWidth;
  const defaultWidth = unspecifiedColumns > 0 ? remainingWidth / unspecifiedColumns : 30;

  // Add table headers
  const addTableHeaders = () => {
    // Ensure cellX is positioned according to table's actual X position
    let cellX = convertPxToMm(table.position.x);
    
    headerRow.cells.forEach((cell: TableCell, index: number) => {
      const cellWidth = cell.style.width && cell.style.width !== 'auto' ? 
        convertPxToMm(parseFloat(cell.style.width as string)) : defaultWidth;
      
      // Apply header cell-specific styles
      doc.setFillColor(cell.style.backgroundColor || '#f1f5f9'); // Default light gray for headers
      doc.setTextColor(cell.style.color || table.style.color || '#000000');
      doc.setDrawColor(cell.style.borderColor || table.style.borderColor || '#000000');
      doc.setLineWidth(convertPxToMm(parseInt((cell.style.borderWidth as any || table.style.borderWidth || 1) as string)));
      
      // Apply font styles
      doc.setFont(
        mapFontFamily(cell.style.fontFamily as string || table.style.fontFamily as string),
        cell.style.fontWeight === 'bold' ? 'bold' : 'normal'
      );
      
      // Draw cell background and border
      doc.rect(cellX, currentY, cellWidth, rowHeight, 'FD');
      
      // Text alignment
      const textAlign = cell.style.textAlign as string || 'left';
      let textX = cellX + 1;
      
      // Apply cell text with proper alignment
      if (textAlign === 'center') {
        textX = cellX + cellWidth / 2;
        doc.text(cell.content, textX, currentY + rowHeight / 2, { align: 'center', baseline: 'middle' });
      } else if (textAlign === 'right') {
        textX = cellX + cellWidth - 1;
        doc.text(cell.content, textX, currentY + rowHeight / 2, { align: 'right', baseline: 'middle' });
      } else {
        doc.text(cell.content, textX, currentY + rowHeight / 2, { baseline: 'middle' });
      }
      
      cellX += cellWidth;
    });
    
    currentY += rowHeight;
  };

  addTableHeaders();

  // Add table rows
  for (const row of data) {
    // Check if we need a new page
    if (currentY + rowHeight > footerY) {
      doc.addPage();
      currentY = startY < headerHeight ? headerHeight : startY;
      await addHeaderElements(); // Re-add header elements on new page
      addTableHeaders(); // Re-add table headers on new page
    }
    
    // Ensure cellX is positioned according to table's actual X position
    let cellX = convertPxToMm(table.position.x);
    
    headerRow.cells.forEach((headerCell: TableCell, index: number) => {
      // Get matching body cell
      const bodyCell = bodyRow.cells[index] || headerCell;
      
      // Get cell dimensions
      const cellWidth = headerCell.style.width && headerCell.style.width !== 'auto' ? 
        convertPxToMm(parseFloat(headerCell.style.width as string)) : defaultWidth;
      
      // Get cell content from data using key
      const key = headerCell.key || ''; 
      const value = key && row[key] !== undefined ? row[key] : '';
      
      // Format value appropriately if it's a number
      let displayValue = value;
      if (typeof value === 'number' || !isNaN(parseFloat(value as string))) {
        displayValue = parseFloat(value as string).toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });
      }
      
      // Apply body cell-specific styles
      doc.setFillColor(bodyCell.style.backgroundColor || '#ffffff'); // Default white for body cells
      doc.setTextColor(bodyCell.style.color || table.style.color || '#000000');
      doc.setDrawColor(bodyCell.style.borderColor || table.style.borderColor || '#000000');
      doc.setLineWidth(convertPxToMm(parseInt((bodyCell.style.borderWidth as any || table.style.borderWidth || 1) as string)));
      
      // Apply font styles
      doc.setFont(
        mapFontFamily(bodyCell.style.fontFamily as string || table.style.fontFamily as string),
        bodyCell.style.fontWeight === 'bold' ? 'bold' : 'normal'
      );
      
      // Draw cell background and border
      doc.rect(cellX, currentY, cellWidth, rowHeight, 'FD');
      
      // Text alignment
      const textAlign = bodyCell.style.textAlign as string || 'left';
      let textX = cellX + 1;
      
      if (textAlign === 'center') {
        textX = cellX + cellWidth / 2;
        doc.text(displayValue.toString(), textX, currentY + rowHeight / 2, { align: 'center', baseline: 'middle' });
      } else if (textAlign === 'right') {
        textX = cellX + cellWidth - 1;
        doc.text(displayValue.toString(), textX, currentY + rowHeight / 2, { align: 'right', baseline: 'middle' });
      } else {
        doc.text(displayValue.toString(), textX, currentY + rowHeight / 2, { baseline: 'middle' });
      }
      
      cellX += cellWidth;
    });
    
    currentY += rowHeight;
  }

  return currentY;
}

function addPageNumbers(doc: jsPDF, A4_WIDTH: number, A4_HEIGHT: number) {
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.text(`Page ${i} of ${pageCount}`, A4_WIDTH - 30, A4_HEIGHT - 10);
  }
}
