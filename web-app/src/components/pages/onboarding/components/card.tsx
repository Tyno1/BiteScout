import Button from "@/components/atoms/buttons/Button";
import { RestaurantDataState } from "@/types/restaurantData";

interface CardProp {
  data: RestaurantDataState;
  handleRestaurantSelect: (restaurantId: string) => void;
}

const RestaurantCardItem = ({ data, handleRestaurantSelect }: CardProp) => {
  return (
    <div className="flex gap-2 items-center p-2 mb-2">
      <div className="h-10 w-10 bg-red-500 rounded">
        <img src={data.logo} alt={""} />
      </div>
      <p>{data.name}</p>
      <Button
        onClick={() => data._id && handleRestaurantSelect(data?._id)}
        className="ml-auto"
        text="Send Request"
        variant="outline"
        size="sm"
      />
    </div>
  );
};
export default RestaurantCardItem;
