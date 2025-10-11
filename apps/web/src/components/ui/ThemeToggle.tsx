"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { IconButton } from "@/components/atoms";
import { useTheme } from "@/components/providers/ThemeProvider";

type ThemeToggleProps = {
  size?: "xs" | "sm" | "md" | "lg";
  parentTheme?: "dark" | "light";
};

export function ThemeToggle({ size = "md", parentTheme }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [selectedButton, setSelectedButton] = useState<
    "dark" | "light" | "system"
  >(theme);

  useEffect(() => {
    setSelectedButton(theme);
  }, [theme]);

  const getIconSize = () => {
    switch (size) {
      case "xs":
        return "h-3 w-3";
      case "sm":
        return "h-3.5 w-3.5";
      case "md":
        return "h-4 w-4";
      case "lg":
        return "h-5 w-5";
      default:
        return "h-4 w-4";
    }
  };

  return (
    <div className="flex items-center space-x-1">
      <IconButton
        type="button"
        onClick={() => {
          setTheme("light");
          setSelectedButton("light");
        }}
        variant="outline"
        color={selectedButton === "light" ? "primary" : "neutral"}
        size={size}
        className={`${selectedButton !== "light" && (theme === "dark" ? "border-white text-white" : "border-black text-black")}`}
        ariaLabel="Light mode"
        icon={<Sun className={getIconSize()} />}
      />

      <IconButton
        type="button"
        onClick={() => {
          setTheme("dark");
          setSelectedButton("dark");
        }}
        variant="outline"
        color={selectedButton === "dark" ? "primary" : "neutral"}
        size={size}
        className={`${selectedButton !== "dark" && (theme === "dark" || parentTheme === "dark" ? "border-white text-white hover:text-white" : "border-black text-black hover:text-black")}`}
        ariaLabel="Dark mode"
        icon={<Moon className={getIconSize()} />}
      />

      <IconButton
        type="button"
        onClick={() => {
          setTheme("system");
          setSelectedButton("system");
        }}
        variant="outline"
        color={selectedButton === "system" ? "primary" : "neutral"}
        size={size}
        className={`${selectedButton !== "system" && (theme === "dark" || parentTheme === "dark" ? "border-white text-white hover:text-white" : "border-black text-black hover:text-black")}`}
        ariaLabel="System theme"
        icon={<Monitor className={getIconSize()} />}
      />
    </div>
  );
}
