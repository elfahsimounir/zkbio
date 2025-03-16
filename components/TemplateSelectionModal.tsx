import React from 'react';
import { defaultTemplates } from '@/store/defaultTemplates';

interface TemplateSelectionModalProps {
  isOpen: boolean;
  onSelect: (id: string) => void;
  onClose: () => void;
}

const TemplateSelectionModal: React.FC<TemplateSelectionModalProps> = ({ isOpen, onSelect, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl mb-4">Select a Template</h2>
        <div className="grid grid-cols-1 gap-4">
          {defaultTemplates.map(template => (
            <div key={template.id} className="cursor-pointer" onClick={() => onSelect(template.id)}>
              <h3 className="text-lg">{template.name}</h3>
            </div>
          ))}
        </div>
        <button onClick={onClose} className="mt-4 p-2 bg-gray-500 text-white">Close</button>
      </div>
    </div>
  );
};

export default TemplateSelectionModal;
