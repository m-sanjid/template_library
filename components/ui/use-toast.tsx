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
    <div className="fixed right-4 bottom-4 z-50">
      <div className="max-w-sm rounded-lg bg-white p-4 shadow-lg">
        <h3 className="font-semibold text-neutral-900">{title}</h3>
        {description && <p className="mt-1 text-neutral-600">{description}</p>}
      </div>
    </div>
  );
}
