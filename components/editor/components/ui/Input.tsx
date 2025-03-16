import React, { useState, useEffect, ReactNode } from 'react';

interface InputProps {
  label: any;
  type: string | 'number' | 'text' | 'range' | 'custom';
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  min?: number;
  max?: number;
  width: string;
  value?: string | number;
  step?: number;
  speed?: number;
}

const Input: React.FC<InputProps> = ({
  label,
  type,
  onChange,
  placeholder,
  min,
  max,
  width,
  value,
  step,// Default step value for decimal numbers
  speed
}) => {

  const className = `w-full text-sm focus:outline-none pl-1 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`;
  const render = () => {
    switch (type) {
      case 'number':
        return (
          <>
            <NumberLable
              onChange={onChange}
              value={value as number}
              max={max}
              min={min}
              speed={speed}
            >
              {label}
            </NumberLable>
            <input
              type={type}
              value={value}
              min={min}
              max={max}
              step={step?step:1}
              onChange={onChange}
              placeholder={placeholder}
              className={className}
            />
          </>
        );
      case 'text':
        return (
          <>
            <label className="text-sm font-medium pl-1">{label}</label>
            <input
              type={type}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              className={className}
            />
          </>
        );
      case 'range':
        return (
          <>
            <div className='flex flex-col py-2'>
              <div className='flex'>
                <label className="text-sm font-medium pl-1">{label}</label>
                <input
              type={'number'}
              value={value}
              min={min}
              max={max}
              step={step?step:1}
              onChange={onChange}
              placeholder={placeholder}
              className={className}
            />
              </div>
              <input
                type='range'
                value={value !== undefined ? value : 0}
                min={min}
                max={max}
                step={step}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </>
        );
        case 'custom':
        return (
          <>
             <NumberLable
              onChange={onChange}
              value={value as number}
              max={max}
              min={min}
              speed={speed}
            >
              {label}
            </NumberLable>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`${type !== 'custom' && type !== 'range' ? 'p-1 border rounded-md  overflow-hidden' : ''} flex items-center ${width ? width : 'w-full'}`}>
      {render()}
    </div>
  );
};

interface NumberInputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: number;
 min?:number;
 max?:number;
 speed:number | any
children:ReactNode
}

const NumberLable: React.FC<NumberInputProps> = ({
  onChange,
  value,
  min,
  max,
  speed,
children
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [startValue, setStartValue] = useState(value || 0);

  useEffect(() => {
    setStartValue(value || 0);
  }, [value]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setStartX(e.clientX);
    setStartY(e.clientY);
    setIsDragging(true);
  };
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;

    let newValue = startValue;

    if (Math.abs(deltaX) > Math.abs(deltaY * (speed ? speed : 1))) {
      const steps = Math.round(deltaX * (speed ? speed : 1));
      newValue += steps;
    } else {
      const steps = Math.round(deltaY);
      newValue += steps;
    }

    // Constrain the newValue within the min and max range
    if (min !== undefined && newValue < min) {
      newValue = min;
    }
    if (max !== undefined && newValue > max) {
      newValue = max;
    }

    const event = {
      target: {
        value: newValue.toString(),
      },
    } as React.ChangeEvent<HTMLInputElement>;

    onChange(event);
    console.log('inputVale ',event.target.value)
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <label
      className={`text-sm capitalize flex justify-centre items-center font-medium   ${isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
      onMouseDown={handleMouseDown} >
      {children}</label>
  );
};


export default Input;