import { Permissions } from "@/app/permissions";

export function getMatchingRoute(pathname: string): string | null {
  if (Permissions[pathname]) return pathname;

  return (
    Object.keys(Permissions).find((route) => pathname.startsWith(route)) ?? null
  );
}
