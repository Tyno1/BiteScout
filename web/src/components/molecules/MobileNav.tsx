import Link from "next/link";
import React, { ReactElement, ReactNode } from "react";
import Button from "../atoms/buttons/Button";

interface NavProp {
  toggleMenu: () => void;
  MobileLinkItem: ({
    path,
    text,
  }: {
    path: string;
    text: string;
  }) => React.JSX.Element;
  session: any;
  handleRoute: (path: string) => void;
}

const MobileNav = ({
  toggleMenu,
  MobileLinkItem,
  session,
  handleRoute,
}: NavProp) => {
  return (
    <>
      <ul
        id="mobile-menu"
        className="md:hidden w-full h-[100vh] space-y-1 sm:px-3 absolute top-20 right-0 bg-white text-black"
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
            <ul className="auth flex flex-col items-start w-[100vw]">
              <li className="w-full">
                <MobileLinkItem path="/dashboard" text="Dashboard" />
              </li>
              <li className="w-full">
                <MobileLinkItem path="/api/auth/logout" text="Logout" />
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
    </>
  );
};

export default MobileNav;
