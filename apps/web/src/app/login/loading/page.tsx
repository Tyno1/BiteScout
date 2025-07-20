"use client";

import { useEffect } from "react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2, UtensilsCrossed } from "lucide-react";

export default function AuthLoader() {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    const refreshSession = async () => {
      await getSession(); // Triggers re-fetch of session
    };

    refreshSession();
  }, []);

  useEffect(() => {
    const handleRestaurantData = async () => {
      // Check if the user is logged in, has a resstaurant and is an admin or moderator
      if (
        session?.data?.user?._id &&
        (session?.data?.user?.userTypeDetails?.level as number) <= 2 &&
        session.data?.user.restaurantCount &&
        session.data?.user?.restaurantCount >= 1
      ) {
        router.push("/dashboard");
      } else {
        router.push("/onboarding/roles");
      }
    };

    handleRestaurantData();
  }, [session?.data?.user?._id, session.data?.user?.restaurantCount, session?.data?.user?.userTypeDetails?.level, router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-muted/50">
      <div className="flex flex-col items-center justify-center space-y-6 px-4 text-center">
        <div className="relative">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-orange-500 to-red-500 opacity-75 blur-sm"></div>
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-background shadow-lg">
            <UtensilsCrossed className="h-12 w-12 text-white" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Preparing your experience
          </h1>
          <p className="text-muted-foreground">
            We&apos;re getting everything ready for you
          </p>
        </div>

        <div className="flex items-center justify-center gap-2">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Authenticating...
          </span>
        </div>
      </div>

      <div className="mt-16 flex flex-col items-center justify-center">
        <div className="h-1 w-48 overflow-hidden rounded-full bg-muted">
          <div className="animate-progress h-full bg-gradient-to-r from-orange-500 to-red-500"></div>
        </div>
      </div>
    </div>
  );
}
