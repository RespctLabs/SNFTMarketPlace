import React from "react";
import Image from "next/image";
import Instagram from "../../public/socialSvg/Instagram.svg";
import Twitter from "../../public/socialSvg/Twitter.svg";
import Twitch from "../../public/socialSvg/Twitch.svg";
import Youtube from "../../public/socialSvg/Youtube.svg";

export default function Tity(props) {
  return (
    <div className="flex justify-between">
      <div className="flex flex-col ">
        <Image src={Twitter} alt="Twitter" height={30} width={30} />
        <div>{props.TwitterCount}</div>
      </div>
      <div className="flex flex-col ">
        <Image src={Instagram} alt="Instagram" height={30} width={30} />
        <div>{props.InstagramCount}</div>
      </div>
      <div className="flex flex-col ">
        <Image src={Twitch} alt="Twitch" height={30} width={30} />
        <div>{props.TwitchCount}</div>
      </div>
      <div className="flex flex-col ">
        <Image src={Youtube} alt="Youtube" height={30} width={30} />
        <div>{props.YoutubeCount}</div>
      </div>
    </div>
  );
}
