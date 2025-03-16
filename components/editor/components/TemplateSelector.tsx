"use client";
import React, { useState } from 'react';

import { Eye, Icon, PencilRuler, Plus } from 'lucide-react';
import useEditorStore from '@/store/useEditorStore';
import { useRouter } from 'next/navigation';
import Button from './ui/Button';
import TemplatePreview from './CanvasPreview';
import Input from './ui/Input';
import CustomSelect from './ui/CustomSelect';
interface TemplateSelectorProps {
  style: any;
  data: any;
}
const paperSizes = [
  { label: "A4", width: 210, height: 297, useCase: "Letters, documents" },
  { label: "A5", width: 148, height: 210, useCase: "Notebooks, flyers" },
  { label: "A6", width: 105, height: 148, useCase: "Postcards" },
  { label: "A7", width: 74, height: 105, useCase: "Pocket-sized notebooks" },
  { label: "A8", width: 74, height: 52, useCase: "Business cards" },
];
const TemplateSelector: React.FC<TemplateSelectorProps> = ({ style, data }) => {
  const [newTemplateName, setNewTemplateName] = useState('');
  const [Template, setTemplate] = useState<any>();
  const [isCreating, setIsCreating] = useState(false);
  const [canvaStyle, setCanvaStyle] = useState({});
  const router = useRouter();
  const {
    templates,
    currentTemplateId,
    createTemplate,
    selectTemplate,
    preview
  } = useEditorStore();

  const handleCreateTemplate = () => {
    if (newTemplateName.trim()) {
      createTemplate(
        newTemplateName.trim(),
        {
       ...canvaStyle
        },
      );
      setNewTemplateName('');
      setIsCreating(false);
      router.push('/editor');
    }
  };
function fectorSize() {
  const arr:any=[];
  paperSizes.map((size) => {
     arr.push(
      {
        value: size.label.toLowerCase(),
        label:<span
         className='flex items-center gap-3'>
         
          <div className='flex flex-col'>
          <p className='text-[12px] text-neutral-600 capitalize'>{size.useCase}</p>
          <p className='text-[11px] text-neutral-400'>{`${size.width}mm x ${size.height}mm`}</p>
          </div>
        
          </span>, 
        icon: <span
          style={{
            width: `${size.width/5}px`,
            height: `${size.height/5}px`,
          }}
          className={`border text-neutral-700 flex items-center justify-center text-[12px] border-neutral-300`}>
             {`${size.label}`} 
          </span>
      }
    )
  });
  console.log(arr);
  return arr;
}
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCreateTemplate();
    } else if (e.key === 'Escape') {
      setIsCreating(false);
      setNewTemplateName('');
    }
  };
  const generate = () => {
    setTemplate(preview(data))
  }
  const handleStyleChange = (value: any) => {
    console.log(value);
    const size = paperSizes.find((size) => size.label.toLowerCase() === value);
    setCanvaStyle({
      width: size?.width,
      height: size?.height,
      backgroundColor: '#fffff',
    });
  }
  return (
    <div className="p-4 ">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-lg">Templates</h3>
        <div className='flex gap-2'>
          <Button
            onClick={() => setIsCreating(true)}
            disabled={isCreating}
          >
            <Plus size={20} />
          </Button>
          <Button
            onClick={() => generate()}
            disabled={isCreating}
          >
            <Eye size={20} />
          </Button>
        </div>
      </div>

      {isCreating && (
        <div className="mb-4">
          <div className='flex flex-col gap-2'>
          <Input
            type="text"
            value={newTemplateName}
            onChange={(e) => setNewTemplateName(e.target.value)}
            // onKeyDown={handleKeyDown}
            label={'Name'}
            width='w-full'

            placeholder="Template name"
            // className="w-full rounded mb-2"
            // autoFocus
          />
          <CustomSelect
                onChange={(e) => handleStyleChange(e)}
                icon={<PencilRuler  size={16}/>}
                options={fectorSize()}
                // value={element.style.fontWeight || ''}
                />
          </div>
          <div className="flex gap-1 space-y-2">
            
            <Button
             className='p-0'
              disabled={!newTemplateName.trim()}
              onClick={handleCreateTemplate}
            >
              Create
            </Button>
            <Button
            className='p-0'
              onClick={() => {
                setIsCreating(false);
                setNewTemplateName('');
              }}
              disabled={false}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      <div className={`${style === 'x' ? 'flex items-center gap-2' : 'max-h-[200px]'} space-y-1  overflow-y-auto`}>
        {templates.map((template) => (
          <div
            key={template.id}
            className={`p-2 rounded cursor-pointer ${template.id === currentTemplateId
                ? 'bg-blue-100 border border-blue-300'
                : ' border hover:bg-gray-50'
              }`}
            onClick={() => selectTemplate(template.id)}
          >
            {style === 'x' &&
              <div className='border overflow-hidden bg-white'>
                <div className='w-[265px] -ml-[105px] -mt-[150px] -mb-[4px] h-[380px] direction-alternate scl scale-[20%]'>
                  <TemplatePreview currentTemplate={template} />
                </div>
              </div>}
            <span className="text-sm">{template.name}</span>
          </div>
        ))}

        {templates.length === 0 && !isCreating && (
          <p className="text-gray-500 text-sm">No templates yet. Create one to get started.</p>
        )}
      </div>
      <div className='relative'>
        {Template &&
          <div className="absolute z-[100]">
            <div className='flex'>
              <button onClick={() => setTemplate(null)}>Close</button>
            </div>
            <div className='border overflow-hidden bg-white'>
                <div className=' direction-alternate'>
                  <TemplatePreview currentTemplate={Template} />
                </div>
              </div>
          </div>
        }
      </div>
    </div>
  );
};

export default TemplateSelector;