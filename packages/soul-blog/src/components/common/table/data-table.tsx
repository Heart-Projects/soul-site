"use client";

import {
  ColumnDef,
  flexRender,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { Columns4 } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { use, useMemo, useRef, useState } from "react";
import DataTablePagination from "./data-table-pagination";
import PagePaginationOptions from "./page-pagination-options";
import { el } from "@faker-js/faker";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  totalCount?: number;
  pageSizeOptions?: number[];
  pageSize?: number;
  pageIndex?: number;
  clientFilterColumns?: string[];
  mode: "client" | "server";
  onChangePageIndex?: (index: number) => void;
  onChangePageSize?: (index: number) => void;
  onSearch?: (search: string, pageIndex: number, pageSize: number) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  totalCount = 0,
  pageSizeOptions = [10, 20, 30, 40, 50],
  pageSize = 10,
  pageIndex = 0,
  mode = "client",
  clientFilterColumns = [],
  onChangePageIndex,
  onChangePageSize,
  onSearch,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [innerPageIndex, setInnerPageIndex] = useState(pageIndex);
  const [innerPageSize, setInnerPageSize] = useState(pageSize);
  const search = useRef("");
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    manualPagination: mode === "server",
    enableGlobalFilter: mode === "client",
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: {
        pageSize: innerPageSize,
        pageIndex: innerPageIndex,
      },
    },
    globalFilterFn: "includesString",
    rowCount: mode === "client" ? data.length : totalCount,
  });

  const onDoChangePageIndex = (index: number) => {
    if (mode === "server") {
      onChangePageIndex?.(index);
    }
    console.log(index);
    setInnerPageIndex(index);
  };
  const onDoChangePageSize = (pageSize: number) => {
    if (mode === "server") {
      onChangePageSize?.(pageSize);
    }
    setInnerPageSize(pageSize);
    const totalPages = Math.ceil(table.getRowCount() / pageSize);
    console.log(totalPages);
    if (innerPageIndex > totalPages - 1) {
      setInnerPageIndex(totalPages - 1);
    }
  };
  const onDoSearch = () => {
    if (mode === "server") {
      onSearch?.(search.current, innerPageIndex, innerPageSize);
      return;
    }
    table.setGlobalFilter(search.current);
  };
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <div></div>
        <div className="flex gap-2 float-end">
          <Input
            placeholder="Search"
            onChange={(event) => (search.current = event.target.value)}
          />
          <Button variant="default" onClick={onDoSearch}>
            搜索
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <span className="flex justify-center items-center p-1 cursor-pointer">
                <Columns4 />
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex justify-end gap-1">
          <PagePaginationOptions
            defaultValue={innerPageSize}
            options={pageSizeOptions}
            onValueChange={(value) => onDoChangePageSize(value)}
          ></PagePaginationOptions>
          <DataTablePagination
            totalPage={table.getPageCount()}
            pageIndex={table.getState().pagination.pageIndex}
            onChangePageIndex={onDoChangePageIndex}
          ></DataTablePagination>
        </div>
      </div>
    </div>
  );
}
