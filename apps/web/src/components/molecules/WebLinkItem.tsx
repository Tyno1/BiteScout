import Link from "next/link";

type WebLinkProps = {
  path: string;
  text: string;
  theme?: "dark" | "light";
};

export const WebLinkItem = ({
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
