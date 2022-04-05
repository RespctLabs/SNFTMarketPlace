import React, { useEffect, useContext } from "react";
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

import ParentContract from "../artifacts/contracts/ComposableParentERC721.sol/ComposableParentERC721.json";
import ChildContract from "../artifacts/contracts/ComposableChildrenERC1155.sol/ComposableChildrenERC1155.json";

import { BlockchainContext } from "../context/BlockchainContext.tsx";

function Profile() {
  const [NumberOfNFTs, setNumberOfNFTs] = React.useState(0);
  const [description, setDescription] = React.useState("2");
  const { getProvider, connectedAccount } = useContext(BlockchainContext);

  const [Owner, setOwner] = React.useState(false);

  async function CheckifUserOwnsaNFT() {
    let response = await CheckOwnership(getProvider, connectedAccount);
    console.log(response, "response");
    if (response > 0) {
      setOwner(true);
    } else {
      setOwner(false);
    }
  }

  useEffect(() => {
    console.log("hello");
    async function getM() {
      const provider = await getProvider();
      const signer = await provider?.getSigner();
      console.log(signer, provider, " signer  provider");

      let parentContract = new ethers.Contract(
        ParentAddress,
        ParentContract.abi,
        signer
      );

      try {
        let count = await parentContract.getComposableCount();
        console.log("count", count);
        setNumberOfNFTs(parseInt(BigInt(count._hex).toString(10)));
        console.log("count", NumberOfNFTs);
      } catch (err) {
        console.log("count");
      }

      // getMintedNFTs();
    }
    getM();
    CheckifUserOwnsaNFT();
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

  function generateNFTs(event) {
    let Nfts = [];
    for (var i = 1; i <= NumberOfNFTs; i++) {
      Nfts.push(
        <Link href={"/nfts/" + i} passHref>
          <a>
            <NFTCard key={i} number={i} element={""} />
          </a>
        </Link>
      );
    }
    if (!Owner) {
      Nfts.push(
        <Link href={"/nfts/" + (NumberOfNFTs + 1)} passHref>
          <a>
            <div className=" headerDiv p-2 m-8 rounded-lg bg-OurBlack w-60 flex flex-col justify-center">
              <div className="flex justify-between items-center mx-auto text-white hover:text-black font-bold text-2xl text-center w-52 h-52 bg-[#464646] rounded-lg">
                MINT your own NFT
              </div>
              <div className="flex justify-between text-white mx-3">
                <p className="font-semibold">Respct NFT</p>
                <p className="text-OurGreen">Level sNFT</p>
              </div>
              <div className="flex justify-end text-white mx-3">
                {/* <p className="text-OurPurple">Top Bid 0</p> */}
              </div>
            </div>
          </a>
        </Link>
      );
    }
    return (
      <div id="cards" className="md:grid md:grid-cols-4 md:gap-12">
        {Nfts}
      </div>
    );
  }

  return (
    <div className=" container mx-auto mb-16">
      <div className="mx-4 md:mx-0">
        <Image src={Respct} />
      </div>
      <div className="flex justify-center ">
        <div className="md:absolute md:top-80">
          <Image src={ProfileImage} layout="fixed" alt="profile" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:pt-12 ">
        <div id="profileLeft" className="md:w-3/5 md:pr-12">
          <p className="text-sm mx-4 md:mx-0 md:text-base text-center md:text-left md:w-4/5">
            {!description // note the !
              ? description.toUpperCase()
              : "Knock Knock, Neo.... Follow the MetaBunny in its odyssey.” An odyssey of knowledge and wealth. Unlike other NFT collections, MetaBunny from respct.club is collected over time by attending workshops, sessions, and engaging with our content. You don’t buy bunnies, you earn them. Bunnies are rewards for your loyalty and engagement. These are #Respcted Bunnies."}
          </p>
        </div>
        <div
          id="profileRight"
          className="my-3 md:my-0 mx-4 md:mx-0 md:w-2/5 md:pt-9 md:px-3"
        >
          <Tity />
        </div>
      </div>

      <div>{generateNFTs()}</div>
    </div>
  );
}

Profile.layout = "L1";
export default Profile;
