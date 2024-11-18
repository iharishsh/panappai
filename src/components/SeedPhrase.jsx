import React, { useState } from "react";
import { generateMnemonic } from "bip39";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useAuthStore } from "../store/useAuthStore";
import { toast } from "sonner";
import { Copy } from "lucide-react";

export const SeedPhrase = () => {
  const [mnemonic, setMnemonic] = useState("");
  const [seedWords, setSeedWords] = useState([]);
  const [isSeedGenerated, setIsSeedGenerated] = useState(false);
  const { setPasswordAndMnemonic, password } = useAuthStore();

  const handleGenerateSeedPhrase = async () => {
    const mn = await generateMnemonic();
    setMnemonic(mn);
    setSeedWords(mn.split(" "));
    setIsSeedGenerated(true);
  };

  const handleCopySeedPhrase = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(mnemonic);
      toast("Copied to clipboard!");
    } else {
      toast("Clipboard is not available in your environment.");
    }
  };

  const handleContinue = () => {
    setPasswordAndMnemonic(password, mnemonic);
  };

  return (
    <div className="flex flex-col items-center justify-center  gap-4">
      {!isSeedGenerated ? (
        <Button onClick={handleGenerateSeedPhrase}>Create Seed Phrase</Button>
      ) : (
        <div className="flex flex-col items-center gap-4" onClick={handleCopySeedPhrase}>
          <h2>Your Secret Phrase</h2>
          <div className="grid grid-cols-3 gap-2">
            {seedWords.map((word, index) => (
              <Input key={index} type="text" value={word} readOnly className="text-center cursor-pointer" />
            ))}
          </div>
          <div onClick={handleCopySeedPhrase} className="flex gap-3 items-center justify-start cursor-pointer text-sm p-5">
          <Copy size={20} />
          Click Anywhere To Copy
          </div>

          <Button onClick={handleContinue}>Continue</Button>
        </div>
      )}
    </div>
  );
};
