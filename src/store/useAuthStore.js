import { create } from "zustand";
import CryptoJS from "crypto-js";

export const useAuthStore = create((set) => ({
  isLoggedIn: false,
  password: null,
  mnemonic: null,
  setPasswordAndMnemonic: (password, mnemonic) => {
    const encryptedPassword = CryptoJS.SHA256(password).toString(); // Hash the password
    localStorage.setItem("password", encryptedPassword);
    localStorage.setItem("mnemonic", mnemonic);
    set({ password: encryptedPassword, mnemonic, isLoggedIn: true });
  },
  resetPassword: (password) => {
    const encryptedPassword = CryptoJS.SHA256(password).toString(); // Hash the new password
    localStorage.setItem("password", encryptedPassword);
    set({ password: encryptedPassword });
  },
  loadFromLocalStorage: () => {
    const password = localStorage.getItem("password");
    const mnemonic = localStorage.getItem("mnemonic");
    set({ password, mnemonic, isLoggedIn: !!password });
  },
}));
