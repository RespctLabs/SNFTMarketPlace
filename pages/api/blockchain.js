import React, { useContext, useEffect, useState } from "react";
import web3 from "web3";
import { ethers } from "ethers";

import ParentContract from "../../artifacts/contracts/ComposableParentERC721.sol/ComposableParentERC721.json";
import ChildContract from "../../artifacts/contracts/ComposableChildrenERC1155.sol/ComposableChildrenERC1155.json";
import { BlockchainContext } from "../../context/BlockchainContext";
import { ParentAddress, ChildAddress } from "../../config";

async function useGetNecessities(getProvider) {
  const provider = await getProvider();
  const signer = provider?.getSigner();

  let Parentcontract = new ethers.Contract(
    ParentAddress,
    ParentContract.abi,
    signer
  );

  let Childcontract = new ethers.Contract(
    ChildAddress,
    ChildContract.abi,
    signer
  );
  return [provider, signer, Parentcontract, Childcontract];
}

async function BuyNFT(getProvider, connectedAccount) {
  const [provider, signer, Parentcontract, Childcontract] =
    await useGetNecessities(getProvider);
  try {
    let mintingTransaction = await Parentcontract.mint({
      from: signer.getAddress(),
      value: web3.utils.toWei("1"),
    });
    const mintingconfirmation = await mintingTransaction.wait();

    console.log(
      parseInt(
        BigInt(mintingconfirmation.events[1].args.tokenId._hex).toString(10)
      )
    );
    return true;
  } catch (err) {
    console.log(err, "error");
    alert(err.message);
    return false;
  }
  return false;
}

async function GetEngagementPoints(getProvider, connectedAccount) {
  const [provider, signer, Parentcontract, Childcontract] =
    await useGetNecessities(getProvider);
  try {
    let t1 = await Childcontract.mintEngagementPoints(
      connectedAccount,
      600,
      "0x00"
    );

    console.log(t1, "transaction");

    // need to return true
  } catch (err) {
    console.log(err, "error");
    alert(err.message);
    // need to return false
  }
}

async function UpgradeNFT(getProvider, connectedAccount, nftId, newlevel) {
  const [provider, signer, Parentcontract, Childcontract] =
    await useGetNecessities(getProvider);
  try {
    let t2 = await Childcontract.upgradeSNFT(
      nftId,
      newlevel,
      web3.utils.encodePacked(pid),
      {
        from: signer.getAddress(),
      }
    );

    const tx2 = await t2.wait();
    console.log(tx2, "tx2");
  } catch (err) {
    console.log(err, "error");
    alert(err.message);
  }
  return false;
}

async function CheckLevel(getProvider, nftId) {
  const [provider, signer, Parentcontract, Childcontract] =
    await useGetNecessities(getProvider);

  let level = -1;

  try {
    let count = await Parentcontract.getLevel(nftId, ChildAddress);
    level = parseInt(BigInt(count._hex).toString(10));
  } catch (err) {
    console.log(err, "error");
    alert(err.message);
  }
  return level;
}

async function GetComposableCount(getProvider) {
  const [provider, signer, Parentcontract, Childcontract] =
    await useGetNecessities(getProvider);
  let value = -1;
  try {
    let count = await Parentcontract.getComposableCount();
    value = parseInt(BigInt(count._hex).toString(10));
  } catch (err) {
    console.log(err, "error");
    alert(err.message);
  }
  return value;
}

async function CheckOwnership(getProvider, connectedAccount) {
  const [provider, signer, Parentcontract, Childcontract] =
    await useGetNecessities(getProvider);

  let value = 0;
  try {
    let t1 = await Parentcontract.getComposableId(connectedAccount);
    value = parseInt(BigInt(t1._hex).toString(10));
  } catch (err) {
    console.log(err, "error");
    alert(err.message);
  }
  return value;
}

async function OwnerOfNFT(getProvider, nftId) {
  const [provider, signer, Parentcontract, Childcontract] =
    await useGetNecessities(getProvider);

  try {
    let t1 = await Parentcontract.ownerOf(nftId);
    console.log(t1, "owner");
    return t1;
  } catch (err) {
    console.log(err, "error");
  }
  return undefined;
}

export {
  BuyNFT,
  GetComposableCount,
  CheckLevel,
  CheckOwnership,
  useGetNecessities,
  UpgradeNFT,
  OwnerOfNFT,
};
