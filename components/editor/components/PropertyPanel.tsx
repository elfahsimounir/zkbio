"use client"
import React from 'react';
import TableProperties from '../properties/TableProperties';
import ElementProperties from '../properties/ElementProperties';
import useEditorStore from '@/store/useEditorStore';

const PropertyPanel: React.FC = () => {
  const { getSelectedElement } = useEditorStore();
  const selectedElement = getSelectedElement();
  
  if (!selectedElement) {
    return (
      <div className="p-4 ">
        <p className="text-gray-500 text-sm">Select an element to edit its properties</p>
      </div>
    );
  }
  
  return (
    <div className="p-4  overflow-y-auto h-[770px]">
      <h3 className="font-medium text-lg mb-4">
        Properties
      </h3>
   
      <ElementProperties element={selectedElement} />
      
      {selectedElement.type === 'table' && (
        <TableProperties element={selectedElement} />
      )}
    </div>
  );
};

export default PropertyPanel;