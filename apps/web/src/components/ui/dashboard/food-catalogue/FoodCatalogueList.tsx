import { useMemo, useState } from "react";
import type { FoodCatalogue } from "shared/types/api/schemas";
import { FoodCard } from "./FoodCard";
import { FoodFilter } from "./FoodFilter";
import { Table } from "./Table";

type FoodCatalogueListProps = {
  foodDatas: FoodCatalogue[];
  handleRowClick: (id: string) => void;
  handleDelete: (id: string) => void;
  handleEdit: (id: string) => void;
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
          return food.ingredients?.some(ingredient =>
            ingredient.toLowerCase().includes(searchTerm)
          );
        default:
          // Search across all fields if no specific filter
          return (
            food.name?.toLowerCase().includes(searchTerm) ||
            food.cuisineType?.name?.toLowerCase().includes(searchTerm) ||
            food.course?.name?.toLowerCase().includes(searchTerm) ||
            food.ingredients?.some(ingredient =>
              ingredient.toLowerCase().includes(searchTerm)
            )
          );
      }
    });
  }, [foodDatas, searchValue, filterField]);

  return (
    <div>
      {/* Filter Component */}
      <FoodFilter
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        filterField={filterField}
        onFilterFieldChange={setFilterField}
        filterOptions={FILTER_OPTIONS}
        className="w-full md:w-[60%] lg:w-[40%]"
      />

      {/* Desktop Table */}
      <div className="hidden lg:block">
        <Table
          foodDatas={filteredFoodData}
          handleRowClick={handleRowClick}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
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