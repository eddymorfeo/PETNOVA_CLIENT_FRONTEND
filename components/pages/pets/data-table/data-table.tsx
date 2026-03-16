"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filterKey?: string;
  filterPlaceholder?: string;
  onRowClick?: (row: TData) => void;
};

function getRangeLabel(pageIndex: number, pageSize: number, total: number) {
  if (total === 0) return "0 de 0";

  const start = pageIndex * pageSize + 1;
  const end = Math.min(start + pageSize - 1, total);

  return `${start}-${end} de ${total}`;
}

function hasColumnId<TData, TValue>(
  columns: ColumnDef<TData, TValue>[],
  id: string,
): boolean {
  return columns.some(
    (column: any) => column?.id === id || column?.accessorKey === id,
  );
}

export function DataTable<TData, TValue>({
  columns,
  data,
  filterKey = "name",
  filterPlaceholder = "Buscar...",
  onRowClick,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>(() => {
    return hasColumnId(columns, "name") ? [{ id: "name", desc: false }] : [];
  });

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

  React.useEffect(() => {
    if (!sorting.length) return;

    const validIds = new Set(
      columns.map((column: any) => column?.id ?? column?.accessorKey).filter(Boolean),
    );

    const nextSorting = sorting.filter((sort) => validIds.has(sort.id));

    if (nextSorting.length !== sorting.length) {
      setSorting(nextSorting);
    }
  }, [columns, sorting]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 8,
      },
    },
  });

  const filterColumn = table.getColumn(filterKey);
  const filteredTotal = table.getFilteredRowModel().rows.length;
  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;
  const rangeLabel = getRangeLabel(pageIndex, pageSize, filteredTotal);

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="space-y-4"
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full max-w-md">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder={filterPlaceholder}
            value={(filterColumn?.getFilterValue() as string) ?? ""}
            onChange={(event) => filterColumn?.setFilterValue(event.target.value)}
            className="h-11 rounded-2xl border-slate-200 bg-slate-50 pl-11 text-sm text-slate-700 shadow-none transition placeholder:text-slate-400 focus:bg-white focus-visible:ring-2 focus-visible:ring-cyan-500"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="border-b border-slate-200 bg-slate-50 hover:bg-slate-50"
                >
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="h-12 px-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className={[
                      "border-b border-slate-100 transition-colors",
                      "hover:bg-slate-50/70",
                      onRowClick ? "cursor-pointer" : "",
                    ].join(" ")}
                    onClick={() => onRowClick?.(row.original)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="px-4 py-4 align-middle text-sm text-slate-700"
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow className="hover:bg-transparent">
                  <TableCell
                    colSpan={columns.length}
                    className="h-32 text-center"
                  >
                    <div className="flex flex-col items-center justify-center gap-2 text-slate-500">
                      <p className="text-sm font-medium text-slate-700">
                        Sin resultados
                      </p>
                      <p className="text-xs text-slate-500">
                        No se encontraron registros con el filtro aplicado.
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex flex-col gap-3 border-t border-slate-200 bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
            Mostrando{" "}
            <span className="font-semibold text-slate-800">{rangeLabel}</span>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="h-10 rounded-xl border-slate-200 bg-white px-3 text-slate-600 hover:bg-slate-50 disabled:opacity-50"
            >
              <ChevronLeft className="mr-1 size-4" />
              Anterior
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="h-10 rounded-xl border-slate-200 bg-white px-3 text-slate-600 hover:bg-slate-50 disabled:opacity-50"
            >
              Siguiente
              <ChevronRight className="ml-1 size-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}