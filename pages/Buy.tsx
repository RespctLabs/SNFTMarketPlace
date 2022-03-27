import React from "react";
import BuyNFT from "../public/images/buyNft.svg";
import Image from "next/image";
import Polygon from "../public/svg/polygon.svg";
import PrimaryButton from "../components/common/PrimaryButton";
import ProfileImage from "../public/images/profileImage.svg";
import Carousels from "../components/common/carousel";
import VerticalAzuki from "../public/images/verticalAzuki.svg";
import FVerticalAzuki from "../public/images/fverticalAzuki.svg";
import Level3 from "../public/images/level3.svg";
import AzukiNo from "../public/images/azukiNo.svg";
import ProgressL4 from "../public/images/progressL4.svg";
import ProgressL4Mobile from "../public/images/progressL4Mobile.svg";
import ProgressBar from "react-customizable-progressbar";
import { BlockchainContext } from "../context/BlockchainContext";
import {
    getMarketContract,
    getTokenContract,
} from "./../api/blockchainService";

export default function Buy(props) {
    return (
        <>
            <div className="container md:mx-auto md:mt-28  ">
                <div className="flex flex-col md:flex-row md:pt-12 ">
                    <div id="left" className="md:w-1/2">
                        <div className="flex justify-center mx-4 md:mx-0">
                            <div className="flex flex-col justify-center ">
                                <Image
                                    src={VerticalAzuki}
                                    width={70}
                                    height={200}
                                />
                            </div>
                            <div className="flex flex-col">
                                <Image src={Level3} width={200} height={70} />
                                <div className="shadow-2xl">
                                    <Image src={BuyNFT} alt="image" />
                                </div>
                                <Image src={AzukiNo} width={200} height={70} />
                            </div>
                            <div className="flex flex-col justify-center ">
                                <Image
                                    src={FVerticalAzuki}
                                    width={70}
                                    height={200}
                                />
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
                        <div className="w-2/3 md:w-1/2 mx-auto py-10 md:py-20">
                            <p className="md:text-6xl flex ">Azuki NFT</p>
                            <span className="flex md:pt-2  ">
                                <p>By &nbsp;</p>
                                <p className="text-OurBlue">Azuki</p>
                            </span>
                            {/* <p className="text-OurPurple flex  md:pt-2">
              current owner: {props.owner ? props.owner : "OLX69"}
            </p> */}
                            <div className="flex my-5 md:mt-8 md:mb-8 ">
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
                                        {props.priceDollar
                                            ? "$" + props.priceDollar
                                            : "$3,618.36"}
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col space-y-5">
                                <PrimaryButton
                                    onClick={(e) => {
                                        e.preventDefault();
                                    }}
                                    text="Sell"
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
                        Welcome to the world of the SNFTS where you can earn
                        rewards on collecting points by supporting your
                        favorfite creators on differtent platforms. Just buy the
                        SNFT of your favourite creators and gain points to
                        upgrade the SNFT to vaious levels and earn rewards based
                        on the levels
                    </p>

                    <div className="desktopProgress flex flex-wrap justify-around my-10">
                        <div className="flex justify-center items-center">
                            <div
                                id="leftside"
                                className="text-OurBlue text-center headerDiv rounded-lg w-60 px-3 py-2"
                            >
                                <h1 className="text-[40px]">Reward</h1>
                                <h3 className="text-[20px]">Unlocked</h3>
                                <p className="text-[20px]">
                                    mill gaya na reward chl ab aage khel
                                </p>
                            </div>
                        </div>
                        <div>
                            <ProgressBar
                                progress={50}
                                radius={150}
                                // strokeWidth={28}
                                strokeColor="#03AFD0"
                                strokeLinecap="round"
                                // trackStrokeWidth={14}
                                trackStrokeLinecap="butt"
                                cut={120}
                                rotate={-210}
                                transition="1.5s ease 0.5s"
                                trackTransition="0s ease"
                            >
                                <div className="rounded-full headerDiv relative indicator w-48 h-48">
                                    <div className="absolute -top-10">
                                        <Image src={ProgressL4} />
                                    </div>
                                </div>
                            </ProgressBar>
                        </div>
                        <div className="flex justify-center items-center">
                            <div
                                id="rightside"
                                className="text-OurSecondGrey text-center headerDiv rounded-lg w-60 px-3 py-2"
                            >
                                <h1 className="text-[40px]">Reward</h1>
                                <h3 className="text-[20px]">locked</h3>
                                <p className="text-[20px]">
                                    reward chahiye toh khel na padh kya rha hai
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="mobileProgress flex flex-col justify-center my-10">
                        <div className="flex justify-center">
                            <ProgressBar
                                progress={50}
                                radius={100}
                                // strokeWidth={28}
                                strokeColor="#03AFD0"
                                strokeLinecap="round"
                                // trackStrokeWidth={14}
                                trackStrokeLinecap="butt"
                                cut={120}
                                rotate={-210}
                                transition="1.5s ease 0.5s"
                                trackTransition="0s ease"
                            >
                                <div className="rounded-full headerDiv relative indicator w-28 h-28">
                                    <div className="absolute">
                                        <Image src={ProgressL4Mobile} />
                                    </div>
                                </div>
                            </ProgressBar>
                        </div>
                        <div className="flex flex-row justify-between mx-14 -mt-5">
                            <div className="flex justify-center items-center">
                                <div
                                    id="leftside"
                                    className="text-OurBlue text-center headerDiv rounded-lg w-32 px-3 py-2"
                                >
                                    <h1 className="text-[14px]">Reward</h1>
                                    <h3 className="text-[8px]">Unlocked</h3>
                                    <p className="text-[8px]">
                                        mill gaya na reward chl ab aage khel
                                    </p>
                                </div>
                            </div>
                            <div className="flex justify-center items-center">
                                <div
                                    id="rightside"
                                    className="text-OurSecondGrey text-center headerDiv rounded-lg w-32 px-3 py-2"
                                >
                                    <h1 className="text-[14px]">Reward</h1>
                                    <h3 className="text-[8px]">locked</h3>
                                    <p className="text-[8px]">
                                        reward chahiye toh khel na padh kya rha
                                        hai
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className="text-[#03AFD0] mx-10 md:mx-10 md:text-lg md:mt-3">
                        {" "}
                        More From This Collection
                    </p>
                    <Carousels
                        nfts={[
                            1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7,
                            8, 9,
                        ]}
                    />
                </div>
                <div>
                    <div className="flex flex-col md:flex-row justify-center">
                        <div id="ls">
                            <div className="px-7 py-5 m-8 rounded-3xl bg-[#212127] w-72 z-10">
                                <div className="flex">
                                    <div className=" ">
                                        <div className="text-OurPurple">
                                            <p className="text-5xl font-semibold">
                                                {props.owners
                                                    ? props.owners
                                                    : "10000"}{" "}
                                            </p>
                                            <p>Proud Owners</p>
                                        </div>
                                        <div className="text-OurBlue">
                                            <p className="text-5xl font-semibold">
                                                {props.listed
                                                    ? props.listed
                                                    : "200"}{" "}
                                            </p>
                                            <p>Listed</p>
                                        </div>
                                    </div>
                                    <div className="pt-20 md:pt-14 text-5xl text-OurPurple bg-clip-text rotate-[270deg] ">
                                        Azuki
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center -mt-[15px] mb-10">
                                <Image
                                    src="/images/stats.svg"
                                    width={200}
                                    height={70}
                                />
                            </div>
                        </div>
                        <div id="rs">
                            <div className="m-8 mt-24 rounded-3xl bg-[#212127] w-72 relative z-10">
                                <div
                                    className="absolute -top-20 right-20"
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Image src={ProfileImage} alt="Image" />
                                </div>
                                <p className="text-OurBlue text-5xl text-center pt-16 pb-4">
                                    {props.topFan ? props.topFan : "Faizan"}
                                </p>
                            </div>
                            <div className="flex justify-center -mt-[15px] mb-10">
                                <Image
                                    src="/images/topFan.svg"
                                    width={200}
                                    height={70}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>
                {`
                    .indicator {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        text-align: center;
                        position: absolute;
                        top: 120px;
                        left: 75px;
                        /* width: 100%; */
                        /* height: 100%; */
                        margin: 0 auto;
                        font-size: 2.2em;
                        font-weight: 100;
                        color: #555;
                        user-select: none;
                    }

                    .mobileProgress {
                        display: none;
                    }

                    @media screen and (max-width: 1000px) {
                        .mobileProgress {
                            display: flex;
                        }

                        .desktopProgress {
                            display: none;
                        }

                        .indicator {
                            top: 80px;
                            left: 65px;
                        }
                    }
                `}
            </style>
        </>
    );
}
