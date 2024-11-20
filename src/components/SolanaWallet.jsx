import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { handleCopy, handleDelete, RevealableText } from "@/utils/utils";
import { toast } from "sonner";
import { DeleteAlert } from "./DeleteAlert";
import { Trash2 } from "lucide-react";

export const SolanaWallet = ({ mnemonic }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { addWallet, wallets, loadFromLocalStorage } = useAuthStore();

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
    toast("Solana Wallet generated successfully!");
  };

  const deleteWallet = async (index) => {
    await handleDelete("solana", index);
    loadFromLocalStorage();
    toast("Wallet deleted successfully!");
  };

  const clearSolWallets = async () => {
    const solWalletsLength = wallets.solana.length;
  
    for (let i = solWalletsLength - 1; i >= 0; i--) {
      await handleDelete("solana", i);
    }
  
    loadFromLocalStorage();
    toast("All Solana wallets cleared successfully!");
  };
  

  return (
    <div>
      <div className="flex items-center justify-between">
        <Button onClick={handleAddWallet}>Add SOL Wallet</Button>
        <DeleteAlert onConfirm={clearSolWallets}>
          <Button variant="destructive">Clear SOL Wallets</Button>
        </DeleteAlert>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        {wallets.solana.map((wallet, index) => (
          <Card key={index}>
            <CardHeader className="bg-primary-foreground rounded-lg mb-5 flex flex-row justify-between items-center">
              <CardTitle>Solana Wallet {index + 1}</CardTitle>
              <DeleteAlert onConfirm={() => deleteWallet(index)}>
                <Trash2 className="cursor-pointer" color="red" />
              </DeleteAlert>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-start gap-2 pb-5">
                <strong>Public Key:</strong>{" "}
                <span
                  className="inline-block max-w-full overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer"
                  onClick={() => handleCopy(wallet.publicKey)}
                >
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
