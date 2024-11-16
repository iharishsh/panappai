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
    <div className="flex justify-between m-5">
      <div className="flex gap-3 text-xl font-semibold items-center justify-center rounded-md p-2">
        <WalletMinimal />
        Panappai
        <Badge variant="outline" className={'font-extrabold'}>v1</Badge>
      </div>
      <div className="flex gap-3 items-center">
        <Sun className={isDarkMode ? "text-gray-500" : "text-yellow-500"} />
        <Switch checked={isDarkMode} onCheckedChange={setIsDarkMode} />
        <Moon className={isDarkMode ? "text-blue-500" : "text-gray-500"} />
      </div>
    </div>
  );
};
