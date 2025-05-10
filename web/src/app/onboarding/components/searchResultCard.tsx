import { Button } from "@/components/atoms";
import { RestaurantAccess } from "@/types/restaurantAccess";
import { RestaurantData } from "@/types/restaurantData";
import { CircleCheck, Loader2 } from "lucide-react";

type CardProp = {
  data: RestaurantData;
  handleRestaurantSelect: (restaurantId: string) => void;
  restaurantAccessList: RestaurantAccess[];
  userId: string;
  isSubmitting: boolean;
};

const SearchResultCard = ({
  data,
  handleRestaurantSelect,
  restaurantAccessList,
  userId,
  isSubmitting,
}: CardProp) => {
  // Check if user already has access and its status
  const restaurantAccess = Array.isArray(restaurantAccessList)
    ? restaurantAccessList.find((access) => access.restaurantId === data._id)
    : undefined;    
    
    
  const hasRestaurantAccess =
    restaurantAccess && restaurantAccess?.userId === userId;
  const accessStatus = restaurantAccess?.status;
  const isPending = hasRestaurantAccess && accessStatus === "pending";
  const isApproved = hasRestaurantAccess && accessStatus === "approved";
  // Render search button based on access status
  const renderActionButton = () => {
    if (isPending) {
      return (
        <Button
          disabled
          variant="solid"
          type="button"
          text="Awaiting approval"
        />
      );
    } else if (isApproved) {
      return (
        <Button variant="solid" type="button" text="Approved" disabled>
          <CircleCheck className="mr-2" />
        </Button>
      );
    } else {
      return (
        <Button
          className="ml-auto"
          onClick={() => data._id && handleRestaurantSelect(data._id)}
          variant="solid"
          type="submit"
          text="Request Access"
          disabled={isSubmitting}
        >
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        </Button>
      );
    }
  };

  return (
    <div className="flex gap-2 items-center justify-between p-2 mb-2 w-full">
      <div className="flex gap-2 items-center">
        <div className="h-10 w-10 bg-red-500 rounded">
          <img src={data.logo || undefined} alt={""} />
        </div>
        <p>{data.name}</p>
      </div>
      {renderActionButton()}
    </div>
  );
};
export default SearchResultCard;
