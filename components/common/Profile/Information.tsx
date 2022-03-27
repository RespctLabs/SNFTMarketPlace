import React from "react";
import Image from "next/image";
import ProfileImage from "../../../public/images/profileImage.svg";
import PrimaryButton from "../../common/PrimaryButton";
import Tity from "../../Tity";

export default function Information(props) {
  return (
    <div>
      <div className="flex justify-center ">
        <div className=" ">
          <Image src={ProfileImage} layout="fixed" alt="profile" />
        </div>
      </div>

      <div className="flex md:pt-12 ">
        <div id="profileLeft" className="md:w-3/5 md:pr-12">
          {/* <div className="flex justify-start flex-col">
            <div>{props.name ? props.name.toUpperCase() : "ASUKI"}</div>
            <div>
              {props.collection
                ? props.collection.toUpperCase()
                : "1000 NFT collections"}
            </div>
          </div> */}
          <p className="text-xs">
            {props.description
              ? props.description.toUpperCase()
              : " A brand for the metaverse. Built by the community. View the collection at azuki.com/gallery. Azuki starts with a collection of10,000 avatars that give you membership access to The Garden: a corner of the internet where artists, builders, and web3 enthusiasts meet to create a decentralized future. Azuki holders receive access to exclusive drops, experiences, and more. Visit azuki.com for more details."}
            A brand for the metaverse. Built by the community. View the
            collection at azuki.com/gallery. Azuki starts with a collection of
            10,000 avatars that give you membership access to The Garden: a
            corner of the internet where artists, builders, and web3 enthusiasts
            meet to create a decentralized future. Azuki holders receive access
            to exclusive drops, experiences, and more. Visit azuki.com for more
            details.
          </p>
        </div>
        <div id="profileRight" className="md:w-2/5 md:pt-9 md:px-3">
          {/* <PrimaryButton /> */}

          <Tity
            InstagramCount={"2.3K"}
            TwitchCount={"2.3K"}
            YoutubeCount={"2.3K"}
            TwitterCount={"2.3K"}
          />
        </div>
      </div>
    </div>
  );
}
