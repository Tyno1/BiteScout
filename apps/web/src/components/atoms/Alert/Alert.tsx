import { AlertCircle, CheckCircle, Info, X, XCircle } from "lucide-react";
import { useState } from "react";
import { IconButton } from "../IconButton";

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
    icon: AlertCircle,
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    textColor: "text-yellow-800",
    iconColor: "text-yellow-400",
  },
  information: {
    icon: Info,
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-800",
    iconColor: "text-blue-400",
  },
  error: {
    icon: XCircle,
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    textColor: "text-red-800",
    iconColor: "text-red-400",
  },
  success: {
    icon: CheckCircle,
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    textColor: "text-green-800",
    iconColor: "text-green-400",
  },
};

export const Alert = ({
  status,
  children,
  onClose,
  dismissible = false,
  className = "",
  size = "sm",
}: AlertProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const config = statusConfig[status];
  const Icon = config.icon;

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  if (!isVisible) return null;

  return (
    <div
      className={`rounded-lg border p-2 ${config.bgColor} ${config.borderColor} ${className}`}
      role="alert"
    >
      <div className={`flex items-start text-${size} ${config.textColor}`}>
        <Icon className={`h-5 w-5 flex-shrink-0 ${config.iconColor} mr-2`} />
        <p className="break-words">{children}</p>

        {dismissible && (
          <div className="ml-auto pl-3 flex-shrink-0">

            <IconButton
              variant="plain"
              color="danger"
              size="sm"
              icon={<X className="h-4 w-4" />}
              onClick={handleClose}
              aria-label="Close alert"
            />
          </div>
        )}
      </div>
    </div>
  );
};
