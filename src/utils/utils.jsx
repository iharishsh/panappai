import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const truncateText = (text, startLength = 6, endLength = 4) => {
  if (text.length <= startLength + endLength) return text;
  return `••••••••••••••••`;
};

export const RevealableText = ({ text }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="flex items-center">
      <span className="overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer" onClick={() => handleCopy(text)}>
        {isVisible ? text : truncateText(text)}
      </span>
      <Button variant="ghost" onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? <EyeOff /> : <Eye />}
      </Button>
    </div>
  );
};

export const handleCopy = (text) => {
  if (navigator?.clipboard?.writeText) {
    navigator.clipboard.writeText(text);
    toast("Copied to clipboard!");
  } else {
    toast("Clipboard is not available in your environment.");
  }
};

export const handleDelete = (type, index) => {
  return new Promise((resolve) => {
    const wallets = JSON.parse(localStorage.getItem("wallets")) || {
      solana: [],
      eth: [],
    };
    if (wallets[type]) {
      wallets[type].splice(index, 1);
      localStorage.setItem("wallets", JSON.stringify(wallets));
    }
    // Notify Zustand store to update its state
    const removeWallet = useAuthStore.getState().removeWallet;
    removeWallet(type, index);

    resolve();
  });
};