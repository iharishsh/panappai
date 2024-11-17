import { create } from "zustand";

export const useAuthStore = create((set) => ({
  isLoggedIn: false,
  password: null,
  mnemonic: null,
  setPasswordAndMnemonic: (password, mnemonic) => {
    localStorage.setItem("password", password);
    localStorage.setItem("mnemonic", mnemonic);
    set({ password, mnemonic, isLoggedIn: !!password });
  },
  resetPassword: (password) => {
    localStorage.setItem("password", password);
    set({ password });
  },
  loadFromLocalStorage: () => {
    const password = localStorage.getItem("password");
    const mnemonic = localStorage.getItem("mnemonic");
    set({ password, mnemonic, isLoggedIn: !!password });
  },
}));
