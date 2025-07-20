import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  useDivider?: boolean;
  className?: string;
  header?: ReactNode;
  footer?: ReactNode;
  fullWidth?: boolean;
  Component?: keyof JSX.IntrinsicElements;
  padding?: "sm" | "md" | "lg";
  shadow?: "sm" | "md" | "lg";
  onClick?: () => void;
};

export const Card = ({
  children,
  className,
  header,
  footer,
  fullWidth = false,
  padding = "md",
  shadow = "md",
  onClick,
  Component = "div",
  useDivider = false,
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

  const Element = Component;

  return (
    <Element
      className={cn(
        "bg-white rounded-lg overflow-hidden",
        paddingClasses[padding],
        shadowClasses[shadow],
        fullWidth ? "w-full" : "auto",
        onClick && "cursor-pointer hover:shadow-lg transition-shadow",
      )}
      onClick={onClick}
    >
      {header && (
        <>
          <div className="">{header}</div>
          {useDivider ? <div className="my-2 border-b border-gray-200" /> :  <div className="my-10 "/>}
        </>
      )}
      <div className={cn("", className)}>{children}</div>
      {footer && <div className="border-t border-gray-200 mt-2">{footer}</div>}
    </Element>
  );
};
