"use client";

import {
  ContentInsights,
  EngagementSummary,
  OperationalTools,
  RecentActivityPanel,
} from "@/components/ui";

export default function Page() {

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-6">
      <EngagementSummary />
      <RecentActivityPanel />
      <ContentInsights />
      <OperationalTools />
    </div>
  );
}
