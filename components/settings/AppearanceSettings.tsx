"use client";

import { useEffect, useState } from "react";
import {
  Monitor,
  Moon,
  Sun,
} from "lucide-react";

type Theme =
  | "light"
  | "dark"
  | "system";

interface Props {
  initialTheme?: Theme;
}

function getInitialTheme(
  initialTheme: Theme
): Theme {
  if (
    typeof window === "undefined"
  ) {
    return initialTheme;
  }

  const saved =
    window.localStorage.getItem(
      "apex-theme"
    );

  if (
    saved === "light" ||
    saved === "dark" ||
    saved === "system"
  ) {
    return saved;
  }

  return initialTheme;
}

function applyTheme(
  theme: Theme
) {
  const root =
    document.documentElement;

  if (theme === "dark") {
    root.classList.add("dark");
    return;
  }

  if (theme === "light") {
    root.classList.remove("dark");
    return;
  }

  const prefersDark =
    window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

  root.classList.toggle(
    "dark",
    prefersDark
  );
}

export default function AppearanceSettings({
  initialTheme = "system",
}: Props) {
  const [theme, setTheme] =
    useState<Theme>(() =>
      getInitialTheme(initialTheme)
    );

  /*
   * Synchronize the selected theme
   * with the document.
   *
   * No setState() is performed here.
   */
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  /*
   * Keep "System" mode synchronized if
   * the operating system theme changes.
   */
  useEffect(() => {
    if (theme !== "system") {
      return;
    }

    const media =
      window.matchMedia(
        "(prefers-color-scheme: dark)"
      );

    function handleChange() {
      applyTheme("system");
    }

    media.addEventListener(
      "change",
      handleChange
    );

    return () => {
      media.removeEventListener(
        "change",
        handleChange
      );
    };
  }, [theme]);

  function changeTheme(
    newTheme: Theme
  ) {
    setTheme(newTheme);

    window.localStorage.setItem(
      "apex-theme",
      newTheme
    );
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}

      <div className="border-b border-slate-200 p-6">
        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-purple-100 p-3 text-purple-700">
            <Monitor className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Appearance
            </h2>

            <p className="text-sm text-slate-500">
              Choose how your banking dashboard looks.
            </p>
          </div>

        </div>
      </div>

      {/* Theme options */}

      <div className="grid gap-4 p-6 md:grid-cols-3">

        <ThemeOption
          icon={Sun}
          title="Light"
          description="Always use the light appearance."
          selected={theme === "light"}
          onClick={() =>
            changeTheme("light")
          }
        />

        <ThemeOption
          icon={Moon}
          title="Dark"
          description="Always use the dark appearance."
          selected={theme === "dark"}
          onClick={() =>
            changeTheme("dark")
          }
        />

        <ThemeOption
          icon={Monitor}
          title="System"
          description="Follow your device preference."
          selected={theme === "system"}
          onClick={() =>
            changeTheme("system")
          }
        />

      </div>

    </section>
  );
}

function ThemeOption({
  icon: Icon,
  title,
  description,
  selected,
  onClick,
}: {
  icon: React.ComponentType<{
    className?: string;
  }>;
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`rounded-2xl border p-5 text-left transition ${
        selected
          ? "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-100"
          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
      }`}
    >

      <div
        className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${
          selected
            ? "bg-emerald-600 text-white"
            : "bg-slate-100 text-slate-600"
        }`}
      >
        <Icon className="h-5 w-5" />
      </div>

      <h3 className="font-semibold text-slate-900">
        {title}
      </h3>

      <p className="mt-1 text-sm leading-5 text-slate-500">
        {description}
      </p>

      {selected && (
        <p className="mt-3 text-xs font-semibold text-emerald-600">
          Currently selected
        </p>
      )}

    </button>
  );
}