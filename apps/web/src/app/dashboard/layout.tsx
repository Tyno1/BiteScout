import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { DashboardClientLayout } from "./DashboardClientLayout";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  // Server-side auth check
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return <DashboardClientLayout session={session}>{children}</DashboardClientLayout>;
}
