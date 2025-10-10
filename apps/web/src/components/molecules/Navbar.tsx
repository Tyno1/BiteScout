"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useCallback, useState } from "react";
import { Button } from "../atoms";
import { ThemeToggle } from "../ui/ThemeToggle";
import { MobileNav } from "./MobileNav";

type NavTheme = {
	theme?: "dark" | "light";
};

type MobileLinkProp = {
	path: string;
	text: string;
	theme?: "dark" | "light";
	parentTheme?: "dark" | "light";
	toggleMenu?: () => void;
};

type WebLinkProps = {
  path: string;
  text: string;
  theme?: "dark" | "light";
};

const MobileLinkItem = ({
	path,
	text,
	theme: linkTheme,
	parentTheme,
	toggleMenu,
}: MobileLinkProp) => {
	// Conditional theme-based styling
	const getThemeStyles = () => {
		if (linkTheme) {
			// Use provided theme
			return linkTheme === "dark" ? "text-white" : "text-black";
		}
		// Use parent theme as fallback
		return parentTheme === "dark"
			? "text-white"
			: parentTheme === "light"
				? "text-black"
				: "text-foreground";
	};

  const getHoverStyles = () => {
    if (linkTheme) {
      // Theme-specific hover styles
      return linkTheme === "dark"
        ? "hover:bg-white hover:text-black"
        : "hover:bg-black hover:text-white";
    }
    // Default hover styles
    return "hover:bg-black hover:text-white";
  };

  return (
    <Link
      href={path}
      onClick={toggleMenu}
      className={`block px-3 py-6 text-base font-medium transition-colors duration-200 ${getThemeStyles()} ${getHoverStyles()}`}
    >
      {text}
    </Link>
  );
};

const WebLinkItem = ({
  path,
  text,
  theme: linkTheme,
  parentTheme,
  toggleMenu,
}: WebLinkProps & {
  parentTheme?: "dark" | "light";
  toggleMenu: () => void;
}) => {
  // Conditional theme-based styling
  const getThemeStyles = () => {
    if (linkTheme) {
      // Use provided theme
      return linkTheme === "dark" ? "text-white" : "text-black";
    }
    // Use parent theme as fallback
    return parentTheme === "dark"
      ? "text-white"
      : parentTheme === "light"
        ? "text-black"
        : "text-foreground";
  };

  const getHoverStyles = () => {
    if (linkTheme) {
      // Theme-specific hover styles
      return linkTheme === "dark"
        ? "hover:text-white hover:border-primary"
        : "hover:text-black hover:border-primary";
    }
    // Default hover styles
    return "hover:text-foreground hover:border-primary";
  };

  const getFocusStyles = () => {
    if (linkTheme) {
      // Theme-specific focus styles
      return linkTheme === "dark"
        ? "focus:text-white focus:bg-primary/20 focus:ring-primary"
        : "focus:text-black focus:bg-primary/20 focus:ring-primary";
    }
    // Default focus styles
    return "focus:text-primary focus:bg-primary/20 focus:ring-primary";
  };

  return (
    <Link
      href={path}
      onClick={toggleMenu}
      className={`px-4 py-2 text-sm border-b border-transparent transition-colors duration-200 ${getThemeStyles()} ${getHoverStyles()} ${getFocusStyles()} focus:rounded-lg focus:border-none focus:outline-none focus:ring-2 focus:ring-offset-0`}
    >
      {text}
    </Link>
  );
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

  return (
    <nav
      className={`w-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20 sticky top-0 z-50 overflow-none ${
        theme === "dark"
          ? "bg-black text-white"
          : theme === "light"
            ? "bg-white text-black"
            : "bg-background text-foreground"
      }`}
    >
      <Link href="/" className="flex-shrink-0 text-primary-foreground">
        <Image src="/logo.png" alt="Bite Scout" width={120} height={40} />
      </Link>
      {/* web view */}
      <ul className="hidden md:flex ml-4 flex items-center">
        <li>
          <WebLinkItem
            text="Home"
            path="/"
            theme={theme}
            parentTheme={theme}
            toggleMenu={toggleMenu}
          />
        </li>
        <li>
          <WebLinkItem
            text="About"
            path="/about"
            theme={theme}
            parentTheme={theme}
            toggleMenu={toggleMenu}
          />
        </li>
        <li>
          <WebLinkItem
            text="Services"
            path="/services"
            theme={theme}
            parentTheme={theme}
            toggleMenu={toggleMenu}
          />
        </li>
        <li>
          <WebLinkItem
            text="Contact"
            path="/contact"
            theme={theme}
            parentTheme={theme}
            toggleMenu={toggleMenu}
          />
        </li>

        <li>
          {session ? (
            <ul className="auth flex ml-20 items-center gap-2">
              <li>
                <WebLinkItem
                  text="Dashboard"
                  path="/dashboard"
                  theme={theme}
                  parentTheme={theme}
                  toggleMenu={toggleMenu}
                />
              </li>
              <li>
                <Button
                  variant="solid"
                  size="sm"
                  text="Logout"
                  type="button"
                  onClick={() => signOut({ redirectTo: "/" })}
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
        <li className="hidden lg:block ml-4">
          <ThemeToggle />
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
          parentTheme={theme}
        />
      )}
    </nav>
  );
}
