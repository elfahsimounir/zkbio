"use client"
import React, { useEffect, useState } from 'react';
import useEditorStore from '@/store/useEditorStore';
import { TableCell } from '@/types/Invoice';
import { Button } from '@/components/ui/button';

interface TableCellKeyUpdaterProps {
  tableElementId: string;
  template: any;
  keys: string[];
}

const TableCellKeyUpdater: React.FC<TableCellKeyUpdaterProps> = ({ tableElementId, keys, template }) => {
  const { getCurrentTemplate, updateTableCellKey, selectTemplate } = useEditorStore();
  const currentTemplate = getCurrentTemplate();
  const [currentCellIndex, setCurrentCellIndex] = useState(0);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [timeline, setTimeline] = useState<{ cellId: string; key: string }[]>([]);

  if (!template) {
    return <div>No template selected</div>;
  }

  const tableElement = template.elements.find((element:any) => element.id === tableElementId);
  if (!tableElement || tableElement.type !== 'table') {
    return <div>Table element not found</div>;
  }

  const tableContent = tableElement.content as any;
  const firstRowCells = tableContent.rows[0].cells;



  const handleSelectKey = (key: string) => {
    const cell = firstRowCells[currentCellIndex];
    updateTableCellKey(tableElementId, tableContent.rows[0].id, cell.id, key);
    setSelectedKeys([...selectedKeys, key]);
    setTimeline([...timeline, { cellId: cell.id, key }]);
    setCurrentCellIndex(currentCellIndex + 1);
  };

  const handleRemoveOption = (index: number) => {
    const updatedTimeline = timeline.filter((_, i) => i !== index);
    setTimeline(updatedTimeline);
    setSelectedKeys(updatedTimeline.map((item) => item.key));
    setCurrentCellIndex(updatedTimeline.length);
  };

  return (
    <div className="p-4 border">
      <h3 className="font-medium text-lg mb-4">Update Table Cell Keys</h3>
      {currentCellIndex < firstRowCells.length ? (
        <div>
          <h4 className="font-medium text-md mb-2">Select Key for Cell {firstRowCells[currentCellIndex].content}</h4>
          <div className="flex space-x-2">
            {keys.map((key) => (
              <div
                key={key}
                className={`p-2 rounded border cursor-pointer ${
                  selectedKeys.includes(key) ? 'bg-gray-200' : 'bg-white'
                }`}
                onClick={() => handleSelectKey(key)}
              >
                {key}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-green-500">All cells have been updated!</div>
      )}
      <div className="mt-4">
        <h4 className="font-medium text-md mb-2">Timeline of Changes</h4>
        <div className="space-y-2 flex gap-2">
          {timeline.map((item, index) => (
            <div key={item.cellId} className="flex items-center space-x-2">
              <div className="flex-1">
                Cell {firstRowCells.findIndex((cell:any) => cell.id === item.cellId) + 1}: {item.key}
              </div>
              <Button variant="outline" size="sm" onClick={() => handleRemoveOption(index)}>
                Remove
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableCellKeyUpdater;