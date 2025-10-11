"use client";

import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Navbar } from "@/components/molecules";
import { RegisterForm } from "@/components/ui";

const Page = () => {
  const session = useSession();
  const router = useRouter();

  if (session?.data?.user) {
    redirect("/onboarding/roles");
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] px-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground">Create Account</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Join BiteScout and start discovering amazing food experiences.
            </p>
          </div>
          <RegisterForm />
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <button
                type="button"
                className="text-primary hover:text-primary/80 font-medium transition-colors"
                onClick={() => router.push("/login")}
              >
                Sign in here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
