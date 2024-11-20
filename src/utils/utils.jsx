import { Button } from "@/components/ui/button";
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