"use client";
import React, { useState } from "react";
import {
  Type,
  Image,
  Table,
  Trash2,
  ChevronUp,
  ChevronDown,
  Undo,
  Redo,
  Save,
  ZoomIn,
  ZoomOut,
  Maximize,
  MinusSquare,
  PlusSquare,
  SaveAll,
  Copy,
  Layout,
  Frame,
  FileText,
} from "lucide-react";
import { PDFDocument } from "pdf-lib";
import * as pdfjsLib from "pdfjs-dist";
import useEditorStore from "@/store/useEditorStore";
import Button from "./ui/Button";

// Set the workerSrc property
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const Toolbar: React.FC = () => {
  const {
    getCurrentTemplate,
    addElement,
    deleteElement,
    getSelectedElement,
    updateElementZIndex,
    undo,
    redo,
    zoomIn,
    zoomOut,
    resetZoom,
    scaleElement,
    saveToHistory,
    uploadImage,
    duplicateElement,
    setLayoutControle,
    gridControle,
    setGridControle,
    layoutControle,
    addElementFromPDF,
  } = useEditorStore();

  const currentTemplate = getCurrentTemplate();
  const selectedElement = getSelectedElement();
  const [showLayoutControls, setShowLayoutControls] = useState(false);
  const [showGrid, setShowGrid] = useState(false);

  const handleAddText = () => {
    if (!currentTemplate) return;
    addElement("text", { x: 50, y: 50 });
  };

  const handleAddImage = () => {
    if (!currentTemplate) return;
    const imageUrl = prompt("Enter image URL:");
    if (!imageUrl) return;
    addElement("image", { x: 50, y: 50 }, imageUrl);
  };

  const handleAddTable = () => {
    if (!currentTemplate) return;
    addElement("table", { x: 50, y: 50 });
  };

  const handleDelete = () => {
    if (!selectedElement) return;
    deleteElement(selectedElement.id);
  };

  const handleMoveUp = () => {
    if (!selectedElement || !currentTemplate) return;
    const maxZIndex = Math.max(
      ...currentTemplate.elements.map((el: any) => el.zIndex)
    );
    if (selectedElement.zIndex < maxZIndex) {
      updateElementZIndex(selectedElement.id, selectedElement.zIndex + 1);
    }
  };

  const handleMoveDown = () => {
    if (!selectedElement || !currentTemplate) return;
    if (selectedElement.zIndex > 0) {
      updateElementZIndex(selectedElement.id, selectedElement.zIndex - 1);
    }
  };

  const handleScaleUp = () => {
    if (!selectedElement) return;
    const currentScaleX = selectedElement.scale?.x || 1;
    const currentScaleY = selectedElement.scale?.y || 1;
    scaleElement(
      selectedElement.id,
      Math.min(currentScaleX + 0.1, 3),
      Math.min(currentScaleY + 0.1, 3)
    );
  };

  const handleScaleDown = () => {
    if (!selectedElement) return;
    const currentScaleX = selectedElement.scale?.x || 1;
    const currentScaleY = selectedElement.scale?.y || 1;
    scaleElement(
      selectedElement.id,
      Math.max(currentScaleX - 0.1, 0.5),
      Math.max(currentScaleY - 0.1, 0.5)
    );
  };

  const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadImage(file);
    }
  };

  const handleDuplicate = () => {
    if (!selectedElement || !currentTemplate) return;
    duplicateElement(selectedElement.id);
  };

  const toggleLayoutControls = () => {
    setLayoutControle(!showLayoutControls);
    setShowLayoutControls(!showLayoutControls);
  };

  const toggleGrid = () => {
    setGridControle(!showGrid);
    setShowGrid(!showGrid);
  };

  const handleUploadPDF = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
      const { width, height } = firstPage.getSize();

      // Use pdfjs-dist to extract text content
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const page = await pdf.getPage(1);
      const textContent = await page.getTextContent();
      const textItems = textContent.items.map((item: any) => ({
        text: item.str,
        x: item.transform[4],
        y: height - item.transform[5],
      }));

      // Add extracted text as elements to the template
      textItems.forEach((item) => {
        addElementFromPDF("text", { x: item.x, y: item.y }, item.text);
      });

      console.log("PDF uploaded and converted to template");
    }
  };

  return (
    <div className="flex items-center justify-around bg-neutral-200 rounded-full px-2 mb-2">
      <Button onClick={handleAddText} disabled={!currentTemplate}>
        <Type size={19} />
      </Button>

      <input
        type="file"
        accept="image/*"
        id="upload-image"
        style={{ display: "none" }}
        onChange={handleUploadImage}
      />
      <Button
        onClick={() => document.getElementById("upload-image")?.click()}
        disabled={!currentTemplate}
      >
        <Image size={19} />
      </Button>
      <Button onClick={handleAddTable} disabled={!currentTemplate}>
        <Table size={19} />
      </Button>

      <div className="h-6 border-l border-gray-300 mx-2"></div>

      <Button onClick={handleDelete} disabled={!selectedElement}>
        <Trash2 size={19} />
      </Button>

      <Button onClick={handleMoveUp} disabled={!selectedElement}>
        <ChevronUp size={19} />
      </Button>

      <Button onClick={handleMoveDown} disabled={!selectedElement}>
        <ChevronDown size={19} />
      </Button>

      <div className="h-6 border-l border-gray-300 mx-2"></div>

      <Button onClick={handleScaleUp} disabled={!selectedElement}>
        <PlusSquare size={19} />
      </Button>

      <Button onClick={handleScaleDown} disabled={!selectedElement}>
        <MinusSquare size={19} />
      </Button>

      <div className="h-6 border-l border-gray-300 mx-2"></div>

      <Button onClick={undo} disabled={!currentTemplate}>
        <Undo size={19} />
      </Button>

      <Button onClick={redo} disabled={!currentTemplate}>
        <Redo size={19} />
      </Button>

      <div className="h-6 border-l border-gray-300 mx-2"></div>

      <Button onClick={zoomIn} disabled={!currentTemplate}>
        <ZoomIn size={19} />
      </Button>

      <Button onClick={zoomOut} disabled={!currentTemplate}>
        <ZoomOut size={19} />
      </Button>

      <Button onClick={resetZoom} disabled={!currentTemplate}>
        <Maximize size={19} />
      </Button>

      <div className="h-6 border-l border-gray-300 mx-2"></div>

      <Button onClick={saveToHistory} disabled={!currentTemplate}>
        <SaveAll size={19} />
      </Button>

      <button
        className={`p-2 rounded hover:bg-gray-200 ${
          !selectedElement ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={handleDuplicate}
        disabled={!selectedElement}
        title="Duplicate Element"
      >
        <Copy size={19} />
      </button>

      <Button onClick={toggleGrid} disabled={!currentTemplate}>
        <Frame size={19} />
      </Button>
      <Button onClick={toggleLayoutControls} disabled={!currentTemplate}>
        <Layout size={19} />
      </Button>

      <input
        type="file"
        accept="application/pdf"
        id="upload-pdf"
        style={{ display: "none" }}
        onChange={handleUploadPDF}
      />
      <Button
        onClick={() => document.getElementById("upload-pdf")?.click()}
        disabled={!currentTemplate}
      >
        <FileText size={19} />
      </Button>
    </div>
  );
};

export default Toolbar;
