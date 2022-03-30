/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-undef */
import React from "react";
import CreateNft from "../public/images/CreateNft.svg";
import Image from "next/image";
import Respct from "../../public/svg/respct.svg";
import Instagram from "../../public/socialSvg/Instagram.svg";
import Twitter from "../../public/socialSvg/Twitter.svg";
import Twitch from "../../public/socialSvg/Twitch.svg";
import Youtube from "../../public/socialSvg/Youtube.svg";
import PrimaryButton from "../components/common/PrimaryButton";
import VerticalNft from "../public/images/verticalNFT.svg";
import FVerticalNft from "../public/images/fverticalNFT.svg";

export default function ProfileSettings() {
  return (
    <>
      <div className="container mx-auto mt-14 md:mt-28  bg-[#131312]">
        <div>
          <p className=" text-center uppercase text-3xl md:text-5xl md:pb-12 text-white flex justify-center">
            Create &nbsp; <p className="text-[#03AFD0]"> your</p> &nbsp; nft
          </p>
          <div className="flex justify-center mt-10">
            <div className="flex flex-col justify-center ml-4 md:ml-0 mr-2 md:mr-10 ">
              <Image src={VerticalNft} width={70} height={200} />
            </div>
            <div className="flex flex-col">
              <button>
                <div className="shadow-2xl">
                  <Image src={CreateNft} width={456} height={456} />
                </div>
              </button>
            </div>
            <div className="flex flex-col justify-center mr-4 md:mr-0 ml-2 md:ml-10">
              <Image src={FVerticalNft} width={70} height={200} />
            </div>
          </div>

          <form className="text-center md:mt-16 md:pt-12">
            <div className="my-8">
              <label
                className="block text-gray-700 text-xl  mb-2  text-[#6F6F6F] font-semibold"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="shadow shadow-inner appearance-none rounded-md md:w-1/3 py-2 px-3 text-[#35353F] leading-tight focus:outline-none bg-[#212127] font-semibold"
                id="name"
                type="text"
                placeholder="name"
              />
            </div>
            <div className="my-8">
              <label
                className="block text-gray-700 text-xl  mb-2 text-[#6F6F6F] font-semibold"
                htmlFor="Description"
              >
                Description
              </label>
              <textarea
                className="shadow shadow-inner appearance-none rounded-md md:w-1/3 py-2 px-3 text-[#35353F] leading-tight focus:outline-none bg-[#212127] font-semibold"
                id="description"
                placeholder="Description"
              />
            </div>
            <div className="my-8">
              <label
                className="block text-gray-700 text-xl mb-2 text-[#6F6F6F] font-semibold"
                htmlFor="Collection"
              >
                Collection
              </label>
              <input
                className="shadow shadow-inner appearance-none rounded-md md:w-1/3 py-2 px-3 text-[#35353F] leading-tight focus:outline-none bg-[#212127] font-semibold"
                id="Collection"
                type="text"
                placeholder="Collection"
              />
            </div>
            <div className="my-8">
              <label
                className="block text-gray-700 text-xl  mb-2  text-[#6F6F6F] font-semibold"
                htmlFor="Supply"
              >
                Supply
              </label>
              <input
                className="shadow shadow-inner  appearance-none  rounded-md md:w-1/3 py-2 px-3 text-[#35353F] leading-tight focus:outline-none bg-[#212127] font-semibold"
                id="Supply"
                type="text"
                placeholder="Supply"
              />
            </div>
            <div className="my-8">
              <label
                className="block text-gray-700 text-xl  mb-2  text-[#6F6F6F] font-semibold"
                htmlFor="Sales Price"
              >
                Sales Price
              </label>
              <input
                className="shadow shadow-inner  appearance-none  rounded-md md:w-1/3 py-2 px-3 text-[#35353F] leading-tight focus:outline-none bg-[#212127] font-semibold"
                id="Sales Price"
                type="text"
                placeholder="Sales Price"
              />
            </div>
          </form>
          <div className="flex justify-center bg-respct bg-no-repeat bg-contain bg-center h-32 md:h-64 ">
            <div className="flex flex-col justify-center">
              <button className="bg-OurBlue rounded-md shadow-md shadow-OurBlue">
                <div className="text-white font-bold px-12 py-1">Create</div>
              </button>
            </div>
          </div>
          <br />
        </div>
      </div>
    </>
  );
}
