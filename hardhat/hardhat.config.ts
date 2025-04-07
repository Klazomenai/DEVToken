import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";
import * as dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.28",
    settings: {
      evmVersion: "london",
    },
  },
  networks: {
    piccadilly: {
      url: "https://rpc2.piccadilly.autonity.org",
      chainId: 65100004,
      accounts: process.env.DEPLOYER_PRIVATE_KEY ? [process.env.DEPLOYER_PRIVATE_KEY] : [],
    },
  },
  etherscan: {
    customChains: [
      {
        network: "piccadilly",
        chainId: 65100004,
        urls: {
          apiURL: "https://piccadilly.autonity.org/api", // Blockscout API
          browserURL: "https://piccadilly.autonity.org", // Explorer UI
        },
      },
    ],
    apiKey: {
      piccadilly: "mannequin", // 'some' dummy value, required for plugin to proceed
    },
  },
  sourcify: {
    enabled: false,
  },
};

export default config;
