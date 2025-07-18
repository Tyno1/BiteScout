import { Card } from "@/components/organisms";

export const EngagementSummary = () => {
  return (
    <Card
      fullWidth
      header={<h2 className="text-2xl font-bold">Engagement Summary</h2>}
      className="flex gap-2"
    >
      <Card header={<h3>Total Dish Posted</h3>}>
        <div className="flex items-center justify-betwee h-40">
          <div className="text-2xl font-bold">100</div>
          <div className="text-sm text-gray-500">
            <span className="text-green-500">+10%</span> from last month
          </div>
        </div>
      </Card>
      <Card header={<h3>Featured Dishes</h3>}>
        <div className="flex items-center justify-between h-40">
          <div className="text-2xl font-bold">100</div>
          <div className="text-sm text-gray-500">
            <span className="text-green-500">+10%</span> from last month
          </div>
        </div>
      </Card>
      <Card header={<h3>Times Tagged By Users</h3>}>
        <div className="flex items-center justify-between h-40">
          <div className="text-2xl font-bold">100</div>
          <div className="text-sm text-gray-500">
            <span className="text-green-500">+10%</span> from last month
          </div>
        </div>
      </Card>
      <Card header={<h3>Followers</h3>}>
        <div className="flex items-center justify-between h-40">
          <div className="text-2xl font-bold">100</div>
          <div className="text-sm text-gray-500">
            <span className="text-green-500">+10%</span> from last month
          </div>
        </div>
      </Card>
    </Card>
  );
};
