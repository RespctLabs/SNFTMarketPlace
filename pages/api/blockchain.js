import web3 from "web3";
import { ethers } from "ethers";
import ParentContract from "../../artifacts/contracts/ComposableParentERC721.sol/ComposableParentERC721.json";
import ChildContract from "../../artifacts/contracts/ComposableChildrenERC1155.sol/ComposableChildrenERC1155.json";
import { BlockchainContext } from "../../context/BlockchainContext.tsx";
