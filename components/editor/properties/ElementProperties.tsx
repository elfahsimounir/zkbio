"use client"
import React, { useState } from 'react';
import Input from '../components/ui/Input';
import { ALargeSmall, BadgeInfo, Bold, Contrast, KeyRound, Ligature, Minimize2, Ruler, SquareDashed, SquareDashedBottom, WholeWord } from 'lucide-react';
import ItalicSwitcher from '../components/ui/ItalicSwitcher';
import ColorPicker from '../components/ui/ColorPicker';
import { Element } from '@/types/Invoice';
import useEditorStore from '@/store/useEditorStore';
import Button from '../components/ui/Button';
import Dropdown from '../components/Dropdown';
import TextSwitcher from '../components/ui/TextSwitcher';
import CustomSelect from '../components/ui/CustomSelect';

interface ElementPropertiesProps {
  element: Element;
}
const ElementProperties: React.FC<ElementPropertiesProps> = ({ element }) => {
  const { updateElementStyle, scaleElement, updateElementBorderStyle, updateElementPosition, updateElementStatus, updateElementKey,dynamicElementKeys } = useEditorStore();

  const handleStyleChange = (property: string, value: string | number) => {
    updateElementStyle(element.id, { [property]: value });
  };

  const handleScaleChange = (axis: 'x' | 'y', value: number) => {
    const newScaleX = axis === 'x' ? value : element.scale.x;
    const newScaleY = axis === 'y' ? value : element.scale.y;
    scaleElement(element.id, newScaleX, newScaleY);
  };

  const handleBorderStyleChange = (property: string, value: string | number) => {
    updateElementBorderStyle(element.id, { [property]: value });
  };

  const handlePositionChange = (axis: 'x' | 'y', value: number) => {
    const newPosition = { ...element.position, [axis]: value };
    updateElementPosition(element.id, newPosition);
  };
  const handleStatusChange = (status: 'static' | 'dynamic' | null) => {
    updateElementStatus(element.id, status);
  };

  const handleKeyChange = (key: string) => {
    updateElementKey(element.id, key);
  };

  return (
    <div className="space-y-4">
      <div className='flex gap-1'>
      <div>
        <h4 className="font-medium mb-2">Positions</h4>
        <div className="grid grid-cols-1 gap-1">
          {['x', 'y'].map((axis) => (
            <Input
              width='full'
              key={axis}
              value={(element.position as any)[axis] || ''}
              placeholder={axis.toUpperCase()}
              onChange={(e) => handlePositionChange(axis as 'x' | 'y', parseInt(e.target.value))}
              min={0}
              type="number"
              label={axis.toUpperCase()}
            />
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-medium mb-2">Dimensions</h4>
        <div className="grid grid-cols-1 gap-1">
          {[
            { label: 'Width', property: 'width' },
            { label: 'Height', property: 'height' },
          ].map((item) => {
            return (
              <Input
                width='full'
                key={item.property}
                value={(element.style as any)[item.property] || ''}
                placeholder={item.label}
                onChange={(e) => handleStyleChange(item.property, parseInt(e.target.value))}
                min={0}
                type="number"
                label={<Ruler size={15} />}
              />
            );
          })}
        </div>
      </div>
      </div>

      {/* <div>
        <h4 className="font-medium mb-2">Scale</h4>
        <div className="flex gap-2">
          {[
            {label: 'Scale X',property: 'x'},
            {label:  'Scale Y', property: 'y'  }
          ].map((item) => (       
              <Input
                key={item.property}
                width='w-14'
                value={(element.scale as any)[item.property] || ''}
                placeholder={item.label}
                onChange={(e) => handleScaleChange(item.property as any, parseFloat(e.target.value))}
                min={0.1}
                type="number"
                label={item.property.toUpperCase()}
              />
            ))}
        </div>
      </div> */}

      {(element.type === 'text' || element.type === 'table') && (
        <div>
          <h4 className="font-medium mb-2">Typography</h4>
          <div className="space-y-2">
            <div className='flex gap-2 justify-between'>
              <div className='w-full'>
                <CustomSelect
                 width='w-[180%]'
                onChange={(e) => handleStyleChange('fontFamily', e)}
                 options={[  { value: '', label: 'Default' },
                  { value: 'Arial, sans-serif', label: 'Arial' },
                  { value: 'Helvetica, sans-serif', label: 'Helvetica' },
                  { value: 'Times New Roman, serif', label: 'Times New Roman' },
                  { value: 'Courier New, monospace', label: 'Courier New' },
                  { value: 'Georgia, serif', label: 'Georgia' },
                  { value: 'Verdana, sans-serif', label: 'Verdana' },]}
                value={element.style.fontFamily || ''}
                icon={<Ligature size={16} />}
                />
              </div>
              <div className='w-full'>
                <CustomSelect
                onChange={(e) => handleStyleChange('fontWeight', e)}
                icon={<Bold size={16}/>}
                options={[
                  { value: '', label: 'Default' },
                  { value: 'normal', label: 'Normal' },
                  { value: 'bold', label: 'Bold' },
                  { value: 'lighter', label: 'Lighter' },
                ]}
                value={element.style.fontWeight || ''}
                />
              </div>
            </div>
            <div className='flex gap-1 '>
              <Input
                width='w-14'
                value={element.style.fontSize || ''}
                placeholder="Font Size"
                onChange={(e) => handleStyleChange('fontSize', parseInt(e.target.value))}
                min={0}
                type="number"
                label={<ALargeSmall size={16} />}
              />
              <ColorPicker
                value={element.style.color || ''}
                handleChange={(e: any) => handleStyleChange('color', e.target.value)}
              />
              <div className='flex'>
              <ItalicSwitcher onClick={handleStyleChange} />
              <TextSwitcher onChange={(e:any)=>{handleStyleChange('textAlign',e)}} />
              <Dropdown
              title={  <WholeWord  size={16} />} >
            <Input
              width='w-full'
              value={element.style.letterSpacing&&parseFloat(element.style.letterSpacing.toString())  || ''}
              placeholder="Spacing"
              onChange={(e) =>{
                handleStyleChange('letterSpacing', parseFloat(e.target.value))
                console.log(parseFloat(e.target.value.toString()) )
            }}
              min={0.1}
              step={0.1}
              max={3}
              type="range"
              label={'Spacing'}
            />
            </Dropdown>
              </div>
            </div>
          </div>
        </div>
      )}
            <div className='flex gap-2'>
            <Input
                width='w-14'
                value={element.style.opacity !== undefined ? Math.round(element.style.opacity * 100) : 100}
                placeholder="transparency"
                onChange={(e) =>{ 
                let  value = Math.round(parseInt(e.target.value))/100             
                handleStyleChange('opacity',value) ;
                }}
                max={100}
                step={10}
                min={0}
                type="number"
                label={<Contrast  size={16} />}
              />
               <Input
                width='w-14'
                value={element.style.borderRadius !== undefined ? element.style.borderRadius: 0}
                placeholder="Radius"
                onChange={(e) =>{            
                handleStyleChange('borderRadius',parseInt(e.target.value)) ;
                }}
                max={100}
                step={1}
                min={0}
                type="number"
                label={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="M21 11a8 8 0 0 0-8-8"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/></svg>}
              />
            </div>
      <div>
        <h4 className="font-medium mb-2">Appearance</h4>
        <div className="space-y-2">
          <div className='flex gap-1'>
          {[
            { label: 'Background', property: 'backgroundColor' },
            { label: 'Border', property: 'borderColor' },
            ].map((item) => (
            <div key={item.property} className='flex items-center gap-2'>
              <label className="block text-sm text-gray-600 mb-1">{item.label}</label>
              <ColorPicker
              value={(element.style as any)[item.property] || ''}
              handleChange={(e: any) => handleStyleChange(item.property, e.target.value)}
              />
            </div>
            ))}
          </div>

          <div className='flex items-center gap-2'>
            {[{
                label:'Padding',
                property:'padding',
                icon:<Minimize2 size={16} />
              },
              {
                label:'Border Width',
                property:'borderWidth',
                icon:<SquareDashedBottom size={16} />
              }].map((item) => (
              <Input
                key={item.property}
                value={(element.style as any)[item.property] || ''}
                width='w-full'
                placeholder={item.label}    
                onChange={(e) => handleStyleChange(item.property, parseInt(e.target.value))}
                min={0}
                type="number"
                label={item.icon}
              />
            ))}
            <CustomSelect
              width='w-full'
              onChange={(e) => handleBorderStyleChange('borderStyle', e)}
              options={[
                { value: 'solid', label: 'Solid' },
                { value: 'dashed', label: 'Dashed' },
                { value: 'dotted', label: 'Dotted' },
                { value: 'double', label: 'Double' },
              ]}
              value={element.style.borderStyle || 'solid'}
              icon={<SquareDashed  size={16} />}
            />
          </div>
        </div>
      </div>


      {(element.type === 'text' || element.type === 'table') && (
        <div>
          <h4 className="font-medium mb-2">Element Status</h4>
          <div className="space-y-2">
            <div className='flex items-center gap-2'>
              <CustomSelect
                width='w-full'
                onChange={(e:any) => handleStatusChange(e)}
                options={[
                  { value: 'static', label: 'Static' },
                  { value: 'dynamic', label: 'Dynamic' },
                ]}
                value={element.status || 'static'}
                icon={<BadgeInfo  size={16} />}
            />
            </div>
            {element.status === 'dynamic' && (
              <div className='flex items-center gap-2 w-full'>
                <CustomSelect        
                  width='w-[200%]'
                  onChange={(e:any) => handleKeyChange(e)}
                  options={dynamicElementKeys}
                  value={element.key || ''}
                  icon={<KeyRound size={16} />}
                  />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ElementProperties;