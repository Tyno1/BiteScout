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
  Pen,
  Trash2,
} from "lucide-react";

import type { Allergen, FoodCatalogue } from "shared/types/api/schemas";


type TableProps = {
  foodDatas: FoodCatalogue[];
  handleRowClick: (id: string) => void;
  handleDelete: (id: string) => void;
  handleEdit: (id: string) => void;
};
export type ColumnType = ColumnDef<FoodCatalogue>;

export function Table({ foodDatas, handleRowClick, handleDelete, handleEdit }: TableProps) {
  const column: ColumnType[] = [
    {
      accessorKey: "name",
      header: "Name",
      id: "name",
      cell: (props) => <p>{props.getValue<string>()}</p>,
    },

    {
      accessorKey: "cuisineType",
      header: "Cuisine",
      id: "cuisine",
      accessorFn: (row) => row.cuisineType?.name || "N/A",
      cell: (props) => <p>{props.getValue<string>()}</p>,
    },
    {
      accessorKey: "course",
      header: "Course",
      id: "course",
      accessorFn: (row) => row.course?.name || "N/A",
      cell: (props) => <p>{props.getValue<string>()}</p>,
    },
    {
      accessorKey: "price",
      header: "Price",
      id: "price",
      accessorFn: (row) => `${row.price.currency}${row.price.amount}`,
      cell: (props) => <p>{props.getValue<string>()}</p>,
    },
    {
      accessorKey: "allergens",
      header: "Allergens",
      enableSorting: false,
      id: "allergens",
      cell: (props) => {
        const allergens = props.getValue<Allergen[]>();
        return (
          <p className="line-clamp-2">
            {allergens && allergens.length > 0
              ? allergens.map((val: Allergen) => val.name).join(", ")
              : "None"}
          </p>
        );
      },
    },
    {
      accessorKey: "images",
      header: ({ column }) => (
        <div className="hidden xl:flex items-center gap-2">
          Images Count
        </div>
      ),
      id: "images",
      enableSorting: false,
      accessorFn: (row) => row.images?.length || 0,
      cell: (props) => <p>{props.getValue<number>()}</p>,
    },
    {
      accessorKey: "_id",
      header: "",
      enableSorting: false,
      cell: (props) => (
        <div className="flex justify-end space-x-2">
          <IconButton
            name="edit-food-item"
            variant="plain"
            color="secondary"
            icon={<Pen size={20} />}
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              props.row.original._id && handleEdit(props.row.original._id);
            }}
          />
          <IconButton
            name="delete-food-item"
            color="danger"
            variant="plain"
            size="sm"
            icon={<Trash2 size={20} />}
            onClick={(e) => {
              e.stopPropagation();
              props.row.original._id && handleDelete(props.row.original._id);
            }}
          />
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: foodDatas,
    columns: column,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <Card className="shadow overflow-hidden">
      <div className="max-h-[60vh] overflow-y-auto">
        {foodDatas.length === 0 ? (
          <div className="p-8 text-center text-card-foreground">
            No food items found. Add some food items to get started.
          </div>
        ) : (
          <table className="w-full table-fixed border-collapse">
            <thead className="bg-card sticky top-0 z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className={`px-4 py-5 text-left text-sm font-semibold text-secondary ${
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
                            name="sort-food-item"
                            variant="plain"
                            color="secondary"
                            icon={<ArrowDownUp size={17} />}
                            size="sm"
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
                  className="hover:bg-secondary/10 focus:bg-secondary/10 focus:outline-none focus:ring-0 cursor-pointer"
                  onClick={() =>
                    row.original._id && handleRowClick(row.original._id)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      if (row.original._id) handleRowClick(row.original._id);
                    }
                  }}
                  tabIndex={0}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td 
                      key={cell.id} 
                      className={`p-4 text-sm text-card-foreground ${
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
