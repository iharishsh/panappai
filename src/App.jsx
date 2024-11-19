import React, { useEffect } from "react";
import { useAuthStore } from "./store/useAuthStore";
import { Header } from "./components/Header";
import { LoginPassword } from "./components/LoginPassword";
import { SeedPhrase } from "./components/SeedPhrase";
import { SolanaWallet } from "./components/SolanaWallet";
import { EthWallet } from "./components/EthWallet";
import { Footer } from "./components/Footer";
import { Toaster } from "./components/ui/sonner";
import { YourSecretPhrase } from "./components/YourSecretPhrase";

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
      <div className="flex gap-5">
        <YourSecretPhrase />
        <SolanaWallet />
        <EthWallet />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <Toaster />
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center mt-20 mb-20">
        {Content}
      </main>
      <Footer />
    </div>
  );
}

export default App;
