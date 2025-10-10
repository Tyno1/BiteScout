import type { Session } from "next-auth";
import type React from "react";
import { useId } from "react";
import { Button } from "../atoms";

type NavProp = {
  toggleMenu: () => void;
  MobileLinkItem: ({
    path,
    text,
    theme,
    parentTheme,
    toggleMenu,
  }: {
    path: string;
    text: string;
    theme?: "dark" | "light";
    parentTheme?: "dark" | "light";
    toggleMenu: () => void;
  }) => React.JSX.Element;
  session: Session | null;
  handleRoute: (path: string) => void;
  parentTheme?: "dark" | "light";
};

export function MobileNav({
  MobileLinkItem,
  session,
  handleRoute,
  parentTheme,
  toggleMenu,
}: NavProp) {
  const mobileMenuId = useId();

  return (
      <ul
        id={mobileMenuId}
        className="md:hidden w-full h-[100vh] space-y-1 sm:px-3 absolute top-20 right-0 bg-white text-black"
      >
        <li>
          <MobileLinkItem
            path="/"
            text="Home"
            parentTheme={parentTheme}
            toggleMenu={toggleMenu}
          />
        </li>

        <li>
          <MobileLinkItem
            path="/about"
            text="About"
            parentTheme={parentTheme}
            toggleMenu={toggleMenu}
          />
        </li>
        <li>
          <MobileLinkItem
            path="/services"
            text="Services"
            parentTheme={parentTheme}
            toggleMenu={toggleMenu}
          />
        </li>
        <li>
          <MobileLinkItem
            path="/contact"
            text="Contact"
            parentTheme={parentTheme}
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
                  parentTheme={parentTheme}
                  toggleMenu={toggleMenu}
                />
              </li>
              <li className="w-full">
                <MobileLinkItem
                  path="/api/auth/logout"
                  text="Logout"
                  parentTheme={parentTheme}
                  toggleMenu={toggleMenu}
                />
              </li>
            </ul>
          ) : (
            <ul className="flex flex-col">
              <li>
                <Button
                  text="Login"
                  variant="solid"
                  size="sm"
                  onClick={() => handleRoute("/login")}
                />{" "}
              </li>
              <li>
                <Button
                  size="sm"
                  text="Register"
                  variant="solid"
                  onClick={() => handleRoute("/register")}
                />
              </li>
            </ul>
          )}
        </li>
      </ul>
  );
}
