import { useState } from "react";
import "./App.css";
import { generateMnemonic } from "bip39";
import { SolanaWallet } from "./components/SolanaWallet";
import { EthWallet } from "./components/EthWallet";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";

function App() {
  const [mnemonic, setMnemonic] = useState("");

  return (
    <>
      <Input
        type="text"
        value={mnemonic}
        onChange={(e) => setMnemonic(e.target.value)}
      />
      <Button
        onClick={async function () {
          const mn = await generateMnemonic();
          setMnemonic(mn);
        }}
      >
        Create Seed Phrase
      </Button>
      <SolanaWallet mnemonic={mnemonic} />
      <EthWallet mnemonic={mnemonic} />
    </>
  );
}

export default App;
