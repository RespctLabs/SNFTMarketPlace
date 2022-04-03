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
        <div className="headerDiv rounded-2xl  md:mx-0 bg-OurBlack">
          <div className="flex justify-between drop-shadow-2xl text-white px-3">
            <div className=""></div>
            <div className="flex flex-col justify-center text-3xl">
              <Image src={RespctHeader} width={93} height={28} />
            </div>
            <div className=" flex my-3 xl:mt-4">
              <p className="text-OurPurple flex items-center mx-3 font-bold">Mumbai Testnet</p>
              <div className="mx-2">
                {connectedAccount ? (
                  <div>
                    {" "}
                    <button
                      onClick={() => disconnect()}
                      className="block p-2 text-white"
                    >
                      {connectedAccount.slice(0, 6)}
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
