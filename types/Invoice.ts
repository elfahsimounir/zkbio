export type ElementType = 'text' | 'image' | 'table';

export interface ElementStyle {
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: string;
  color?: string;
  backgroundColor?: string;
  borderWidth?: number;
  borderColor?: string;
  opacity?: number;
  borderStyle?: string;
  letterSpacing?:number;
  padding?: number;
  textAlign?: 'left' | 'center' | 'right';
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  fontStyle?: string;
  borderBottomWidth?: number;
  borderBottomStyle?: string;
  borderLeftColor?: string;
  borderTopColor?: string;
  borderRightColor?: string;
  borderBottomColor?: string;
}

export interface Position {
  x: number;
  y: number;
}

export interface Scale {
  x: number;
  y: number;
}

export interface TableCell {
  id: string;
  content: string;
  key: string |any;
  style: ElementStyle;
}

export interface TableRow {
  id: string;
  style?: {
    height?: string;
  };
  cells: TableCell[];
}

export interface TableElement {
  rows: TableRow[];
  columns: number;
}

export interface Element {
  id: string;
  type: ElementType;
  position: Position;
  content: string | TableElement;
  style: ElementStyle;
  zIndex: number;
  scale: Scale;
  status: 'static' | 'dynamic' | null; // Add status property
  key?: string | null; // Add key property for dynamic elements
  borderTopColor ?: string;
  borderTopWidth ?: number;
  borderTopStyle ?: string;
  borderRightColor ?: string;
  borderRightWidth ?: number;
  borderRightStyle ?: string;
  borderBottomColor ?: string;
  borderBottomWidth ?: number;      
}

export interface InvoiceTemplate {
  id: string;
  name: string;
  style:{
    width?:number, // A4 width with zoom
    height?: number, // A4 height with zoom
    backgroundColor?: string, // A4 background size
  }; // Add style property
  elements: Element[];
  layout: {
    header: number | null;
    body: number | null;
    footer: number | null;
  };
}
