import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface BorderPropertiesControlProps {
  borderWidth: string | number | undefined;
  borderColor: string | undefined;
  borderStyle: string | undefined;
  borderRadius: string | number | undefined;
  onBorderChange: (property: string, value: string | number) => void;
}

const BORDER_STYLES = [
  { value: 'solid', label: 'Solid' },
  { value: 'dashed', label: 'Dashed' },
  { value: 'dotted', label: 'Dotted' },
  { value: 'double', label: 'Double' },
  { value: 'none', label: 'None' }
];

const BorderPropertiesControl: React.FC<BorderPropertiesControlProps> = ({
  borderWidth,
  borderColor,
  borderStyle,
  borderRadius,
  onBorderChange
}) => {
  return (
    <div className="space-y-3 py-2">
      <h3 className="text-sm font-medium">Border Properties</h3>
      
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label htmlFor="borderWidth" className="text-xs">Width (px)</Label>
          <Input
            id="borderWidth"
            type="number"
            value={borderWidth || 0}
            onChange={(e) => onBorderChange('borderWidth', parseInt(e.target.value))}
            min={0}
            className="h-8"
          />
        </div>
        
        <div>
          <Label htmlFor="borderRadius" className="text-xs">Radius (px)</Label>
          <Input
            id="borderRadius"
            type="number"
            value={borderRadius || 0}
            onChange={(e) => onBorderChange('borderRadius', parseInt(e.target.value))}
            min={0}
            className="h-8"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label htmlFor="borderStyle" className="text-xs">Style</Label>
          <Select 
            value={borderStyle || 'solid'} 
            onValueChange={(value) => onBorderChange('borderStyle', value)}
          >
            <SelectTrigger id="borderStyle" className="h-8">
              <SelectValue placeholder="Style" />
            </SelectTrigger>
            <SelectContent>
              {BORDER_STYLES.map((style) => (
                <SelectItem key={style.value} value={style.value}>
                  {style.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="borderColor" className="text-xs">Color</Label>
          <div className="flex h-8 items-center gap-2">
            <Input
              id="borderColor"
              type="color"
              value={borderColor || '#000000'}
              onChange={(e) => onBorderChange('borderColor', e.target.value)}
              className="w-8 h-8 p-0 border cursor-pointer"
            />
            <Input
              type="text"
              value={borderColor || '#000000'}
              onChange={(e) => onBorderChange('borderColor', e.target.value)}
              className="flex-1 h-8"
              placeholder="#000000"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BorderPropertiesControl;
