/* eslint-disable @next/next/no-img-element */
import Web3Modal from "web3modal";
import React, { Fragment, useContext, useEffect, useState } from "react";
import Link from "next/link";
import { ethers } from "ethers";
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
      <div className=" px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
          </div>
          <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
            <div className="flex items-center flex-shrink-0">
              <Link href="/">
                <img
                  className="block w-8 h-8 cursor-pointer lg:hidden"
                  src="/n-big.png"
                  alt="N letter logo"
                />
              </Link>
              <Link href="/">
                <img
                  className="hidden w-8 h-8 cursor-pointer lg:block"
                  src="/n-big.png"
                  alt="N letter logo"
                />
              </Link>
            </div>
            <div className="hidden sm:block sm:ml-12">
              <div className="flex space-x-12">
                {navigation.map((item) => {
                  if (item.name == "Create NFT") return;
                  return (
                    <Link key={item.name} href={item.href}>
                      <div className="px-3 py-2 font-medium border-b-2 border-transparent cursor-pointer">
                        {item.name}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 space-x-4 font-medium sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <Link href="/createItem">
              <button className="hidden font-medium md:block">
                Create NFT
              </button>
            </Link>
            {connectedAccount ? (
              <div>
                {" "}
                <button
                  onClick={() => disconnect()}
                  className="block p-2 text-white "
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={() => connectWallet(true)}
                className="px-4 py-2 font-semibold transition border-2 rounded-full shadow-lg hover:border-primary hover:text-primary hover:shadow-primary/30 border-primary/80 text-primary/90 shadow-primary/10"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
