import { Keypair } from "@solana/web3.js";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import React, { useState } from "react";
import nacl from "tweetnacl";

export const SolanaWallet = ({ mnemonic }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [publicKeys, setPublicKeys] = useState([]);

  return (
    <div>
      <button
        onClick={function () {
          const seed = mnemonicToSeed(mnemonic);
          const path = `m/44'/501'/${currentIndex}'/0'`;
          const derivedSeed = derivePath(path, seed.toString("hex")).key;
          const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
          const keypair = Keypair.fromSecretKey(secret);
          setCurrentIndex(currentIndex + 1);
          setPublicKeys([...publicKeys, keypair.publicKey]);
        }}
      >
        Add SOL Wallet
      </button>
      {publicKeys.map((p, index) => (
        <div key={index}>{p.toBase58()}</div>
      ))}
    </div>
  );
};
