import React, { useContext, useEffect, useState } from "react";

import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";
import { Biconomy } from "@biconomy/mexa";
import { AbiItem } from "web3-utils";
import { TwitterShareButton } from "react-share";
import ParentABI from "../../artifacts/contracts/ComposableParentERC721.sol/ComposableParentERC721.json";
import ChildABI from "../../artifacts/contracts/ComposableChildrenERC1155.sol/ComposableChildrenERC1155.json";

import PrimaryButton from "../../components/common/PrimaryButton";

import Web3 from "web3";
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
import { ParentAddress, ChildAddress } from "../../config";

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
  const [user, setUser] = useState(undefined);
  const [nft, setNft] = useState(undefined);
  const [upgrade, setupgrade] = useState(undefined);

  const [loading, setLoading] = React.useState(true);

  const fetchUser = () => {
    axios
      .get(`/users/login?address=${connectedAccount}`)
      .then((res) => {
        setLoading(false);
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const [parentContract, setParentContract] = useState(null);
  const [childContract, setChildContract] = useState(null);

  const fetchUpgradable = () => {
    axios
      .get(`/nft/checkUpgradable`, {
        params: {
          address: connectedAccount,
          parentAddress: user.user.parentAddress[0],
          guildname: nft.nftData.guildName,
        },
      })
      .then((res) => {
        console.log(res.data.found);
        setupgrade(res.data.found);
        localStorage.setItem("upgrades", JSON.stringify(res.data.found));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const fetchNFT = () => {
    axios
      .get(`/nft/getnftdata`, {
        params: {
          address: connectedAccount,
          parentAddress: user.user.parentAddress[0],
        },
      })
      .then((res) => {
        setLoading(false);
        setNft(res.data);
        localStorage.setItem("nfts", JSON.stringify(res.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    console.log(ParentABI);
    async function initBico() {
      window.ethereum.request({ method: "eth_requestAccounts" });
      const biconomy = new Biconomy(window.ethereum, {
        apiKey: "UmmlRHIfw.fb1b4e1c-eff1-4e1b-9ee7-31ed6ad19a66",
        debug: true,
      });
      let web3 = new Web3(biconomy);
      console.log("Provider is", window.ethereum);
      console.log("web3.defaultAccount is ", web3);
      biconomy
        .onEvent(biconomy.READY, async () => {
          await window.ethereum.enable();
          const s = new web3.eth.Contract(ParentABI.abi, ParentAddress);
          await setParentContract(s);
        })
        .onEvent(biconomy.ERROR, (error, message) => {
          console.log(error);
        });
      biconomy
        .onEvent(biconomy.READY, async () => {
          await window.ethereum.enable();
          const s = new web3.eth.Contract(ChildABI.abi, ChildAddress);
          await setChildContract(s);
        })
        .onEvent(biconomy.ERROR, (error, message) => {
          console.log(error);
        });
    }
    initBico();
  }, []);

  // const [URLpath, setURLpath] = useState(window.location.pathname.toString());

  // const [Owner, setOwner] = React.useState(undefined);

  // const [isUserOwner, setisUserOwner] = React.useState(false);
  // const [isUserOtherOwner, setisUserOtherOwner] = React.useState(false);

  // const [isNFTupgraded, setisNFTupgraded] = React.useState(false);
  // const [hasUserEngaged, sethasUserEngaged] = React.useState(false);

  // const [userName, setuserName] = React.useState("mysteriousmystery");
  // const [NFTlevel, setNFTlevel] = React.useState(0);

  // async function CheckifNFTminted() {
  //   let response = await GetComposableCount(getProvider);
  //   console.log(response);
  //   let matches = parseInt(URLpath.match(/(\d+)/)[0]);
  //   if (response == -1) {
  //     setisNFTminted(false);
  //   } else if (response >= matches) {
  //     setisNFTminted(true);
  //   } else {
  //     setisNFTminted(false);
  //   }
  // }

  // async function CheckifUserOwnsthisNFT() {
  //   let response = await CheckOwnership(getProvider, connectedAccount);
  //   // console.log(response);

  //   let matches = parseInt(URLpath.match(/(\d+)/)[0]);
  //   if (response === matches) {
  //     setisUserOwner(true);
  //   } else if (response !== 0) {
  //     setisUserOtherOwner(true);
  //     setisUserOwner(false);
  //   } else {
  //     setisUserOtherOwner(false);
  //     setisUserOwner(false);
  //   }
  // }

  // async function CheckNFTlevel() {
  //   let matches = parseInt(URLpath.match(/(\d+)/)[0]);
  //   let response = await CheckLevel(getProvider, matches);
  //   setNFTlevel(response);
  //   if (response === -1) {
  //     setisNFTupgraded(false);
  //   } else if (response === 0) {
  //     setisNFTupgraded(false);
  //   } else {
  //     setisNFTupgraded(true);
  //   }
  // }

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

  // async function MintNFt() {
  //   let response = await BuyNFT(getProvider, connectedAccount);
  //   if (response) {
  //     setisNFTminted(true);
  //     setisUserOwner(true);
  //   }
  // }
  // async function UpgradedNFT() {
  //   let matches = parseInt(URLpath.match(/(\d+)/)[0]);

  //   let response = await UpgradeNFT(getProvider, connectedAccount, matches, 1);
  //   if (response) {
  //     setisNFTminted(true);
  //     setisUserOwner(true);
  //     sethasUserEngaged(true);
  //     setisNFTupgraded(true);
  //   }
  // }

  // async function GetOwnerDetails() {
  //   let matches = parseInt(URLpath.match(/(\d+)/)[0]);

  //   let response = await OwnerOfNFT(getProvider, matches);
  //   console.log(response);
  //   setOwner(response);

  //   // let matches = parseInt(URLpath.match(/(\d+)/)[0]);
  //   // if (response === matches) {
  //   //   setisUserOwner(true);
  //   // } else if (response !== 0) {
  //   //   setisUserOtherOwner(true);
  //   //   setisUserOwner(false);
  //   // } else {
  //   //   setisUserOtherOwner(false);
  //   //   setisUserOwner(false);
  //   // }
  // }

  // useEffect(() => {
  //   CheckifNFTminted();
  //   CheckifUserOwnsthisNFT();
  //   CheckNFTlevel();
  //   console.log("calling");
  //   // CheckEngagement();
  //   GetOwnerDetails();
  // });

  // console.log(isNFTminted, " is nft minted");
  // console.log(isUserOwner, " is user owner");
  // console.log(isUserOtherOwner, " is user other owner");
  // console.log(isNFTupgraded, " is nft upgraded");
  // console.log(hasUserEngaged, " has user engaged");

  // console.log(URLpath, "URL path");
  // console.log(userName, " user name");
  // console.log(NFTlevel, " nft level");

  return (
    <>
      <div className="container md:mx-auto  ">
        <div className="flex flex-col md:flex-row justify-between md:pt-12 ">
          <div id="left" className="md:w-1/2">
            <div className="flex justify-center mx-4 md:mx-0">
              <div className="flex flex-col">
                <span className="uppercase  text-center stroke pt-12 text-4xl md:text-8xl bg-clip-text poppinsFont text-OurBlack">
                  Level {nft ? nft.nftData.currentLevel : ""}
                </span>
                <div className="nftImage shadow-2xl z-10 rounded-lg w-[200px] md:w-[358.28px] h-[200px] md:h-[364.28px]">
                  <Image
                    src={nft ? nft.nftData.baseImageURL : BuyNFT2}
                    alt="image"
                    layout="responsive"
                    height={400}
                    width={400}
                  />
                </div>
                <span className="uppercase stroke text-center text-4xl md:text-8xl bg-clip-text poppinsFont text-OurBlack">
                  {nft ? nft.nftData.guildName : "Guild"}
                </span>
              </div>
            </div>
          </div>
          <div id="right" className="md:w-1/3 text-white md:py-12">
            <div className="mx-auto py-10 md:py-20 mx-5 md:mx-0">
              <div className="md:ml-10">
                <div className="flex flex-col md:flex-row md:pt-12 ">
                  <div id="profileLeft" className="md:w-3/5 md:pr-12">
                    <div className="w-75">
                      <div> {user?.user.name}</div>
                      <div> {user?.user.email}</div>
                      <button onClick={fetchUser} className="text-sm">
                        Fetch User
                      </button>
                      <br />

                      <button onClick={fetchNFT} className="text-sm">
                        Fetch NFTs
                      </button>
                      <br />
                      <button onClick={fetchUpgradable} className="text-sm">
                        Fetch Upgradable
                      </button>
                      <br />
                      <br />
                    </div>
                  </div>
                  <div
                    id="profileRight"
                    className="my-3 md:my-0 mx-4 md:mx-0 md:w-2/5 md:pt-9 md:px-3"
                  ></div>
                </div>
                <p className="text-2xl md:text-6xl flex text-white">
                  {nft ? nft.nftData.guildName : "Guild"}
                </p>
                <span className="flex md:pt-2  ">
                  <p>For &nbsp; &nbsp;</p>
                  <p className="text-OurBlue">
                    {" "}
                    {nft ? nft.nftData.userAddress : "userAddress"}
                  </p>
                </span>
                <br />
                <br />
                <br />
              </div>

              <div>
                {upgrade ? (
                  <PrimaryButton
                    flag="upgrade"
                    onCli={() => {
                      childContract.methods
                        .upgradeSNFT(
                          nft.nftData.nftId,
                          nft.nftData.currentLevel + 1,
                          "https://bafyreiexlsyibc3olkpq264i5b24mbgotvizyehhjf2caqunpzzczauhha.ipfs.dweb.link/metadata.json",
                          Web3.utils.encodePacked(nft.nftData.nftId)
                        )
                        .send({
                          from: connectedAccount,
                        });
                    }}
                  />
                ) : upgrade === false ? (
                  <>
                    <div> Cant upgrade right now</div>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div></div>
        </div>
        <div className="my-10">
          <p className="text-center mx-5">
            Knock Knock, Neo.... Follow the MetaBunny in its odyssey.” An
            odyssey of knowledge and wealth. Unlike other NFT collections,
            MetaBunny from respct.club is collected over time by attending
            workshops, sessions, and engaging with our content. You don’t buy
            bunnies, you earn them. Bunnies are rewards for your loyalty and
            engagement. These are #Respcted Bunnies.
          </p>
        </div>
        <div className="waitModal hidden">
          <WaitLoad />
        </div>
        <div className="upgradeModal hidden">
          <UpgradeModal
            NFTlevel={nft ? nft.nftData.currentLevel : ""}
            onCli={() => {
              UpgradeNFT();
            }}
          />
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
