import express from 'express';
import path from 'path';
import { Telegraf } from 'telegraf';
import dotenv from 'dotenv';
import { getAgentIdentity, getUserIdentity, delegateIdentity } from './src/identity.js'

import { idlFactory as minterIdlFactory} from './src/ckBTCminter.js'
import { idlFactory as ledgerIdlFactory} from './src/ckBTCledger.js'
import { HttpAgent, Actor } from '@dfinity/agent'
import { Principal } from '@dfinity/principal';
dotenv.config();

const expressApp = express();
const port = process.env.PORT || 3000;

expressApp.use(express.static('static'));
expressApp.use(express.json());

expressApp.get("/", (req, res) => {
  res.status(200).json("hello");
});


expressApp.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
