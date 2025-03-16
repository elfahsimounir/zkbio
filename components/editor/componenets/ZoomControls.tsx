"use client"
import React from 'react';
import { ZoomIn, ZoomOut, Maximize } from 'lucide-react';
import useEditorStore from '@/store/useEditorStore';



const ZoomControls: React.FC = () => {
  const { zoomLevel, zoomIn, zoomOut, resetZoom } = useEditorStore();
  
  return (
    <div className="fixed bottom-0 right-0 -translate-x-[200%] -translate-y-[100%] bg-white rounded-lg shadow-lg p-2 flex items-center space-x-2">
      <button
        className="p-2 rounded hover:bg-gray-100"
        onClick={zoomOut}
        title="Zoom Out"
      >
        <ZoomOut size={20} />
      </button>
      
      <span className="text-sm font-medium">
        {Math.round(zoomLevel * 100)}%
      </span>
      
      <button
        className="p-2 rounded hover:bg-gray-100"
        onClick={zoomIn}
        title="Zoom In"
      >
        <ZoomIn size={20} />
      </button>
      
      <button
        className="p-2 rounded hover:bg-gray-100"
        onClick={resetZoom}
        title="Reset Zoom"
      >
        <Maximize size={20} />
      </button>
    </div>
  );
};

export default ZoomControls;