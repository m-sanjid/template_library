"use client";

import { useState } from "react";

interface Toast {
  title: string;
  description?: string;
  duration?: number;
}

interface ToastContextValue {
  toast: (props: Toast) => void;
}

export function useToast(): ToastContextValue {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = ({ title, description, duration = 3000 }: Toast) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { title, description, duration }]);

    // Remove toast after duration
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t !== toasts[id]));
    }, duration);
  };

  return { toast };
}

// Toast component
export function Toast({ title, description }: Toast) {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white rounded-lg shadow-lg p-4 max-w-sm">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        {description && <p className="text-gray-600 mt-1">{description}</p>}
      </div>
    </div>
  );
} 