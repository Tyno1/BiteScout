import { IconButton } from "@/components/atoms";
import { Allergen, DetailedFoodData } from "@/types/foodCatalogue";
import {
  getCoreRowModel,
  useReactTable,
  flexRender,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import {
  ArrowDownUp,
  ArrowDownWideNarrow,
  ArrowUpNarrowWide,
  Pen,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { TableFilter } from "./TableFilter";
import { ColumnDef } from "@tanstack/react-table";

type TableProps = {
  foodDatas: DetailedFoodData[];
  handleRowClick: (id: string) => void;
};
export type ColumnType = ColumnDef<DetailedFoodData>;

const column: ColumnType[] = [
  {
    accessorKey: "name",
    header: "Name",
    id: "name",
    cell: (props) => <p>{props.getValue<string>()}</p>,
  },
  {
    accessorKey: "ingredients",
    header: "Ingredients",
    id: "ingredients",
    enableSorting: false,

    cell: (props) => (
      <p className="line-clamp-2">{props.getValue<any>().join(", ")}</p>
    ),
  },
  {
    accessorKey: "cuisineType.name",
    header: "Cuisine",
    id: "cuisine",
    cell: (props) => <p>{props.getValue<string>()}</p>,
  },
  {
    accessorKey: "course.name",
    header: "Course",
    id: "course",
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
    cell: (props) => (
      <p className="line-clamp-2">
        {props
          .getValue<any>()
          .map((val: Allergen) => val.name)
          .join(", ")}
      </p>
    ),
  },
  {
    accessorKey: "images.length",
    header: "Images Count",
    id: "images",
    enableSorting: false,
    cell: (props) => <p>{props.getValue<string>()}</p>,
  },
  {
    accessorKey: "_id",
    header: "",
    enableSorting: false,
    cell: (props) => (
      <div className="flex justify-end space-x-2">
        <IconButton
          variant="plain"
          icon={<Pen size={20} />}
          size="sm"
          onClick={() => props.row.original._id && props.row.original._id}
        />
        <IconButton
          color="danger"
          variant="plain"
          size="sm"
          icon={<Trash2 size={20} />}
          onClick={() => props.row.original._id && props.row.original._id}
        />
      </div>
    ),
  },
];

export function Table({ foodDatas, handleRowClick }: TableProps) {
  const [data, setData] = useState<DetailedFoodData[]>(foodDatas);
  const [columnFilters, setColumnFilters] = useState<[]>([]);
  const [filterName, setFilterName] = useState<string>("name");

  const table = useReactTable({
    data: data,
    columns: column,
    state: {
      columnFilters: columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    meta: {
      updateData: (rowIndex: any, columnId: any, value: any) => {
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
    },
  });

  return (
   <div className="bg-white rounded-lg shadow overflow-hidden">
  <TableFilter
    columnFilters={columnFilters}
    setColumnFilters={setColumnFilters}
    filterName={filterName}
    setFilterName={setFilterName}
    column={column}
  />

  <div className="max-h-[60vh] overflow-y-auto">
    <table className="w-full table-fixed border-collapse">
      <thead className="bg-gray-100 sticky top-0 z-10">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className="px-4 py-2 text-left text-sm font-semibold text-gray-700"
              >
                <div className="flex items-center gap-1">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {header.column.getCanSort() && (
                    <button
                      className="ml-1"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <ArrowDownUp size={17} />
                    </button>
                  )}
                  {header.column.getIsSorted() === "asc" ? (
                    <ArrowUpNarrowWide className="text-primary/40" size={17} />
                  ) : header.column.getIsSorted() === "desc" ? (
                    <ArrowDownWideNarrow className="text-primary/40" size={17} />
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
            className="hover:bg-gray-100 cursor-pointer"
            onClick={() => row.original._id && handleRowClick(row.original._id)}
          >
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                className="p-4 text-sm text-gray-700"
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>


  );
}
