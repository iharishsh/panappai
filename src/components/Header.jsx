import { LogOut, Moon, Star, Sun, WalletMinimal } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Switch } from "./ui/switch";
import { Badge } from "./ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { useAuthStore } from "@/store/useAuthStore";

export const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    () =>
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  const {
    logout,
  } = useAuthStore();

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleLogOut = () => {
    logout();
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-black border-b-2 p-3 flex justify-between items-center">
      <div className="flex gap-3 text-xl font-semibold items-center">
        <WalletMinimal />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>Panappai</TooltipTrigger>
            <TooltipContent>
              <a
                href="https://github.com/iharishsh/panappai"
                target="_blank"
                className="flex items-center justify-center gap-3"
              >
                <Star size={20} color="yellow" fill="#e3b341" /> Star on Github
              </a>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Badge variant="outline" className="font-extrabold">
          v1.3
        </Badge>
      </div>
      <div className="flex gap-3 items-center">
        <LogOut className="cursor-pointer" onClick={handleLogOut} />
        <Sun className={isDarkMode ? "text-gray-500" : "text-yellow-500"} />
        <Switch checked={isDarkMode} onCheckedChange={setIsDarkMode} />
        <Moon className={isDarkMode ? "text-blue-500" : "text-gray-500"} />
      </div>
    </div>
  );
};
