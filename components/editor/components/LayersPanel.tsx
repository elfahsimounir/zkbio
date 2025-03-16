"use client"
import React from 'react';
import { DragEndEvent } from '@dnd-kit/core';
import {  useSortable,verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Eye, EyeOff } from 'lucide-react';
import useEditorStore from '@/store/useEditorStore';
import { Element } from '@/types/Invoice';

interface LayerItemProps {
  element: Element;
}
import dynamic from 'next/dynamic';

const DndContext = dynamic(
  () => import('@dnd-kit/core').then((mod) => mod.DndContext),
  { ssr: false }
);

const SortableContext = dynamic(
  () => import('@dnd-kit/sortable').then((mod) => mod.SortableContext),
  { ssr: false }
);

const LayerItem: React.FC<LayerItemProps> = ({ element }) => {
  const { 
    selectedElementId, 
    selectElement, 
    updateElementZIndex 
  } = useEditorStore();
  
  const isSelected = selectedElementId === element.id;
  
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: element.id,
  });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  const getElementLabel = () => {
    switch (element.type) {
      case 'text':
        return `Text: ${(element.content as string).substring(0, 15)}${(element.content as string).length > 15 ? '...' : ''}`;
      case 'image':
        return 'Image';
      case 'table':
        return 'Table';
      default:
        return 'Element';
    }
  };
  
  const handleClick = () => {
    selectElement(element.id);
  };
  
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center p-2 mb-1 rounded cursor-pointer ${
        isSelected ? 'bg-blue-100 border border-blue-300' : 'bg-white border hover:bg-gray-50'
      }`}
      onClick={handleClick}
    >
      <div className="cursor-move mr-2" {...attributes} {...listeners}>
        <GripVertical size={16} />
      </div>
      <div className="flex-1 text-sm">{getElementLabel()}</div>
      <div className="text-xs text-gray-500">z:{element.zIndex}</div>
    </div>
  );
};

const LayersPanel: React.FC = () => {
  const { getCurrentTemplate, updateElementZIndex } = useEditorStore();
  const currentTemplate = getCurrentTemplate();
  
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over || active.id === over.id || !currentTemplate) return;
    
    const elements = [...currentTemplate.elements];
    const activeIndex = elements.findIndex((el) => el.id === active.id);
    const overIndex = elements.findIndex((el) => el.id === over.id);
    
    // Update z-indices based on new order
    const sortedElements = [...elements].sort((a, b) => a.zIndex - b.zIndex);
    
    // Move the active element to the new position
    const [movedElement] = sortedElements.splice(activeIndex, 1);
    sortedElements.splice(overIndex, 0, movedElement);
    
    // Update z-indices
    sortedElements.forEach((element, index) => {
      updateElementZIndex(element.id, index);
    });
  };
  
  if (!currentTemplate) {
    return (
      <div className="p-4 bg-gray-50">
        <p className="text-gray-500 text-sm">Create or select a template to see layers</p>
      </div>
    );
  }
  
  const sortedElements = [...currentTemplate.elements].sort((a, b) => b.zIndex - a.zIndex);
  
  return (
    <div className="p-4 ">
      <h3 className="font-medium text-lg mb-4">Layers</h3>
      
      <DndContext onDragEnd={handleDragEnd}>
        <SortableContext items={sortedElements.map(el => el.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-1 overflow-y-auto max-h-[340px]">
            {sortedElements.map((element) => (
              <LayerItem key={element.id} element={element} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      
      {sortedElements.length === 0 && (
        <p className="text-gray-500 text-sm">No elements added yet</p>
      )}
    </div>
  );
};

export default LayersPanel;