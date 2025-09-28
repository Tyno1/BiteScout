"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Edit, Eye, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import type { FoodCatalogue } from "shared/types/api/schemas";
import { Badge, Button } from "@/components/atoms";
import { DataGrid } from "@/components/organisms/DataGrid";
import { DataGridFilter } from "@/components/organisms/DataGridFilter/DataGridFilter";
import { FoodCard } from "./FoodCard";

type FoodCatalogueListProps = {
  foodDatas: FoodCatalogue[];
  handleRowClick: (id: string) => void;
  handleDelete: (id: string) => void;
  handleEdit: (id: string) => void;
};

type FoodHeaderType = {
  name: string;
  cuisineType: string;
  course: string;
  ingredients: string[];
  _id: string;
};

const FILTER_OPTIONS = [
  { id: "name", label: "Name" },
  { id: "cuisineType", label: "Cuisine" },
  { id: "course", label: "Course" },
  { id: "ingredients", label: "Ingredients" },
];

export const FoodCatalogueList = ({
  foodDatas,
  handleRowClick,
  handleDelete,
  handleEdit,
}: FoodCatalogueListProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [filterField, setFilterField] = useState("name");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  // Define columns inside the component to access the handlers
  const columns: ColumnDef<FoodHeaderType>[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "cuisineType", header: "Cuisine" },
    { accessorKey: "course", header: "Course" },
    {
      accessorKey: "ingredients",
      header: "Ingredients",
      cell: ({ getValue }) => (
        <div className="flex gap-1 overflow-x-auto">
          {(getValue() as string[]).map((ingredient) => (
            <Badge key={ingredient} size="xs" variant="glass" color="neutral">
              {ingredient}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex justify-center gap-2">
          <Button
            variant="outline"
            size="xs"
            IconBefore={<Eye size={14} />}
            onClick={(e) => {
              e.stopPropagation();
              handleRowClick(row.original._id);
            }}
            className="h-8 w-8 p-0"
          />
          <Button
            variant="outline"
            size="xs"
            IconBefore={<Edit size={14} />}
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(row.original._id);
            }}
            className="h-8 w-8 p-0"
          />
          <Button
            variant="outline"
            size="xs"
            IconBefore={<Trash2 size={14} />}
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(row.original._id);
            }}
            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
          />
        </div>
      ),
    },
  ];

  // Filter food data based on search and filter field
  const filteredFoodData = useMemo(() => {
    if (!searchValue.trim()) return foodDatas;

    return foodDatas.filter((food) => {
      const searchTerm = searchValue.toLowerCase().trim();

      switch (filterField) {
        case "name":
          return food.name?.toLowerCase().includes(searchTerm);
        case "cuisineType":
          return food.cuisineType?.name?.toLowerCase().includes(searchTerm);
        case "course":
          return food.course?.name?.toLowerCase().includes(searchTerm);
        case "ingredients":
          return food.ingredients?.some((ingredient) =>
            ingredient.toLowerCase().includes(searchTerm)
          );
        default:
          // Search across all fields if no specific filter
          return (
            food.name?.toLowerCase().includes(searchTerm) ||
            food.cuisineType?.name?.toLowerCase().includes(searchTerm) ||
            food.course?.name?.toLowerCase().includes(searchTerm) ||
            food.ingredients?.some((ingredient) => ingredient.toLowerCase().includes(searchTerm))
          );
      }
    });
  }, [foodDatas, searchValue, filterField]);

  return (
    <div>
      {/* Filter Component */}
      <DataGridFilter
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        filterField={filterField}
        onFilterFieldChange={(field) => {
          setFilterField(field);
          setIsPopoverOpen(false);
        }}
        filterOptions={FILTER_OPTIONS}
        isPopoverOpen={isPopoverOpen}
        onPopoverChange={setIsPopoverOpen}
        className="w-full md:w-[60%] lg:w-[40%]"
      />

      {/* Desktop Table */}
      <div className="hidden lg:block">
        <DataGrid
          data={filteredFoodData.map((food) => ({
            name: food.name || "Unknown",
            cuisineType: food.cuisineType?.name || "Unknown",
            course: food.course?.name || "Unknown",
            ingredients: food.ingredients || [],
            _id: food._id || "",
          }))}
          columns={columns}
          handleRowClick={handleRowClick}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          emptyMessage="No food items found."
        />
      </div>

      {/* Mobile/Tablet Cards */}
      <div className="lg:hidden space-y-4">
        {filteredFoodData.length > 0 ? (
          filteredFoodData.map((food) => (
            <FoodCard
              key={food._id}
              food={food}
              onRowClick={handleRowClick}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              {searchValue.trim() ? "No food items match your search." : "No food items found."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
