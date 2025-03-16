import React from 'react';

interface RulerProps {
  orientation: 'horizontal' | 'vertical';
  length: number;
  pixelsPerMM: number;
  zoomLevel: number;
}

const Ruler: React.FC<RulerProps> = ({ orientation, length, pixelsPerMM, zoomLevel }) => {
  const marks = [];
  const totalMM = length / pixelsPerMM / zoomLevel;

  for (let i = 0; i <= totalMM; i++) {
    const position = i * pixelsPerMM * zoomLevel;
    marks.push(
      <div
        key={i}
        className={`absolute ${orientation === 'horizontal' ? 'top-0' : 'left-0'}`}
        style={{
          [orientation === 'horizontal' ? 'left' : 'top']: `${position}px`,
          [orientation === 'horizontal' ? 'height' : 'width']: i % 10 === 0 ? '10px' : '5px',
          [orientation === 'horizontal' ? 'width' : 'height']: '1px',
          backgroundColor: 'black',
        }}
      />
    );

    if (i % 10 === 0) {
      marks.push(
        <div
          key={`label-${i}`}
          className={`absolute text-xs ${orientation === 'horizontal' ? 'top-2' : 'left-2'}`}
          style={{
            [orientation === 'horizontal' ? 'left' : 'top']: `${position}px`,
            [orientation === 'horizontal' ? 'transform' : 'transform']: 'translateX(-50%)',
          }}
        >
          {i / 10} cm
        </div>
      );
    }
  }

  return (
    <div
      className={`relative ${orientation === 'horizontal' ? 'w-full h-6' : 'h-full w-6'}`}
      style={{ backgroundColor: '#f0f0f0' }}
    >
      {marks}
    </div>
  );
};

export default Ruler;