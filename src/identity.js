
import hdkey from 'hdkey';
import { mnemonicToSeedSync } from 'bip39';
import { Principal } from '@dfinity/principal';
import { DelegationChain, DelegationIdentity } from "@dfinity/identity";
import { Secp256k1KeyIdentity } from "@dfinity/identity-secp256k1";
import dotenv from 'dotenv';
dotenv.config();

function deriveKey(id) {
  const seed = mnemonicToSeedSync(process.env.SOCIALFI_AGENT_MNEMONIC + id)
  const root = hdkey.fromMasterSeed(seed)
  return root.derive(path)
}

export function getAgentIdentity() {
  const path = process.env.SOCIALFI_AGENT_DERIVE_PATH || "m/44'/223'/0'/2147483647/2147483647"
  const key = deriveKey(0, path)
  const identity = Secp256k1KeyIdentity.fromSecretKey(key.privateKey);
  return identity;
}

export function getUserIdentity(userId) {
  const key = deriveKey(userId)
  const identity = Secp256k1KeyIdentity.fromSecretKey(key.privateKey);
  return identity;
}

export async function delegateIdentity(userId, canisterIds) {
  const agentIdentity = getAgentIdentity();
  const userIdentity = getUserIdentity(userId)

  const delegationChain = await DelegationChain.create(
    userIdentity,
    agentIdentity.getPublicKey(),
    undefined,
    {
      targets: canisterIds ? canisterIds.map(canisterId => Principal.fromText(canisterId)) : undefined,
    },
  );
  const identity = DelegationIdentity.fromDelegation(agentIdentity, delegationChain);
  return identity;
}
