"use client"
import React, { useRef, useState, useEffect } from 'react';
import TextElement from '../elements/TextElement';
import ImageElement from '../elements/ImageElement';
import TableElement from '../elements/TableElement';
import { Element } from '@/types/Invoice';

const TemplatePreview: any = ({currentTemplate}:{currentTemplate:any}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const renderElement = (element: Element) => {
    switch (element.type) {
      case 'text':
        return <TextElement key={element.id} element={element} />;
      case 'image':
        return <ImageElement key={element.id} element={element} />;
      case 'table':
        return <TableElement key={element.id} element={element} />;
      default:
        return null;
    }
  };

  if (!isClient) {
    return null; // or a loading spinner
  }
  return (
      <div className={``} >
        <div 
          className="cnv bg-white border overflow-hidden transform origin-top-left"
          style={{      
            width: `${210}mm`, // A4 width with zoom
            height: `${297}mm`, // A4 height with zoom
            minHeight: `${297}mm`,
            // transform: `scale(1) `,
            transformOrigin: 'top left',
          }}
          ref={canvasRef}
        >
          {currentTemplate.elements
            .sort((a:any, b:any) => a.zIndex - b.zIndex)
            .map(renderElement)}
        </div>
      </div>

  );
};

export default TemplatePreview;