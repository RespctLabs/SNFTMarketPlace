import { useState } from "react";
import { ethers } from "ethers";
import { create, CID, IPFSHTTPClient } from "ipfs-http-client";
import { useRouter } from "next/router";
import Web3Modal from "web3modal";
import web3 from "web3";
const client = create("https://ipfs.infura.io:5001/api/v0");

import { ParentAddress } from "../config";

// import NFTMarketplace from "../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json";
import ParentContract from "../artifacts/contracts/ComposableParentERC721.sol/ComposableParentERC721.json";

export default function CreateItem() {
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, updateFormInput] = useState({
    Image: "",
    name: "",
    creatorId: "",
    fileUrl: fileUrl,
    description: "",
  });

  const router = useRouter();

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

  async function listNFTForSale() {
    const url = await uploadToIPFS();
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
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
    router.push("/");
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
        {/* {fileUrl && <img className="rounded mt-4" width="350" src={fileUrl} />} */}
        <button
          onClick={listNFTForSale}
          className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg"
        >
          Create NFT
        </button>
      </div>
    </div>
  );
}
