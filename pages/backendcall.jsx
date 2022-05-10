import React, { useState } from "react";
import axios from "axios";

export default function Backendcall() {
  const [address, setaddress] = useState(null);
  const [parentaddress, setparentaddress] = useState(null);
  const [data, setdata] = useState(null);

  const callbackend = () => {
    axios
      .get(`/api/nfts/getmetadata/`, {
        address: address,
        parentaddress: parentaddress,
      })
      .then((res) => {
        console.log(res.data);
        setdata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(res);
  return (
    <div>
      {/* take input for address  */}
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
        onClick={() => {
          callbackend();
        }}
      >
        Callbackend
      </button>
      backendcall
    </div>
  );
}
