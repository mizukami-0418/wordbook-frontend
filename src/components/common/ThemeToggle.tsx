"use client";

import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

type ThemeToggleProps = {
  variant?: "icon" | "button";
  className?: string;
};

export function ThemeToggle({
  variant = "icon",
  className = "cursor-pointer rounded-full p-2 transition hover:bg-muted focus:outline-none focus-visible:ring",
}: ThemeToggleProps) {
  const { isDark, toggleTheme } = useTheme();

  if (variant === "button") {
    return (
      <button
        onClick={toggleTheme}
        className={cn(
          "rounded-md border px-4 py-2 text-sm hover:bg-secondary transition",
          className,
        )}
        aria-label="Toggle dark mode"
      >
        {isDark ? "☀️ ライトモード" : "🌙 ダークモード"}
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={className}
      aria-label="Toggle dark mode"
    >
      {isDark ? "☀️" : "🌙"}
    </button>
  );
}

export function ThemeToggleIcon({
  className = "cursor-pointer rounded-full p-2 transition hover:bg-muted focus:outline-none focus-visible:ring",
}: ThemeToggleProps) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={className}
      aria-label="Toggle dark mode"
    >
      {isDark ? "☀️" : "🌙"}
    </button>
  );
}
