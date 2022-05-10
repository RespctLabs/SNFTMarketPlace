import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { BlockchainContext } from "../context/BlockchainContext";
import { ethers } from "ethers";

import { CheckOwnership } from "./api/blockchain";
import { ParentAddress, ChildAddress } from "../config";

import ParentContract from "../artifacts/contracts/ComposableParentERC721.sol/ComposableParentERC721.json";

function Mint() {
  const [useraddress, setaddress] = useState({});
  const { getProvider, connectedAccount } = useContext(BlockchainContext);

  // define a const function
  const fetchUser = () => {
    axios.get(`/users/login?address=${connectedAccount}`).then((res) => {
      setaddress(res.data);
    });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className=" mt-0 h-screen">
      {" "}
      <div>
        <input
          onChange={(e) => {
            setaddress(e.target.value);
          }}
          value={useraddress}
        />

        <button
          onClick={async () => {
            const provider = await getProvider();
            const signer = await provider?.getSigner();
            console.log(signer, provider, " signer  provider");

            let parentContract = new ethers.Contract(
              ParentAddress,
              ParentContract.abi,
              signer
            );

            parentContract.methods
              .mint(
                useraddress,
                "https://bafyreiexlsyibc3olkpq264i5b24mbgotvizyehhjf2caqunpzzczauhha.ipfs.dweb.link/metadata.json"
              )
              .send({
                from: connectedAccount,
                value: 0.0 * 10 ** 18,
              });
          }}
        >
          Mint NFT by Admin
        </button>
      </div>
    </div>
  );
}

Mint.layout = "L1";
export default Mint;
