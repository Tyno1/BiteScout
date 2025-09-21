import { Card } from "@/components/organisms";

export const EngagementSummary = () => {
  return (
    <Card
      fullWidth
      header={<h2 className="text-2xl font-bold">Engagement Summary</h2>}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      <Card
        containerClassName="bg-background/50 shadow-lg"
        header={<h3 className="font-medium">Total Dish Posted</h3>}
      >
        <div className="flex items-center justify-between h-40">
          <div className="text-2xl font-bold">100</div>
          <div className="text-sm text-card-foreground">
            <span className="text-secondary">+10%</span> from last month
          </div>
        </div>
      </Card>
      <Card containerClassName="bg-background/50 shadow-lg" header={<h3>Featured Dishes</h3>}>
        <div className="flex items-center justify-between h-40">
          <div className="text-2xl font-bold">100</div>
          <div className="text-sm text-card-foreground">
            <span className="text-secondary">+10%</span> from last month
          </div>
        </div>
      </Card>
      <Card containerClassName="bg-background/50 shadow-lg" header={<h3>Times Tagged By Users</h3>}>
        <div className="flex items-center justify-between h-40">
          <div className="text-2xl font-bold">100</div>
          <div className="text-sm text-card-foreground">
            <span className="text-secondary">+10%</span> from last month
          </div>
        </div>
      </Card>
      <Card containerClassName="bg-background/50 shadow-lg" header={<h3>Followers</h3>}>
        <div className="flex items-center justify-between h-40">
          <div className="text-2xl font-bold">100</div>
          <div className="text-sm text-card-foreground">
            <span className="text-secondary">+10%</span> from last month
          </div>
        </div>
      </Card>
    </Card>
  );
};
