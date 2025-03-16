import { create } from 'zustand';
import { nanoid } from 'nanoid';
import { defaultTemplates } from './defaultTemplates';
import { Element, ElementStyle, InvoiceTemplate, TableCell, TableRow } from '@/types/Invoice';


interface EditorState {
  templates: InvoiceTemplate[];
  currentTemplateId: string | null;
  selectedElementId: string | null;
  history: InvoiceTemplate[][];
  historyIndex: number;
  zoomLevel: number;

  // Template actions
  createTemplate: (name: string,style:{
    width?: number;
    height?: number;
    backgroundColor?: string;
  }) => void;
  selectTemplate: (id: string) => void;

  // Element actions
  addElement: (type: Element['type'], position: Element['position'], content?: Element['content']) => void;
  updateElementPosition: (id: string, position: Element['position']) => void;
  updateElementContent: (id: string, content: string | any) => void;
  updateElementStyle: (id: string, style: Partial<ElementStyle>) => void;
  updateElementZIndex: (id: string, zIndex: number) => void;
  deleteElement: (id: string) => void;
  selectElement: (id: string | null) => void;
  scaleElement: (id: string, scaleX: number, scaleY: number) => void;
  updateElementBorderStyle: (id: string, borderStyle: Partial<ElementStyle>) => void;
  updateElementStatus: (id: string, status: 'static' | 'dynamic' | null) => void;
  updateElementKey: (id: string, key: string) => void;
  duplicateElement: (id: string) => void;

  // Table actions
  addTableRow: (tableElementId: string) => void;
  deleteTableRow: (tableElementId: string, rowId: string) => void;
  addTableColumn: (tableElementId: string) => void;
  deleteTableColumn: (tableElementId: string, columnIndex: number) => void;
  updateTableCell: (tableElementId: string, rowId: string, cellId: string, content: string) => void;
  updateTableCellStyle: (tableElementId: string, rowId: string, cellId: string, style: Partial<ElementStyle>) => void;
  updateTableBorderStyle: (tableElementId: string, style: Partial<ElementStyle>) => void;
  updateTableRowStyle: (tableElementId: string, rowId: string, style: Partial<ElementStyle>) => void;
  updateTableColumnStyle: (tableElementId: string, columnIndex: number, style: Partial<ElementStyle>) => void;
  resizeTableColumn: (tableElementId: string, columnIndex: number, width: number) => void;
  resizeTableRow: (tableElementId: string, rowIndex: number, height: number) => void;
  updateTableCellKey: (tableElementId: string, rowId: string, cellId: string, key: string) => void;
  // History actions
  saveToHistory: () => void;
  undo: () => void;
  redo: () => void;
  selectedRowId: any
  selectedColumnIndex: any
  // Zoom actions
  setZoomLevel: (level: number) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;

  // preview generator
  previewGenerator: (template: any, data
    : any) => any;
  preview: (data: any[]) => any;

  // key handler
  selectedRow: any;
  selectRow: (row: any) => void;
  keys: {
    label: string;
    key: string;
  }[] | null;
  setKeys: (data: any) => void;

  // image handler
  uploadImage: (file: File) => void;
  // layout
  updateLayout: (id: any, layout: {
    header: number | null;
    body: number | null;
    footer: number | null;
  }) => void;
  layoutControle: boolean;
  setLayoutControle: (data: boolean) => void;

  updateTemplateStyle: (id: string, style: any) => void;

  updateTableFontWeight: (tableElementId: string, fontWeight: string) => void;
  updateTableCharSpacing: (tableElementId: string, charSpacing: string) => void;
  updateTableRowFontWeight: (tableElementId: string, rowId: string, fontWeight: string) => void;
  updateTableRowCharSpacing: (tableElementId: string, rowId: string, charSpacing: string) => void;
  updateTableColumnFontWeight: (tableElementId: string, columnIndex: number, fontWeight: string) => void;
  updateTableColumnCharSpacing: (tableElementId: string, columnIndex: number, charSpacing: string) => void;
  // grid
  gridControle: boolean;
  setGridControle: (data: boolean) => void;
  // Current template and element getters
  getCurrentTemplate: () => InvoiceTemplate | null;
  getSelectedElement: () => Element | null;
  dynamicElementKeys:{
    label: string;
    value: string;
  }[] | any;
  setDynamicElementKeys: (data: any) => void;
  // Element actions
  addElementFromPDF: (type: Element['type'], position: Element['position'], content: Element['content']) => void;

}

