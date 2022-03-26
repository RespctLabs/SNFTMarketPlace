const hre = require("hardhat");
const fs = require("fs");
let name = "fun";
let symbol = "FUN";
let baseURI = "fun.com/{id}";
let csnftPrice = 1000;
let tierUri = "https://ERC1155.com/{id}";
let engagementPoint0 = 100;

async function main() {
  const ParentERC721 = await hre.ethers.getContractFactory(
    "ComposableParentERC721"
  );
  const ParentNFT = await ParentERC721.deploy(
    name,
    symbol,
    baseURI,
    engagementPoint0
  );
  await ParentNFT.deployed();
  console.log("Parent deployed to:", ParentNFT.address);

  const ChildERC1155 = await hre.ethers.getContractFactory(
    "ComposableChildrenERC1155"
  );
  const childERC1155 = await ChildERC1155.deploy(tierUri, ParentNFT.address);
  await childERC1155.deployed();
  console.log("Children deployed to:", childERC1155.address);

  fs.writeFileSync(
    "./config.js",
    `
  export const ParentAddress = "${ParentNFT.address}"
  export const ChildAddress = "${childERC1155.address}"

  `
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
