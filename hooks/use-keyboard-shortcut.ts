import { useEffect } from "react";

type KeyboardShortcut = {
  key: string;
  ctrlKey?: boolean;
  metaKey?: boolean;
  altKey?: boolean;
  shiftKey?: boolean;
  callback: () => void;
};

export function useKeyboardShortcut(shortcuts: KeyboardShortcut[]) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      shortcuts.forEach((shortcut) => {
        if (
          event.key.toLowerCase() === shortcut.key.toLowerCase() &&
          (!shortcut.ctrlKey || event.ctrlKey) &&
          (!shortcut.metaKey || event.metaKey) &&
          (!shortcut.altKey || event.altKey) &&
          (!shortcut.shiftKey || event.shiftKey)
        ) {
          event.preventDefault();
          shortcut.callback();
        }
      });
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [shortcuts]);
}
