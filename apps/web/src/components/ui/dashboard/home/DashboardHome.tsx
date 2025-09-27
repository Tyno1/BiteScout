import { auth } from "@/auth";
import {
	ContentInsights,
	EngagementSummary,
	OperationalTools,
	RecentActivityPanel,
} from "@/components/ui";

export default async function Page() {
	const session = await auth();

	return (
		<main className="w-full mx-auto px-1 md:px-10 py-10 space-y-6">
			<h1 className="text-2xl font-bold mb-6 text-primary">
				<span className="font-medium text-lg text-foreground">Welcome, </span>{" "}
				{session?.user?.name}
			</h1>

			<EngagementSummary />
			<RecentActivityPanel />
			<ContentInsights />
			<OperationalTools />
		</main>
	);
}
