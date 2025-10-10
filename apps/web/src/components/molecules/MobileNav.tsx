import type { Session } from "next-auth";
import { useId } from "react";
import { ThemeToggle } from "../ui/ThemeToggle";
import { MobileLinkItem } from "./MobileLinkItem";

type NavProp = {
  toggleMenu: () => void;
  session: Session | null;
};

export function MobileNav({ session, toggleMenu }: NavProp) {
  const mobileMenuId = useId();

  return (
    <ul
      id={mobileMenuId}
      className="md:hidden w-full h-[100vh] space-y-1 sm:px-3 absolute top-20 right-0 bg-background"
    >
      <li>
        <MobileLinkItem path="/" text="Home" toggleMenu={toggleMenu} />
      </li>

      <li>
        <MobileLinkItem path="/about" text="About" toggleMenu={toggleMenu} />
      </li>
      <li>
        <MobileLinkItem
          path="/services"
          text="Services"
          toggleMenu={toggleMenu}
        />
      </li>
      <li>
        <MobileLinkItem
          path="/contact"
          text="Contact"
          toggleMenu={toggleMenu}
        />
      </li>
      <li>
        {session ? (
          <ul className="auth flex flex-col items-start w-[100vw]">
            <li className="w-full">
              <MobileLinkItem
                path="/dashboard"
                text="Dashboard"
                toggleMenu={toggleMenu}
              />
            </li>
            <li className="w-full">
              <MobileLinkItem
                path="/api/auth/logout"
                text="Logout"
                toggleMenu={toggleMenu}
              />
            </li>
          </ul>
        ) : (
          <ul className="flex flex-col">
            <li>
              <MobileLinkItem
                path="/login"
                text="Login"
                toggleMenu={toggleMenu}
              />
            </li>
            <li>
              <MobileLinkItem
                path="/register"
                text="Register"
                toggleMenu={toggleMenu}
              />
            </li>
            <li>
              <div className="w-full flex justify-center p-8">
                <ThemeToggle />
              </div>
            </li>
          </ul>
        )}
      </li>
    </ul>
  );
}
