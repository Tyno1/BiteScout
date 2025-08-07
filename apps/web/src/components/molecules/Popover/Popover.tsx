import {
  PopoverContent,
  PopoverTrigger,
  Popover as ShadcnPopover,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface PopoverProps {
  trigger: ReactNode;
  children: ReactNode;
  align?: "start" | "center" | "end";
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
  className?: string;
  triggerClassName?: string;
  color?: "primary" | "secondary" | "danger" | "success" | "neutral";
  variant?: "solid" | "outline" | "plain" | "glass";
}

export function Popover({
  trigger,
  children,
  align = "center",
  side = "bottom",
  sideOffset = 4,
  className = "",
  triggerClassName = "",
  color = "neutral",
  variant = "solid",
}: PopoverProps) {
  const colorStyles = {
    primary: `${
      variant === "plain"
        ? "bg-white border-primary/20 text-primary"
        : variant === "glass"
          ? "bg-primary/5 backdrop-blur-lg border-2 border-primary/30 text-primary"
          : variant === "solid"
            ? "bg-primary border-primary/70 text-primary-foreground"
            : "bg-white border-primary text-primary"
    }`,
    secondary: `${
      variant === "plain"
        ? "bg-white border-secondary/20 text-secondary"
        : variant === "glass"
          ? "bg-secondary/5 backdrop-blur-lg border-2 border-secondary/30 text-secondary"
          : variant === "solid"
            ? "bg-secondary border-secondary/70 text-secondary-foreground"
            : "bg-white border-secondary text-secondary"
    }`,
    danger: `${
      variant === "plain"
        ? "bg-white border-danger/20 text-danger"
        : variant === "glass"
          ? "bg-danger/5 backdrop-blur-lg border-2 border-danger/30 text-danger"
          : variant === "solid"
            ? "bg-danger border-danger/70 text-danger-foreground"
            : "bg-white border-danger text-danger"
    }`,
    success: `${
      variant === "plain"
        ? "bg-white border-success/20 text-success"
        : variant === "glass"
          ? "bg-success/5 backdrop-blur-lg border-2 border-success/30 text-success"
          : variant === "solid"
            ? "bg-success border-success/70 text-success-foreground"
            : "bg-white border-success text-success"
    }`,
    neutral: `${
      variant === "plain"
        ? "bg-white border-neutral/20 text-neutral"
        : variant === "glass"
          ? "bg-neutral/5 backdrop-blur-lg border border-neutral/20 text-neutral"
          : variant === "solid"
            ? "bg-neutral border-neutral/70 text-neutral-foreground"
            : "bg-white border-neutral/40 text-neutral"
    }`,
  };

  const baseStyles = "rounded-lg shadow-lg border transition-colors duration-200 p-4";

  return (
    <ShadcnPopover>
      <PopoverTrigger className={triggerClassName}>{trigger}</PopoverTrigger>
      <PopoverContent 
        className={cn(
          baseStyles,
          colorStyles[color],
          "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          className
        )} 
        align={align} 
        side={side} 
        sideOffset={sideOffset}
      >
        {children}
      </PopoverContent>
    </ShadcnPopover>
  );
} 