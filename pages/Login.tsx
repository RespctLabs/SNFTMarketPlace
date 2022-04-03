import Image from "next/image";
import LoginSvg from "../public/images/login.svg";
import MetamaskSvg from "../public/images/metamaskFox.svg";
import React, { Fragment, useContext, useEffect, useState } from "react";
import Profile from "../public/svg/Profile.svg";
import { useRouter } from "next/router";
import {
  AppContextProps,
  BlockchainContext,
} from "../context/BlockchainContext";

const Login = () => {
  const router = useRouter();
  useEffect(() => {
    if (connectedAccount) {
      console.log(connectedAccount);
      router.push("/Profile");
    }
  });
  const { connectedAccount, connectWallet, disconnect } =
    useContext(BlockchainContext);
  return (
    <>
      <div className="mx-auto flex justify-center mx-5 md:mx-0">
        <Image src={LoginSvg} alt="Login" />
      </div>
      <div className="mx-auto flex flex-col justify-center">
        <div className="mx-auto md:-mt-32">
          <Image src={MetamaskSvg} alt="Metamask" />
        </div>
        <div className="flex flex-col justify-center text-xl space-y-5 md:-mt-24 mb-10">
          {connectedAccount ? (
            <>
              <p className="text-OurBlue text-center">
                Disconnect from &nbsp;
                <span className="text-[#f8911e]">{connectedAccount}</span>
              </p>
              <button onClick={() => disconnect()}>
                <Image src={Profile} alt="logo" />
              </button>
            </>
          ) : (
            <>
              <p className="text-OurBlue text-center">
                Log in with your{" "}
                <span className="text-[#f8911e]">Metamask</span>
              </p>
              <button onClick={() => connectWallet(true)}>
                <Image src={Profile} alt="logo" />
              </button>
            </>
          )}
        </div>
      </div>
      <div className="bg-respct h-24 md:h-48 bg-contain bg-no-repeat mx-5 md:mx-0"></div>
      <style jsx>{`
        .connectBtn {
          box-shadow: 0px 4px 2px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </>
  );
};

Login.layout = "L2";
export default Login;
