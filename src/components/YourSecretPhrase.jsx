import React, { useEffect, useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { Copy } from "lucide-react";

export const YourSecretPhrase = () => {
  const [mnemonic, setMnemonic] = useState(Array(12).fill(""));

  // Load mnemonic from localStorage on mount
  useEffect(() => {
    const storedMnemonic = localStorage.getItem("mnemonic");
    if (storedMnemonic) {
      setMnemonic(storedMnemonic.split(" "));
    }
  }, []);

  const handleCopySeedPhrase = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(mnemonic.join(" "));
      toast("Copied to clipboard!");
    } else {
      toast("Clipboard is not available in your environment.");
    }
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Your Secret Phrase</Button>
      </DrawerTrigger>
      <DrawerContent onClick={handleCopySeedPhrase}>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Secret Phrase</DrawerTitle>
            <DrawerDescription>
              <div className="flex gap-3 items-center justify-center cursor-pointer text-sm p-5">
                <Copy size={20} />
                <div>
                  Click Anywhere To Copy. <br />
                  Don't Share to anyone!
                </div>
              </div>
            </DrawerDescription>
          </DrawerHeader>
          <div className="grid grid-cols-3 gap-2">
            {mnemonic.map((word, index) => (
              <Input
                key={index}
                type="text"
                value={word}
                readOnly
                className="text-center cursor-pointer"
              />
            ))}
          </div>
          <DrawerFooter onClick={(e) => e.stopPropagation()}>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
