import React, { useState } from "react";
import { generateMnemonic } from "bip39";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useAuthStore } from "../store/useAuthStore";

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
      alert("Seed phrase copied to clipboard!");
    } else {
      alert("Clipboard functionality is not available in your environment.");
    }
  };

  const handleContinue = () => {
    setPasswordAndMnemonic(password, mnemonic);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      {!isSeedGenerated ? (
        <Button onClick={handleGenerateSeedPhrase}>Create Seed Phrase</Button>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <div className="grid grid-cols-3 gap-2">
            {seedWords.map((word, index) => (
              <Input key={index} type="text" value={word} readOnly className="text-center" />
            ))}
          </div>
          <Button onClick={handleCopySeedPhrase}>Copy Seed Phrase</Button>
          <Button onClick={handleContinue}>Continue</Button>
        </div>
      )}
    </div>
  );
};
