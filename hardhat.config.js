require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

import { resolve } from "path";
import { config as dotenvConfig } from "dotenv";
dotenvConfig({ path: resolve(__dirname, "./.env") });

const { PRIVATE_KEY, ETHERSCAN, POLYGONSCAN, FTMSCAN } = process.env;

 module.exports = {
  defaultNetwork: "matic",
  networks: {
    hardhat: {
    },
    matic: {
      url: "https://polygon-rpc.com/",
      accounts: [PRIVATE_KEY],
    },
    mumbai: {
      networkId: 80001,
      url: "https://matic-mumbai.chainstacklabs.com",
      accounts: [PRIVATE_KEY],
      gasPrice: 35000000000,
    },
    ftm: {
      // url: "https://rpc.ankr.com/fantom",
      url: "https://rpcapi-tracing.fantom.network",
      accounts: [PRIVATE_KEY],
    },
    ftmTestnet: {
      // gas: 5000000,
      // gasPrice: 35000000000,
      // url: "https://rpc.ankr.com/fantom",
      url: "https://rpc.testnet.fantom.network",
      accounts: [PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
        mainnet: ETHERSCAN,
        ropsten: ETHERSCAN,
        rinkeby: ETHERSCAN,
        goerli: ETHERSCAN,
        kovan: ETHERSCAN,
        // ftm
        opera: FTMSCAN,
        ftmTestnet: FTMSCAN,
        // polygon
        polygon: POLYGONSCAN,
        polygonMumbai: POLYGONSCAN,
    }
  },
  solidity: {
    version: "0.8.13",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 20000
  }
}
