import { Button, Input } from "@/components/atoms";
import { Popover } from "@/components/molecules";
import { Filter, Search } from "lucide-react";

type FilterOption = {
  id: string;
  label: string;
};

type DataGridFilterProps = {
  searchValue: string;
  onSearchChange: (value: string) => void;
  filterField: string;
  onFilterFieldChange: (field: string) => void;
  filterOptions: FilterOption[];
  className?: string;
  isPopoverOpen: boolean;
  onPopoverChange: (open: boolean) => void;
};

export const DataGridFilter = ({
  searchValue,
  onSearchChange,
  filterField,
  onFilterFieldChange,
  filterOptions,
  className = "",
  isPopoverOpen,
  onPopoverChange,
}: DataGridFilterProps) => {
  return (
    <div className={`flex flex-col gap-4 mb-4 ${className}`}>
      <div className="flex gap-2 items-center w-full">
        <Input
          label="Search"
          name="search"
          type="text"
          outlineType="round"
          placeholder="Search food items..."
          fullWidth
          value={searchValue}
          icon={<Search size={17} className="text-secondary" />}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <Popover
          open={isPopoverOpen}
          onOpenChange={onPopoverChange}
          trigger={
            <Button
              color="secondary"
              variant="outline"
              text="Filter"
              size="sm"
              IconBefore={<Filter size={17} />}
            />
          }
          color="secondary"
          variant="glass"
        >
          <div className="flex flex-col gap-2 items-start">
            {filterOptions.map((option) => (
              <Button
                key={option.id}
                color="secondary"
                variant="plain"
                size="sm"
                fullWidth
                text={option.label}
                className="items-left"
                onClick={() => {
                  onPopoverChange(false);
                  onFilterFieldChange(option.id)}}
              />
            ))}
          </div>
        </Popover>
      </div>

      <div className="flex gap-2 text-sm w-full text-secondary p-2 rounded-lg">
        <p>Current Filter:</p>
        <p className="text-secondary font-bold">
          {filterField
            ? filterOptions.find(opt => opt.id === filterField)?.label || "None"
            : "None"}
        </p>
      </div>
    </div>
  );
}; 