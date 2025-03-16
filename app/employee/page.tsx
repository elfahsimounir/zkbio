"use client";

import Breadcrumbs from "@/components/Breadcrumbs";
import { useNotification } from "@/utils/notificationContext";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Employee } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {ColumnDef} from "@tanstack/react-table"
import { ArrowUpDown,MoreHorizontal} from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTable } from "@/components/DataTable";
import Modal from "@/components/FormModal";
import { data } from "@/b";
import { z } from "zod";

const columns: ColumnDef<Employee>[] = [
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
    accessorKey: "firstName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          First Name
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("firstName")}</div>,
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
         Last name
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("lastName")}</div>,
  },
  {
    accessorKey: "workTime",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
         Enter Time
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("workTime")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  // {
  //   accessorKey: "amount",
  //   header: () => <div className="text-right">Amount</div>,
  //   cell: ({ row }) => {
  //     const amount = parseFloat(row.getValue("amount"))

  //     // Format the amount as a dollar amount
  //     const formatted = new Intl.NumberFormat("en-US", {
  //       style: "currency",
  //       currency: "USD",
  //     }).format(amount)

  //     return <div className="text-right font-medium">{formatted}</div>
  //   },
  // },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

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
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
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
  name: keyof FormData; // Ensure name is a key of FormData
  label: string;
  type: "text" | "email" | "select" | "boolean";
  placeholder?: string;
  options?: string[];
  validation?: any; // You can define a more specific type for validation if needed
};

// Define the configuration for the form fields
const formConfig: FormFieldConfig[] = [
  {
      name: "firstName",
      label: "First Name",
      type: "text",
      placeholder: "Enter first name",
      validation: { required: true, minLength: 3 },
  },
  {
      name: "lastName",
      label: "Last Name",
      type: "text",
      placeholder: "Enter last name",
      validation: { required: true, minLength: 3 },
  },
  {
      name: "workTime",
      label: "Work Time",
      type: "text",
      placeholder: "Enter work time",
      validation: { required: true, minLength: 3 },
  },
  {
      name: "status",
      label: "Status",
      type: "select",
      options: ["success", "processing", "failed", "pending"],
  },
  {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter email",
      validation: { required: true, pattern: /^[^@]+@[^@]+\.[^@]+$/ },
  },
];
const zod={
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  workTime: z.string().min(3),
  status: z.string(),
  email: z.string().email(),
}

export default function EmployeePage() {
  const { showNotification, showConfirmation } = useNotification();
  const [openModal, setOpenModal] = useState(false);
  const [defaultValues, setDefaultValues] = useState<Partial<Employee>>({}); // Use Partial to allow for optional fields
  const showModal = () => {
    setOpenModal(!openModal);
  };
 
  const onDelete = (items:any[])=>{
    showConfirmation(
      "Are you sure you want to delete this employee?",
      () => {
        showNotification("Employee deleted successfully","success");
        console.log(items)
      },
      () => console.log("Cancelled")
    )
  }
  useEffect(()=>{
    
  },[])
const onEdite = (items:any)=>{
console.log(items)
setDefaultValues(items)
 showModal()
}
const onSubmit = (data:any)=>{
  console.log(data);
  setDefaultValues({})
  }

  
  return (
    <div>
      <Breadcrumbs link={"employee"} title="Employee" />
      <Modal
      zObject={zod}
      defaultValues={defaultValues}
      formConfig={formConfig}
      showModal={showModal}
      onSubmit={onSubmit}
       display={openModal}
       />
      <DataTable
        filterKey="firstName"
        columns={columns}
        data={data}
        onDelete={onDelete}
        onEdite={onEdite}
        openModal={showModal}
      />
    </div>
  );
}
