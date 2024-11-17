import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";

export const LoginPassword = () => {
  const {
    password: storedPassword,
    setPasswordAndMnemonic,
    mnemonic: storedMnemonic,
    resetPassword,
  } = useAuthStore();
  const [password, setPassword] = useState("");
  const [mnemonic, setMnemonic] = useState(Array(12).fill(""));
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(true);

  const handleLogin = () => {
    if (password === storedPassword) {
      toast("Logged in successfully!");
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
    } else {
      toast("Mnemonic does not match!");
    }
  };
  

  const handleMnemonicChange = (value, index) => {
    const updatedMnemonic = [...mnemonic];
    updatedMnemonic[index] = value;
    setMnemonic(updatedMnemonic);

    // If pasting a full mnemonic, split and populate all fields
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
          <Button onClick={handleLogin}>Login</Button>
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
              <Button onClick={handlePasswordCreation}>Save Password</Button>
              <Button onClick={() => setIsForgotPassword(true)}>
                Forgot Password?
              </Button>
              <Button onClick={() => setIsLoggingIn(true)}>
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
                    onChange={(e) =>
                      handleMnemonicChange(e.target.value, index)
                    }
                  />
                ))}
              </div>
              <Input
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button onClick={handlePasswordReset}>Reset Password</Button>
              <Button onClick={() => setIsForgotPassword(false)}>Back</Button>
            </>
          )}
        </>
      )}
    </div>
  );
};
