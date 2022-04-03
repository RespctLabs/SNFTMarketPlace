require("@nomiclabs/hardhat-waffle");
const fs = require("fs");

const projectId = "b8a41ba383a841cba588df90a33f2cf3";
const privateKey =
  "c44298748ee864091109b970de2a39c9066fd14b156b939be7aa7895bd1ee73a";
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    mumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${projectId}`,
      accounts: [privateKey],
    },
    /*

    matic: {
      // Infura
      // url: `https://polygon-mainnet.infura.io/v3/${infuraId}`,
      url: "https://rpc-mainnet.maticvigil.com",
      accounts: [process.env.privateKey]
    }
    */
  },
  solidity: {
    version: "0.6.3",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
