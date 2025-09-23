import { IconButton } from "@/components/atoms";
import { Card } from "@/components/organisms";
import { Pen, Trash2 } from "lucide-react";
import type { FoodCatalogue } from "shared/types/api/schemas";

type FoodCardProps = {
  food: FoodCatalogue;
  onRowClick: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

export const FoodCard = ({ food, onRowClick, onEdit, onDelete }: FoodCardProps) => {
  return (
    <Card
      useDivider
      header={
        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0">
            <p className="font-medium text-card-foreground truncate text-base">{food.name}</p>
            <p className="text-sm text-card-foreground mt-1">
              {food.cuisineType?.name} • {food.course?.name}
            </p>
          </div>
          <div className="flex gap-1 ml-3">
            <IconButton
              variant="plain"
              size="xs"
              color="secondary"
              icon={<Pen size={16} />}
              onClick={(e) => {
                e.stopPropagation();
                onEdit(food._id || "");
              }}
              aria-label="Edit food item"
            />
            <IconButton
              variant="plain"
              size="xs"
              color="danger"
              icon={<Trash2 size={16} />}
              onClick={(e) => {
                e.stopPropagation();
                onDelete(food._id || "");
              }}
              aria-label="Delete food item"
            />
          </div>
        </div>
      }
      onClick={() => onRowClick(food._id || "")}
      padding="md"
      shadow="sm"
    >
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-card-foreground">Price:</span>
          <span className="font-medium text-card-foreground">
            {food.price?.currency} {food.price?.amount}
          </span>
        </div>

        {food.images && food.images.length > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-card-foreground">Images:</span>
            <span className="text-sm text-card-foreground">{food.images.length}</span>
          </div>
        )}

        {food.ingredients && food.ingredients.length > 0 && (
          <div className="pt-2">
            <p className="text-xs text-card-foreground">
              <span className="font-medium">Ingredients: </span>
              {food.ingredients.slice(0, 3).join(", ")}
              {food.ingredients.length > 3 && ` +${food.ingredients.length - 3} more`}
            </p>
          </div>
        )}

        {food.allergens && food.allergens.length > 0 && (
          <div className="pt-1">
            <p className="text-xs text-danger">
              <span className="font-medium">Allergens: </span>
              {food.allergens
                .map((allergen) => allergen.name)
                .slice(0, 2)
                .join(", ")}
              {food.allergens.length > 2 && ` +${food.allergens.length - 2} more`}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};
