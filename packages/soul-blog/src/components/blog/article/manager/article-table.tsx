"use client";

import { DataTable } from "@/components/common/table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const columns: ColumnDef<Payment, any>[] = [
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
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = (row.getValue("status") || "") as string;
      return (
        <div className="flex items-center gap-x-2">
          <div className="h-2 w-2 rounded-full bg-sky-500" />
          <span>{status}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
];

const getData = (): Payment[] => {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "128ed52f",
      amount: 10,
      status: "success",
      email: "m@example.com",
    },
    {
      id: "9998ed52f",
      amount: 900,
      status: "failed",
      email: "kkk@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "128ed52f",
      amount: 10,
      status: "success",
      email: "m@example.com",
    },
    {
      id: "9998ed52f",
      amount: 900,
      status: "failed",
      email: "kkk@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "128ed52f",
      amount: 10,
      status: "success",
      email: "m@example.com",
    },
    {
      id: "9998ed52f",
      amount: 900,
      status: "failed",
      email: "kkk@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "128ed52f",
      amount: 10,
      status: "success",
      email: "m@example.com",
    },
    {
      id: "9998ed52f",
      amount: 900,
      status: "failed",
      email: "kkk@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "128ed52f",
      amount: 10,
      status: "success",
      email: "m@example.com",
    },
    {
      id: "9998ed52f",
      amount: 900,
      status: "failed",
      email: "kkk@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "128ed52f",
      amount: 10,
      status: "success",
      email: "m@example.com",
    },
    {
      id: "9998ed52f",
      amount: 900,
      status: "failed",
      email: "kkk@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "128ed52f",
      amount: 10,
      status: "success",
      email: "m@example.com",
    },
    {
      id: "9998ed52f",
      amount: 900,
      status: "failed",
      email: "kkk@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "128ed52f",
      amount: 10,
      status: "success",
      email: "m@example.com",
    },
    {
      id: "9998ed52f",
      amount: 900,
      status: "failed",
      email: "kkk@example.com",
    },
  ];
};

const ArticleTable = () => {
  const data = getData();
  return (
    <div>
      <DataTable columns={columns} data={data} autoPagination />
    </div>
  );
};

export default ArticleTable;
