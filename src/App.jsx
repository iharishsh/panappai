import React, { useEffect } from "react";
import { useAuthStore } from "./store/useAuthStore";
import { Header } from "./components/Header";
import { LoginPassword } from "./components/LoginPassword";
import { SeedPhrase } from "./components/SeedPhrase";
import { SolanaWallet } from "./components/SolanaWallet";
import { EthWallet } from "./components/EthWallet";

function App() {
  const { isLoggedIn, mnemonic, loadFromLocalStorage } = useAuthStore();

  useEffect(() => {
    loadFromLocalStorage();
  }, [loadFromLocalStorage]);

  let Content;

  if (!isLoggedIn) {
    Content = <LoginPassword />;
  } else if (!mnemonic) {
    Content = <SeedPhrase />;
  } else {
    Content = (
      <>
        <SolanaWallet />
        <EthWallet />
      </>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center">
        {Content}
      </main>
    </div>
  );
}

export default App;
