import { useState, useContext } from "react";
import { ethers } from "ethers";
import { create } from "ipfs-http-client";
import { useRouter } from "next/router";
import Web3Modal from "web3modal";
import web3 from "web3";
import Image from "next/Image";
import { ParentAddress } from "../config";
import { ChildAddress } from "../config";
import NFTImage from "../public/assets/svg/nftimage.svg";
// // import NFTMarketplace from "../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json";
import ParentContract from "../artifacts/contracts/ComposableParentERC721.sol/ComposableParentERC721.json";
import ChildContract from "../artifacts/contracts/ComposableChildrenERC1155.sol/ComposableChildrenERC1155.json";
const client = create("https://ipfs.infura.io:5001/api/v0");
// import { writeJsonFile } from "write-json-file";
import { BlockchainContext } from "../context/BlockchainContext.tsx";

// let data = require("../data.json");

export default function CreateItem() {
  const { getProvider } = useContext(BlockchainContext);
  const [basic, setBasic] = useState({
    image: NFTImage,
    name: "Azuki",
    creatorId: "shubham",
    tokenId: "0",
    level: 0,
  });
  const [fileUrl, setFileUrl] = useState(null);
  let [formInput, updateFormInput] = useState({
    Image: "",
    name: "",
    creatorId: "",
    fileUrl: fileUrl,
    description: "",
  });

  const router = useRouter();

  async function handleSubmit(event) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    event.preventDefault();

    // calling smart contract on function getComposableCount
    let contract = new ethers.Contract(
      ParentAddress,
      ParentContract.abi,
      signer
    );

    console.log(signer, "signer");
    console.log(signer.address);

    let count = await contract.getComposableCount();

    console.log(count, "count");

    // converting bignumber value into string
    let tokenId = count.toString();
    console.log(tokenId, "tokenId");
    setBasic((prevvalue) => ({
      ...prevvalue,
      tokenId: tokenId,
    }));

    console.log(basic, "basic");

    let url = "";

    try {
      const added = await client.add(basic.toString(), {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      url = `https://ipfs.infura.io/ipfs/${added.path}`;
      console.log(url, "url");
      setFileUrl(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }

    // let x = { tokenId: url };
    console.log(tokenId, url);
    // await writeJsonFile(data, x);
  }
  async function handleSetEngagement(e) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    let contract = new ethers.Contract(ChildAddress, ChildContract.abi, signer);
    let t1 = await contract.mintEngagementPoints(
      signer.getAddress(),
      500,
      "0x00"
    );
    const tx = await t1.wait();
    console.log(tx, "tx");
  }
  async function handleUpgrade(e) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    let contract = new ethers.Contract(ChildAddress, ChildContract.abi, signer);
    let parentcontract = new ethers.Contract(
      ParentAddress,
      ParentContract.abi,
      signer
    );
    // console.log(signer, "signer");
    // let t1 = await contract.mintEngagementPoints(
    //   "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
    //   500,
    //   "0x00"
    // );
    // const tx = await t1.wait();
    // console.log(tx, "tx");
    let t1 = await parentcontract.getComposableCount();
    let t2 = await contract.upgradeSNFT("0x01", 1, web3.utils.encodePacked(1), {
      from: signer.getAddress(),
    });
    //.upgradeSNFT(composable1, multiTokenTier1, web3.utils.encodePacked(composable1),{from:user1});
    const tx2 = await t2.wait();
    console.log(tx2, "tx2");
    // const transaction = await parentcontract.childBalance("0x01", contract.address, 1);
    // const tx3 = await transaction.wait();
    // console.log(tx3, "tx3");

    // let transaction = await contract.mint({
    //   from: signer.getAddress(),
    //   value: web3.utils.toWei("2"),
    // });
    // console.log(transaction, "transaction");

    // // let listingPrice = await contract.getListingPrice();
    // // listingPrice = listingPrice.toString();
    // // let transaction = await contract.createToken(url, price, {
    // //   value: listingPrice,
    // // });
    // const tx = await transaction.wait();
    // console.log(tx, "tx");
  }
  async function onChange(e) {
    const file = e.target.files[0];
    try {
      const added = await client.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setFileUrl(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  async function handleLevelcheck() {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    let child = new ethers.Contract(ChildAddress, ChildContract.abi, signer);

    /* next, create the item */
    // const price = ethers.utils.parseUnits(formInput.price, "ether");
    let contract = new ethers.Contract(
      ParentAddress,
      ParentContract.abi,
      signer
    );
    // console.log(signer, "signer");

    //  assert.equal(await erc998.getLevel(composable1, erc1155.address),1);

    let transaction = await contract.getLevel("0x01", child.address);

    console.log(transaction, "transaction");

    // let listingPrice = await contract.getListingPrice();
    // listingPrice = listingPrice.toString();
    // let transaction = await contract.createToken(url, price, {
    //   value: listingPrice,
    // });
    // const tx = await transaction.wait();
    // console.log(tx, "tx");
  }

  async function listNFTForSale() {
    // const url = await uploadToIPFS();
    const provider = await getProvider();
    const signer = provider.getSigner();

    /* next, create the item */
    // const price = ethers.utils.parseUnits(formInput.price, "ether");
    let contract = new ethers.Contract(
      ParentAddress,
      ParentContract.abi,
      signer
    );
    console.log(signer, "signer");

    let transaction = await contract.mint({
      from: signer.getAddress(),
      value: web3.utils.toWei("2"),
    });

    console.log(transaction, "transaction");

    // let listingPrice = await contract.getListingPrice();
    // listingPrice = listingPrice.toString();
    // let transaction = await contract.createToken(url, price, {
    //   value: listingPrice,
    // });
    const tx = await transaction.wait();
    console.log(tx, "tx");
    // router.push("/");
  }

  return (
    <div className="flex justify-center">
      <div className="w-1/2 flex flex-col pb-12">
        {/* <input
          placeholder="Asset Name"
          className="mt-8 border rounded p-4"
          onChange={(e) =>
            updateFormInput({ ...formInput, name: e.target.value })
          }
        />
        <textarea
          placeholder="Asset Description"
          className="mt-2 border rounded p-4"
          onChange={(e) =>
            updateFormInput({ ...formInput, description: e.target.value })
          }
        />
        <input
          placeholder="Asset Price in Eth"
          className="mt-2 border rounded p-4"
          onChange={(e) =>
            updateFormInput({ ...formInput, price: e.target.value })
          }
        />*/}
        <input type="file" name="Asset" className="my-4" onChange={onChange} />
        {fileUrl && (
          <Image
            alt="image"
            className="rounded mt-4"
            width="350"
            height="400"
            src={fileUrl}
          />
        )}
        <button
          onClick={listNFTForSale}
          className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg"
        >
          Create NFT
        </button>
        <button
          onClick={handleSubmit}
          className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg"
        >
          get Composable
        </button>
        <button
          onClick={handleSetEngagement}
          className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg"
        >
          Set Engagement Point
        </button>
        <button
          onClick={handleUpgrade}
          className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg"
        >
          Upgrade
        </button>
        <button
          onClick={handleLevelcheck}
          className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg"
        >
          get level
        </button>
      </div>
    </div>
  );
}

// import { useState } from "react";
// import { ethers } from "ethers";
// import { create as ipfsHttpClient } from "ipfs-http-client";
// import { useRouter } from "next/router";
// import Web3Modal from "web3modal";

// const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

// import { nftaddress, nftmarketaddress } from "../config";

// // import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
// // import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";

// export default function CreateItem() {
//   const [fileUrl, setFileUrl] = useState(null);
//   const [formInput, updateFormInput] = useState({
//     price: "",
//     name: "",
//     description: "",
//   });
//   const router = useRouter();

//   async function onChange(e) {
//     const file = e.target.files[0];
//     try {
//       const added = await client.add(file, {
//         progress: (prog) => console.log(`received: ${prog}`),
//       });
//       const url = `https://ipfs.infura.io/ipfs/${added.path}`;
//       setFileUrl(url);
//     } catch (error) {
//       console.log("Error uploading file: ", error);
//     }
//   }
//   async function createMarket() {
//     const { name, description, price } = formInput;
//     if (!name || !description || !price || !fileUrl) return;
//     /* first, upload to IPFS */
//     const data = JSON.stringify({
//       name,
//       description,
//       image: fileUrl,
//     });
//     try {
//       const added = await client.add(data);
//       const url = `https://ipfs.infura.io/ipfs/${added.path}`;
//       /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
//       createSale(url);
//     } catch (error) {
//       console.log("Error uploading file: ", error);
//     }
//   }

//   async function createSale(url) {
//     const web3Modal = new Web3Modal();
//     const connection = await web3Modal.connect();
//     const provider = new ethers.providers.Web3Provider(connection);
//     const signer = provider.getSigner();

//     /* next, create the item */
//     let contract = new ethers.Contract(nftaddress, NFT.abi, signer);
//     let transaction = await contract.createToken(url);
//     let tx = await transaction.wait();
//     let event = tx.events[0];
//     let value = event.args[2];
//     let tokenId = value.toNumber();

//     const price = ethers.utils.parseUnits(formInput.price, "ether");

//     /* then list the item for sale on the marketplace */
//     contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);
//     let listingPrice = await contract.getListingPrice();
//     listingPrice = listingPrice.toString();

//     transaction = await contract.createMarketItem(nftaddress, tokenId, price, {
//       value: listingPrice,
//     });
//     await transaction.wait();
//     router.push("/");
//   }

//   return (
//     <div className="flex justify-center">
//       <div className="w-1/2 flex flex-col pb-12">
//         <input
//           placeholder="Asset Name"
//           className="mt-8 border rounded p-4"
//           onChange={(e) =>
//             updateFormInput({ ...formInput, name: e.target.value })
//           }
//         />
//         <textarea
//           placeholder="Asset Description"
//           className="mt-2 border rounded p-4"
//           onChange={(e) =>
//             updateFormInput({ ...formInput, description: e.target.value })
//           }
//         />
//         <input
//           placeholder="Asset Price in Eth"
//           className="mt-2 border rounded p-4"
//           onChange={(e) =>
//             updateFormInput({ ...formInput, price: e.target.value })
//           }
//         />
//         <input type="file" name="Asset" className="my-4" onChange={onChange} />
//         {fileUrl && (
//           <img
//             className="rounded mt-4"
//             width="350"
//             height="400"
//             src={fileUrl}
//           />
//         )}
//         <button
//           onClick={createMarket}
//           className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg"
//         >
//           Create Digital Asset
//         </button>
//       </div>
//     </div>
//   );
// }
