/* eslint-disable @next/next/no-img-element */
import { create, CID, IPFSHTTPClient } from "ipfs-http-client";
import React from "react";

import F from "../public/images/buyNft.svg";

function App() {
  const projectId = "26vhri8dPDRLF8z9TNb9c2OQhCo";
  const projectSecret = "3d9ff09197552de12e75b9c994c62864";
  const authorization = "Basic " + btoa(projectId + ":" + projectSecret);
  const [formData, setFormData] = React.useState({
    level: 2,
    name: "utsav singla",
    creator: "verma jsdsdvbsDSHJSbjhb",
    desc: "bkjsdkj",
    time: new Date(),
  });

  let ipfs: IPFSHTTPClient | undefined;
  try {
    ipfs = create({
      url: "https://ipfs.infura.io:5001/api/v0",
      headers: {
        authorization,
      },
    });
  } catch (error) {
    console.error("IPFS error ", error);
    ipfs = undefined;
  }

  // const handleSubmit = async (props: any) => {
  //   const values = props.values;

  // };
  const onSubmitHandler = async (data: String) => {
    console.log(data);
    const result = await (ipfs as IPFSHTTPClient).add(data);
    console.log(result);
  };

  return (
    <div className="App">
      <header className="App-header">
        {ipfs && (
          <>
            <p>Upload File using IPFS</p>
            <button
              onClick={(e) => {
                onSubmitHandler(JSON.stringify(formData));
              }}
            >
              Click to upload now
            </button>
          </>
        )}

        {!ipfs && (
          <p>Oh oh, Not connected to IPFS. Checkout out the logs for errors</p>
        )}
      </header>
    </div>
  );
}

export default App;
