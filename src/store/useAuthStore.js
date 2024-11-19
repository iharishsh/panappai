import { create } from "zustand";
import CryptoJS from "crypto-js";

export const useAuthStore = create((set) => ({
  isLoggedIn: false,
  password: null,
  mnemonic: null,
  wallets: { solana: [], eth: [] },
  setPasswordAndMnemonic: (password, mnemonic) => {
    const encryptedPassword = CryptoJS.SHA256(password).toString();
    localStorage.setItem("password", encryptedPassword);
    localStorage.setItem("mnemonic", mnemonic);
    set({ password: encryptedPassword, mnemonic, isLoggedIn: true });
  },
  addWallet: (type, walletData) => {
    set((state) => {
      const updatedWallets = { ...state.wallets };
      updatedWallets[type] = [...updatedWallets[type], walletData];
      localStorage.setItem("wallets", JSON.stringify(updatedWallets));
      return { wallets: updatedWallets };
    });
  },
  loadFromLocalStorage: () => {
    const password = localStorage.getItem("password");
    const mnemonic = localStorage.getItem("mnemonic");
    const wallets = JSON.parse(localStorage.getItem("wallets")) || { solana: [], eth: [] };
    set({ password, mnemonic, isLoggedIn: !!password, wallets });
  },
}));
