"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ArrowUpDown,
} from "lucide-react";

interface Column<T> {
  key: string;
  header: string;
  cell?: (row: T) => React.ReactNode;
  sortable?: boolean;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (row: T) => string;
  isLoading?: boolean;
  pageSize?: number;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  onSort?: (key: string) => void;
  sortKey?: string;
  sortOrder?: "asc" | "desc";
  emptyMessage?: string;
  className?: string;
}

export function DataTable<T>({
  data,
  columns,
  keyExtractor,
  isLoading = false,
  pageSize = 10,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  onSort,
  sortKey,
  sortOrder,
  emptyMessage = "No data found",
  className,
}: DataTableProps<T>) {
  return (
    <div className={cn("space-y-4", className)} suppressHydrationWarning>
      <div className="rounded-xl border border-slate-700 overflow-hidden" suppressHydrationWarning>
        <table className="w-full">
          <thead className="bg-slate-800/70">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={cn(
                    "px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400",
                    column.sortable && "cursor-pointer hover:text-white",
                    column.className
                  )}
                  onClick={() => column.sortable && onSort?.(column.key)}
                >
                  <div className="flex items-center gap-2" suppressHydrationWarning>
                    {column.header}
                    {column.sortable && (
                      <ArrowUpDown
                        className={cn(
                          "h-4 w-4",
                          sortKey === column.key
                            ? "text-indigo-400"
                            : "text-gray-500"
                        )}
                      />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: pageSize }).map((_, i) => (
                <tr key={i} className="border-b border-slate-700">
                  {columns.map((column) => (
                    <td key={column.key} className="px-4 py-4">
                      <div className="h-4 bg-slate-700 rounded animate-pulse" suppressHydrationWarning />
                    </td>
                  ))}
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-12 text-center text-gray-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr
                  key={keyExtractor(row)}
                  className="border-b border-slate-700 transition-colors hover:bg-slate-800/50"
                >
                  {columns.map((column) => (
                    <td key={column.key} className="px-4 py-4 text-sm text-gray-300">
                      {column.cell ? column.cell(row) : String((row as Record<string, unknown>)[column.key] ?? "")}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Page {currentPage} of {totalPages}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => onPageChange?.(1)}
              disabled={currentPage === 1}
              className="h-9 w-9 border-slate-600 text-gray-300 hover:bg-slate-800"
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => onPageChange?.(currentPage - 1)}
              disabled={currentPage === 1}
              className="h-9 w-9 border-slate-600 text-gray-300 hover:bg-slate-800"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => onPageChange?.(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="h-9 w-9 border-slate-600 text-gray-300 hover:bg-slate-800"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => onPageChange?.(totalPages)}
              disabled={currentPage === totalPages}
              className="h-9 w-9 border-slate-600 text-gray-300 hover:bg-slate-800"
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
