

import { IconButton } from "@/components/atoms";
import { Card } from "@/components/organisms";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import {
  ArrowDownUp,
  ArrowDownWideNarrow,
  ArrowUpNarrowWide,
} from "lucide-react";



type DataGridProps<TData> = {
  data: TData[];
  columns: ColumnDef<TData>[];
  handleRowClick: (id: string) => void;
  handleDelete: (id: string) => void;
  handleEdit: (id: string) => void;
  emptyMessage?: string;
};

export function DataGrid<TData>({ 
  data, 
  columns, 
  handleRowClick, 
  emptyMessage = "No data found."
}: DataGridProps<TData>) {

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <Card shadow="sm" className="overflow-hidden">
      <div className="max-h-[60vh] overflow-y-auto">
        {data.length === 0 ? (
          <div className="p-8 text-center text-card-foreground">
            {emptyMessage}
          </div>
        ) : (
          <table className="w-full table-fixed border-collapse">
            <thead className="bg-card sticky top-0 z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className={`px-4 py-5 text-left text-sm font-semibold text-card-foreground ${
                        header.id === "images" ? "hidden xl:table-cell" : ""
                      }`}
                    >
                      <div className="flex items-center gap-1">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getCanSort() && (
                          <IconButton
                            name="sort-item"
                            variant="plain"
                            color="primary"
                            icon={<ArrowDownUp size={17} />}
                            size="xs"
                            onClick={header.column.getToggleSortingHandler()}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                header.column.getToggleSortingHandler()?.(e);
                              }
                            }}
                          />
                        )}
                        {header.column.getIsSorted() === "asc" ? (
                          <ArrowUpNarrowWide
                            className="text-foreground"
                            size={17}
                          />
                        ) : header.column.getIsSorted() === "desc" ? (
                          <ArrowDownWideNarrow
                            className="text-foreground"
                            size={17}
                          />
                        ) : null}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody className="divide-y divide-gray-200">
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-muted/10 focus:bg-muted/10 focus:outline-none focus:ring-0 cursor-pointer"
                  onClick={() => {
                    const id = (row.original as { _id?: string })._id;
                    if (id) handleRowClick(id);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      const id = (row.original as { _id?: string })._id;
                      if (id) handleRowClick(id);
                    }
                  }}
                  tabIndex={0}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td 
                      key={cell.id} 
                      className={`p-4 text-sm text-card-foreground truncate max-w-[150px] ${
                        cell.column.id === "images" ? "hidden xl:table-cell" : ""
                      }`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Card>
  );
}
