import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { BlockchainContext } from "../context/BlockchainContext";

function UserDetails() {
  const { getProvider, connectedAccount } = useContext(BlockchainContext);

  const [user, setUser] = useState({});
  const [nft, setNft] = useState({});

  const [loading, setLoading] = React.useState(true);

  // make a function

  const fetchUser = () => {
    axios
      .get(`/users/login?address=${connectedAccount}`)
      .then((res) => {
        setLoading(false);
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const fetchNFT = () => {
    axios
      .get(`/nft/getnftdata`, {
        params: {
          address: connectedAccount,
          parentAddress: user.user.parentAddress[0],
        },
      })
      .then((res) => {
        setLoading(false);
        setNft(res.data);
        localStorage.setItem("nfts", JSON.stringify(res.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // useEffect(() => {
  //   if (loading) {
  //     fetchUser();
  //   }
  // });

  return (
    <div className="h-screen justify-content-center">
      <div className="w-75">
        <button className="bg-white text-black " onClick={fetchUser}>
          Fetch User
        </button>
        <h1> Data</h1>
        <div> {JSON.stringify(user)}</div>
        <br />
        <button className="bg-white text-black " onClick={fetchNFT}>
          Fetch NFT
        </button>
        <h1> Data</h1>
        <div> {JSON.stringify(nft)}</div>
      </div>
    </div>
  );
}

UserDetails.layout = "L1";
export default UserDetails;
