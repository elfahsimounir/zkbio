"use client"
import React, { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Element } from '@/types/Invoice';
import useEditorStore from '@/store/useEditorStore';

interface TextElementProps {
  element: Element;
}

const TextElement: React.FC<TextElementProps> = ({ element }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { selectedElementId, selectElement, updateElementContent, zoomLevel } = useEditorStore();
  const isSelected = selectedElementId === element.id;
  
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: element.id,
    disabled: isEditing,
  });
  
  const style = {
    transform: CSS.Translate.toString(transform),
    left: `${element.position.x}px`,
    top: `${element.position.y}px`,
    zIndex: element.zIndex,
    fontFamily: element.style.fontFamily || 'inherit',
    fontSize: element.style.fontSize ? `${element.style.fontSize}px` : 'inherit',
    fontWeight: element.style.fontWeight || 'normal',
    fontStyle: element.style.fontStyle || 'normal',
    color: element.style.color || 'black',
    backgroundColor: element.style.backgroundColor || 'transparent',
    borderWidth: element.style.borderWidth ? `${element.style.borderWidth}px` : '0',
    borderColor: element.style.borderColor || 'transparent',
    borderStyle: element.style.borderStyle || 'solid',
    opacity: element.style.opacity  || 1 ,
    borderRadius: element.style.borderRadius ? `${element.style.borderRadius}px` : '0',
    letterSpacing: element.style.letterSpacing ? `${element.style.letterSpacing}px` : 'normal',
    borderBottomWidth: element.style.borderBottomWidth ? `${element.style.borderBottomWidth}px` : undefined,
    borderBottomColor: element.style.borderBottomColor || undefined,
    borderBottomStyle: element.style.borderBottomStyle || undefined,
    padding: element.style.padding ? `${element.style.padding}px` : '0',
    textAlign: element.style.textAlign || 'left',
    width: typeof element.style.width === 'number' 
      ? `${element.style.width}px` 
      : element.style.width || 'auto',
    height: typeof element.style.height === 'number' 
      ? `${element.style.height}px` 
      : element.style.height || 'auto',
    transformOrigin: 'top left',
  };
  
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    selectElement(element.id);
  };
  
  const handleDoubleClick = () => {
    setIsEditing(true);
  };
  
  const handleBlur = () => {
    setIsEditing(false);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateElementContent(element.id, e.target.value);
  };
  
  return (
    <div
      ref={setNodeRef}
      className={`absolute ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      style={style as React.CSSProperties}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      {...(isEditing ? {} : { ...attributes, ...listeners })}
    >
      <div 
      style={{transform: ` scale(${element.scale.x}, ${element.scale.y})`}}
      >
      {isEditing ? (
        <textarea
          className="w-full h-full p-0 border-0 focus:outline-none resize-none bg-transparent"
          value={element.content as string}
          onChange={handleChange}
          onBlur={handleBlur}
          autoFocus
          style={{
            fontFamily: style.fontFamily,
            fontSize: style.fontSize,
            fontWeight: style.fontWeight,
            fontStyle: style.fontStyle,
            color: style.color,
            textAlign: style.textAlign as any,
            width:style.width,
            height:style.height
          }}
        />
      ) : (
        <div style={{ whiteSpace: 'pre-line' }}>{element.content as string}</div>
      )}
      </div>
     
    </div>
  );
};

export default TextElement;