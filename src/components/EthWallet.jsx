import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { mnemonicToSeed } from "bip39";
import { Wallet } from "ethers";
import { HDNodeWallet } from "ethers";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { RevealableText } from "@/utils/utils";

export const EthWallet = ({ mnemonic }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { addWallet, wallets } = useAuthStore();

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
  };

  return (
    <div>
      <Button onClick={handleAddWallet}>Add ETH Wallet</Button>
      <div className="flex flex-col gap-4 mt-4">
        {wallets.eth.map((wallet, index) => (
          <Card key={index}>
            <CardHeader className="bg-primary-foreground rounded-lg mb-5">
              <CardTitle>Ethereum Wallet {index + 1}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-start gap-2 pb-5">
                <strong>Public Key:</strong>{" "}
                <span className="inline-block max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
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
