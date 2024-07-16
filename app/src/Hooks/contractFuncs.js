import React, { useEffect, useState } from "react";
import {
  clusterApiUrl,
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
} from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";
import { BANK_IDL, BANK_PROGRAM_PUBKEY } from "../Constants";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey";
import { utf8 } from "@project-serum/anchor/dist/cjs/utils/bytes";

const contractFuncs = () => {
  const [program, setProgram] = useState();
  const { publicKey } = useWallet();
  const network = clusterApiUrl("devnet");
  const opts = {
    preflightCommitment: "processed",
  };
  const { solana } = window;
  const getProvider = () => {
    const connction = new Connection(network, opts.preflightCommitment);
    const provider = new anchor.AnchorProvider(
      connction,
      window.solana,
      opts.preflightCommitment
    );
    return provider;
  };
  // const bankKeyPair = anchor.web3.Keypair.generate();

  useEffect(() => {
    const provider = getProvider();
    const program = new anchor.Program(BANK_IDL, BANK_PROGRAM_PUBKEY, provider);
    setProgram(program);
    // console.log("program ===>> ", program);
    return () => {};
  }, []);

  const createBank = async (name) => {
    console.log("Create bank Called with ", name, " User ==> ", publicKey);
    const provider = getProvider();
    if (program && name && provider) {
      // console.log("Program ==> ", program);
      try {
        // console.log("Bank Key Pair:", bankKeyPair);
        // console.log("User Public Key:", provider.wallet.publicKey.toString());

        const [profilePda, profileBump] = await findProgramAddressSync(
          [utf8.encode("bankaccount"), publicKey.toBuffer()],
          program.programId
        );
        // console.log("Bank Account address ==---== >> ", profilePda);
        const tx = await program.rpc.create(name, {
          accounts: {
            bank: profilePda,
            user: provider.wallet.publicKey,
            systemProgram: SystemProgram.programId,
          },
        });

        console.log("Bank Created ==> ", tx);
      } catch (error) {
        console.log("Error in create bank ===> ", error);
      }
    }
  };

  const depositAmountToBank = async (amount) => {
    // console.log("Amount to deposit ==> ", amount);
    const provider = getProvider();
    if (program && amount && provider) {
      const [profilePda, profileBump] = await findProgramAddressSync(
        [utf8.encode("bankaccount"), publicKey.toBuffer()],
        program.programId
      );
      console.log("Bank Account address ==---== >> ", profilePda);
      const amount1 = new anchor.BN(amount * 10 ** 9);
      try {
        const tx = await program.rpc.deposit(amount1, {
          accounts: {
            bank: profilePda,
            user: provider.wallet.publicKey,
            systemProgram: SystemProgram.programId,
          },
        });
        console.log("Deposit to Bank ==> ", tx);
      } catch (error) {
        console.log("Error in deposit Amount to bank ===>> ", error);
      }
    }
  };

  const withdrawAmountFromBank = async (amount) => {
    // console.log("Amount to deposit ==> ", amount);
    const provider = getProvider();
    if (program && amount && provider) {
      const [profilePda, profileBump] = await findProgramAddressSync(
        [utf8.encode("bankaccount"), publicKey.toBuffer()],
        program.programId
      );
      console.log("Bank Account address ==---== >> ", profilePda);
      const amount1 = new anchor.BN(amount * 10 ** 9);
      try {
        const tx = await program.rpc.withdraw(amount1, {
          accounts: {
            bank: profilePda,
            user: provider.wallet.publicKey,
            systemProgram: SystemProgram.programId,
          },
        });
        console.log("Withdraw From Bank ==> ", tx);
      } catch (error) {
        console.log("Error in deposit Amount to bank ===>> ", error);
      }
    }
  };

  const fetchBankData = async () => {
    const [profilePda, profileBump] = await findProgramAddressSync(
      [utf8.encode("bankaccount"), publicKey.toBuffer()],
      program.programId
    );

    const account_data = await program.account.bank.fetch(profilePda);
    // console.log("account Data  ==  >?>> ", (account_data.balance).toString());
    // console.log("account Data  ==  >?>> ", account_data.name);
    // console.log("account Data  ==  >?>> ", new PublicKey(account_data.owner).toString());

    const balance = account_data.balance.toString();
    const name = account_data.name;
    const owner = account_data.owner.toString();
    return { balance, name, owner };
  };

  return {
    program,
    createBank,
    depositAmountToBank,
    fetchBankData,
    withdrawAmountFromBank,
  };
};

export default contractFuncs;
