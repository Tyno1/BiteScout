import { Card } from "@/components/organisms";

export const ContentInsights = () => {
  return (
    <Card
      fullWidth
      header={<h2 className="text-2xl font-bold">Content Insights</h2>}
      className="grid grid-cols-2 gap-2"
    >
      <Card containerClassName="bg-background/50 shadow-lg" header={<h3>Top Performing Dish</h3>}>
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
      <Card containerClassName="bg-background/50 shadow-lg" header={<h3>Popular Cuisine Tag</h3>}>
        <div className="flex items-center justify-between h-40">
          <div className="text-2xl font-bold">100</div>
          <div className="text-sm text-card-foreground">
            <span className="text-secondary">+10%</span> from last month
          </div>
        </div>
      </Card>
      <Card containerClassName="bg-background/50 shadow-lg" header={<h3>Tag Frequency</h3>}>
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
