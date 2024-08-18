
import hdkey from 'hdkey';
import { mnemonicToSeedSync } from 'bip39';
import { Principal } from '@dfinity/principal';
import { DelegationChain, DelegationIdentity } from "@dfinity/identity";
import { Secp256k1KeyIdentity } from "@dfinity/identity-secp256k1";
import dotenv from 'dotenv';
dotenv.config();

function deriveKey(id) {
  // const seed = mnemonicToSeedSync(process.env.SOCIALFI_AGENT_MNEMONIC + id)
  // const root = hdkey.fromMasterSeed(seed)
  // const quotient = Math.floor(id / 2147483647) // 0x7FFFFFFF
  // const remainder = id % 2147483647 // 0x7FFFFFFF
  // const path = `m/44'/223'/0'/${quotient}/${remainder}`
  // return root.derive(path)
  console.log(id)
  const numericId = Array.from(id).reduce((acc, char) => acc + char.charCodeAt(0), 0);

  // Generate the seed from the mnemonic and numeric ID
  const seed = mnemonicToSeedSync(process.env.SOCIALFI_AGENT_MNEMONIC + id);

  // Create the HD wallet root from the seed
  const root = hdkey.fromMasterSeed(seed);

  // Calculate quotient and remainder for the derivation path
  const quotient = Math.floor(numericId / 2147483647); // 0x7FFFFFFF
  const remainder = numericId % 2147483647; // 0x7FFFFFFF

  // Derive the path using the quotient and remainder
  const path = `m/44'/223'/0'/${quotient}/${remainder}`;

  // Return the derived key
  return root.derive(path);
}

export function getUserIdentity(userId) {
  const key = deriveKey(userId)
  const identity = Secp256k1KeyIdentity.fromSecretKey(key.privateKey);
  return identity;
}
