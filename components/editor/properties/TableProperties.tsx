"use client";
import React, { useState } from "react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Plus,
  Ruler,
  Text,
  Trash2,
} from "lucide-react";
import ColorPicker from "../components/ui/ColorPicker";
import TextSwitcher from "../components/ui/TextSwitcher";
import { Element, ElementStyle } from "@/types/Invoice";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import useEditorStore from "@/store/useEditorStore";
import CustomSelect from "../components/ui/CustomSelect";

interface TablePropertiesProps {
  element: Element;
}

const TableProperties: React.FC<TablePropertiesProps> = ({ element }) => {
  const {
    addTableRow,
    deleteTableRow,
    addTableColumn,
    deleteTableColumn,
    updateTableRowStyle,
    updateTableColumnStyle,
    updateTableBorderStyle,
    resizeTableColumn,
    resizeTableRow,
    updateTableCellStyle,
  } = useEditorStore();

  const tableContent = element.content as any;
  const [activeTab, setActiveTab] = useState<"rows" | "columns">("rows");
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const [selectedColumn, setSelectedColumn] = useState<number | null>(null);
  // Helper to get selected row data
  const currentRow = tableContent.rows.find((r: any) => r.id === selectedRow);
  // Helper to get selected column data (using first row as reference)
  const currentColumn =
    selectedColumn !== null
      ? tableContent.rows[0]?.cells[selectedColumn]
      : null;

  const handleAddRow = () => {
    addTableRow(element.id);
    setSelectedRow(null);
  };

  const handleDeleteRow = () => {
    if (selectedRow) {
      deleteTableRow(element.id, selectedRow);
      setSelectedRow(null);
    }
  };

  const handleAddColumn = () => {
    addTableColumn(element.id);
    setSelectedColumn(null);
  };

  const handleDeleteColumn = () => {
    if (selectedColumn !== null) {
      deleteTableColumn(element.id, selectedColumn);
      setSelectedColumn(null);
    }
  };

  const handleRowStyleChange = (style: Record<string, any>) => {
    if (selectedRow) {
      updateTableRowStyle(element.id, selectedRow, style);
    }
  };

  const handleColumnStyleChange = (style: Record<string, any>) => {
    if (selectedColumn !== null) {
      updateTableColumnStyle(element.id, selectedColumn, style);
    }
  };

  const handleRowTextAlign = (align: "left" | "center" | "right") => {
    if (selectedRow) {
      tableContent.rows
        .find((r: any) => r.id === selectedRow)
        ?.cells.forEach((cell: any) => {
          updateTableCellStyle(element.id, selectedRow, cell.id, {
            textAlign: align,
          });
        });
    }
  };

  const handleColumnTextAlign = (align: "left" | "center" | "right") => {
    if (selectedColumn !== null) {
      tableContent.rows.forEach((row: any) => {
        const cell = row.cells[selectedColumn];
        updateTableCellStyle(element.id, row.id, cell.id, { textAlign: align });
      });
    }
  };

  const handleRowBackgroundColorChange = (rowId: string, color: string) => {
    updateTableRowStyle(element.id, rowId, { backgroundColor: color });
  };

  const handleColumnBackgroundColorChange = (
    columnIndex: number,
    color: string
  ) => {
    updateTableColumnStyle(element.id, columnIndex, { backgroundColor: color });
  };

  const handleTableBorderChange = (style: Partial<ElementStyle>) => {
    updateTableBorderStyle(element.id, style);
  };

  const handleColumnResize = (columnIndex: number, width: number) => {
    resizeTableColumn(element.id, columnIndex, width);
  };

  const handleRowResize = (rowIndex: number, height: number) => {
    resizeTableRow(element.id, rowIndex, height);
  };

  const handleTextAlignChange = (align: "left" | "center" | "right") => {
    tableContent.rows.forEach((row: any) => {
      row.cells.forEach((cell: any) => {
        updateTableCellStyle(element.id, row.id, cell.id, { textAlign: align });
      });
    });
  };
  const culumnHandleTextAlignChange = (
    columnIndex: number,
    align: "left" | "center" | "right"
  ) => {
    tableContent.rows.forEach((row: any) => {
      const cell = row.cells[columnIndex];
      updateTableCellStyle(element.id, row.id, cell.id, { textAlign: align });
    });
  };

  // Ensure tableContent.style is defined
  const tableStyle = tableContent.style || {};

  return (
    <div className="mt-6">
      <h4 className="font-medium mb-2">Table Properties</h4>
      <div className="my-2">
        <h5 className="text-sm font-medium mb-2">Border</h5>
        <div className="flex items-center justify-around bg-white p-2 rounded border">
          <ColorPicker
            value={tableStyle.borderColor || ""}
            handleChange={(e: any) =>
              handleTableBorderChange({ borderColor: e.target.value })
            }
          />
          <Input
            width="w-14"
            placeholder="Border Width"
            onChange={(e) =>
              handleTableBorderChange({ borderWidth: parseInt(e.target.value) })
            }
            min={0}
            type="number"
            label={<Ruler size={15} />}
          />
          <CustomSelect
            onChange={(e: any) =>
              handleTableBorderChange({ borderStyle: e })
            }
            options={[
              { value: "solid", label: "Solid" },
              { value: "dashed", label: "Dashed" },
              { value: "dotted", label: "Dotted" },
            ]}
            value={tableStyle.borderStyle || "solid"}
            width="w-[130%]"
          />
        </div>
      </div>

      <div className="my-2">
        <h5 className="text-sm font-medium mb-2">Text Align</h5>
        <div className="flex items-center justify-around bg-white p-1 rounded border">
          {[
            {
              label: <Text size={18} />,
              value: "left",
            },
            {
              label: <AlignCenter size={18} />,
              value: "center",
            },
            {
              label: <AlignRight size={18} />,
              value: "right",
            },
          ].map((item, index) => (
            <Button
              key={index}
              className={``}
              disabled={false}
              onClick={() =>
                handleTextAlignChange(item.value as "left" | "center" | "right")
              }
            >
              {item.label}
            </Button>
          ))}
        </div>
      </div>

      {/* <div className="space-y-2">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h5 className="text-sm font-medium">Rows</h5>
            <Button className={``} disabled={false} onClick={handleAddRow}>
              <Plus size={16} />
            </Button>
          </div>

          <div className="space-y-1 max-h-40 overflow-y-auto">
            {tableContent.rows.map((row: any, index: number) => (
              <div
                key={row.id}
                className="flex items-center justify-around bg-white p-2 rounded border"
              >
                <span className="text-sm">{index + 1}</span>
                <Input
                  value={parseInt(row?.style?.height.slice(0, -2)) || ""}
                  width="w-14"
                  placeholder="Height"
                  onChange={(e) =>
                    handleRowResize(index, parseInt(e.target.value))
                  }
                  min={20}
                  speed={3}
                  type="number"
                  label={<Ruler size={15} />}
                />
                <ColorPicker
                  value={"#ffffff"}
                  handleChange={(e: any) =>
                    handleRowBackgroundColorChange(row.id, e.target.value)
                  }
                />
                <Button
                  className={``}
                  disabled={tableContent.rows.length <= 1}
                  onClick={() => handleDeleteRow(row.id)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <h5 className="text-sm font-medium">Columns</h5>
            <Button className={``} onClick={handleAddColumn} disabled={false}>
              <Plus size={16} />
            </Button>
          </div>

          <div className="space-y-1 max-h-40 overflow-y-auto">
            {Array.from({ length: tableContent.columns }).map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-white p-2 rounded border"
              >
                <span className="text-sm">{index + 1} </span>
                <Input
                  value={(() => {
                    if (typeof element.content !== "string") {
                      const cell =
                        element.content.rows[0]?.cells[index]?.style?.width;
                      if (typeof cell === "string") {
                        return parseInt(cell.slice(0, -2));
                      }
                    }
                    return "";
                  })()}
                  width="w-14r"
                  placeholder="Width"
                  onChange={(e) =>
                    handleColumnResize(index, parseInt(e.target.value))
                  }
                  min={20}
                  speed={3}
                  type="number"
                  label={<Ruler size={15} />}
                />
                <ColorPicker
                  value={"#ffffff"}
                  handleChange={(e: any) =>
                    handleColumnBackgroundColorChange(index, e.target.value)
                  }
                />
  
                <Button
                  className={``}
                  disabled={tableContent.columns <= 1}
                  onClick={() => handleDeleteColumn(index)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div> */}

      {/* Tabs */}
      <div className="flex mb-2 bg-neutral-200 rounded-md border">
        <Button
        disabled={false}
          className={`w-full py-2 ${
            activeTab === "rows" ? "bg-white" : ""
          }`}
          onClick={() => setActiveTab("rows")}
        >
          Rows
        </Button>
        <Button
        disabled={false}
          className={`w-full py-2 ${
            activeTab === "columns" ? "bg-white" : ""
          }`}
          onClick={() => setActiveTab("columns")}
        >
          Columns
        </Button>
      </div>

      {/* Rows Tab Content */}
      {activeTab === "rows" && (
        <div className="space-y-4">
          <div className="flex gap-2 items-center">
            <div className="flex flex-wrap gap-1">
            {
                tableContent.rows.map((row: any, index: number) => (
                  <Button key={row.id} className={`text-sm ${selectedRow === row.id ? 'border-neutral-300' : ''}`} disabled={false} onClick={() => setSelectedRow(row.id)}>
                    Row {index + 1}
                  </Button>
                ))
              }
                          <Button className={``} disabled={false} onClick={handleAddRow}>
              <Plus size={16} />
            </Button>
            </div>
          </div>

          {selectedRow && (
            <div className="flex gap-2 items-center">
              <Input
                width="w-14"
                label="H"
                type="number"
                min={20}
                value={currentRow?.style?.height?.replace("px", "") || ""}
                onChange={(e) =>
                  resizeTableRow(
                    element.id,
                    tableContent.rows.findIndex(
                      (r: any) => r.id === selectedRow
                    ),
                    Number(e.target.value)
                  )
                }
              />
              
              <ColorPicker
                handleChange={(e: any) =>
                  handleRowStyleChange({ backgroundColor: e.target.value })
                }
                value={currentRow?.style?.backgroundColor || "#ffffff"}
              />

            <Button
              className={``}
              onClick={handleDeleteRow}
              disabled={!selectedRow || tableContent.rows.length <= 1}
            >
              <Trash2 size={16} />
            </Button>
            </div>
          )}
        </div>
      )}

      {/* Columns Tab Content */}
      {activeTab === "columns" && (
        <div className="space-y-4">
          <div className="flex flex-col ">
            <div className="flex flex-wrap gap-1">
              {Array.from({ length: tableContent.columns }).map((_, index) => (
              <Button
                key={index}
                className={`${
                selectedColumn === index ? "border-neutral-300 " : ""
                } text-sm`}
                disabled={false}
                onClick={() => setSelectedColumn(index)}
              >
                {tableContent.rows[0]?.cells[index]?.content}
              </Button>
              ))}
              <Button
              className={`text-sm`}
              disabled={false}
              onClick={handleAddColumn}
              >
              <Plus size={16} />
              </Button>
            </div>
          </div>
         <div className="flex ">
         {selectedColumn !== null && (
            <div className="flex justify-between gap-2 items-center">
              <Input
                label="W"
                type="number"
                width="w-16"
                min={50}
                value={currentColumn?.style?.width?.replace("px", "") || ""}
                onChange={(e) =>
                  resizeTableColumn(
                    element.id,
                    selectedColumn,
                    Number(e.target.value)
                  )
                }
              />
              <ColorPicker
                handleChange={(e:any) =>
                  handleColumnStyleChange({ backgroundColor: e.target.value })
                }
                value={currentColumn?.style?.backgroundColor || "#ffffff"}
              />
              <div className="flex gap-2">
              <TextSwitcher
                  onChange={(e: any) => {
                    handleColumnTextAlign(e);
                  }}
                />
              </div>
              <Button
             className={``}
              onClick={handleDeleteColumn}
              disabled={selectedColumn === null || tableContent.columns <= 1}
            >
              <Trash2 size={16} />
            </Button>
            </div>
          )}
         </div>

        </div>
      )}
    </div>
  );
};

export default TableProperties;
