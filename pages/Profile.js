import React, { useEffect, useContext } from "react";
import web3 from "web3";
import { ethers } from "ethers";

import Tity from "../components/Tity";
import BannerPic from "../public/images/profilebanner.svg";
import ProfileImage from "../public/images/profileImage.svg";
import Filter from "../public/svg/filter.svg";
import { BlockchainContext } from "../context/BlockchainContext.tsx";
import { ParentAddress, ChildAddress } from "../config";

import ParentContract from "../artifacts/contracts/ComposableParentERC721.sol/ComposableParentERC721.json";
import ChildContract from "../artifacts/contracts/ComposableChildrenERC1155.sol/ComposableChildrenERC1155.json";

import NFTCard from "../components/common/NftCard";
import Image from "next/image";

export default function Profile() {
  const { getProvider } = useContext(BlockchainContext);

  // useEffect(() => {
  // getNumberofNFTs();
  // });
  async function getNumberofNFTs() {
    const provider = await getProvider();
    const signer = provider.getSigner();

    // calling smart contract on function getComposableCount
    let contract = new ethers.Contract(
      ParentAddress,
      ParentContract.abi,
      signer
    );

    console.log(signer, "signer");
    console.log(signer.address);

    let count = await contract.getComposableCount();

    console.log(count, "count");

    // // converting bignumber value into string
    // let tokenId = count.toString();
    // console.log(tokenId, "tokenId");
    // setBasic((prevvalue) => ({
    //   ...prevvalue,
    //   tokenId: tokenId,
    // }));

    // console.log(basic, "basic");

    // let url = "";

    // try {
    //   const added = await client.add(basic.toString(), {
    //     progress: (prog) => console.log(`received: ${prog}`),
    //   });
    //   url = `https://ipfs.infura.io/ipfs/${added.path}`;
    //   console.log(url, "url");
    //   setFileUrl(url);
    // } catch (error) {
    //   console.log("Error uploading file: ", error);
    // }

    // // let x = { tokenId: url };
    // console.log(tokenId, url);
    // // await writeJsonFile(data, x);
  }

  const [information, setInformation] = React.useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
  ]);
  const [description, setDescription] = React.useState("2");
  return (
    <div className=" container mx-auto">
      <div className="mx-4 md:mx-0">
        <Image src={BannerPic} />
      </div>
      <div className="flex justify-center ">
        <div className="md:absolute md:top-80">
          <Image src={ProfileImage} layout="fixed" alt="profile" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:pt-12 ">
        <div id="profileLeft" className="md:w-3/5 md:pr-12">
          {/* <div className="flex justify-start flex-col">
            <div>{props.name ? props.name.toUpperCase() : "ASUKI"}</div>
            <div>
              {props.collection
                ? props.collection.toUpperCase()
                : "1000 NFT collections"}
            </div>
          </div> */}
          <p className="text-sm mx-4 md:mx-0 md:text-base text-center md:text-left md:w-4/5">
            {!description // note the !
              ? description.toUpperCase()
              : " A brand for the metaverse. Built by the community. View the collection at azuki.com/gallery. Azuki starts with a collection of10,000 avatars that give you membership access to The Garden: a corner of the internet where artists, builders, and web3 enthusiasts meet to create a decentralized future. Azuki holders receive access to exclusive drops, experiences, and more. Visit azuki.com for more details."}
          </p>
        </div>
        <div
          id="profileRight"
          className="my-3 md:my-0 mx-4 md:mx-0 md:w-2/5 md:pt-9 md:px-3"
        >
          {/* <PrimaryButton /> */}

          <Tity
            InstagramCount={"2.3K"}
            TwitchCount={"2.3K"}
            YoutubeCount={"2.3K"}
            TwitterCount={"2.3K"}
          />
        </div>
      </div>
      <div className="flex justify-between mx-4 md:mx-0 md:pt-6">
        <div className="flex space-x-5 md:space-x-0">
          <div>
            <button className="bg-OurBlack rounded-lg text-[#03AFD0] md:mr-6 md:ml-2">
              Collection
            </button>
          </div>
          <div>
            <button className="bg-OurBlack rounded-lg text-[#03AFD0] md:mx-6">
              Owned
            </button>
          </div>
          <div>
            <button className="bg-OurBlack rounded-lg text-[#03AFD0] md:mx-6">
              Profile
            </button>
          </div>
          <div>
            <button
              onClick={(e) => {
                getNumberofNFTs();
              }}
              className="bg-OurBlack rounded-lg text-[#03AFD0] md:mx-6"
            >
              check
            </button>
          </div>
        </div>
        <div>
          <button className="bg-white text-black rounded-2xl drop-shadow-white px-2 md:px-5 py-1 md:mr-10">
            Filter &nbsp; &nbsp;
            <Image src={Filter} layout="fixed" />
          </button>
        </div>
      </div>
      <div id="cards" className="md:grid md:grid-cols-4 md:gap-12">
        {information.map((item) => (
          <div key={item}>
            <NFTCard element={item} />
            <br />
          </div>
        ))}
      </div>
    </div>
  );
}
