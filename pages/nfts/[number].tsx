import React, { useContext, useEffect } from "react";
import BuyNFT from "../../public/images/buyNft.svg";
import Image from "next/image";
import Polygon from "../../public/svg/polygon.svg";
import axios from "axios";

import PrimaryButton from "../../components/common/PrimaryButton";
import ProfileImage from "../../public/images/profileImage.svg";
import VerticalAzuki from "../../public/images/verticalAzuki.svg";
import Level3 from "../../public/images/level3.svg";
import AzukiNo from "../../public/images/azukiNo.svg";
import FVerticalAzuki from "../../public/images/fverticalAzuki.svg";
import { create, CID, IPFSHTTPClient } from "ipfs-http-client";
import { TwitterShareButton } from "react-share";
import web3 from "web3";
import { ethers, Signer } from "ethers";
import ParentContract from "../../artifacts/contracts/ComposableParentERC721.sol/ComposableParentERC721.json";
import ChildContract from "../../artifacts/contracts/ComposableChildrenERC1155.sol/ComposableChildrenERC1155.json";
import { BlockchainContext } from "../../context/BlockchainContext";
import { ParentAddress, ChildAddress } from "../../config";
import { getAccountPath } from "ethers/lib/utils";
import { checkValidity } from "../api/axios";
import { useRouter } from "next/router";

const client = create("https://ipfs.infura.io:5001/api/v0");

