"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center space-x-2">
      <button
        type="button"
        onClick={() => setTheme("light")}
        className={`p-2 rounded-lg transition-colors ${
          theme === "light"
            ? "bg-primary text-white"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
        }`}
        title="Light mode"
      >
        <Sun className="h-4 w-4" />
      </button>

      <button
        type="button"
        onClick={() => setTheme("dark")}
        className={`p-2 rounded-lg transition-colors ${
          theme === "dark"
            ? "bg-primary text-white"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
        }`}
        title="Dark mode"
      >
        <Moon className="h-4 w-4" />
      </button>

      <button
        type="button"
        onClick={() => setTheme("system")}
        className={`p-2 rounded-lg transition-colors ${
          theme === "system"
            ? "bg-primary text-white"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
        }`}
        title="System theme"
      >
        <Monitor className="h-4 w-4" />
      </button>
    </div>
  );
}
