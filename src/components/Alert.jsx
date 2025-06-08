import React, { useEffect } from "react";
import { CrossCircledIcon, CheckCircledIcon, InfoCircledIcon, ExclamationTriangleIcon } from "@radix-ui/react-icons";

const icons = {
  success: CheckCircledIcon,
  danger: CrossCircledIcon,
  warning: ExclamationTriangleIcon,
  info: InfoCircledIcon,
};

const colors = {
  success: "border-green-500 text-green-700",
  danger: "border-red-500 text-red-700",
  warning: "border-yellow-500 text-yellow-700",
  info: "border-blue-500 text-blue-700",
};

export function Alert({ type = "info", children, onClose, duration = 5000 }) {
  const Icon = icons[type];
  const colorClasses = colors[type] || colors.info;

  useEffect(() => {
    if (!onClose) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div
      role="alert"
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 flex items-center gap-3 border-l-4 bg-white px-4 py-3 rounded-md shadow-sm ${colorClasses} max-w-md z-50`}
    >
      <Icon
        className="w-6 h-6 animate-pulse"
        aria-hidden="true"
      />
      <p className="text-sm font-medium">{children}</p>
    </div>
  );
}
