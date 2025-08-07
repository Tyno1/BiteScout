import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type CardProps = {
  theme?: "dark" | "light" | undefined;
  children: ReactNode;
  useDivider?: boolean;
  className?: string;
  header?: ReactNode;
  footer?: ReactNode;
  fullWidth?: boolean;
  component?: keyof JSX.IntrinsicElements;
  padding?: "sm" | "md" | "lg";
  shadow?: "sm" | "md" | "lg";
  onClick?: () => void;
  containerClassName?: string;
};

export const Card = ({
  theme,
  children,
  className,
  header,
  footer,
  fullWidth = false,
  padding = "md",
  shadow = "md",
  onClick,
  component = "div",
  useDivider = false,
  containerClassName,
}: CardProps) => {
  const paddingClasses = {
    sm: "p-2",
    md: "p-4",
    lg: "p-6",
  };

  const shadowClasses = {
    sm: "shadow-sm",
    md: "shadow",
    lg: "shadow-lg",
  };

  const Element = component;

  const themeStyle = {
    light: "bg-card text-foreground",
    dark: "bg-foreground/70 text-background",
    undefined: "bg-card text-card-foreground",
  };

  return (
    <Element
      className={cn(
        "rounded-lg overflow-hidden",
        themeStyle[theme ?? "undefined"],
        paddingClasses[padding],
        shadowClasses[shadow],
        fullWidth ? "w-full" : "auto",
        onClick && "cursor-pointer hover:shadow-lg transition-shadow",
        containerClassName
      )}
      onClick={onClick}
    >
      {header && (
        <>
          <div className="">{header}</div>
          {useDivider ? (
            <div
              className={`my-2 border-b ${theme === "dark" ? "border-foreground/20" : "border-gray-200"}`}
            />
          ) : (
            <div className="my-10 " />
          )}
        </>
      )}
      <div className={cn("", className)}>{children}</div>
      {footer && <div className="border-t border-gray-200 mt-2">{footer}</div>}
    </Element>
  );
};
