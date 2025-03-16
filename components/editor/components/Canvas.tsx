"use client";
import React, { useRef, useState, useEffect } from "react";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragMoveEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import TextElement from "../elements/TextElement";
import ImageElement from "../elements/ImageElement";
import TableElement from "../elements/TableElement";
import DraggableLine from "./DraggableLine";
import GuideLines from "./GuideLines";

import useEditorStore from "@/store/useEditorStore";
import { Element } from "@/types/Invoice";

const Canvas: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isDraggingLine, setIsDraggingLine] = useState(false);
  const [pixelsPerMM, setPixelsPerMM] = useState(3.78);
  const [draggingElement, setDraggingElement] = useState<Element | null | any>(
    null
  );
  const {
    getCurrentTemplate,
    selectElement,
    updateElementPosition,
    updateLayout,
    zoomLevel,
    layoutControle,
    gridControle,
  } = useEditorStore();

  const currentTemplate = getCurrentTemplate();
  const canvaStyle = currentTemplate?.style;

  useEffect(() => {
    setIsClient(true);
    if (canvasRef.current) {
      const updatePixelsPerMM = () => {
        const widthMM = 210;
        const widthPixels = canvasRef.current?.offsetWidth;
        if (widthPixels) {
          setPixelsPerMM(widthPixels / widthMM);
        }
      };
      updatePixelsPerMM();
      window.addEventListener("resize", updatePixelsPerMM);
      return () => window.removeEventListener("resize", updatePixelsPerMM);
    }
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setIsDragging(true);
    const { active } = event;
    selectElement(active.id as string);
    const element = currentTemplate?.elements.find((el) => el.id === active.id);
    setDraggingElement(element || null);
  };

  const handleDragMove = (event: DragMoveEvent) => {
    const { active, delta } = event;
    if (!currentTemplate) return;

    const element = currentTemplate.elements.find((el) => el.id === active.id);
    if (element) {
      setDraggingElement({
        ...element,
        position: {
          x: element.position.x + delta.x / zoomLevel,
          y: element.position.y + delta.y / zoomLevel,
        },
      });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setIsDragging(false);
    const { active, delta } = event;

    if (!currentTemplate) return;

    const element = currentTemplate.elements.find((el) => el.id === active.id);

    if (element) {
      updateElementPosition(element.id, {
        x: element.position.x + delta.x / zoomLevel,
        y: element.position.y + delta.y / zoomLevel,
      });
      // Call saveToHistory after updating element position
      useEditorStore.getState().saveToHistory();
    }
    setDraggingElement(null);
  };

  const handleLineDragStart = () => {
    setIsDraggingLine(true);
  };

  const handleLineDragEnd = (line: "header" | "footer", newYMM: number) => {
    setIsDraggingLine(false);
    if (!currentTemplate) return;

    const MIN_HEIGHT = 20; // 20mm minimum for each section
    const { header, footer } = currentTemplate.layout;

    if (line === "header") {
      const newHeader = Math.max(
        MIN_HEIGHT,
        Math.min(newYMM, 297 - (footer || MIN_HEIGHT) - MIN_HEIGHT)
      );
      const newBody = 297 - newHeader - (footer || 0);
      if (newHeader !== header) {
        updateLayout(currentTemplate.id, {
          header: newHeader,
          body: newBody,
          footer: footer,
        });
      }
    } else {
      const newFooter = Math.max(MIN_HEIGHT, 297 - newYMM);
      const newBody = 297 - newFooter - (header || 0);
      if (newFooter !== footer) {
        updateLayout(currentTemplate.id, {
          header: header,
          body: newBody,
          footer: newFooter,
        });
      }
    }
    // Only save to history when the drag operation is complete
    useEditorStore.getState().saveToHistory();
  };

  const handleLineDrag = (line: "header" | "footer", newYMM: number) => {
    if (!currentTemplate) return;

    const MIN_HEIGHT = 20; // 20mm minimum for each section
    const { header, footer } = currentTemplate.layout;

    if (line === "header") {
      const newHeader = Math.max(
        MIN_HEIGHT,
        Math.min(newYMM, 297 - (footer || MIN_HEIGHT) - MIN_HEIGHT)
      );
      const newBody = 297 - newHeader - (footer || 0);
      if (newHeader !== header) {
        updateLayout(currentTemplate.id, {
          header: newHeader,
          body: newBody,
          footer: footer,
        });
      }
    } else {
      const newFooter = Math.max(MIN_HEIGHT, 297 - newYMM);
      const newBody = 297 - newFooter - (header || 0);
      if (newFooter !== footer) {
        updateLayout(currentTemplate.id, {
          header: header,
          body: newBody,
          footer: newFooter,
        });
      }
    }
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === canvasRef.current) {
      selectElement(null);
    }
  };

  const renderElement = (element: Element) => {
    switch (element.type) {
      case "text":
        return <TextElement key={element.id} element={element} />;
      case "image":
        return <ImageElement key={element.id} element={element} />;
      case "table":
        return <TableElement key={element.id} element={element} />;
      default:
        return null;
    }
  };

  if (!currentTemplate) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">
          Create or select a template to start editing
        </p>
      </div>
    );
  }

  if (!isClient) {
    return null; // or a loading spinner
  }

  return (
    <div 
    className={`max-h-[640px]  h-[640px] overflow-auto rounded-md bg-neutral-200 shadow-inner border`}
    >
    <div
      style={{
        padding:
          currentTemplate?.style && (currentTemplate?.style.height as any) / 2,
        // paddingBottom:
        //   currentTemplate?.style && (currentTemplate?.style.height as any) / 3,
      }}
      className="relative flex-1 flex justify-center items-center overflow-auto r"
    >
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragMove={handleDragMove}
        onDragEnd={handleDragEnd}
      >
        <div
          className={`relative bg-white shadow-lg overflow-hidden transform origin-top-left
             ${
               gridControle
                 ? "bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
                 : ""
             }`}
          style={{
            width: canvaStyle?.width ? `${canvaStyle.width}mm` : `${210}mm`, // A4 width with zoom
            height: canvaStyle?.height ? `${canvaStyle.height}mm` : `${297}mm`, // A4 height with zoom
            backgroundColor: canvaStyle?.backgroundColor,
            transform: `scale(${zoomLevel})`,
            transformOrigin: "top left",
          }}
          ref={canvasRef}
          onClick={handleCanvasClick}
        >
          {draggingElement && (
            <GuideLines
              x={draggingElement.position.x}
              y={draggingElement.position.y}
              width={draggingElement?.width ? draggingElement?.width : 100}
              height={draggingElement.height ? draggingElement.height : 100}
              canvasWidth={210 * pixelsPerMM * zoomLevel}
              canvasHeight={297 * pixelsPerMM * zoomLevel}
              elements={currentTemplate.elements.map((el) => ({
                id: el.id,
                x: el.position.x,
                y: el.position.y,
                width: (el as any).width,
                height: (el as any).height,
              }))}
            />
          )}
          {currentTemplate && layoutControle && (
            <>
              <DraggableLine
                y={currentTemplate.layout.header as number}
                pixelsPerMM={pixelsPerMM}
                zoomLevel={zoomLevel}
                onDrag={(newYMM) => handleLineDrag("header", newYMM)}
                onDragStart={handleLineDragStart}
                onDragEnd={(newYMM) => handleLineDragEnd("header", newYMM)}
                label="Header"
              />
              <DraggableLine
                y={297 - (currentTemplate.layout.footer as number)}
                pixelsPerMM={pixelsPerMM}
                zoomLevel={zoomLevel}
                onDrag={(newYMM) => handleLineDrag("footer", newYMM)}
                onDragStart={handleLineDragStart}
                onDragEnd={(newYMM) => handleLineDragEnd("footer", newYMM)}
                label="Footer"
              />
            </>
          )}
          {currentTemplate.elements
            .sort((a, b) => a.zIndex - b.zIndex)
            .map(renderElement)}
        </div>
      </DndContext>
    </div>      
    </div>

  );
};

export default Canvas;
