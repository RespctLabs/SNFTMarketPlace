import React, { useState } from "react";
import axios from "axios";
import { BlockchainContext } from "../context/BlockchainContext";
function Backendcall() {
  const [address, setaddress] = useState(null);
  const [parentaddress, setparentaddress] = useState(null);

  const callbackend = () => {
    axios
      .get("/api/nfts/getmetadata/", {
        address: address,
        parentaddress: parentaddress,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter address"
        onChange={(e) => setaddress(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter parent address"
        onChange={(e) => setparentaddress(e.target.value)}
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          callbackend();
        }}
      >
        Callbackend
      </button>
    </div>
  );
}

Backendcall.layout = "L1";
export default Backendcall;
