"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Laptop, Moon, Sun } from "lucide-react";
import { useState } from "react";

export function MobileThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by only rendering after mount
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-w-[200px] flex flex-row justify-center gap-5 items-center rounded-lg p-1">
      <Button
        variant={theme === "light" ? "default" : "ghost"}
        size="sm"
        onClick={() => setTheme("light")}
        className="flex flex-col items-center gap-1 px-3 py-2 h-auto"
      >
        <Sun className="h-4 w-4" />
        <span className="text-xs">Light</span>
      </Button>

      <Button
        variant={theme === "dark" ? "default" : "ghost"}
        size="sm"
        onClick={() => setTheme("dark")}
        className="flex flex-col items-center gap-1 px-3 py-2 h-auto"
      >
        <Moon className="h-4 w-4" />
        <span className="text-xs">Dark</span>
      </Button>

      <Button
        variant={theme === "system" ? "default" : "ghost"}
        size="sm"
        onClick={() => setTheme("system")}
        className="flex flex-col items-center gap-1 px-3 py-2 h-auto"
      >
        <Laptop className="h-4 w-4" />
        <span className="text-xs">System</span>
      </Button>
    </div>
  );
}

export default MobileThemeToggle;
