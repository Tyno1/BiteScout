import dynamic from "next/dynamic";

const DashboardHome = dynamic(() => import("@/components/ui/dashboard/home/DashboardHome"), {
  loading: () => <div>Loading...</div>,
});

export default function Page() {
  return <DashboardHome />;
}