const useEditorStore = create<EditorState>((set, get) => ({
  templates: [...defaultTemplates],
  currentTemplateId: null,
  selectedElementId: null,
  history: [],
  historyIndex: -1,
  zoomLevel: 1,
  selectedRowId: null,
  selectedColumnIndex: null,
  selectedRow: null,
  keys: null,
  layoutControle: false,
  gridControle: false,
  dynamicElementKeys: [],

  // Template actions
  setDynamicElementKeys(data) {
    set({
      dynamicElementKeys: data
    })
  },
  createTemplate: (name,style) => {
    const newTemplate: InvoiceTemplate = {
      id: nanoid(),
      name,
      style,
      layout: {
        header: null,
        body: null,
        footer: null,
      },
      elements: [],
    };

    set((state) => ({
      templates: [...state.templates, newTemplate],
      currentTemplateId: newTemplate.id,
      selectedElementId: null,
    }));

    get().saveToHistory();
  },
  addElementFromPDF: (type, position, content) => {
    const currentTemplate = get().getCurrentTemplate();
    if (!currentTemplate) return;

    const newElement: Element = {
      id: nanoid(),
      type,
      position,
      content,
      style: {
        width: "auto",
        height: "auto",
      },
      status: "static",
      key: null,
      zIndex: currentTemplate.elements.length,
      scale: { x: 1, y: 1 },
    };

    set((state) => {
      const updatedTemplates = state.templates.map((template) => {
        if (template.id === state.currentTemplateId) {
          return {
            ...template,
            elements: [...template.elements, newElement],
          };
        }
        return template;
      });

      return {
        templates: updatedTemplates,
        selectedElementId: newElement.id,
      };
    });

    get().saveToHistory();
  },
  updateTemplateStyle:(id,style)=>{
     set((state) => {
      const updatedTemplates = state.templates.map((template) => {
        if (template.id === id) {
          return {
            ...template,
            style
          };
        }
        return template;
      });
      return {
        templates: updatedTemplates,
      };
    }

)},
  updateLayout: (id, layout) => {
    set((state) => {
      const updatedTemplates = state.templates.map(template => {
        if (template.id === id) {
          const currentLayout = template.layout;
          const newLayout = {
            header: layout.header ?? currentLayout.header,
            body: layout.body ?? currentLayout.body,
            footer: layout.footer ?? currentLayout.footer,
          };

          // Only update if there is an actual change in the layout
          if (
            newLayout.header !== currentLayout.header ||
            newLayout.body !== currentLayout.body ||
            newLayout.footer !== currentLayout.footer
          ) {
            return {
              ...template,
              layout: newLayout,
            };
          }
        }
        return template;
      });

      return {
        templates: updatedTemplates,
      };
    });

    get().saveToHistory();
  },

  uploadImage: (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const imageUrl = event.target?.result as string;
      const currentTemplate = get().getCurrentTemplate();
      if (!currentTemplate) return;

      const newElement: Element = {
        id: nanoid(),
        type: 'image',
        position: { x: 50, y: 50 },
        content: imageUrl,
        style: {
          width: 'auto',
          height: 'auto',
        },
        status: 'static',
        key: null,
        zIndex: currentTemplate.elements.length,
        scale: { x: 1, y: 1 },
      };

      set((state) => {
        const updatedTemplates = state.templates.map((template) => {
          if (template.id === state.currentTemplateId) {
            return {
              ...template,
              elements: [...template.elements, newElement],
            };
          }
          return template;
        });

        return {
          templates: updatedTemplates,
          selectedElementId: newElement.id,
        };
      });

      get().saveToHistory();
    };
    reader.readAsDataURL(file);
  },

  selectRow: (row: any) => {
    set((state) => ({
      selectedRow: row
      // selectedElementId: null,
      // selectedRowId: null,
      // selectedColumnIndex: null
    }));
  },

  setKeys: (data: any) => {
    set((state) => ({
      keys: data
      // selectedElementId: null,
      // selectedRowId: null,
      // selectedColumnIndex: null
    }));
  },

  selectTemplate: (id) => {
    set({
      currentTemplateId: id,
      selectedElementId: null,
      selectedRow: null
    });

    get().saveToHistory();
  },

  addElement: (type, position, content) => {
    const currentTemplate = get().getCurrentTemplate();
    if (!currentTemplate) return;

    let elementContent: string | any = '';

    if (type === 'table') {
      // Create default table with 2 rows and 2 columns
      const createCell = (): TableCell => ({
        id: nanoid(),
        content: '',
        key: '',
        style: {
          textAlign: "left",
        },
      });

      const createRow = (): TableRow => ({
        id: nanoid(),
        cells: Array(2).fill(0).map(() => createCell()),
      });

      elementContent = {
        rows: [createRow(), createRow()],
        columns: 2,
      };
    } else if (content) {
      elementContent = content;
    } else if (type === 'text') {
      elementContent = 'Text Element';
    }

    const newElement: Element = {
      id: nanoid(),
      type,
      position,
      content: elementContent,
      style: {
        width: type === 'table' ? '300px' : 'auto'
      },
      status: 'static',
      key: null,
      zIndex: currentTemplate.elements.length,
      scale: { x: 1, y: 1 },
    };

    set((state) => {
      const updatedTemplates = state.templates.map((template) => {
        if (template.id === state.currentTemplateId) {
          return {
            ...template,
            elements: [...template.elements, newElement],
          };
        }
        return template;
      });

      return {
        templates: updatedTemplates,
        selectedElementId: newElement.id,
      };
    });

    get().saveToHistory();
  },

  updateElementPosition: (id, position) => {
    set((state) => {
      const updatedTemplates = state.templates.map((template) => {
        if (template.id === state.currentTemplateId) {
          return {
            ...template,
            elements: template.elements.map((element) => {
              if (element.id === id) {
                return {
                  ...element,
                  position,
                };
              }
              return element;
            }),
          };
        }
        return template;
      });

      return {
        templates: updatedTemplates,
      };
    });

    get().saveToHistory();
  },
  updateElementKey: (id: any, key: any) => {
    set((state) => {
      const updatedTemplates = state.templates.map((template) => {
        if (template.id === state.currentTemplateId) {
          return {
            ...template,
            elements: template.elements.map((element) =>
              element.id === id ? { ...element, key } : element
            ),
          };
        }
        return template;
      });

      return {
        templates: updatedTemplates,
      };
    });

    get().saveToHistory();
  },

  updateElementStatus: (id, status) => {
    set((state) => {
      const updatedTemplates = state.templates.map((template) => {
        if (template.id === state.currentTemplateId) {
          return {
            ...template,
            elements: template.elements.map((element) => {
              if (element.id === id && status === 'static' && element.type === 'table') {
                state.selectedRow = null;
              }
              if (element.id === id) {
                return {
                  ...element,
                  status,
                };
              }
              return element;
            }),
          };
        }
        return template;
      });
      return {
        templates: updatedTemplates,
      };
    },);

    get().saveToHistory();
  },

  updateElementContent: (id, content) => {
    set((state) => {
      const updatedTemplates = state.templates.map((template) => {
        if (template.id === state.currentTemplateId) {
          return {
            ...template,
            elements: template.elements.map((element) => {
              if (element.id === id) {
                return {
                  ...element,
                  content,
                };
              }
              return element;
            }),
          };
        }
        return template;
      });

      return {
        templates: updatedTemplates,
      };
    });

    get().saveToHistory();
  },

  updateElementStyle: (id, style) => {
    set((state) => {
      const updatedTemplates = state.templates.map((template) => {
        if (template.id === state.currentTemplateId) {
          return {
            ...template,
            elements: template.elements.map((element) => {
              if (element.id === id) {
                return {
                  ...element,
                  style: {
                    ...element.style,
                    ...style,
                  },
                };
              }
              return element;
            }),
          };
        }
        // console.log('style :', style)
        return template;
      });

      return {
        templates: updatedTemplates,
      };
    });

    get().saveToHistory();
  },

  updateElementZIndex: (id, zIndex) => {
    set((state) => {
      const updatedTemplates = state.templates.map((template) => {
        if (template.id === state.currentTemplateId) {
          return {
            ...template,
            elements: template.elements.map((element) => {
              if (element.id === id) {
                return {
                  ...element,
                  zIndex,
                };
              }
              return element;
            }),
          };
        }
        return template;
      });

      return {
        templates: updatedTemplates,
      };
    });

    get().saveToHistory();
  },

  deleteElement: (id) => {
    set((state) => {
      const updatedTemplates = state.templates.map((template) => {
        if (template.id === state.currentTemplateId) {
          return {
            ...template,
            elements: template.elements.filter((element) => element.id !== id),
          };
        }
        return template;
      });

      return {
        templates: updatedTemplates,
        selectedElementId: null,
      };
    });

    get().saveToHistory();
  },

  selectElement: (id) => {
    set({
      selectedElementId: id,
    });
  },

  scaleElement: (id, scaleX, scaleY) => {
    set((state) => {
      const updatedTemplates = state.templates.map((template) => {
        if (template.id === state.currentTemplateId) {
          return {
            ...template,
            elements: template.elements.map((element) => {
              if (element.id === id) {
                return {
                  ...element,
                  scale: {
                    x: scaleX,
                    y: scaleY
                  }
                };
              }
              return element;
            }),
          };
        }
        return template;
      });

      return {
        templates: updatedTemplates,
      };
    });

    get().saveToHistory();
  },

  updateElementBorderStyle: (id, borderStyle) => {
    set((state) => {
      const updatedTemplates = state.templates.map((template) => {
        if (template.id === state.currentTemplateId) {
          return {
            ...template,
            elements: template.elements.map((element) => {
              if (element.id === id) {
                return {
                  ...element,
                  style: {
                    ...element.style,
                    ...borderStyle,
                  },
                };
              }
              return element;
            }),
          };
        }
        return template;
      });

      return {
        templates: updatedTemplates,
      };
    });

    get().saveToHistory();
  },

  addTableRow: (tableElementId) => {
    set((state) => {
      const updatedTemplates = state.templates.map((template) => {
        if (template.id === state.currentTemplateId) {
          return {
            ...template,
            elements: template.elements.map((element) => {
              if (element.id === tableElementId && element.type === 'table') {
                const tableContent = element.content as any;
                const columnCount = tableContent.columns;

                const createCell = (): TableCell => ({
                  id: nanoid(),
                  content: '',
                  key: '',
                  style: {},
                });

                const newRow: TableRow = {
                  id: nanoid(),
                  cells: Array(columnCount).fill(0).map(() => createCell()),
                };

                return {
                  ...element,
                  content: {
                    ...tableContent,
                    rows: [...tableContent.rows, newRow],
                  },
                };
              }
              return element;
            }),
          };
        }
        return template;
      });

      return {
        templates: updatedTemplates,
      };
    });

    get().saveToHistory();
  },

  deleteTableRow: (tableElementId, rowId) => {
    set((state) => {
      const updatedTemplates = state.templates.map((template) => {
        if (template.id === state.currentTemplateId) {
          return {
            ...template,
            elements: template.elements.map((element) => {
              if (element.id === tableElementId && element.type === 'table') {
                const tableContent = element.content as any;

                // Ensure we don't delete the last row
                if (tableContent.rows.length <= 1) {
                  return element;
                }

                return {
                  ...element,
                  content: {
                    ...tableContent,
                    rows: tableContent.rows.filter((row: TableRow) => row.id !== rowId),
                  },
                };
              }
              return element;
            }),
          };
        }
        return template;
      });

      return {
        templates: updatedTemplates,
      };
    });

    get().saveToHistory();
  },

  addTableColumn: (tableElementId) => {
    set((state) => {
      const updatedTemplates = state.templates.map((template) => {
        if (template.id === state.currentTemplateId) {
          return {
            ...template,
            elements: template.elements.map((element) => {
              if (element.id === tableElementId && element.type === 'table') {
                const tableContent = element.content as any;

                return {
                  ...element,
                  content: {
                    ...tableContent,
                    columns: tableContent.columns + 1,
                    rows: tableContent.rows.map((row: TableRow) => ({
                      ...row,
                      cells: [
                        ...row.cells,
                        {
                          id: nanoid(),
                          content: '',
                          style: {},
                        },
                      ],
                    })),
                  },
                };
              }
              return element;
            }),
          };
        }
        return template;
      });

      return {
        templates: updatedTemplates,
      };
    });

    get().saveToHistory();
  },

  deleteTableColumn: (tableElementId, columnIndex) => {
    set((state) => {
      const updatedTemplates = state.templates.map((template) => {
        if (template.id === state.currentTemplateId) {
          return {
            ...template,
            elements: template.elements.map((element) => {
              if (element.id === tableElementId && element.type === 'table') {
                const tableContent = element.content as any;

                // Ensure we don't delete the last column
                if (tableContent.columns <= 1) {
                  return element;
                }

                return {
                  ...element,
                  content: {
                    ...tableContent,
                    columns: tableContent.columns - 1,
                    rows: tableContent.rows.map((row: TableRow) => ({
                      ...row,
                      cells: row.cells.filter((_, index) => index !== columnIndex),
                    })),
                  },
                };
              }
              return element;
            }),
          };
        }
        return template;
      });

      return {
        templates: updatedTemplates,
      };
    });

    get().saveToHistory();
  },

  updateTableCell: (tableElementId, rowId, cellId, content) => {
    set((state) => {
      const updatedTemplates = state.templates.map((template) => {
        if (template.id === state.currentTemplateId) {
          return {
            ...template,
            elements: template.elements.map((element) => {
              if (element.id === tableElementId && element.type === 'table') {
                const tableContent = element.content as any;

                return {
                  ...element,
                  content: {
                    ...tableContent,
                    rows: tableContent.rows.map((row: TableRow) => {
                      if (row.id === rowId) {
                        return {
                          ...row,
                          cells: row.cells.map((cell) => {
                            if (cell.id === cellId) {
                              return {
                                ...cell,
                                content,
                              };
                            }
                            return cell;
                          }),
                        };
                      }
                      return row;
                    }),
                  },
                };
              }
              return element;
            }),
          };
        }
        return template;
      });

      return {
        templates: updatedTemplates,
      };
    });

    get().saveToHistory();
  },

  updateTableCellKey: (tableElementId: string, rowId: string, cellId: string, key: string) => {
    set((state) => {
      const updatedTemplates = state.templates.map((template) => {
        if (template.id === state.currentTemplateId) {
          return {
            ...template,
            elements: template.elements.map((element) => {
              if (element.id === tableElementId && element.type === 'table') {
                const tableContent = element.content as any;
                return {
                  ...element,
                  content: {
                    ...tableContent,
                    rows: tableContent.rows.map((row: TableRow) => {
                      if (row.id === rowId) {
                        return {
                          ...row,
                          cells: row.cells.map((cell: TableCell) => {
                            if (cell.id === cellId) {
                              return {
                                ...cell,
                                key,
                              };
                            }
                            return cell;
                          }),
                        };
                      }
                      return row;
                    }),
                  },
                };
              }
              return element;
            }),
          };
        }
        return template;
      });

      return {
        templates: updatedTemplates,
      };
    });

    get().saveToHistory();
  },

  updateTableCellStyle: (tableElementId, rowId, cellId, style) => {
    set((state) => {
      const updatedTemplates = state.templates.map((template) => {
        if (template.id === state.currentTemplateId) {
          return {
            ...template,
            elements: template.elements.map((element) => {
              if (element.id === tableElementId && element.type === 'table') {
                const tableContent = element.content as any;

                return {
                  ...element,
                  content: {
                    ...tableContent,
                    rows: tableContent.rows.map((row: TableRow) => {
                      if (row.id === rowId) {
                        return {
                          ...row,
                          cells: row.cells.map((cell) => {
                            if (cell.id === cellId) {
                              return {
                                ...cell,
                                style: {
                                  ...cell.style,
                                  ...style,
                                },
                              };
                            }
                            return cell;
                          }),
                        };
                      }
                      return row;
                    }),
                  },
                };
              }
              return element;
            }),
          };
        }
        return template;
      });

      return {
        templates: updatedTemplates,
      };
    });

    get().saveToHistory();
  },

  updateTableBorderStyle: (tableElementId, style) => {
    set((state) => {
      const updatedTemplates = state.templates.map((template) => {
        if (template.id === state.currentTemplateId) {
          return {
            ...template,
            elements: template.elements.map((element) => {
              if (element.id === tableElementId && element.type === 'table') {
                const tableContent = element.content as any;

                return {
                  ...element,
                  content: {
                    ...tableContent,
                    rows: tableContent.rows.map((row: TableRow) => ({
                      ...row,
                      cells: row.cells.map((cell: TableCell) => ({
                        ...cell,
                        style: {
                          ...cell.style,
                          ...style,
                        },
                      })),
                    })),
                  },
                  style: {
                    ...element.style,
                    ...style,
                  },
                };
              }
              return element;
            }),
          };
        }
        return template;
      });

      return {
        templates: updatedTemplates,
      };
    });

    get().saveToHistory();
  },

  updateTableRowStyle: (tableElementId, rowId, style) => {
    set((state) => {
      const updatedTemplates = state.templates.map((template) => {
        if (template.id === state.currentTemplateId) {
          return {
            ...template,
            elements: template.elements.map((element) => {
              if (element.id === tableElementId && element.type === 'table') {
                const tableContent = element.content as any;

                return {
                  ...element,
                  content: {
                    ...tableContent,
                    rows: tableContent.rows.map((row: TableRow) => {
                      if (row.id === rowId) {
                        return {
                          ...row,
                          cells: row.cells.map((cell) => ({
                            ...cell,
                            style: {
                              ...cell.style,
                              ...style,
                            },
                          })),
                        };
                      }
                      return row;
                    }),
                  },
                };
              }
              return element;
            }),
          };
        }
        return template;
      });

      return {
        templates: updatedTemplates,
      };
    });

    get().saveToHistory();
  },

  updateTableColumnStyle: (tableElementId, columnIndex, style) => {
    set((state) => {
      const updatedTemplates = state.templates.map((template) => {
        if (template.id === state.currentTemplateId) {
          return {
            ...template,
            elements: template.elements.map((element) => {
              if (element.id === tableElementId && element.type === 'table') {
                const tableContent = element.content as any;

                return {
                  ...element,
                  content: {
                    ...tableContent,
                    rows: tableContent.rows.map((row: TableRow) => ({
                      ...row,
                      cells: row.cells.map((cell, index) => {
                        if (index === columnIndex) {
                          return {
                            ...cell,
                            style: {
                              ...cell.style,
                              ...style,
                            },
                          };
                        }
                        return cell;
                      }),
                    })),
                  },
                };
              }
              return element;
            }),
          };
        }
        return template;
      });

      return {
        templates: updatedTemplates,
      };
    });

    get().saveToHistory();
  },

  resizeTableColumn: (tableElementId, columnIndex, width) => {
    set((state) => {
      const updatedTemplates = state.templates.map((template) => {
        if (template.id === state.currentTemplateId) {
          return {
            ...template,
            elements: template.elements.map((element) => {
              if (element.id === tableElementId && element.type === 'table') {
                const tableContent = element.content as any;

                return {
                  ...element,
                  content: {
                    ...tableContent,
                    rows: tableContent.rows.map((row: TableRow) => ({
                      ...row,
                      cells: row.cells.map((cell, index) => {
                        if (index === columnIndex) {
                          return {
                            ...cell,
                            style: {
                              ...cell.style,
                              width: `${width}px`,
                            },
                          };
                        }
                        return cell;
                      }),
                    })),
                  },
                };
              }
              return element;
            }),
          };
        }
        return template;
      });

      return {
        templates: updatedTemplates,
      };
    });

    get().saveToHistory();
  },

  resizeTableRow: (tableElementId, rowIndex, height) => {
    set((state) => {
      const updatedTemplates = state.templates.map((template) => {
        if (template.id === state.currentTemplateId) {
          return {
            ...template,
            elements: template.elements.map((element) => {
              if (element.id === tableElementId && element.type === 'table') {
                const tableContent = element.content as any;

                return {
                  ...element,
                  content: {
                    ...tableContent,
                    rows: tableContent.rows.map((row: TableRow, index: number) => {
                      if (index === rowIndex) {
                        return {
                          ...row,
                          style: {
                            height: `${height}px`,
                          },
                        };
                      }
                      return row;
                    }),
                  },
                };
              }
              return element;
            }),
          };
        }
        return template;
      });

      return {
        templates: updatedTemplates,
      };
    });

    get().saveToHistory();
  },
  updateTableFontWeight: (tableElementId, fontWeight) => {
    set((state) => {
      const updatedTemplates = state.templates.map((template) => {
        if (template.id === state.currentTemplateId) {
          return {
            ...template,
            elements: template.elements.map((element) => {
              if (element.id === tableElementId && element.type === 'table') {
                const tableContent = element.content as any;
                return {
                  ...element,
                  content: {
                    ...tableContent,
                    rows: tableContent.rows.map((row: TableRow) => ({
                      ...row,
                      cells: row.cells.map((cell: TableCell) => ({
                        ...cell,
                        style: {
                          ...cell.style,
                          fontWeight,
                        },
                      })),
                    })),
                  },
                };
              }
              return element;
            }),
          };
        }
        return template;
      });

      return {
        templates: updatedTemplates,
      };
    });

    get().saveToHistory();
  },
  updateTableCharSpacing: (tableElementId, charSpacing) => {
    set((state) => {
      const updatedTemplates = state.templates.map((template) => {
        if (template.id === state.currentTemplateId) {
          return {
            ...template,
            elements: template.elements.map((element) => {
              if (element.id === tableElementId && element.type === 'table') {
                const tableContent = element.content as any;
                return {
                  ...element,
                  content: {
                    ...tableContent,
                    rows: tableContent.rows.map((row: TableRow) => ({
                      ...row,
                      cells: row.cells.map((cell: TableCell) => ({
                        ...cell,
                        style: {
                          ...cell.style,
                          letterSpacing: charSpacing,
                        },
                      })),
                    })),
                  },
                };
              }
              return element;
            }),
          };
        }
        return template;
      });

      return {
        templates: updatedTemplates,
      };
    });

    get().saveToHistory();
  },
  updateTableRowFontWeight: (tableElementId, rowId, fontWeight) => {
    set((state) => {
      const updatedTemplates = state.templates.map((template) => {
        if (template.id === state.currentTemplateId) {
          return {
            ...template,
            elements: template.elements.map((element) => {
              if (element.id === tableElementId && element.type === 'table') {
                const tableContent = element.content as any;
                return {
                  ...element,
                  content: {
                    ...tableContent,
                    rows: tableContent.rows.map((row: TableRow) => {
                      if (row.id === rowId) {
                        return {
                          ...row,
                          cells: row.cells.map((cell: TableCell) => ({
                            ...cell,
                            style: {
                              ...cell.style,
                              fontWeight,
                            },
                          })),
                        };
                      }
                      return row;
                    }),
                  },
                };
              }
              return element;
            }),
          };
        }
        return template;
      });

      return {
        templates: updatedTemplates,
      };
    });

    get().saveToHistory();
  },
  updateTableRowCharSpacing: (tableElementId, rowId, charSpacing) => {
    set((state) => {
      const updatedTemplates = state.templates.map((template) => {
        if (template.id === state.currentTemplateId) {
          return {
            ...template,
            elements: template.elements.map((element) => {
              if (element.id === tableElementId && element.type === 'table') {
                const tableContent = element.content as any;
                return {
                  ...element,
                  content: {
                    ...tableContent,
                    rows: tableContent.rows.map((row: TableRow) => {
                      if (row.id === rowId) {
                        return {
                          ...row,
                          cells: row.cells.map((cell: TableCell) => ({
                            ...cell,
                            style: {
                              ...cell.style,
                              letterSpacing: charSpacing,
                            },
                          })),
                        };
                      }
                      return row;
                    }),
                  },
                };
              }
              return element;
            }),
          };
        }
        return template;
      });

      return {
        templates: updatedTemplates,
      };
    });

    get().saveToHistory();
  },
  updateTableColumnFontWeight: (tableElementId, columnIndex, fontWeight) => {
    set((state) => {
      const updatedTemplates = state.templates.map((template) => {
        if (template.id === state.currentTemplateId) {
          return {
            ...template,
            elements: template.elements.map((element) => {
              if (element.id === tableElementId && element.type === 'table') {
                const tableContent = element.content as any;
                return {
                  ...element,
                  content: {
                    ...tableContent,
                    rows: tableContent.rows.map((row: TableRow) => ({
                      ...row,
                      cells: row.cells.map((cell: TableCell, index: number) => {
                        if (index === columnIndex) {
                          return {
                            ...cell,
                            style: {
                              ...cell.style,
                              fontWeight,
                            },
                          };
                        }
                        return cell;
                      }),
                    })),
                  },
                };
              }
              return element;
            }),
          };
        }
        return template;
      });

      return {
        templates: updatedTemplates,
      };
    });

    get().saveToHistory();
  },
  updateTableColumnCharSpacing: (tableElementId, columnIndex, charSpacing) => {
    set((state) => {
      const updatedTemplates = state.templates.map((template) => {
        if (template.id === state.currentTemplateId) {
          return {
            ...template,
            elements: template.elements.map((element) => {
              if (element.id === tableElementId && element.type === 'table') {
                const tableContent = element.content as any;
                return {
                  ...element,
                  content: {
                    ...tableContent,
                    rows: tableContent.rows.map((row: TableRow) => ({
                      ...row,
                      cells: row.cells.map((cell: TableCell, index: number) => {
                        if (index === columnIndex) {
                          return {
                            ...cell,
                            style: {
                              ...cell.style,
                              letterSpacing: charSpacing,
                            },
                          };
                        }
                        return cell;
                      }),
                    })),
                  },
                };
              }
              return element;
            }),
          };
        }
        return template;
      });

      return {
        templates: updatedTemplates,
      };
    });

    get().saveToHistory();
  },
  saveToHistory: () => {
    const currentTemplate = get().getCurrentTemplate();
    if (!currentTemplate) return;

    set((state) => {
      // Get current history up to the current index
      const newHistory = state.history.slice(0, state.historyIndex + 1);

      // Add current state to history
      newHistory.push(JSON.parse(JSON.stringify(state.templates)));

      // Limit history size (optional)
      const maxHistorySize = 50;
      if (newHistory.length > maxHistorySize) {
        newHistory.shift();
      }

      return {
        history: newHistory,
        historyIndex: newHistory.length - 1,
      };
    });
    console.log(currentTemplate)
  },

  undo: () => {
    set((state) => {
      if (state.historyIndex <= 0) return state;

      const newIndex = state.historyIndex - 1;
      const previousState = state.history[newIndex];

      if (!previousState) return state;

      return {
        templates: JSON.parse(JSON.stringify(previousState)),
        historyIndex: newIndex,
      };
    });
  },

  redo: () => {
    set((state) => {
      if (state.historyIndex >= state.history.length - 1) return state;

      const newIndex = state.historyIndex + 1;
      const nextState = state.history[newIndex];

      if (!nextState) return state;

      return {
        templates: JSON.parse(JSON.stringify(nextState)),
        historyIndex: newIndex,
      };
    });
  },

  setZoomLevel: (level) => {
    set({ zoomLevel: level });
  },

  zoomIn: () => {
    set((state) => ({
      zoomLevel: Math.min(state.zoomLevel + 0.1, 2)
    }));
  },

  zoomOut: () => {
    set((state) => ({
      zoomLevel: Math.max(state.zoomLevel - 0.1, 0.5)
    }));
  },

  resetZoom: () => {
    set({ zoomLevel: 1 });
  },

  getCurrentTemplate: () => {
    const { templates, currentTemplateId } = get();
    return templates.find((template) => template.id === currentTemplateId) || null;
  },

  getSelectedElement: () => {
    const currentTemplate = get().getCurrentTemplate();
    const { selectedElementId } = get();

    if (!currentTemplate || !selectedElementId) return null;

    return currentTemplate.elements.find((element) => element.id === selectedElementId) || null;
  },

  duplicateElement: (id) => {
    set((state) => {
      const updatedTemplates = state.templates.map((template) => {
        if (template.id === state.currentTemplateId) {
          const elementToDuplicate = template.elements.find((element) => element.id === id);
          if (!elementToDuplicate) return template;

          const duplicatedElement = {
            ...elementToDuplicate,
            id: nanoid(),
            position: {
              x: elementToDuplicate.position.x + 10, // Offset the duplicated element
              y: elementToDuplicate.position.y + 10,
            },
            zIndex: template.elements.length,
          };

          return {
            ...template,
            elements: [...template.elements, duplicatedElement],
          };
        }
        return template;
      });

      return {
        templates: updatedTemplates,
      };
    });

    get().saveToHistory();
  },

  setGridControle: (data) => {
    set({
      gridControle
        : data
    })
    get().saveToHistory();
  },

  setLayoutControle: (data) => {
    set({
      layoutControle
        : data
    })
    get().saveToHistory();
  },
  preview: (data: any[]) => {
    const currentTemplate = get().getCurrentTemplate();
    const updatedTemplate =get().previewGenerator(currentTemplate, data)
    const resume = table(updatedTemplate, 'tableResume')
    const main = table(updatedTemplate, 'mainTable')
    let b;
    let a;
    let c;
    if (updatedTemplate && resume && main) {
      c = main.position.y
      a = resume.content.rows
      const style = main.content.rows[0].style
      b = parseInt((style ? style.height : '30px').slice(0, -2)) * data.length
      const temp = updatedTemplate
      const index = findIndexByKey(temp.elements, 'tableResume')
      temp.elements[index].position.y = b + c + data.length
      return temp
    } else {
      return updatedTemplate
    }
  },
  previewGenerator: (template: any, data: any) => {
    // Deep clone the template to avoid mutating the original
    const updatedTemplate = JSON.parse(JSON.stringify(template));

    // Find the dynamic table element
    const tableElement = updatedTemplate.elements.find(
      (el: any) => el.type === 'table' && el.status === 'dynamic' && el.key === 'mainTable'
    );

    if (!tableElement) return updatedTemplate; // Return original template if no table found

    const tableContent = tableElement.content;

    // Ensure there are at least two rows (header and style reference)
    if (tableContent.rows.length < 2) {
      return updatedTemplate; // Not enough rows for header and style reference
    }

    const headerRow = tableContent.rows[0];
    const styleReferenceRow = tableContent.rows[1];

    // Extract keys from header cells
    const keys = headerRow.cells.map((cell: any) => cell.key);

    // Generate new rows from data
    const newRows = data.map((dataObj: any) => {
      const newCells = keys.map((key: any, index: any) => {
        const styleCell = styleReferenceRow.cells[index];
        return {
          id: nanoid(), // Generate a new unique ID for each cell
          content: dataObj[key] !== undefined ? dataObj[key] : '', // Use empty string if key not found
          key: null, // Set key to null as per style reference
          style: { ...styleCell.style } // Copy style from style reference
        };
      });
      return {
        id: nanoid(),  // Generate a new unique ID for the row
        cells: newCells
      };
    });

    // Replace the rows in the table content: keep header, add new rows
    tableContent.rows = [headerRow, ...newRows];
    return updatedTemplate;
  },
}));
function table(obg: any, key: string | 'mainTable' | 'tableResume') {
  return obg.elements.find(
    (el: any) => el.type === 'table' && el.status === 'dynamic' && el.key === key)
}
function findIndexByKey(arr: any, targetKey: any) {
  return arr.findIndex((obj: any) => obj.key === targetKey);
}
export default useEditorStore;