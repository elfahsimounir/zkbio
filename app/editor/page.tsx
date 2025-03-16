"use client"
import Canvas from '@/components/editor/components/Canvas';
import LayersPanel from '@/components/editor/components/LayersPanel';
import PropertyPanel from '@/components/editor/components/PropertyPanel';
import TemplateSelector from '@/components/editor/components/TemplateSelector';
import Toolbar from '@/components/editor/components/Toolbar';
import ZoomControls from '@/components/editor/components/ZoomControls';
import useEditorStore from '@/store/useEditorStore';
import React, { useEffect, useState } from 'react';

const Editor = () => {
  const { createTemplate, templates, setKeys,setDynamicElementKeys,getCurrentTemplate} = useEditorStore();

  // Create a default template if none exists
  useEffect(() => {
    setKeys([
      { key: 'ref', label: 'Ref' },
      { key: 'designation', label: 'Designation' },
      { key: 'qte', label: 'Qte' },
      { key: 'unite', label: 'Unite' },
      { key: 'prixBrut', label: 'Prix Brut' },
      { key: 'rem', label: 'Rem' },
      { key: 'total', label: 'Total' },
      { key: 'ht', label: 'Montant HT' },
      { key: 'totalRem', label: 'Remise ' },
      { key: 'tva', label: 'TVA' },
      { key: 'total', label: 'Montant total' },
    ]);
    setDynamicElementKeys([
      {value: 'mainTable', label: 'Main table'},
      {value: 'tableResume', label: 'Table resume'},
      { value: 'clientName', label: 'Client Name' },
      { value: 'clientAddress', label: 'Client Address' },
      { value: 'clientEmail', label: 'Client Email' },
      { value: 'clientPhone', label: 'Client Phone' },
      { value: 'clientVat', label: 'Client VAT Number' },
      { value: 'subTotal', label: 'Sub Total' },
      { value: 'tax', label: 'Tax' },
      { value: 'total', label: 'Total' },
    ])
    if (templates.length === 0) {
      createTemplate(
        'Default Template',
        {
          width: 210, 
          height: 297,
          backgroundColor: '#fffff', 
        },
      );
    }
  }, [templates.length, createTemplate,setKeys]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        <div className="w-80 overflow-y-auto">
          <TemplateSelector data={null} style={'y'} />
          <LayersPanel />
        </div>
        <div className='flex flex-col w-full'>
            <Toolbar />
            <Canvas />
        </div>
        <div className="w-80 overflow-y-auto ">
          <PropertyPanel />
        </div>
      </div>
      <ZoomControls />
    </div>
  );
}

export default Editor;