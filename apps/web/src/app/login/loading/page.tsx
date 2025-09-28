import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function AuthLoader() {
  const session = await auth();

  if (
    session?.user?._id &&
    (session?.user?.userTypeDetails?.level as number) <= 2 &&
    session.user.restaurantCount &&
    session.user?.restaurantCount >= 1
  ) {
    redirect("/dashboard");
  } else if (session) {
    redirect("/onboarding/roles");
  } else {
    redirect("/login");
  }
}
