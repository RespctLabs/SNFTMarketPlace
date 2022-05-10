import React, { useEffect, useContext, useState } from "react";
import Tity from "../components/Tity";
import BannerPic from "../public/images/profilebanner.svg";
import ProfileImage from "../public/images/profileImage.svg";
import Filter from "../public/svg/filter.svg";
import { ethers } from "ethers";
import Respct from "../public/images/respct.svg";
import NFTCard from "../components/common/NftCard";
import Image from "next/image";
import Link from "next/link";
import { TwitterShareButton } from "react-share";
import { CheckOwnership } from "./api/blockchain";
import { ParentAddress, ChildAddress } from "../config";

import axios from "axios";

import ParentContract from "../artifacts/contracts/ComposableParentERC721.sol/ComposableParentERC721.json";
import ChildContract from "../artifacts/contracts/ComposableChildrenERC1155.sol/ComposableChildrenERC1155.json";

import { BlockchainContext } from "../context/BlockchainContext.tsx";

function Profile() {
  const [user, setUser] = useState(undefined);
  const [nft, setNft] = useState(undefined);
  const [loading, setLoading] = React.useState(true);

  const [NumberOfNFTs, setNumberOfNFTs] = React.useState(0);
  const [description, setDescription] = React.useState("2");
  const { getProvider, connectedAccount } = useContext(BlockchainContext);

  const [Owner, setOwner] = React.useState(false);

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

  //   async function CheckifUserOwnsaNFT() {
  //     let response = await CheckOwnership(getProvider, connectedAccount);
  //     console.log(response, "response");
  //     if (response > 0) {
  //       setOwner(true);
  //     } else {
  //       setOwner(false);
  //     }
  //   }

  useEffect(() => {
    // console.log("hello");
    // async function getM() {
    //   const provider = await getProvider();
    //   const signer = await provider?.getSigner();
    //   console.log(signer, provider, " signer  provider");
    //   let parentContract = new ethers.Contract(
    //     ParentAddress,
    //     ParentContract.abi,
    //     signer
    //   );
    //   try {
    //     let count = await parentContract.getComposableCount();
    //     console.log("count", count);
    //     setNumberOfNFTs(parseInt(BigInt(count._hex).toString(10)));
    //     console.log("count", NumberOfNFTs);
    //   } catch (err) {
    //     console.log("count");
    //   }
    //   // getMintedNFTs();
    // }
    // getM();
    // CheckifUserOwnsaNFT();
  });

  async function getMintedNFTs() {
    const provider = await getProvider();
    const signer = await provider?.getSigner();

    // calling smart contract on function getComposableCount
    let parentContract = new ethers.Contract(
      ParentAddress,
      ParentContract.abi,
      signer
    );

    let count = await parentContract.getComposableCount();

    console.log(count, "count");
  }

  return (
    <div className=" container mx-auto mb-16">
      <div className="mx-4 md:mx-0">
        <Image src={Respct} alt="any" />
      </div>
      <div className="flex justify-center ">
        <div className="md:absolute md:top-80">
          <Image src={ProfileImage} alt="any" />
        </div>
      </div>

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
          </div>
        </div>
        <div
          id="profileRight"
          className="my-3 md:my-0 mx-4 md:mx-0 md:w-2/5 md:pt-9 md:px-3"
        >
          <Tity />
        </div>
      </div>

      <div className="flex ">
        {nft ? (
          <Link href="/nfts/1">
            <a>
              <div className=" headerDiv p-2 m-8 rounded-lg bg-OurBlack w-58 flex flex-col justify-center">
                <div className=" w-52 h-52 bg-[#464646] rounded-lg">
                  <Image
                    src={nft ? nft.nftData.baseImageURL : ProfileImage}
                    alt="any"
                    height={200}
                    width={200}
                    layout="responsive"
                  />
                </div>
                <div className=" justify-around">
                  <p className="text-sm">
                    currentMMR : {nft?.nftData.currentMMR}
                  </p>
                  <p className="text-sm">
                    Guild Name : {nft?.nftData.guildName}
                  </p>
                </div>
                <div className="flex justify-end text-white mx-3">
                  {/* <p className="text-OurPurple">Top Bid 0</p> */}
                </div>
              </div>
            </a>
          </Link>
        ) : (
          <div className=" headerDiv p-2 m-8 rounded-lg bg-OurBlack w-60 flex flex-col justify-center">
            <div className="flex justify-between items-center mx-auto text-white hover:text-black font-bold text-2xl text-center w-52 h-52 bg-[#464646] rounded-lg">
              MINT your own NFT
            </div>

            <div className="flex justify-end text-white mx-3">
              {/* <p className="text-OurPurple">Top Bid 0</p> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

Profile.layout = "L1";
export default Profile;
