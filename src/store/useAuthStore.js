import { create } from "zustand";
import CryptoJS from "crypto-js";

export const useAuthStore = create((set) => ({
  isLoggedIn: false,
  isLoggedOut: false,
  password: null,
  mnemonic: null,
  wallets: { solana: [], eth: [] },
  setPasswordAndMnemonic: (password, mnemonic) => {
    const encryptedPassword = CryptoJS.SHA256(password).toString();
    localStorage.setItem("password", encryptedPassword);
    localStorage.setItem("mnemonic", mnemonic);
    set({ password: encryptedPassword, mnemonic, isLoggedIn: true });
  },
  resetPassword: (password) => {
    const encryptedPassword = CryptoJS.SHA256(password).toString();
    localStorage.setItem("password", encryptedPassword);
    set({ password: encryptedPassword });
  },
  addWallet: (type, walletData) => {
    set((state) => {
      const updatedWallets = { ...state.wallets };
      updatedWallets[type] = [...updatedWallets[type], walletData];
      localStorage.setItem("wallets", JSON.stringify(updatedWallets));
      return { wallets: updatedWallets };
    });
  },
  removeWallet: (type, index) => {
    set((state) => {
      const updatedWallets = { ...state.wallets };
      updatedWallets[type] = updatedWallets[type].filter((_, i) => i !== index);
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
  logout: () => {
    set({ isLoggedIn: false });
  }
}));
