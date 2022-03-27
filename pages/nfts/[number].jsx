import React, { useContext } from "react";
import BuyNFT from "../../public/images/buyNft.svg";
import Image from "next/image";
import { ethers } from "ethers";
import web3 from "web3";
import Polygon from "../../public/svg/polygon.svg";
import PrimaryButton from "../../components/common/PrimaryButton";
import ProfileImage from "../../public/images/profileImage.svg";
import VerticalAzuki from "../../public/images/verticalAzuki.svg";
import Level3 from "../../public/images/level3.svg";
import AzukiNo from "../../public/images/azukiNo.svg";
import FVerticalAzuki from "../../public/images/fverticalAzuki.svg";

import ParentContract from "../../artifacts/contracts/ComposableParentERC721.sol/ComposableParentERC721.json";

import { BlockchainContext } from "../../context/BlockchainContext.tsx";
import { ParentAddress } from "../../config";

export default function Buy(props) {
  const { getProvider } = useContext(BlockchainContext);

  async function mintNFt() {
    // minting function here
    // const url = await uploadToIPFS();
    const provider = await getProvider();
    const signer = provider.getSigner();

    /* next, create the item */
    // const price = ethers.utils.parseUnits(formInput.price, "ether");
    let contract = new ethers.Contract(
      ParentAddress,
      ParentContract.abi,
      signer
    );
    console.log(signer, "signer");

    let transaction = await contract.mint({
      from: signer.getAddress(),
      value: web3.utils.toWei("2"),
    });

    console.log(transaction, "transaction");

    const tx = await transaction.wait();
    console.log(tx, "tx");
  }
  return (
    <>
      <div className="container md:mx-auto ">
        <div className="flex flex-col md:flex-row md:pt-12 ">
          <div id="left" className="md:w-1/2">
            <div className="flex justify-center mx-4 md:mx-0">
              <div className="flex flex-col justify-center ">
                <Image src={VerticalAzuki} width={70} height={200} />
              </div>
              <div className="flex flex-col">
                <Image src={Level3} width={200} height={70} />
                <div className="shadow-2xl">
                  <Image src={BuyNFT} alt="image" />
                </div>
                <Image src={AzukiNo} width={200} height={70} />
              </div>
              <div className="flex flex-col justify-center ">
                <Image src={FVerticalAzuki} width={70} height={200} />
              </div>
            </div>

            {/* <div>
            <h1 className="text-3xl text-center font-bold">Buy NFT</h1>
            <div className="flex justify-center">
              <span className="text-3xl font-bold flex flex-col rotate-[270deg] justify-center ">
                <span className="">Buy NFT</span>
              </span>
              <Image src={BuyNFT} layout="fixed" />
              <span className="text-3xl font-bold flex flex-col rotate-90 justify-center ">
                <span className="">Buy NFT</span>
              </span>
            </div>
            <h1 className="text-3xl text-center  font-bold">Buy NFT</h1>
          </div> */}
          </div>
          <div id="right" className="md:w-1/2 text-white md:py-12">
            <div className="w-2/3 md:w-1/2 mx-auto py-10 md:py-20">
              <p className="md:text-6xl flex ">Azuki NFT</p>
              <span className="flex md:pt-2  ">
                <p>By &nbsp;</p>
                <p className="text-OurBlue">Azuki</p>
              </span>
              {/* <p className="text-OurPurple flex  md:pt-2">
              current owner: {props.owner ? props.owner : "OLX69"}
            </p> */}
              <div className="flex my-5 md:mt-8 md:mb-8 ">
                <div>
                  <Image src={Polygon} layout="fixed" />
                </div>
                <div className="flex flex-col md:mt-3 ">
                  <div className="text-4xl text-OurBlue">
                    {props.priceEther
                      ? props.priceEther + " MATIC"
                      : "1.00 MATIC"}
                  </div>
                  <div className="text-2xl text-OurSecondGrey md:mt-3">
                    {props.priceDollar ? "$" + props.priceDollar : "$3,618.36"}
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-5">
                <PrimaryButton
                  onClick={(e) => {
                    e.preventDefault();
                    mintNFt();
                  }}
                  text="Buy"
                  color="[#03AFD0]"
                  shadow="[#45ABD6]"
                />
                {/* <PrimaryButton
                  text="Upgrade"
                  color="[#7834BF]"
                  shadow="[#000000]"
                /> */}
              </div>
            </div>
          </div>
          <div></div>
        </div>
        <style jsx>
          {`
            .indicator {
              display: flex;
              align-items: center;
              justify-content: center;
              text-align: center;
              position: absolute;
              top: 120px;
              left: 75px;
              /* width: 100%; */
              /* height: 100%; */
              margin: 0 auto;
              font-size: 2.2em;
              font-weight: 100;
              color: #555;
              user-select: none;
            }

            .mobileProgress {
              display: none;
            }

            @media screen and (max-width: 1000px) {
              .mobileProgress {
                display: flex;
              }

              .desktopProgress {
                display: none;
              }

              .indicator {
                top: 80px;
                left: 65px;
              }
            }
          `}
        </style>
      </div>
    </>
  );
}
