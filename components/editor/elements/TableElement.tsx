"use client";
import React, { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Element, TableCell, TableRow } from "@/types/Invoice";
import { Ellipsis, EllipsisVertical, EyeOff, Ruler, UnfoldHorizontal } from "lucide-react";
import useEditorStore from "@/store/useEditorStore";
import Input from "../components/ui/Input";

interface TableElementProps {
  element: Element;
}

const TableElement: React.FC<TableElementProps> = ({ element }) => {
  const {
    selectedElementId,
    selectElement,
    updateTableCell,
    updateTableCellStyle,
    resizeTableColumn,
    // handlecelumn,
    resizeTableRow,
    selectedRowId,
    selectedColumnIndex,
    selectRow,
    selectedRow,
    updateTableCellKey,
    keys
  } = useEditorStore();
  const [el, setEl] = useState<any>(null);
  const isSelected = selectedElementId === element.id;
  const tableContent = element.content as any;
  const [hoverd, setHoverd] = useState(false);
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: element.id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transformOrigin: "top left",
    left: `${element.position.x}px`,
    top: `${element.position.y}px`,
    zIndex: element.zIndex,
    width:
      typeof element.style.width === "number"
        ? `${element.style.width}px`
        : element.style.width || "auto",
    borderWidth: element.style.borderWidth
      ? `${element.style.borderWidth}px`
      : "0px",
    borderColor: element.style.borderColor || "#e5e7eb",
    borderStyle: element.style.borderStyle || "solid",
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    selectElement(element.id);
  };

  const handleCellChange = (rowId: string, cellId: string, value: string) => {
    updateTableCell(element.id, rowId, cellId, value);
  };
  function removePX(str:any) {
    return str.replace(/px/g, '');
  }
  const handleCellBackgroundColorChange = (
    rowId: string,
    cellId: string,
    color: string
  ) => {
    updateTableCellStyle(element.id, rowId, cellId, { backgroundColor: color });
  };

  const handleColumnResize = (columnIndex: number,value:any) => {

      resizeTableColumn(element.id, columnIndex, parseInt(value));
  };

  const handleRowResize = (rowIndex: number,value:any) => {
      resizeTableRow(element.id, rowIndex, parseInt(value));
  };

  const renderCell = (
    row: TableRow,
    cell: TableCell,
    rowIndex: number,
    cellIndex: number
  ) => {
    const cellStyle = {
      fontFamily:
        cell.style.fontFamily || element.style.fontFamily || "inherit",
      fontSize: cell.style.fontSize
        ? `${cell.style.fontSize}px`
        : element.style.fontSize
          ? `${element.style.fontSize}px`
          : "inherit",
      fontWeight: cell.style.fontWeight || element.style.fontWeight || "normal",
      fontStyle: cell.style.fontStyle || element.style.fontStyle || "normal",
      color: cell.style.color || element.style.color || "black",
      backgroundColor: cell.style.backgroundColor || "transparent",
      borderWidth: cell.style.borderWidth
        ? `${cell.style.borderWidth}px`
        : "1px",
      borderColor: cell.style.borderColor || "#e5e7eb",
      borderStyle: cell.style.borderStyle || "solid",
      borderBottomWidth: cell.style.borderBottomWidth
        ? `${cell.style.borderBottomWidth}px`
        : undefined,
      borderBottomColor: cell.style.borderBottomColor || undefined,
      borderBottomStyle: cell.style.borderBottomStyle || undefined,
      padding: cell.style.padding ? `${cell.style.padding}px` : "4px",
      textAlign: cell.style.textAlign || element.style.textAlign || "left",
      width: cell.style.width || "auto",
      height: row.style?.height || "auto",
    };

    const isRowSelected = selectedRowId === row.id;
    const isColumnSelected = selectedColumnIndex === cellIndex;
    // resizeTableColumn(element.id, columnIndex, width);
    return (
      <td
        key={cell.id}
        className={`border relative ${isRowSelected || isColumnSelected ? "ring-2 ring-blue-500" : ""
          }`}
        style={cellStyle as React.CSSProperties}
        // onDoubleClick={() => handleColumnResize(cellIndex)}
      >
        {/* //xxxxxx */}
        {rowIndex===0&&
        <div
        onMouseEnter={() => {
          setHoverd(true)
        }}
        onMouseLeave={() => {
          setHoverd(false)
        }}
        className="hover:bg-gray-100"
        style={{
          width: 'auto',
          height: '100%',
          position: 'absolute',
          top: 0,
          right: 0,
          zIndex: 500,
        }}>
          <div className="flex items-center justify-center h-full relative w-full">
            <div className="absolute text-black/20 top-1/2 -translate-y-1/2 right-0 translate-x-1/2">
            <Input
               value={cell.style.width? parseInt(removePX((cell.style.width as string))) : ''}
                width='w-full'
                placeholder="width"
                onChange={(e) =>{
                   handleColumnResize(cellIndex, parseInt(e.target.value))
                  }}
                min={20}
                max={300}
                step={1}
                speed={0.5}
                type="custom"              
                label={<EllipsisVertical onClick={()=>{
                  console.log(cell.style.width? parseInt(removePX((cell.style.width as string))) : '')
                }} size={15} />}
              />
            </div>
          </div>
      </div>
        }
                {cellIndex===0&&
        <div
        onMouseEnter={() => {
          setHoverd(true)
        }}
        onMouseLeave={() => {
          setHoverd(false)
        }}
        className="hover:bg-gray-100"
        style={{
          width: '100%',
          height: 'auto',
          position: 'absolute',
          bottom: 0,
          left: 0,
          zIndex: 500,
        }}>
          <div className="flex items-center justify-center h-full relative w-full">
            <div className="absolute text-black/20 -top-1/2 -translate-y-1/2">
            <Input
               value={tableContent.rows[rowIndex].style? parseInt((tableContent.rows[rowIndex].style.height as string).slice(0, -2)) : ''}
                width='w-full'
                placeholder="Height"
                onChange={(e) =>{
                  handleRowResize(rowIndex, parseInt(e.target.value))
                  console.log('rowIndex', rowIndex, 'value', e.target.value)
                  }}
                min={20}
                speed={0.5}
                type="custom"                
                label={<Ellipsis onClick={()=>{
                }} size={15} />}
              />
            </div>
          </div>
      </div>
        }

        <input
          type="text"
          value={cell.content}
          onChange={(e) => handleCellChange(row.id, cell.id, e.target.value)}
          className="w-full bg-transparent focus:outline-none"
          style={{
            fontFamily: cellStyle.fontFamily,
            fontSize: cellStyle.fontSize,
            fontWeight: cellStyle.fontWeight,
            fontStyle: cellStyle.fontStyle,
            color: cellStyle.color,
            textAlign: cellStyle.textAlign as any,

          }}
          onClick={(e) => e.stopPropagation()}
        />
      </td>
    );
  };

  const handleSelect = (e: any, cellId: any) => {
    updateTableCellKey(selectedElementId as string, tableContent.rows[0].id, cellId, e.target.value);
    console.log(element)
  }

  function handleWidth() {
    let x = 0
    const totalWidth = selectedRow.cells.reduce((sum: number, cell: TableCell) => {
      if (!cell.style?.width || cell.style?.width === '0px') {
        x = x + 1;
      }
      const widthValue = cell.style?.width || '0px'; // Fallback to 0px if undefined
      const numericValue = parseFloat((widthValue as string).replace('px', '')) || 0;
      return sum + numericValue;
    }, 0);


    const width = typeof element.style.width === 'number' ? element.style.width : parseFloat(element.style.width || '0');
    const a = (width - totalWidth) / x;

    return [a, width + 2]
  }
  return (
    <div
      ref={setNodeRef}
      className={`absolute ${isSelected ? "ring-2 ring-blue-500" : ""}`}
      style={style as React.CSSProperties}
      onClick={handleClick}
      draggable={!hoverd}
      {...(hoverd ? {} : attributes)}
      {...(hoverd ? {} : listeners)}
    >
      {/*  key modal */}
      {selectedRow && selectedRow.id === (element.content as any).rows[0].id &&
        <>
          <div>
            <div
              style={{
                left: element.position.x,
                top: element.position.y - 25,
                width: handleWidth()[1]
              }}
              className="fixed z-[203] flex flex-wrap  text-[10px] h-[25px] left-0 w-full bg-white border">
              {selectedRow.cells.map((cell: TableCell, cellIndex: number) => (
                <div
                  key={cellIndex}
                  style={{ width: cell.style.width ? cell.style.width : handleWidth()[0] }}
                  className={`h-full`}
                >
                  <select onChange={(e) => {
                    handleWidth();
                    handleSelect(e, cell.id);
                  }} className="w-full h-[20px]" defaultValue={cell.key ? cell.key : 'select'}>
                    {keys?.map((option: any, idx: any) => (
                      <option key={idx} value={option.key}>{option.label}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
            <button
              style={{
                left: parseFloat(style.left) - 25,
                top: parseFloat(style.top) - 25
              }}
              className="fixed p-1 rounded hover:bg-neutral-100 border border-transparent hover:border-neutral-200  z-[201] " onClick={() => { selectRow(null) }}>
              <EyeOff size={14} />
            </button>
          </div>
        </>
      }

      <table
        className={`" w-full relative ${selectedRow ? 'z-[201] bg-white' : ''}`}>
        <tbody>
          {tableContent.rows.map((row: TableRow, rowIndex: number) => (
            <tr
              key={row.id}
              onDoubleClick={() => {
                element.status && element.status === "dynamic" ? selectRow(row) : ''
                console.log(`here's`, element)
                // handleRowResize(rowIndex)
              }}
              className="!hover:border-s-cyan-400 !border-x !border-transparent"
            >
              {row.cells.map((cell: TableCell, cellIndex: number) =>
                renderCell(row, cell, rowIndex, cellIndex)
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableElement;
