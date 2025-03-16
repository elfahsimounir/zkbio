import React, { useEffect, useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

interface DraggableLineProps {
  y: number;
  pixelsPerMM: number;
  zoomLevel: number;
  onDrag: (y: number) => void;
  onDragStart?: () => void;
  onDragEnd?: (y: number) => void;
  label: string;
}

const DraggableLine: React.FC<DraggableLineProps> = ({ y, pixelsPerMM, zoomLevel, onDrag, onDragStart, onDragEnd, label }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: label,
  });

  const [initialY, setInitialY] = useState(y);

  useEffect(() => {
    if (transform) {
      const deltaMM = transform.y / (pixelsPerMM * zoomLevel);
      const newYMM = initialY + deltaMM;
      onDrag(newYMM);
    }
  }, [transform, initialY, onDrag, pixelsPerMM, zoomLevel]);

  const handleDragStart = () => {
    setInitialY(y);
    if (onDragStart) {
      onDragStart();
    }
  };

  const handleDragEnd = () => {
    if (onDragEnd) {
      const deltaMM = transform ? transform.y / (pixelsPerMM * zoomLevel) : 0;
      const newYMM = initialY + deltaMM;
      onDragEnd(newYMM);
    }
  };

  return (
    <div
      ref={setNodeRef}
      className="absolute left-0 w-full h-[1px] bg-green-300 cursor-ns-resize z-50 group"
      style={{ top: `${y}mm`, transform: CSS.Translate.toString(transform) }}
      {...attributes}
      {...listeners}
      onMouseDown={handleDragStart}
      onMouseUp={handleDragEnd}
    >
      <span className="absolute left-0 top-0 transform -translate-y-1/2 bg-green-500 text-white px-2 text-[12px] tracking-wider rounded-r-full">
        {label}
      </span>
    </div>
  );
};

export default DraggableLine;