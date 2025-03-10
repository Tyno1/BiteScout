import { RestaurantDataState } from "@/types/restaurantData";

const prepareRestaurantData = (
  data: RestaurantDataState,
  ownerId: string
): RestaurantDataState => {
  // Copy data to avoid mutating the original state
  const preparedData = { ...data };

  // Normalize business hours
  preparedData.businessHours = data.businessHours.map((hour) => ({
    day: hour.day || "Monday",
    open: hour.open || "09:00",
    close: hour.close || "17:00",
    closed: hour.closed || false,
  }));

  // Set default values for required fields
  preparedData.ownerId = ownerId;
  preparedData.priceRange = data.priceRange || "$";
  preparedData.logo = data.logo || "default-logo";

  // Trim all string fields to remove whitespace
  Object.keys(preparedData).forEach((key) => {
    if (typeof preparedData[key] === "string") {
      preparedData[key] = preparedData[key].trim();
    }
  });

  return preparedData;
};

export default prepareRestaurantData;
