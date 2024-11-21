# Web3 Panappai (Wallet)

## Overview
Panappai is a React-based application that allows users to generate and manage Solana/ETH wallets using a mnemonic phrase. The app features functionality to add new wallets, view wallet details, and delete individual or all wallets. It provides a user-friendly interface for securely managing crypto wallets.

## Features
- Add Wallet: Generate a new Solana/ETH wallet from a mnemonic phrase.
- View Wallet Details: View public and private keys for each wallet with options to copy securely.
- Clear Wallets: Delete all wallets at once.
- Delete Individual Wallets: Remove specific wallets from the list.
- Secure Private Key Display: Private keys are hidden by default but can be revealed when needed.
- Light/Dark mode
- Copy your Secret Phrase

## Installation
1. Clone the repository:
```
git clone https://github.com/iharishsh/panappai.git
cd panappai
```

2.Install dependencies:
```
npm install
```

## Usage
1. Start the development server:
```
npm run dev
```

2.Open your browser and navigate to:
```
http://localhost:5173
```

## How to Use
1. Login or Create/Forgot Password/:
Login using the password if already created. If not then create the new password which leads to creating new secret phase to copy & continue. If forgot password then enter your secret phrase (copy & paste in first input to get autofilled) and enter new password to continue.

2. Add Wallets:
Click on the "Add SOL/ETH Wallet" button to generate a new wallet.
A wallet will be created based on the provided mnemonic phrase.

3.View Wallets:
Wallets will be displayed in a list.
Public keys are visible by default; private keys can be revealed securely.

4.Clear All Wallets:
Click the "Clear SOL/ETH Wallets" button to delete all wallets at once.

5.Delete Individual Wallets:
Use the trash icon on each wallet card to remove it.

## Technologies Used
- React Vite: Frontend framework for building the UI.
- Shadcn UI: For styling and responsive design.
- Solana Web3.js: For generating and managing Solana wallets.
- ethers: For generating and managing ETH wallets.
- bip39: To generate a seed from the mnemonic phrase.
- ed25519-hd-key: For deriving paths from the seed.
- nacl (tweetnacl): For cryptographic operations.
- crypto js: To encrypt the password.
- Zustand: State management for wallets

## Author note
I'm Harish who created this project as the assignment project for Cohort 3 of 100xdevs to learn about web3. 
This is my first project related to web3 and many more to come :)

If you like to support me in my journey please follow me and star this repository.

### Social: 
<a href="https://x.com/iharishsh" target="_blank" rel="noopener noreferrer">X</a>
