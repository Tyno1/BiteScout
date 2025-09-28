import type { Session } from "next-auth";
import type React from "react";
import { useId } from "react";

type NavProp = {
  toggleMenu: () => void;
  MobileLinkItem: ({
    path,
    text,
  }: {
    path: string;
    text: string;
  }) => React.JSX.Element;
  session: Session | null;
  handleRoute: (path: string) => void;
  parentTheme?: "dark" | "light";
};

export function MobileNav({ MobileLinkItem, session }: NavProp) {
  const mobileMenuId = useId();

  return (
    <ul
      id={mobileMenuId}
      className="md:hidden w-full h-[100vh] space-y-1 sm:px-3 absolute top-20 right-0 bg-background text-foreground"
    >
      <li>
        <MobileLinkItem path="/" text="Home" />
      </li>

      <li>
        <MobileLinkItem path="/about" text="About" />
      </li>
      <li>
        <MobileLinkItem path="/services" text="Services" />
      </li>
      <li>
        <MobileLinkItem path="/contact" text="Contact" />
      </li>
      <li>
        {session ? (
          <ul className="flex flex-col items-start w-[100vw]">
            <li className="w-full">
              <MobileLinkItem path="/dashboard" text="Dashboard" />
            </li>
            <li className="w-full">
              <MobileLinkItem path="/api/auth/logout" text="Logout" />
            </li>
          </ul>
        ) : (
          <ul className="flex flex-col items-start w-[100vw]">
            <li className="w-full">
              <MobileLinkItem path="/login" text="Login" />
            </li>
            <li className="w-full">
              <MobileLinkItem path="/register" text="Register" />
            </li>
          </ul>
        )}
      </li>
    </ul>
  );
}
