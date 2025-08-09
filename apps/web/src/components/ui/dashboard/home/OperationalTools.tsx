import { Button } from "@/components/atoms";
import { Card } from "@/components/organisms";
import { useRouter } from "next/navigation";

export const OperationalTools = () => {
  const router = useRouter();

  const QUICK_ACTIONS = [
    {
      id: "upload-dish",
      title: "Upload New Dish",
      description: "Add a new dish to your menu",
      icon: "🍽️",
      variant: "outline" as const,
      color: "primary" as const,
      route: "/dashboard/food-catalogue",
      hasAlert: false,
    },
    {
      id: "moderate-posts",
      title: "🖼️ Moderate Tagged Posts",
      description: "Review and moderate user posts",
      icon: "",
      variant: "glass" as const,
      color: "neutral" as const,
      route: "/dashboard/notifications",
      hasAlert: true,
      alertCount: 5,
    },
    {
      id: "edit-restaurant",
      title: "✏️ Edit Restaurant Info",
      description: "Update restaurant details and settings",
      icon: "",
      variant: "glass" as const,
      color: "neutral" as const,
      route: "/dashboard/restaurant-profile",
      hasAlert: false,
    },
    {
      id: "manage-delivery",
      title: "🔗 Manage Delivery Links",
      description: "Configure delivery service links",
      icon: "",
      variant: "glass" as const,
      color: "neutral" as const,
      route: "/dashboard/restaurant-profile",
      hasAlert: false,
    },
  ];

  const handleActionClick = (route: string) => {
    router.push(route);
  };

  return (
    <Card header={<h2 className="text-2xl font-bold">Operational Tools</h2>}>
      <div className="grid grid-cols-2 gap-4">
        {QUICK_ACTIONS.map((action) => (
          <div key={action.id} className="relative">
            <Button
              text={action.title}
              variant={action.variant}
              color={action.color}
              size="sm"
              onClick={() => handleActionClick(action.route)}
              className="w-full justify-start"
            />
            {action.hasAlert && action.alertCount && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {action.alertCount}
              </span>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};
