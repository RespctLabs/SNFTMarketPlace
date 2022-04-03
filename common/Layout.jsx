import React, { Fragment, useContext, useEffect, useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import router, { useRouter } from "next/router";
import {
  AppContextProps,
  BlockchainContext,
} from "../context/BlockchainContext.tsx";

const Layout = (props) => {
  const { connectedAccount, connectWallet, disconnect } =
    useContext(BlockchainContext);
  useEffect(() => {
    if (connectedAccount) {
      router.push("/Profile");
    } else {
      router.push("/Login");
    }
  }, [connectedAccount]);

  if (connectedAccount) {
    return (
      <div className="flex flex-col  justify-between bg-OurBlack text-white px-5 md:px-0 min-h-screen">
        <div className="md:mx-24 my-5 md:my-12">
          <Navbar />
        </div>
        <div className="container mx-auto mb-auto sm:px-8 md:px-4 lg:px-16 xl:px-20">
          {props.children}
        </div>
        {/* <Footer /> */}
      </div>
    );
  } else {
    return (
      <div className="h-screen bg-OurBlack">
        <div className=" text-center  text-white text-3xl">
          Proceeding to Login Page{" "}
        </div>

        {() => {
          if (connectedAccount) {
            router.push("/Profile");
          } else {
            router.push("/Login");
          }
        }}
      </div>
    );
  }
};

export default Layout;
