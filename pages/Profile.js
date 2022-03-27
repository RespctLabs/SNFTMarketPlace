import React, { useEffect, useContext } from "react";

import Tity from "../components/Tity";
import BannerPic from "../public/images/profilebanner.svg";
import ProfileImage from "../public/images/profileImage.svg";
import Filter from "../public/svg/filter.svg";

import NFTCard from "../components/common/NftCard";
import Image from "next/image";
import Link from "next/link";

export default function Profile() {
    const [NumberOfNFTs, setNumberOfNFTs] = React.useState(100);
    const [description, setDescription] = React.useState("2");
    const [Nfts, setNfts] = React.useState([]);

    function generateNFTs(event) {
        for (var i = 1; i <= NumberOfNFTs; i++) {
            Nfts.push(
                <Link href={"/nfts/" + i} passHref>
                    <a>
                        <NFTCard key={i} number={i} element={""} />
                    </a>
                </Link>
            );
        }
        Nfts.push(
            <Link href={"/CreateNFT"} passHref>
                <a>
                    <div className=" headerDiv p-2 m-8 rounded-lg bg-[#920fc1] hover:bg-[#6e0b91] w-60 h-60 flex justify-center items-center">
                        <div className="flex justify-between text-white hover:text-black font-bold text-2xl text-center">
                            MINT your own NFT
                        </div>
                    </div>
                </a>
            </Link>
        );
        return (
            <div id="cards" className="md:grid md:grid-cols-4 md:gap-12">
                {Nfts}
            </div>
        );
    }

    return (
        <div className=" container mx-auto mb-16">
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
                </div>
                <div>
                    <button className="bg-white text-black rounded-2xl drop-shadow-white px-2 md:px-5 py-1 md:mr-10">
                        Filter &nbsp; &nbsp;
                        <Image src={Filter} layout="fixed" />
                    </button>
                </div>
            </div>
            <div>{generateNFTs()}</div>
        </div>
    );
}
