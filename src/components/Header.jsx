import { Moon, Sun, WalletMinimal } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Switch } from "./ui/switch";
import { Badge } from "./ui/badge";

export const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    () => window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-black border-b-2 p-3 flex justify-between items-center">
      <div className="flex gap-3 text-xl font-semibold items-center">
        <WalletMinimal />
        Panappai
        <Badge variant="outline" className="font-extrabold">v1.1</Badge>
      </div>
      <div className="flex gap-3 items-center">
        <Sun className={isDarkMode ? "text-gray-500" : "text-yellow-500"} />
        <Switch checked={isDarkMode} onCheckedChange={setIsDarkMode} />
        <Moon className={isDarkMode ? "text-blue-500" : "text-gray-500"} />
      </div>
    </div>
  );
};
