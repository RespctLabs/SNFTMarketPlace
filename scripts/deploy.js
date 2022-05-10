var fs = require('fs');
let snftName = "Respct-BCG-AXIE NFTs"
let symbol = "RBA"
// let baseURI = "https://ERC998.com/{id}"
let tierUpgradeCost1 = 500;

let childURI = ""
// const linkTokenAddress = ""; //fill it with address on  the same network 

async function main() {
    console.log(await hre.ethers.getSigner())
//Deploy Parent
  const ComposableParentERC721 = await hre.ethers.getContractFactory(
    "ComposableParentERC721"
  );
  const parentERC721 = await ComposableParentERC721.deploy(
    snftName,
    symbol,
    tierUpgradeCost1
  );
  await parentERC721.deployed();
  console.log("Parent deployed to:", parentERC721.address);

//Deploy child
  const ChildERC1155 = await hre.ethers.getContractFactory(
    "ComposableChildrenERC1155"
  );
  const childERC1155 = await ChildERC1155.deploy(childURI, parentERC721.address);
  await childERC1155.deployed(fs.linkTokenAddress);
  console.log("Children deployed to:", childERC1155.address);

//Deploy Oracle
//   const Oracle = await hre.ethers.getContractFactory("Oracle");
//   const oracle = await Oracle.deploy();
// console.log("Oracle deployed to :", oracle.address)
//   fs.writeFileSync(
//     "./config.js",
//     `
//   export const ParentAddress = "${parentERC721.address}"
//   export const ChildAddress = "${childERC1155.address}"

//   `
//   );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
