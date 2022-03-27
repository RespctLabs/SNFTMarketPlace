import React from "react";
import Profile from "../../../public/svg/Profile.svg";
import Image from "next/image";
import WalletSvg from "../../svg/WalletSvg";
import { Fragment, useContext } from "react";
import { Menu, Transition } from "@headlessui/react";
import { getEllipsisTxt } from "../../../utils";
import { ChevronDownIcon } from "@heroicons/react/solid";

import {
  AppContextProps,
  BlockchainContext,
} from "../../../context/BlockchainContext";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const { connectedAccount, connectWallet, disconnect } =
    useContext(BlockchainContext);

  return (
    <div className="headerDiv rounded-2xl mx-3  bg-OurBlack ">
      <div className="flex justify-between  drop-shadow-2xl  text-white">
        <div></div>
        <div className="flex flex-col justify-center text-3xl">
          <p className=" text-transparent bg-clip-text font-semibold bg-gradient-to-r from-[#03AFD0] via-[#812DC1] to-[#56109D] ">
            respct
          </p>
        </div>
        <div className="flex flex-col justify-center">
          {connectedAccount ? (
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="flex items-center max-w-xs px-4 py-2 text-white transition rounded-full bg-gradient-to-tl from-indigo-500 via-purple-500 to-pink-500 hover:bg-gray-700 shadow-homogen font-poppins">
                  <span className="sr-only">Open user menu</span>

                  <div className="pr-2">
                    <WalletSvg className="w-5 h-5 text-white" />
                  </div>

                  <div className="font-sm">
                    {getEllipsisTxt(connectedAccount)}
                  </div>
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 py-1 mt-2 origin-top-right bg-gray-800 rounded-md shadow-lg w-36 ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    <div className="m-2 rounded-md hover:bg-gray-700">
                      <button
                        onClick={() => disconnect()}
                        className="block p-2 text-white "
                      >
                        Disconnect
                      </button>
                    </div>
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          ) : (
            <button
              onClick={() => connectWallet(true)}
              className="px-4 py-2 font-semibold transition flex items-center"
            >
              <Image src={Profile} layout="fixed" height={50} width={40} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
