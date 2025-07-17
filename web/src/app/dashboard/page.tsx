"use client";

import {
  ContentInsights,
  EngagementSummary,
  OperationalTools,
  RecentActivityPanel,
} from "@/components/ui";

import { useSession } from "next-auth/react";

export default function Page() {
  const session = useSession();
  console.log(session);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-6">
      <EngagementSummary />
      <RecentActivityPanel />
      <ContentInsights />
      <OperationalTools />
    </div>
  );
}
