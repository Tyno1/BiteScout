import { AlertCircle, CheckCircle, Info, X, XCircle } from "lucide-react";
import { useState } from "react";

export type AlertStatus = "warning" | "information" | "error" | "success";

export interface AlertProps {
  status: AlertStatus;
  children: string;
  onClose?: () => void;
  dismissible?: boolean;
  className?: string;
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
}: AlertProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const config = statusConfig[status];

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  if (!isVisible) return null;

  return (
    <div
      className={`rounded-lg border p-4 ${config.bgColor} ${config.borderColor} ${className}`}
      role="alert"
    >
      <div className={`flex items-start text-sm ${config.textColor}`}>
        <p className="break-words">{children}</p>

        {dismissible && (
          <div className="ml-auto pl-3 flex-shrink-0">
            <button
              type="button"
              className={`inline-flex rounded-md ${config.bgColor} ${config.textColor} hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-yellow-50 focus:ring-yellow-600`}
              onClick={handleClose}
              aria-label="Close alert"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
