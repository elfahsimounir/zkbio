"use client"
import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Element } from '@/types/Invoice';
import useEditorStore from '@/store/useEditorStore';

interface ImageElementProps {
  element: Element;
}

const ImageElement: React.FC<ImageElementProps> = ({ element }) => {
  const { selectedElementId, selectElement } = useEditorStore();
  const isSelected = selectedElementId === element.id;
  
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: element.id,
  });
  
  const style = {
    transform: CSS.Translate.toString(transform),
    transformOrigin: 'top left',
    left: `${element.position.x}px`,
    top: `${element.position.y}px`,
    zIndex: element.zIndex,
    width: typeof element.style.width === 'number' 
      ? `${element.style.width}px` 
      : element.style.width || '200px',
    height: typeof element.style.height === 'number' 
      ? `${element.style.height}px` 
      : element.style.height || 'auto',
    opacity: element.style.opacity || 1,
    borderRadius: element.style.borderRadius ? `${element.style.borderRadius}px` : '0',
    borderWidth: element.style.borderWidth ? `${element.style.borderWidth}px` : '0',
    borderColor: element.style.borderColor || 'transparent',
    borderStyle: element.style.borderStyle || 'solid',
    padding: element.style.padding ? `${element.style.padding}px` : '0',
  };
  
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    selectElement(element.id);
  };
  
  return (
    <div
      ref={setNodeRef}
      className={`absolute ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      style={style as React.CSSProperties}
      onClick={handleClick}
      {...attributes}
      {...listeners}
    >
      <img 
        src={element.content as string} 
        alt="Invoice element" 
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default ImageElement;