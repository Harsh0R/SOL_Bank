import { PublicKey } from "@solana/web3.js";
import IDL from "./bank.json"

export const BANK_PROGRAM_PUBKEY = new PublicKey(IDL.metadata.address)
export const BANK_IDL = IDL