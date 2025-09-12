import { X } from "lucide-react-native";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { cn } from "../lib/utils";

export type AlertStatus = "warning" | "information" | "error" | "success";

export interface AlertProps {
  status: AlertStatus;
  children: string;
  onClose?: () => void;
  dismissible?: boolean;
  className?: string;
  size?: "xs" | "sm" | "md" | "lg";
}

const statusConfig = {
  warning: {
    bgColor: "bg-accent/10",
    borderColor: "border-accent/20",
    textColor: "text-accent",
  },
  information: {
    bgColor: "bg-primary/10",
    borderColor: "border-primary/20",
    textColor: "text-primary",
  },
  error: {
    bgColor: "bg-destructive/10",
    borderColor: "border-destructive/20",
    textColor: "text-destructive",
  },
  success: {
    bgColor: "bg-success/10",
    borderColor: "border-success/20",
    textColor: "text-success",
  },
};

const sizeConfig = {
  xs: {
    padding: "p-2",
    textSize: "text-xs",
  },
  sm: {
    padding: "p-3",
    textSize: "text-sm",
  },
  md: {
    padding: "p-4",
    textSize: "text-base",
  },
  lg: {
    padding: "p-5",
    textSize: "text-lg",
  },
};

export function Alert({
  status,
  children,
  onClose,
  dismissible = false,
  className = "",
  size = "sm",
}: AlertProps) {
  const [isVisible, setIsVisible] = useState(true);
  const config = statusConfig[status];
  const sizeStyles = sizeConfig[size];

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  if (!isVisible) return null;

  return (
    <View
      className={cn(
        "rounded-lg border flex-row items-start",
        config.bgColor,
        config.borderColor,
        sizeStyles.padding,
        className
      )}
      role="alert"
    >
      {/* Content */}
      <Text className={cn("flex-1", config.textColor, sizeStyles.textSize)}>
        {children}
      </Text>

      {/* Close Button */}
      {dismissible && (
        <TouchableOpacity
          onPress={handleClose}
          className="ml-2 flex-shrink-0"
          accessibilityLabel="Close alert"
          accessibilityRole="button"
        >
          <X size={16} color="#6B7280" />
        </TouchableOpacity>
      )}
    </View>
  );
}
