import React from "react";
import Image from "next/image";
import Instagram from "../../public/socialSvg/Instagram.svg";
import Twitter from "../../public/socialSvg/Twitter.svg";
import Twitch from "../../public/socialSvg/Twitch.svg";
import Youtube from "../../public/socialSvg/Youtube.svg";
import Link from "next/link";

export default function Tity(props) {
  return (
    <div className="flex justify-between">
      <Link href={"https://twitter.com/RespctClub"} passHref>
        <div className="flex flex-col ">
          <Image src={Twitter} alt="Twitter" height={30} width={30} />
          <div>{props.TwitterCount}</div>
        </div>
      </Link>
      <Link href={"https://www.instagram.com/respct.club/"} passHref>
        <div className="flex flex-col ">
          <Image src={Instagram} alt="Instagram" height={30} width={30} />
          <div>{props.InstagramCount}</div>
        </div>
      </Link>
      <Link href={"https://www.twitch.tv/respct.club"} passHref>
        <div className="flex flex-col ">
          <Image src={Twitch} alt="Twitch" height={30} width={30} />
          <div>{props.TwitchCount}</div>
        </div>
      </Link>
      <Link
        href={"https://www.youtube.com/channel/UC0a51j9iSJKs9TeCm48RKqg"}
        passHref
      >
        <div className="flex flex-col ">
          <Image src={Youtube} alt="Youtube" height={30} width={30} />
          <div>{props.YoutubeCount}</div>
        </div>
      </Link>
    </div>
  );
}
