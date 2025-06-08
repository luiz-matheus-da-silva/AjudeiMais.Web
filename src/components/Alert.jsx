import React, { useEffect, useState } from "react";
import {
  CrossCircledIcon,
  CheckCircledIcon,
  InfoCircledIcon,
  ExclamationTriangleIcon,
} from "@radix-ui/react-icons";

const icons = {
  success: CheckCircledIcon,
  danger: CrossCircledIcon,
  warning: ExclamationTriangleIcon,
  info: InfoCircledIcon,
};

const colors = {
  success: {
    border: "border-green-500",
    text: "text-green-700",
    bar: "bg-green-500",
  },
  danger: {
    border: "border-red-500",
    text: "text-red-700",
    bar: "bg-red-500",
  },
  warning: {
    border: "border-yellow-500",
    text: "text-yellow-700",
    bar: "bg-yellow-500",
  },
  info: {
    border: "border-blue-500",
    text: "text-blue-700",
    bar: "bg-blue-500",
  },
};

export function Alert({ type = "info", children, onClose, duration = 5000 }) {
  const Icon = icons[type];
  const { border, text, bar } = colors[type] || colors.info;

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => {
        if (onClose) onClose();
      }, 300); // aguarda o fade-out
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div
      className={`fixed bottom-4 left-4 z-50 max-w-sm w-full transition-all duration-300 ease-in-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div
        role="alert"
        className={`flex items-start gap-3 border-l-4 ${border} ${text} bg-white px-4 py-3 rounded-md shadow-lg relative overflow-hidden`}
      >
        <Icon className="w-5 h-5 mt-1 flex-shrink-0" />
        <p className="text-sm font-medium">{children}</p>

        {/* Barrinha animada */}
        <div
          className={`absolute bottom-0 left-0 h-1 ${bar}`}
          style={{
            width: "100%",
            animation: `shrinkBar ${duration}ms linear forwards`,
          }}
        ></div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes shrinkBar {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
}
