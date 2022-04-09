/* eslint-disable @next/next/no-img-element */
import Web3Modal from "web3modal";
import React, { Fragment, useContext, useEffect, useState } from "react";
import Link from "next/link";
import { ethers } from "ethers";
import Image from "next/image";
import Profile from "../public/svg/Profile.svg";
import RespctHeader from "../public/svg/respctHeader.svg";

import {
  AppContextProps,
  BlockchainContext,
} from "../context/BlockchainContext.tsx";

const navigation = [
  { name: "Home", href: "/" },
  { name: "My NFTs", href: "/my-nft" },
  { name: "Create NFT", href: "/create-item" },
];

const Navbar = (props) => {
  const [scrolled, setScrolled] = useState(false);

  const { connectedAccount, connectWallet, disconnect } =
    useContext(BlockchainContext);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    if (window.pageYOffset > 0) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  return (
    <>
      <div id="header" className="py-6 xl:pt-6 ">
        <div className="headerDiv rounded-2xl mx-5 bg-OurBlack">
          <div className="flex justify-between drop-shadow-2xl text-white mx-3">
            <div className="flex items-center mx-3">
              <p className="text-OurBlue font-semibold px-4">Mumbai Testnet</p>
            </div>
            <div className="flex flex-col justify-center text-3xl">
              <Image src={RespctHeader} width={93} height={28} />
            </div>
            <div className=" flex my-3 md:mr-2 md:mt-4">
              <div className="mx-3 flex items-center space-x-5">
                {connectedAccount ? (
                  <div>
                    {" "}
                    <button
                      onClick={() => disconnect()}
                      className="block p-2 text-OurPurple font-semibold"
                    >
                      {connectedAccount.substr(0, 5)}
                      ...
                      {connectedAccount.substr(38, 42)}
                    </button>
                  </div>
                ) : (
                  <button onClick={() => connectWallet(true)}>
                    <Image src={Profile} alt="logo" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
