"use client";

import { Menu, X } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import "animate.css";
import ProfileImg from "@/assets/images/profile.png";
import { Button } from "../atoms";
import { MobileNav } from "./MobileNav";

type NavTheme = {
  theme: "dark" | "light";
};

type MobileLinkProp = {
  path: string;
  text: string;
};


export function Navbar({ theme }: NavTheme) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleRoute = (path: string) => {
    router.push(path);
  };
  const { data: session } = useSession();

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const MobileLinkItem = ({ path, text }: MobileLinkProp) => {
    return (
      <Link
        href={path}
        onClick={toggleMenu}
        className="block px-3 py-6 text-base font-medium hover:bg-black hover:text-white"
      >
        {text}
      </Link>
    );
  };

  const WebLinkItem = ({ path, text }: MobileLinkProp) => {
    return (
      <Link
        href={path}
        onClick={toggleMenu}
        className="px-4 py-2 text-sm hover:text-white hover:border-b hover:border-orange-500 focus:rounded-lg focus:ring-orange-500 focus:bg-orange-500/20 focus:border-none focus:text-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-0 "
      >
        {text}
      </Link>
    );
  };

  return (
    <nav
      className={`w-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20 sticky top-0 z-50 overflow-none ${
        theme === "dark" ? "bg-[#030811] text-white" : "bg-white text-black"
      }`}
    >
      <Link href="/" className="flex-shrink-0">
        <Image src="/logo.png" alt="Bite Scout" width={120} height={40} />
      </Link>
      {/* web view */}
      <ul className="hidden md:flex ml-10 flex items-center">
        <li>
          <WebLinkItem text="Home" path="/" />
        </li>
        <li>
          <WebLinkItem text="About" path="/about" />
        </li>
        <li>
          <WebLinkItem text="Services" path="/services" />
        </li>
        <li>
          <WebLinkItem text="Contact" path="/contact" />
        </li>

        <li>
          {session ? (
            <ul className="auth flex ml-20 items-center gap-2">
              <li>
                <WebLinkItem text="Dashboard" path="/dashboard" />
              </li>
              <li>
                <Button
                  variant="solid"
                  size="sm"
                  text="Logout"
                  type="button"
                  onClick={async () => await signOut({ callbackUrl: "/" })}
                />
              </li>
              <li>
                <Image
                  alt="profile_image"
                  src={ProfileImg}
                  width={30}
                  height={30}
                />
              </li>
            </ul>
          ) : (
            <ul className="flex items-center gap-2 ml-10">
              <li>
                <Button
                  variant="solid"
                  size="sm"
                  text="Login"
                  type="button"
                  onClick={() => handleRoute("/login")}
                />
              </li>
              <li>
                <Button
                  variant="plain"
                  size="sm"
                  text="Register"
                  type="button"
                  onClick={() => handleRoute("/register")}
                />
              </li>
            </ul>
          )}
        </li>
      </ul>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        onClick={toggleMenu}
        className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* mobile view */}
      {isOpen && (
        <MobileNav
          toggleMenu={toggleMenu}
          session={session}
          MobileLinkItem={MobileLinkItem}
          handleRoute={handleRoute}
        />
      )}
    </nav>
  );
}
