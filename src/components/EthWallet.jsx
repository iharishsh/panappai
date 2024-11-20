import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { mnemonicToSeed } from "bip39";
import { Wallet } from "ethers";
import { HDNodeWallet } from "ethers";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { handleCopy, handleDelete, RevealableText } from "@/utils/utils";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { DeleteAlert } from "./DeleteAlert";

export const EthWallet = ({ mnemonic }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { addWallet, wallets, loadFromLocalStorage } = useAuthStore();

  const handleAddWallet = async () => {
    const seed = await mnemonicToSeed(mnemonic);
    const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
    const hdNode = HDNodeWallet.fromSeed(seed);
    const child = hdNode.derivePath(derivationPath);
    const wallet = new Wallet(child.privateKey);
    const walletData = {
      mnemonic,
      path: derivationPath,
      publicKey: wallet.address,
      privateKey: child.privateKey,
    };
    addWallet("eth", walletData);
    setCurrentIndex(currentIndex + 1);
    toast("Eth Wallet generated successfully!");
  };

  const deleteWallet = async (index) => {
    await handleDelete("eth", index);
    loadFromLocalStorage();
    toast("Wallet deleted successfully!");
  };

  const clearEthWallets = async () => {
    const ethWalletsLength = wallets.eth.length;
  
    for (let i = ethWalletsLength - 1; i >= 0; i--) {
      await handleDelete("eth", i);
    }
  
    loadFromLocalStorage();
    toast("All Ethereum wallets cleared successfully!");
  };
  

  return (
    <div>
      <div className="flex items-center justify-between">
        <Button onClick={handleAddWallet}>Add ETH Wallet</Button>
        <DeleteAlert onConfirm={clearEthWallets}>
          <Button variant="destructive">Clear ETH Wallets</Button>
        </DeleteAlert>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        {wallets.eth.map((wallet, index) => (
          <Card key={index}>
            <CardHeader className="bg-primary-foreground rounded-lg mb-5 flex flex-row justify-between items-center">
              <CardTitle>Ethereum Wallet {index + 1}</CardTitle>
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
