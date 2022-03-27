import React from "react";
import BuyNFT from "../../public/images/buyNft.svg";
import Image from "next/image";
import Polygon from "../../public/svg/polygon.svg";
import PrimaryButton from "../components/common/PrimaryButton";
import ProfileImage from "../../public/images/profileImage.svg";
import Carousel from "../components/common/carousel";
import { BlockchainContext } from "../context/BlockchainContext";
import {
  getMarketContract,
  getTokenContract,
} from "./../api/blockchainService";

export default function Buy(props) {
  return (
    <div className="container md:mx-auto md:mt-28  ">
      <div className="flex  md:pt-12 ">
        <div id="left" className="md:w-1/2">
          <div className="flex justify-center">
            <div className="flex flex-col justify-center ">
              <span className="uppercase stroke md:pt-12 md:text-6xl  bg-clip-text  rotate-[270deg] ">
                Azuki
              </span>
            </div>
            <div className="flex flex-col">
              <span className="uppercase text-center stroke  md:text-6xl  bg-clip-text">
                Level 3
              </span>
              <div className="shadow-2xl">
                <Image src={BuyNFT} layout="fixed" alt="image" />
              </div>
              <span className="uppercase  text-center stroke  md:text-6xl bg-clip-text">
                # 420
              </span>
            </div>
            <div className="flex flex-col justify-center ">
              <span className="uppercase stroke  md:text-6xl  bg-clip-text  rotate-90 ">
                Azuki
              </span>
            </div>
          </div>

          {/* <div>
            <h1 className="text-3xl text-center font-bold">Buy NFT</h1>
            <div className="flex justify-center">
              <span className="text-3xl font-bold flex flex-col rotate-[270deg] justify-center ">
                <span className="">Buy NFT</span>
              </span>
              <Image src={BuyNFT} layout="fixed" />
              <span className="text-3xl font-bold flex flex-col rotate-90 justify-center ">
                <span className="">Buy NFT</span>
              </span>
            </div>
            <h1 className="text-3xl text-center  font-bold">Buy NFT</h1>
          </div> */}
        </div>
        <div id="right" className="md:w-1/2 text-white md:py-12">
          <div className=" w-1/2 mx-auto py-20">
            <p className="md:text-6xl flex ">Azuki NFT</p>
            <span className="flex md:pt-2  ">
              <p>By &nbsp;</p>
              <p className="text-OurBlue">Azuki</p>
            </span>
            {/* <p className="text-OurPurple flex  md:pt-2">
              current owner: {props.owner ? props.owner : "OLX69"}
            </p> */}
            <div className="flex mt-8 mb-8 ">
              <div>
                <Image src={Polygon} layout="fixed" />
              </div>
              <div className="flex flex-col md:mt-3 ">
                <div className="text-4xl text-OurBlue">
                  {props.priceEther
                    ? props.priceEther + " MATIC"
                    : "1.00 MATIC"}
                </div>
                <div className="text-2xl text-OurSecondGrey md:mt-3">
                  {props.priceDollar ? "$" + props.priceDollar : "$3,618.36"}
                </div>
              </div>
            </div>
            <div className="  ">
              <PrimaryButton
                onClick={(e) => {
                  e.preventDefault();
                }}
                text="Buy"
                color="[#03AFD0]"
                shadow="[#45ABD6]"
              />
              <PrimaryButton
                text="Upgrade"
                color="[#7834BF]"
                shadow="[#000000]"
              />
            </div>
          </div>
        </div>
        <div></div>
      </div>

      {/* next */}
      <div className="mt-12">
        <p className="text-white mx-10">
          Welcome to the world of the SNFTS where you can earn rewards on
          collecting points by supporting your favorfite creators on differtent
          platforms. Just buy the SNFT of your favourite creators and gain
          points to upgrade the SNFT to vaious levels and earn rewards based on
          the levels
        </p>

        <div className="flex flex-wrap justify-around">
          <div id="leftside" className="text-white">
            left skipped
          </div>
          <div id="rightside" className="text-white">
            right skipped
          </div>
        </div>
        <p className="text-[#03AFD0] md:mx-10 md:text-lg md:mt-3">
          {" "}
          More From This Collection
        </p>
        <Carousel
          nfts={[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
        />
        <div className="text-white">carousel</div>
      </div>
      <div>
        <div className="flex justify-center">
          <div id="ls">
            <div className="p-2 m-8 rounded-lg bg-[#212127] w-60 ">
              <div className="flex">
                <div className=" ">
                  <div className="text-OurPurple">
                    <p>{props.owners ? props.owners : "10000"} </p>
                    <p>Proud Owners</p>
                  </div>
                  <div className="text-OurBlue">
                    <p>{props.listed ? props.listed : "200"} </p>
                    <p>Listed</p>
                  </div>
                </div>
                <div className="uppercase  md:pt-12 md:text-3xl  text-OurPurple bg-clip-text  rotate-[270deg] ">
                  Azuki
                </div>
              </div>
            </div>
          </div>
          <div id="rs">
            <div className="p-2 m-8 rounded-lg bg-[#212127] w-72 ">
              <div
                className="md:relative md:bottom-10"
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Image src={ProfileImage} layout="fixed" alt="Image" />
              </div>
              <p className="text-OurBlue text-7xl text-center ">
                {props.topFan ? props.topFan : "Faizan"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