export default function Buy(props) {
  const [Owned, setOwned] = React.useState(false);
  const [Checked, setChecked] = React.useState(false);

  const [Hash, setHash] = React.useState(undefined);
  const [userName, setuserName] = React.useState("mysteriousmystery");
  const [NFTlevel, setNFTlevel] = React.useState(0);
  const router = useRouter();
  const [pid, setpid] = React.useState(parseInt(router.query.number));

  const [Buyerof, setBuyerof] = React.useState(0);
  const { getProvider, connectedAccount } = useContext(BlockchainContext);

  useEffect(() => {
    CheckOwnership();
    getM();
    checkLevel();
  });

  async function checkLevel() {
    const provider = await getProvider();
    const signer = await provider?.getSigner();
    console.log(signer, provider, " signer  provider");

    let parentContract = new ethers.Contract(
      ParentAddress,
      ParentContract.abi,
      signer
    );

    try {
      let count = await parentContract.getLevel(pid, ChildAddress);
      console.log(count, "count");
      let level = parseInt(BigInt(count._hex).toString(10));
      console.log(level, "level");
      setNFTlevel(level);

      return level;
    } catch (err) {
      console.log("not count");
      return -1;
    }
  }

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
      let value = parseInt(BigInt(count._hex).toString(10));
      if (pid > value) {
        setOwned(false);
      } else {
        setOwned(true);
      }
      // else
      // // compare the value with router id ,
      // if router is greater than 1 then it is to be bought Owned(false)
      // if routher is less than or equal to value then it is bought Owned(true)
      // setOwned(value);
    } catch (err) {
      console.log("count");
    }
  }

  // async function CheckLevel() {
  //   const provider = await getProvider();
  //   const signer = await provider?.getSigner();
  //   console.log(signer, provider, " signer  provider");

  //   let parentcontract = new ethers.Contract(
  //     ParentAddress,
  //     ParentContract.abi,
  //     signer
  //   );

  //   try {
  //     let t1 = await parentcontract.getLevel(connectedAccount);
  //     let value = parseInt(BigInt(t1._hex).toString(10));
  //     setBuyerof(value);
  //   } catch (err) {
  //     setBuyerof(0);
  //   }
  // }

  async function CheckOwnership() {
    const provider = await getProvider();
    const signer = await provider?.getSigner();
    console.log(signer, provider, " signer  provider");

    let parentcontract = new ethers.Contract(
      ParentAddress,
      ParentContract.abi,
      signer
    );

    try {
      let t1 = await parentcontract.getComposableId(connectedAccount);
      let value = parseInt(BigInt(t1._hex).toString(10));
      setBuyerof(value);
    } catch (err) {
      setBuyerof(0);
    }
  }

  async function upgrade() {
    console.log("upgrade");
    const provider = await getProvider();
    const signer = provider.getSigner();
    let contract = new ethers.Contract(ChildAddress, ChildContract.abi, signer);
    let parentcontract = new ethers.Contract(
      ParentAddress,
      ParentContract.abi,
      signer
    );

    let t1 = await contract.mintEngagementPoints(connectedAccount, 600, "0x00");
    let t2 = await contract.upgradeSNFT(
      "0x0" + pid.toString(),
      1,
      web3.utils.encodePacked(pid),
      {
        from: signer.getAddress(),
      }
    );
    const tx2 = await t2.wait();
    console.log(tx2, "tx2");
  }

  async function listNFTForSale() {
    const provider = await getProvider();
    console.log(provider, connectedAccount);
    const signer = provider.getSigner();
    // const url = await uploadToIPFS();

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
    console.log(transaction.to, "transaction");

    // let listingPrice = await contract.getListingPrice();
    // listingPrice = listingPrice.toString();
    // let transaction = await contract.createToken(url, price, {
    //   value: listingPrice,
    // });
    const tx = await transaction.wait();
    console.log(tx, "tx");
    console.log(tx.transactionHash, "tx");
    console.log(parseInt(BigInt(tx.events[1].args.tokenId._hex).toString(10)));
    setHash(tx.transactionHash);
    console.log(tx.from, " tx from");

    setBuyerof(tx.from);
    console.log(Buyerof, " Buyer");
    console.log(connectedAccount, " connected Account");

    // router.push("/");
  }

  const projectId = "...";
  const projectSecret = "...";
  const ipfs = create({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
  });
  const auth =
    "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

  // TODO:useeffect #1 that calls getComposibleCount and checks if route is valid

  // let ipfs: IPFSHTTPClient | undefined;
  // try {
  //   ipfs = create({
  //     url: "https://ipfs.infura.io:5001/api/v0",
  //   });
  // } catch (error) {
  //   console.error("IPFS error ", error);
  //   ipfs = undefined;
  // }
  const client = create({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
    apiPath: "/api/v0/",
    headers: {
      authorization: auth,
    },
  });
  async function makeipfsURL() {
    const json = { level: 0 };
    // upload files
    let jsonObj = JSON.stringify(json);

    const result = await (ipfs as IPFSHTTPClient).add(jsonObj);
  }

  async function BackendCall() {}

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
  console.log(pid, "pid");

  return (
    <>
      <div className="container md:mx-auto  ">
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
                <TwitterShareButton
                  title={
                    "gathering enagement points to level up my nft " +
                    Hash +
                    " " +
                    connectedAccount
                  }
                  url={"@RespctClub"}
                  onShareWindowClose={() => {
                    console.log("share window closed");
                  }}
                >
                  Tweet
                </TwitterShareButton>
              </div>

              <p className="text-white"> {Hash ? Hash : ""}</p>
              <div className="flex flex-col space-y-5">
                {Owned ? (
                  Buyerof === pid ? (
                    // check for nft upgradation if upgraded show congrats
                    // if not show upgrade button

                    NFTlevel === 0 ? (
                      <>
                        <input
                          type="text"
                          className="text-black indent-3"
                          placeholder="your username"
                          value={userName}
                          onChange={(e) => {
                            console.log(e.target.value);
                            setuserName(e.target.value);
                          }}
                        />
                        <TwitterShareButton
                          title={
                            "gathering enagement points to level up my nft " +
                            Hash +
                            " " +
                            connectedAccount
                          }
                          url={"@RespctClub"}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                        >
                          Tweet
                        </TwitterShareButton>

                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                          onClick={() => {
                            console.log("share window ");
                            // let ans = checkValidity(
                            //   "http://127.0.0.1:8000/HeemankVerma",
                            //   "get"
                            // );
                            axios({
                              headers: {
                                // need to resolve cross origin
                                "Access-Control-Allow-Origin": "*",
                                "Content-Type": "application/json",
                              },
                              method: "get",
                              url:
                                "http://127.0.0.1:8000/" +
                                connectedAccount +
                                "/" +
                                userName,
                            })
                              .then((response) => {
                                console.log(response);
                                console.log(response.data);

                                if (response.data.value) {
                                  console.log(
                                    "heemankverma has tweeted about Respct.club, he can now be allowed to upgrade his nft"
                                  );
                                }
                                setChecked(response.data.value);
                              })
                              .catch((error) => {
                                console.log(error);
                              });
                          }}
                        >
                          Check
                        </button>

                        {Checked ? (
                          <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                            onClick={() => {
                              upgrade();
                            }}
                          >
                            Upgrade NFT
                          </button>
                        ) : (
                          " "
                        )}
                      </>
                    ) : (
                      <div> NFT already upgraded </div>
                    )
                  ) : (
                    <div> Here is an NFT bought by someone else </div>
                  )
                ) : Buyerof > 0 ? (
                  <div> already owned nft, on read only mode </div>
                ) : (
                  <div>
                    <PrimaryButton
                      onClick={(e) => {
                        e.preventDefault();
                        listNFTForSale();
                      }}
                      text="Buy"
                      color="[#03AFD0]"
                      shadow="[#45ABD6]"
                    />{" "}
                  </div>
                )}

                {/* {Owned ? (
                  Owned === true ? (
                    getUpgraded === true ? (
                      <>
                        <input
                          type="text"
                          className="text-black"
                          value={userName}
                          onChange={(e) => {
                            console.log(e.target.value);
                            setuserName(e.target.value);
                          }}
                        />
                        <TwitterShareButton
                          title={
                            "gathering enagement points to level up my nft " +
                            Hash
                          }
                          url={"@RespctClub"}
                        >
                          Tweet
                        </TwitterShareButton>

                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                          onClick={() => {
                            console.log("share window closed");
                            let ans = checkValidity(
                              "http://127.0.0.1:8000/HeemankVerma",
                              "get"
                            );

                            // setgetUpgrade(ans);
                            console.log(ans);
                            console.timeLog(
                              "cyanblot has tweeted about Respct.club"
                            );
                          }}
                        >
                          Check
                        </button>
                      </>
                    ) : (
                      <PrimaryButton
                        onClick={(e) => {
                          e.preventDefault();
                          console.log("upgrade called");
                          upgrade();
                        }}
                        text="Upgrade"
                        color="[#03AFD0]"
                        shadow="[#45ABD6]"
                      />
                    )
                  ) : (
                    "here is an nft bough by someone else"
                  )
                ) : (
                  <PrimaryButton
                    onClick={(e) => {
                      e.preventDefault();
                      listNFTForSale();
                    }}
                    text="Buy"
                    color="[#03AFD0]"
                    shadow="[#45ABD6]"
                  />
                )} */}
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
