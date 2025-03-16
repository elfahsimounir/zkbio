import React from 'react';

interface GuideLinesProps {
  x: number;
  y: number;
  width: number;
  height: number;
  canvasWidth: number;
  canvasHeight: number;
  elements: { id: string; x: number; y: number; width: number; height: number }[];
}

const GuideLines: React.FC<GuideLinesProps> = ({ x, y, width, height, canvasWidth, canvasHeight, elements }) => {
  const lines: any = [];

  const centerX = canvasWidth / 2;
  const centerY = canvasHeight / 2;

  elements.forEach((element) => {
    if (element.x !== x || element.y !== y) {
      // Horizontal guide lines
      if (Math.abs(element.y - y) < 10) {
        lines.push(
          <div
            key={`h-${element.id}`}
            className="absolute bg-green-500"
            style={{
              top: `${element.y}px`,
              left: '0',
              width: `${canvasWidth}px`,
              height: '1px',
            }}
          />
        );
      }

      // Vertical guide lines
      if (Math.abs(element.x - x) < 10) {
        lines.push(
          <div
            key={`v-${element.id}`}
            className="absolute bg-green-500"
            style={{
              top: '0',
              left: `${element.x}px`,
              width: '1px',
              height: `${canvasHeight}px`,
            }}
          />
        );
      }
    }
  });

  // Center guide lines
  if (Math.abs(x + width / 2 - centerX) < 10) {
    lines.push(
      <div
        key="center-x"
        className="absolute bg-blue-500"
        style={{
          top: '0',
          left: `${centerX}px`,
          width: '1px',
          height: `${canvasHeight}px`,
        }}
      />
    );
  }

  if (Math.abs(y + height / 2 - centerY) < 10) {
    lines.push(
      <div
        key="center-y"
        className="absolute bg-blue-500"
        style={{
          top: `${centerY}px`,
          left: '0',
          width: `${canvasWidth}px`,
          height: '1px',
        }}
      />
    );
  }

  return <>{lines}</>;
};

export default GuideLines;