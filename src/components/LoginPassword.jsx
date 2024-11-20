import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";
import CryptoJS from "crypto-js";

export const LoginPassword = () => {
  const {
    password: storedPassword,
    setPasswordAndMnemonic,
    mnemonic: storedMnemonic,
    resetPassword,
    loadFromLocalStorage
  } = useAuthStore();
  const [password, setPassword] = useState("");
  const [mnemonic, setMnemonic] = useState(Array(12).fill(""));
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(true);

  const handleLogin = () => {
    const hashedPassword = CryptoJS.SHA256(password).toString();
    if (hashedPassword === storedPassword) {
      toast("Logged in successfully!");
      loadFromLocalStorage();
    } else {
      toast("Invalid password!");
    }
  };

  const handlePasswordCreation = () => {
    if (password) {
      setPasswordAndMnemonic(password, storedMnemonic);
      toast("Password saved successfully!");
    } else {
      toast("Enter the Password");
    }
  };

  const handlePasswordReset = () => {
    if (!password) {
      toast("Enter a new password.");
      return;
    }

    if (mnemonic.join(" ") === storedMnemonic) {
      resetPassword(password);
      toast("Password reset successfully!");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      toast("Mnemonic does not match!");
    }
  };

  const handleMnemonicChange = (value, index) => {
    const updatedMnemonic = [...mnemonic];
    updatedMnemonic[index] = value;
    setMnemonic(updatedMnemonic);

    if (index === 0 && (value.includes(" ") || value.includes(","))) {
      const words = value.split(/[\s,]+/).slice(0, 12);
      setMnemonic(words.concat(Array(12 - words.length).fill("")));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 border shadow-lg rounded-lg p-10">
      {isLoggingIn ? (
        <>
          <h2>Login</h2>
          <Input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleLogin} className="w-full">
            Login
          </Button>
          <Button onClick={() => setIsLoggingIn(false)}>
            Create or Reset Password
          </Button>
        </>
      ) : (
        <>
          {!isForgotPassword ? (
            <>
              <h2>Create Password</h2>
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button onClick={handlePasswordCreation} className="w-full">
                Save Password
              </Button>
              <Button onClick={() => setIsForgotPassword(true)} className="w-full">
                Forgot Password?
              </Button>
              <Button onClick={() => setIsLoggingIn(true)} className="w-full">
                Back to Login
              </Button>
            </>
          ) : (
            <>
              <h2>Reset Password</h2>
              <p>Enter your 12-word mnemonic</p>
              <div className="grid grid-cols-3 gap-2">
                {mnemonic.map((word, index) => (
                  <Input
                    key={index}
                    type="text"
                    placeholder={`Word ${index + 1}`}
                    value={mnemonic[index]}
                    onChange={(e) => handleMnemonicChange(e.target.value, index)}
                  />
                ))}
              </div>
              <Input
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button onClick={handlePasswordReset} className="w-full">
                Reset Password
              </Button>
              <Button onClick={() => setIsForgotPassword(false)} className="w-full">
                Back
              </Button>
            </>
          )}
        </>
      )}
    </div>
  );
};
