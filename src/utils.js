import { HttpAgent } from '@dfinity/agent';

export const makeAgent = async (options) => {
  const host = process.env.DFX_NETWORK === 'local' ? 'http://127.0.0.1:4943' : 'https://icp-api.io';
  const agent = new HttpAgent({
    host,
    // TODO - remove this when the dfx replica supports it
    verifyQuerySignatures: false,
    ...options,
  });
  try {
    await agent.fetchRootKey();
  } catch (_) {
    //
  }
  return agent;
};