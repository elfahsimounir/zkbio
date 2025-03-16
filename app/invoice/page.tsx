"use client";

import React, { useEffect, useState } from 'react';
import Breadcrumbs from "@/components/Breadcrumbs";
import { useNotification } from "@/utils/notificationContext";
import { Button } from "@/components/ui/button";
import { Employee } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTable } from "@/components/DataTable";
import Modal from "@/components/FormModal";
import { z } from "zod";
import { defaultTemplates } from "@/store/defaultTemplates";
import { InvoiceTemplate } from "@/types/Invoice";
import TemplatePreview from "@/components/editor/components/CanvasPreview";
import TableCellKeyUpdater from "@/components/editor/components/TableCellKeyUpdater";
import useEditorStore from "@/store/useEditorStore";
import FormModal from '@/components/FormModal';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@radix-ui/react-dialog';
import { DialogHeader } from '@/components/ui/dialog';
import { generateInvoicePdf } from '@/store/convertor';
import Input from '@/components/editor/components/ui/Input';
import TemplateSelector from '@/components/editor/components/TemplateSelector';


type Invoice = {
  ref: string;
  designation: string;
  qte: number;
  unite: string;
  prixBrut: number;
  rem: number;
  total: number;
};

const columns: ColumnDef<Invoice>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "ref",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Ref
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div className="lowercase">{row.getValue("ref")}</div>,
  },
  {
    accessorKey: "designation",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Designation
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div className="lowercase">{row.getValue("designation")}</div>,
  },
  {
    accessorKey: "qte",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        QTE
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div className="lowercase">{row.getValue("qte")}</div>,
  },
  {
    accessorKey: "unite",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Unite
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div className="lowercase">{row.getValue("unite")}</div>,
  },
  {
    accessorKey: "prixBrut",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Prix Brut
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div className="lowercase">{row.getValue("prixBrut")}</div>,
  },
  {
    accessorKey: "rem",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Rem%
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div className="lowercase">{row.getValue("rem")}</div>,
  },
  {
    accessorKey: "total",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Total
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div className="lowercase">{row.getValue("total")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const invoice = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(invoice.ref)}
            >
              Copy invoice ref
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];


// Define the type for the form data
type FormData = {
  firstName: string;
  lastName: string;
  workTime: string;
  status: string;
  email: string;
  subscribe: boolean;
};

// Define the type for the form configuration
type FormFieldConfig = {
  name: keyof Invoice; // Ensure name is a key of FormData
  label: string;
  type: "text" | "email" | "select" | "boolean";
  placeholder?: string;
  options?: string[];
  validation?: any; // You can define a more specific type for validation if needed
};

// Define the configuration for the form fields
const formConfig: FormFieldConfig[] = [
  {
    name: "ref",
    label: "Ref",
    type: "text",
    placeholder: "Enter ref",
    validation: { required: true, minLength: 3 },
  },
  {
    name: "designation",
    label: "Designation",
    type: "text",
    placeholder: "Enter designation",
    validation: { required: true, minLength: 3 },
  },
  {
    name: "qte",
    label: "Qte",
    type: "text",
    placeholder: "Enter QTE",
    validation: { required: true, minLength: 3 },
  },
  {
    name: "unite",
    label: "Unite",
    type: "text",
    placeholder: "Enter unite",
    validation: { required: true, minLength: 3 },
  },
  {
    name: "prixBrut",
    label: "Prix brut",
    type: "text",
    placeholder: "Enter text",
    validation: { required: true, minLength: 3 },
  },
  {
    name: "rem",
    label: "Rem %",
    type: "text",
    placeholder: "Enter rem %",
    validation: { required: true, minLength: 3 },
  },
  {
    name: "total",
    label: " Total",
    type: "text",
    placeholder: "Enter total",
    validation: { required: true, minLength: 3 },
  },
];
const zod = {
  ref: z.string().min(3),
  designation: z.string().min(3),
  QTE: z.string().min(3),
  unite: z.string().min(3),
  prixBrut: z.string().min(3),
  rem: z.string().min(3),
  total: z.string().min(3),
}
function createId(): string {
  // Implement your unique ID generation logic here
  return Math.random().toString(36).substr(2, 9);
}



// Helper function to generate a unique ID
function generateUniqueId() {
  return Math.random().toString(36).substr(2, 9); // Simple unique ID generator
}

export default function invoicePage() {
  const { showNotification, showConfirmation } = useNotification();
  const [openModal, setOpenModal] = useState(false);
  const [defaultValues, setDefaultValues] = useState<Partial<Employee>>({}); // Use Partial to allow for optional fields
  const { getCurrentTemplate, preview } = useEditorStore();

  const currentTemplate: InvoiceTemplate | any = getCurrentTemplate();
  const showModal = () => {
    setOpenModal(!openModal);
  };

  const onDelete = (items: any[]) => {
    showConfirmation(
      "Are you sure you want to delete this employee?",
      () => {
        showNotification("Employee deleted successfully", "success");
        console.log(items)
      },
      () => console.log("Cancelled")
    )
  }
  const onEdite = (items: any) => {
    console.log(items)
    setDefaultValues(items)
    showModal()
  }
  const onSubmit = (data: any) => {
    console.log(data);
    setDefaultValues({})
  }




  // input data
  const invoices: Invoice[] = Array.from({ length: 15 }, (_, i) => ({
    id: `${i + 1}`,
    ref: `INV-${i + 1}`,
    designation: `Item ${i + 1}`,
    qte: 2 * (i + 1),
    unite: "pcs",
    prixBrut: 500 + i,
    rem: 1 / 10,
    total: 700 + i,
  }));

  return (
    <div className='relative'>
      <Breadcrumbs link={"invoice"} title="Invoice" />
      <FormModal
        zObject={zod}
        defaultValues={defaultValues}
        formConfig={formConfig}
        showModal={showModal}
        onSubmit={onSubmit}
        display={openModal}
      />
      <button
        onClick={() => {
          generateInvoicePdf(currentTemplate, {
            mainTable: [...invoices],
            invoiceDetails: {
              clientName: "John Doe",
              clientAddress: "123 Main St",
              clientEmail: "Comany@email.",
              clientPhone: "123-456-7890",
              clientVat: "123456789",
              subTotal: 1000,
              tax: 50,
              total: 1050
            }
          })
        }}
      >
        dwonload
      </button>
      <div className="flex gap-2">
        <div className='w-full relative border shadow-inner bg-neutral-200 rounded-md'>
          <TemplateSelector data={invoices} style={'x'} />
        </div>
      </div>
      <DataTable
        filterKey="designation"
        columns={columns}
        data={invoices}
        onDelete={onDelete}
        onEdite={onEdite}
        openModal={showModal}
      />
    </div>
  );
}