import React, { useEffect, useContext } from "react";
import { CheckOwnership } from "./api/blockchain";
import { ParentAddress, ChildAddress } from "../config";

import ParentContract from "../artifacts/contracts/ComposableParentERC721.sol/ComposableParentERC721.json";
import ChildContract from "../artifacts/contracts/ComposableChildrenERC1155.sol/ComposableChildrenERC1155.json";

import { BlockchainContext } from "../context/BlockchainContext.tsx";
import { OwnerOfNFT } from "./api/blockchain";
function Lol() {
  const { getProvider, connectedAccount } = useContext(BlockchainContext);

  useEffect(() => {
    OwnerOfNFT(getProvider, 2);
  });
  return (
    <div>
      <div>SD</div>
    </div>
  );
}

Lol.layout = "L2";
export default Lol;
