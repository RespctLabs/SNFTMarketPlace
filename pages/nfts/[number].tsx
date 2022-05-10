import React, { useContext, useEffect, useState } from "react";

import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";
import { TwitterShareButton } from "react-share";

import PrimaryButton from "../../components/common/PrimaryButton";

import web3 from "web3";
import { ethers, Signer } from "ethers";

import BuyNFT2 from "../../public/images/buyNft.svg";
import Polygon from "../../public/svg/polygon.svg";
import ProfileImage from "../../public/images/profileImage.svg";
import VerticalAzuki from "../../public/images/verticalAzuki.svg";
import Level3 from "../../public/images/level3.svg";
import AzukiNo from "../../public/images/azukiNo.svg";
import FVerticalAzuki from "../../public/images/fverticalAzuki.svg";
import UpgradeModal from "../../components/upgradeModal";
import WaitLoad from "../../components/waitLoad";

import { BlockchainContext } from "../../context/BlockchainContext";
import {
    BuyNFT,
    GetComposableCount,
    useGetNecessities,
    CheckOwnership,
    CheckLevel,
    UpgradeNFT,
    OwnerOfNFT,
} from "../api/blockchain";
import { checkValidity } from "../api/axios";

function Buy() {
    const { getProvider, connectedAccount } = useContext(BlockchainContext);

    const [URLpath, setURLpath] = useState(window.location.pathname.toString());

    const [Owner, setOwner] = React.useState(undefined);

    const [isNFTminted, setisNFTminted] = React.useState(false);
    const [isUserOwner, setisUserOwner] = React.useState(false);
    const [isUserOtherOwner, setisUserOtherOwner] = React.useState(false);

    const [isNFTupgraded, setisNFTupgraded] = React.useState(false);
    const [hasUserEngaged, sethasUserEngaged] = React.useState(false);

    const [userName, setuserName] = React.useState("mysteriousmystery");
    const [NFTlevel, setNFTlevel] = React.useState(0);

    async function CheckifNFTminted() {
        let response = await GetComposableCount(getProvider);
        console.log(response);
        let matches = parseInt(URLpath.match(/(\d+)/)[0]);
        if (response == -1) {
            setisNFTminted(false);
        } else if (response >= matches) {
            setisNFTminted(true);
        } else {
            setisNFTminted(false);
        }
    }

    async function CheckifUserOwnsthisNFT() {
        let response = await CheckOwnership(getProvider, connectedAccount);
        // console.log(response);

        let matches = parseInt(URLpath.match(/(\d+)/)[0]);
        if (response === matches) {
            setisUserOwner(true);
        } else if (response !== 0) {
            setisUserOtherOwner(true);
            setisUserOwner(false);
        } else {
            setisUserOtherOwner(false);
            setisUserOwner(false);
        }
    }

    async function CheckNFTlevel() {
        let matches = parseInt(URLpath.match(/(\d+)/)[0]);
        let response = await CheckLevel(getProvider, matches);
        setNFTlevel(response);
        if (response === -1) {
            setisNFTupgraded(false);
        } else if (response === 0) {
            setisNFTupgraded(false);
        } else {
            setisNFTupgraded(true);
        }
    }

    // function CheckEngagement() {
    //     let url =
    //         "https://respctbot.herokuapp.com/username/" +
    //         userName +
    //         "/" +
    //         connectedAccount;
    //     let response = checkValidity(url, "get");
    //     console.log(response, " :is the response");
    //     if (response === 1) {
    //         sethasUserEngaged(true);
    //     } else if (response === 0) {
    //         sethasUserEngaged(false);
    //     }
    // }

    async function MintNFt() {
        let response = await BuyNFT(getProvider, connectedAccount);
        if (response) {
            setisNFTminted(true);
            setisUserOwner(true);
        }
    }
    async function UpgradedNFT() {
        let matches = parseInt(URLpath.match(/(\d+)/)[0]);

        let response = await UpgradeNFT(
            getProvider,
            connectedAccount,
            matches,
            1
        );
        if (response) {
            setisNFTminted(true);
            setisUserOwner(true);
            sethasUserEngaged(true);
            setisNFTupgraded(true);
        }
    }

    async function GetOwnerDetails() {
        let matches = parseInt(URLpath.match(/(\d+)/)[0]);

        let response = await OwnerOfNFT(getProvider, matches);
        console.log(response);
        setOwner(response);

        // let matches = parseInt(URLpath.match(/(\d+)/)[0]);
        // if (response === matches) {
        //   setisUserOwner(true);
        // } else if (response !== 0) {
        //   setisUserOtherOwner(true);
        //   setisUserOwner(false);
        // } else {
        //   setisUserOtherOwner(false);
        //   setisUserOwner(false);
        // }
    }

    useEffect(() => {
        CheckifNFTminted();
        CheckifUserOwnsthisNFT();
        CheckNFTlevel();
        console.log("calling");
        // CheckEngagement();
        GetOwnerDetails();
    });

    console.log(isNFTminted, " is nft minted");
    console.log(isUserOwner, " is user owner");
    console.log(isUserOtherOwner, " is user other owner");
    console.log(isNFTupgraded, " is nft upgraded");
    console.log(hasUserEngaged, " has user engaged");

    console.log(URLpath, "URL path");
    console.log(userName, " user name");
    console.log(NFTlevel, " nft level");

    return (
        <>
            <div className="container md:mx-auto  ">
                <div className="flex flex-col md:flex-row justify-between md:pt-12 ">
                    <div id="left" className="md:w-1/2">
                        <div className="flex justify-center mx-4 md:mx-0">
                            <div className="flex flex-col justify-center mt-10 md:mt-0 -mr-7 md:-mr-24">
                                <span className="uppercase stroke text-4xl md:text-8xl text-center bg-clip-text poppinsFont rotate-[270deg] text-OurBlack">
                                    Meta
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <span className="uppercase  text-center stroke pt-12 text-4xl md:text-8xl bg-clip-text poppinsFont text-OurBlack">
                                    Level {NFTlevel}
                                </span>
                                <div className="nftImage shadow-2xl z-10 rounded-lg w-[200px] md:w-[358.28px] h-[200px] md:h-[364.28px]">
                                    <Image src={BuyNFT2} alt="image" />
                                </div>
                                <span className="uppercase stroke text-center text-4xl md:text-8xl bg-clip-text poppinsFont text-OurBlack">
                                    Respct
                                </span>
                            </div>
                            <div className="flex flex-col justify-center mt-10 md:mt-0 -ml-10 md:-ml-32">
                                <span className="uppercase stroke text-4xl md:text-8xl text-center bg-clip-text poppinsFont rotate-[270deg] text-OurBlack">
                                    Bunny
                                </span>
                            </div>
                        </div>
                    </div>
                    <div id="right" className="md:w-1/3 text-white md:py-12">
                        <div className="mx-auto py-10 md:py-20 mx-5 md:mx-0">
                            <div className="md:ml-10">
                                <p className="text-2xl md:text-6xl flex text-white">
                                    Meta Bunny
                                </p>
                                <span className="flex md:pt-2  ">
                                    <p>By &nbsp;</p>
                                    <p className="text-OurBlue">Respct</p>
                                </span>
                                <div className="flex my-5 md:mt-8 md:mb-8 ">
                                    <div>
                                        <Image
                                            src={Polygon}
                                            layout="fixed"
                                            alt="Polygon"
                                        />
                                    </div>
                                    <div className="flex flex-col md:mt-3 ">
                                        <div className="text-4xl text-OurBlue">
                                            1.00 MATIC
                                        </div>
                                        <div className="text-2xl text-OurSecondGrey md:mt-3">
                                            $1.46
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                {isNFTminted ? (
                                    isUserOwner ? (
                                        isNFTupgraded ? (
                                            <>Congratulations</>
                                        ) : hasUserEngaged ? (
                                            <PrimaryButton
                                                flag="upgrade"
                                                onCli={() => {
                                                    document.getElementsByClassName("upgradeModal")[0].classList.remove("hidden");
                                                    UpgradedNFT();
                                                }}
                                            />
                                        ) : (
                                            <>
                                                <div>
                                                    <input
                                                        className="rounded-2xl indent-3 border-2 border-white p-1 w-full md:w-1/2 text-black"
                                                        type="text"
                                                        placeholder="Enter your name"
                                                        value={userName}
                                                        required
                                                        onChange={(e) =>
                                                            setuserName(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <TwitterShareButton
                                                    url="snft.respct.club"
                                                    title="My First Upgradable NFT"
                                                    via={
                                                        "Gathering Engagement Points for Upgrading My #Respct NFT to Level @RespctClub " +
                                                        (NFTlevel + 1) +
                                                        ". Let's Gooo!"
                                                    }
                                                    hashtags={[
                                                        "Respct",
                                                        "NFT",
                                                        "Upgrading",
                                                        "Level",
                                                    ]}
                                                >
                                                    Tweet
                                                </TwitterShareButton>

                                                <PrimaryButton
                                                    flag="upgrade"
                                                    onCli={(e) => {
                                                        e.preventDefault();
                                                        document.getElementsByClassName("upgradeModal")[0].classList.remove("hidden");
                                                        UpgradedNFT();
                                                    }}
                                                />
                                            </>
                                        )
                                    ) : (
                                        <>
                                            {Owner} &nbsp; is the owner of this
                                            NFT
                                        </>
                                    )
                                ) : isUserOtherOwner ? (
                                    <>Already Owner of some other nft</>
                                ) : (
                                    <>
                                        <PrimaryButton
                                            flag="buy"
                                            onCli={() => {
                                                BuyNFT(getProvider, connectedAccount);
                                            }}
                                        />
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    <div></div>
                </div>
                <div className="my-10">
                    <p className="text-center mx-5">
                        Knock Knock, Neo.... Follow the MetaBunny in its
                        odyssey.” An odyssey of knowledge and wealth. Unlike
                        other NFT collections, MetaBunny from respct.club is
                        collected over time by attending workshops, sessions,
                        and engaging with our content. You don’t buy bunnies,
                        you earn them. Bunnies are rewards for your loyalty and
                        engagement. These are #Respcted Bunnies.
                    </p>
                </div>
                <div className="waitModal hidden">
                    <WaitLoad />
                </div>
                <div className="upgradeModal hidden">
                    <UpgradeModal NFTlevel={NFTlevel} onCli={() => {
                        UpgradeNFT();
                    }}/>
                </div>
            </div>
            <style jsx>{`
                .nftImage {
                    z-index: 10;
                    -webkit-box-shadow: 0px 3px 35px 35px black;
                    -moz-box-shadow: 0px 3px 35px 35px black;
                    box-shadow: 0px 3px 35px 35px black;
                }
            `}</style>
        </>
    );
}

Buy.layout = "L1";
export default Buy;
