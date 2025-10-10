"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export interface AccordionItem {
  id: string;
  title: string;
  content: string | React.ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  variant?: "default" | "bordered" | "elevated";
  size?: "sm" | "md" | "lg";
  allowMultiple?: boolean;
  defaultOpen?: string[];
  className?: string;
  containerClassName?: string;
  onItemToggle?: (itemId: string, isOpen: boolean) => void;
}

export function Accordion({
  items,
  variant = "default",
  size = "md",
  allowMultiple = false,
  defaultOpen = [],
  className = "",
  containerClassName = "",
  onItemToggle,
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>(defaultOpen);

  const toggleItem = (itemId: string) => {
    if (allowMultiple) {
      const newOpenItems = openItems.includes(itemId)
        ? openItems.filter((id) => id !== itemId)
        : [...openItems, itemId];
      setOpenItems(newOpenItems);
      onItemToggle?.(itemId, !openItems.includes(itemId));
    } else {
      const newOpenItems = openItems.includes(itemId) ? [] : [itemId];
      setOpenItems(newOpenItems);
      onItemToggle?.(itemId, !openItems.includes(itemId));
    }
  };

  const variantStyles = {
    default: "border-b border-border last:border-b-0",
    bordered: "border border-border rounded-lg mb-2 last:mb-0",
    elevated: "shadow-sm rounded-lg mb-3 last:mb-0 bg-card",
  };

  const sizeStyles = {
    sm: {
      header: "px-4 py-3",
      content: "px-4 pb-3",
      title: "text-sm",
      contentText: "text-sm",
    },
    md: {
      header: "px-6 py-4",
      content: "px-6 pb-4",
      title: "text-base",
      contentText: "text-base",
    },
    lg: {
      header: "px-8 py-6",
      content: "px-8 pb-6",
      title: "text-lg",
      contentText: "text-lg",
    },
  };

  return (
    <div className={cn("w-full", containerClassName)}>
      {items.map((item) => {
        const isOpen = openItems.includes(item.id);
        const isDisabled = item.disabled;

        return (
          <div
            key={item.id}
            className={cn("transition-all duration-200", variantStyles[variant], className)}
          >
            <button
              type="button"
              onClick={() => !isDisabled && toggleItem(item.id)}
              disabled={isDisabled}
              className={cn(
                "w-full flex items-center justify-between text-left transition-all duration-200",
                sizeStyles[size].header,
                "hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2",
                isDisabled && "opacity-50 cursor-not-allowed",
                variant === "bordered" && "rounded-t-lg",
                variant === "elevated" && "rounded-t-lg"
              )}
              aria-expanded={isOpen}
              aria-disabled={isDisabled}
            >
              <h3
                className={cn(
                  "font-semibold text-foreground transition-colors duration-200",
                  sizeStyles[size].title,
                  isOpen && "text-primary",
                  isDisabled && "text-muted-foreground"
                )}
              >
                {item.title}
              </h3>
              <div className="flex-shrink-0 ml-4">
                {isOpen ? (
                  <ChevronUp className="w-5 h-5 text-primary transition-transform duration-200" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-card-foreground transition-transform duration-200" />
                )}
              </div>
            </button>

            {isOpen && (
              <div
                className={cn(
                  "overflow-hidden transition-all duration-300 ease-in-out",
                  sizeStyles[size].content
                )}
              >
                <div
                  className={cn(
                    "text-card-foreground leading-relaxed",
                    sizeStyles[size].contentText
                  )}
                >
                  {typeof item.content === "string" ? (
                    <p className="font-light">{item.content}</p>
                  ) : (
                    item.content
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
