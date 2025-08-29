import React from "react";

export default function Alert({ type = "success", title, message, onClose }) {
  const colors = {
    success: "bg-teal-100 border-teal-500 text-teal-900",
    error: "bg-red-100 border-red-500 text-red-900",
    warning: "bg-yellow-100 border-yellow-500 text-yellow-900",
  };

  return (
    <div
      className={`border-t-4 rounded-b px-4 py-3 shadow-md ${colors[type]}`}
      role="alert"
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="font-bold">{title}</p>
          <p className="text-sm">{message}</p>
        </div>
        <button onClick={onClose} className="ml-4 text-sm font-bold">
          ✖
        </button>
      </div>
    </div>
  );
}