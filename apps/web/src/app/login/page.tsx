"use client";

import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Navbar } from "@/components/molecules";
import { LoginForm } from "@/components/ui/forms/LoginForm";

const Page = () => {
	const session = useSession();
	const router = useRouter();

	if (session?.data?.user) {
		redirect("/login/loading");
	}

	return (
		<div className="min-h-screen bg-background text-foreground">
			<Navbar />
			<div className="flex items-center justify-center min-h-[calc(100vh-10rem)] px-4">
				<div className="w-full max-w-md space-y-8">
					<div className="text-center">
						<h2 className="text-3xl font-bold text-foreground">Sign In</h2>
						<p className="mt-2 text-sm text-muted-foreground">
							Welcome back! Please sign in to your account.
						</p>
					</div>
					<LoginForm />
					<div className="text-center">
						<p className="text-sm text-muted-foreground">
							Don't have an account?{" "}
							<button
								type="button"
								className="text-primary hover:text-primary/80 font-medium transition-colors"
								onClick={() => router.push("/register")}
							>
								Register here
							</button>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Page;
