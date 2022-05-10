require("@nomiclabs/hardhat-waffle");
const fs = require("fs");

const projectId = process.env.projectId;
const privateKey = process.env.privateKey;
module.exports = {
  defaultNetwork: "hardhat",
  // networks: {
  //   hardhat: {
  //     chainId: 1337,
  //   },
  //   mumbai: {
  //     url: `https://polygon-mumbai.infura.io/v3/${projectId}`,
  //     accounts: [privateKey],
  //   },
  //   /*

  //   matic: {
  //     // Infura
  //     // url: `https://polygon-mainnet.infura.io/v3/${infuraId}`,
  //     url: "https://rpc-mainnet.maticvigil.com",
  //     accounts: [process.env.privateKey]
  //   }
  //   */
  // },
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
