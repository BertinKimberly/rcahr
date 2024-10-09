"use client";
import { useState } from "react";
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({ columns, data = [] }: DataTableProps<TData, TValue>) {
  
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [pageIndex, setPageIndex] = useState(0);

  // Initialize the table with pagination
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: { pagination: { pageIndex, pageSize: rowsPerPage } },
    onPaginationChange: (updater) => {
      if (typeof updater === "function") {
        const newPagination = updater(table.getState().pagination);
        setPageIndex(newPagination.pageIndex);
        setRowsPerPage(newPagination.pageSize);
      }
    },
  });

  // Calculate total pages based on data length and rows per page
  const totalPages = Math.ceil(data.length / rowsPerPage);

  return (
    <div>
      <div className="rounded border-[0.5px] text-slate-600">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="whitespace-nowrap text-main bg-input">
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel()?.rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => table.previousPage()}
                // disabled={!table.getCanPreviousPage()}
              />
            </PaginationItem>

            {/* Render page numbers */}
            {[...Array(totalPages)].map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  href="#"
                  className={i === pageIndex ? "font-bold" : ""}
                  onClick={() => setPageIndex(i)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            {/* Ellipsis if too many pages */}
            {totalPages > 5 && <PaginationEllipsis />}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => table.nextPage()}
                // disabled={!table.getCanNextPage()}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      {/* Rows per page selector */}
      <div className="flex justify-center space-x-2 py-2 items-center">
        <label htmlFor="rows-per-page" className="text-sm">Rows per page:</label>
        <select
          id="rows-per-page"
          className="border rounded-md p-1 outline-none"
          value={rowsPerPage}
          onChange={(e) => setRowsPerPage(Number(e.target.value))}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>
    </div>
  );
}
