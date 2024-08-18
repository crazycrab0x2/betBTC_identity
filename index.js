import express from 'express';
import dotenv from 'dotenv';
import cors from "cors"; 
import { getUserIdentity } from './src/identity.js'
dotenv.config();

const expressApp = express();
const port = process.env.PORT || 3000;

expressApp.use(express.static('static'));
expressApp.use(express.json());
expressApp.use(cors());
expressApp.post("/", (req, res) => {
  const { address } = req.body;
  const identity = getUserIdentity(address);
  res.status(200).json(identity.getPrincipal().toString());
});


expressApp.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
