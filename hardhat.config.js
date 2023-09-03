require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

// const ethers = require("ethers");
// const provider = new ethers.providers.getDefaultProvider(
//     "http://127.0.0.1:8545/"
// );
// const gasPrice = ethers.utils.formatUnits(
//     ethers.utils.parseUnits("100", "gwei"),
//     "wei"
// );

const config = {
  solidity: "0.8.17",
  defaultNetwork: "hardhat",
  paths: {
    artifacts: "./src/artifacts",
  },
  networks: {
    localhost: {
      chainId: 3121,
      url: "http://127.0.0.1:8545/",
      initialBaseFeePerGas: 0,
      loggingEnabled: true,
    },
    hardhat: {
      chainId: 31337,
      forking: {
        url: process.env.MAINNET_RPC_URL,
        blockNumber: 16024306,
      },
      // gasPrice: parseInt(gasPrice),
      initialBaseFeePerGas: 0,
      loggingEnabled: true,
    },
    mainLocal: {
      chainId: 31337,
      url: "http://127.0.0.1:8545/",
      // gasPrice: parseInt(gasPrice),
      initialBaseFeePerGas: 0,
      loggingEnabled: true,
    },
    cronos: {
      chainId: 1,
      url: process.env.MAINNET_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
      // gasPrice: parseInt(gasPrice),
      initialBaseFeePerGas: 0,
      loggingEnabled: true,
    },
    croT: {
      chainId: 338,
      url: process.env.TESTNET_RPC_URL,
      accounts: [process.env.TEST_PRIVATE_KEY],
      // gasPrice: parseInt
      gasPrice: 2500000000000,
      initialBaseFeePerGas: 0,
      loggingEnabled: true,
    },
    lineaT: {
      chainId: 59140,
      url: process.env.LINEA_T_RPC_URL,
      accounts: [process.env.TEST_PRIVATE_KEY],
      // gasPrice: parseInt
      gasPrice: 30000000,
      initialBaseFeePerGas: 0,
      loggingEnabled: true,
    },
    zkEvmT: {
      chainId: 1442,
      url: process.env.ZKEVM_T_RPC_URL,
      accounts: [process.env.TEST_PRIVATE_KEY],
      // gasPrice: parseInt
      gasPrice: 500000000,
      initialBaseFeePerGas: 0,
      loggingEnabled: true,
    },
    taikoT: {
      chainId: 167005,
      url: process.env.TAIKO_T_RPC_URL,
      accounts: [process.env.TEST_PRIVATE_KEY],
      // gasPrice: parseInt
      gasPrice: 2000000,
      initialBaseFeePerGas: 0,
      loggingEnabled: true,
    },
  },
};

module.exports = config;
