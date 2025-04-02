"use client";

import React, { useCallback, useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ProfileImg from "@/assets/images/profile.png";
import "animate.css";
import { useUser } from "@auth0/nextjs-auth0/client";
import MobileNav from "./MobileNav";

interface NavTheme {
  theme: "dark" | "light";
}

interface MobileLinkProp {
  path: string;
  text: string;
}

interface WebLinkProp extends MobileLinkProp {}

const Navbar = ({ theme }: NavTheme) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isLoading, error } = useUser();

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

  const WebLinkItem = ({ path, text }: WebLinkProp) => {
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
        <img src="none" alt="Bite Scout" />
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
          {user ? (
            <ul className="auth flex ml-20 items-center gap-2">
              <li>
                <WebLinkItem text="Dashboard" path="/dashboard" />
              </li>
              <li>
                <a
                  className="px-4 py-2 text-sm  hover:text-white hover:border-b hover:border-orange-500 focus:rounded-lg focus:ring-orange-500 focus:bg-orange-500/20 focus:border-none focus:text-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-0 "
                  href="/api/auth/logout"
                >
                  Logout
                </a>
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
                <a
                  className="px-4 py-2 text-sm  hover:text-white hover:border-b hover:border-orange-500 focus:rounded-lg focus:ring-orange-500 focus:bg-orange-500/20 focus:border-none focus:text-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-0 "
                  href="/api/auth/login"
                >
                  Login
                </a>
              </li>
              <li>
                <a
                  className="px-4 py-2 text-sm  hover:text-white hover:border-b hover:border-orange-500 focus:rounded-lg focus:ring-orange-500 focus:bg-orange-500/20 focus:border-none focus:text-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-0 "
                  href="/api/auth/login"
                >
                  Register
                </a>
              </li>
            </ul>
          )}
        </li>
      </ul>
      <button
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
          user={user}
          MobileLinkItem={MobileLinkItem}
        />
      )}
    </nav>
  );
};

export default Navbar;
