import { Button, Input } from "@/components/atoms";
import { Filter, Search } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { ColumnFiltersState } from "@tanstack/react-table";
import { ColumnType } from "./Table";

type TableFilterProps = {
  columnFilters?: ColumnFiltersState;
  setColumnFilters?: (value: ColumnFiltersState | ((prev: ColumnFiltersState) => ColumnFiltersState)) => void;
  filterName?: string;
  setFilterName?: (value: string) => void;
  column: ColumnType[];
};

export const TableFilter = ({
  columnFilters = [],
  setColumnFilters,
  filterName,
  setFilterName,
  column,
}: TableFilterProps) => {
  const name =
    (columnFilters.find((filter) => filter.id === filterName)?.value as string) || "";

  const handleFilterChange = (id: string, value: string) => {
    if (setColumnFilters) {
      setColumnFilters((prev: ColumnFiltersState) =>
        prev.filter((filter) => filter.id !== id).concat({ id, value })
      );
    }
  };
  console.log("filterName", filterName);

  return (
    <div className="flex flex-col gap-4 mb-4 items-center w-full md:w-[30%] p-2">
      <div className="flex gap-2 items-center w-full">
        <Input
          label="Filter"
          name="filter"
          type="text"
          outlineType="round"
          placeholder="filter text here"
          fullWidth
          value={name}
          icon={<Search size={17} />}
          onChange={(e) =>
            filterName && handleFilterChange(filterName, e.target.value)
          }
        />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="solid"
              text="Filter"
              size="sm"
              IconBefore={<Filter size={17} />}
            />
          </PopoverTrigger>
          <PopoverContent>
            <div className="flex flex-col gap-2 items-start">
              {column.map((col: ColumnType) => {
                // Only render buttons for columns that have a string header
                if (!col.header || typeof col.header !== 'string') {
                  return null;
                }
                
                return (
                  <Button
                    key={col.id}
                    variant="plain"
                    size="sm"
                    fullWidth
                    text={col.header}
                    className="items-left"
                    onClick={() => col.id && setFilterName?.(col.id)}
                  />
                );
              })}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex gap-2 text-sm w-full font-semibold text-gray-700 p-2 bg-gray-100 rounded-lg">
        <p>Current Filter:</p>
        <p className="text-primary">
          {filterName
            ? filterName.charAt(0).toUpperCase() + filterName.slice(1)
            : "None"}
        </p>
      </div>
    </div>
  );
};
