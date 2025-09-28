import React from "react";
import { Card } from "@/components/organisms";

const ACTIVITIES = [
  "you were tagged in a post",
  "Molten Cake was saved 22 times this week",
  "Your dish Ribeye was marked as trending",
  "3 dishes are pending moderation",
];

export const RecentActivityPanel = () => {
  return (
    <Card header={<h2 className="text-2xl font-bold">Recent Activity Panel</h2>}>
      <Card className="h-[10vh] overflow-y-auto">
        {ACTIVITIES.map((activity, index) => (
          <React.Fragment key={activity}>
            <p className="text-sm text-card-foreground">{activity}</p>
            {index !== ACTIVITIES.length - 1 && (
              <div className="border-b-[1px] border-secondary/30 my-2" />
            )}
          </React.Fragment>
        ))}
      </Card>
    </Card>
  );
};
