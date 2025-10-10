"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { IconButton } from "@/components/atoms";
import { useTheme } from "@/components/providers/ThemeProvider";

type ThemeToggleProps = {
  size?: "xs" | "sm" | "md" | "lg";
};

export function ThemeToggle({ size = "md" }: ThemeToggleProps) {
  const { setTheme } = useTheme();
  const [selectedButton, setSelectedButton] = useState<
    "dark" | "light" | "system"
  >("dark");

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
        variant="solid"
        color={selectedButton === "light" ? "primary" : "neutral"}
        size={size}
        ariaLabel="Light mode"
        icon={<Sun className={getIconSize()} />}
      />

      <IconButton
        type="button"
        onClick={() => {
          setTheme("dark");
          setSelectedButton("dark");
        }}
        variant="solid"
        color={selectedButton === "dark" ? "primary" : "neutral"}
        size={size}
        ariaLabel="Dark mode"
        icon={<Moon className={getIconSize()} />}
      />

      <IconButton
        type="button"
        onClick={() => {
          setTheme("system");
          setSelectedButton("system");
        }}
        variant="solid"
        color={selectedButton === "system" ? "primary" : "neutral"}
        size={size}
        ariaLabel="System theme"
        icon={<Monitor className={getIconSize()} />}
      />
    </div>
  );
}
