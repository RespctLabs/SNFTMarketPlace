import React from "react";
import ProfileNFT from "../../../public/images/profileNFT.svg";
import Image from "next/image";
import styles from "./styles.module.css";

export default function NftCard(props) {
  return (
    <div className={styles.headerDiv + " p-2 m-8 rounded-lg bg-OurBlack w-60 "} >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
      <Image  src={ProfileNFT} layout="fixed" alt={"Nft"}  />
      </div>
      <div className="flex justify-between text-white">
        <p>{props.element.name ? props.element.name : "Asuki"}</p>
        <p>{props.element.level ? props.element.level : "Level 3"}</p>
      </div>
      <div className="flex justify-between text-white">
        <p>{props.element.uuid ? props.element.uuid : "#2789"}</p>
        <p>{props.element.bid ? props.element.bid  : "top bid 5.6"}</p>
      </div>
    </div>
  );
}