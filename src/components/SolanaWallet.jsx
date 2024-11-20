import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { handleCopy, RevealableText } from "@/utils/utils";

export const SolanaWallet = ({ mnemonic }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { addWallet, wallets } = useAuthStore();

  const handleAddWallet = async () => {
    const seed = await mnemonicToSeed(mnemonic);
    const derivationPath = `m/44'/501'/${currentIndex}'/0'`;
    const derivedSeed = derivePath(derivationPath, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keypair = Keypair.fromSecretKey(secret);
    const walletData = {
      mnemonic,
      path: derivationPath,
      publicKey: keypair.publicKey.toBase58(),
      privateKey: Buffer.from(secret).toString("hex"),
    };
    addWallet("solana", walletData);
    setCurrentIndex(currentIndex + 1);
  };

  return (
    <div>
      <Button onClick={handleAddWallet}>Add SOL Wallet</Button>
      <div className="flex flex-col gap-4 mt-4">
        {wallets.solana.map((wallet, index) => (
          <Card key={index}>
            <CardHeader className="bg-primary-foreground rounded-lg mb-5">
              <CardTitle>Solana Wallet {index + 1}</CardTitle>
            </CardHeader>
            <CardContent>
            <div className="flex flex-col items-start gap-2 pb-5">
                <strong>Public Key:</strong>{" "}
                <span className="inline-block max-w-full overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer" onClick={() => handleCopy(wallet.publicKey)}>
                  {wallet.publicKey}
                </span>
              </div>
              <div>
                <strong>Private Key:</strong>{" "}
                <RevealableText text={wallet.privateKey} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
