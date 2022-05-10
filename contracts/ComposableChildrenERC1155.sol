// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
///@dev handle Batch receiving function - !!!!

/// @title ERC1155TUMP creates tier supply and attaches tier to composable
/// @author respect-club
/// @notice receives Engagement tokens and attaches tier to composable ERC998
/// @dev this contract maintains engagement tokens at id 0,

import "./ERC1155PresetMinterPauser.sol";
import "./ComposableParentERC721.sol";
import "./ERC2771Context.sol";


contract ComposableChildrenERC1155 is  ERC2771Context, ERC1155PresetMinterPauser  {
    using SafeMath for uint256;
    bytes4 internal constant ERC1155_ACCEPTED = 0xf23a6e61; // bytes4(keccak256("onERC1155Received(address,address,uint256,uint256,bytes)"))
    bytes4 internal constant ERC1155_BATCH_ACCEPTED = 0xbc197c81; // bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))
    address public TRUSTED_FORWARDER = 0x9399BB24DBB5C4b782C70c2969F58716Ebbd6a3b;

    ComposableParentERC721 csnftContract;
    mapping(address => uint256) public ownerToTierId;
    // mapping (address => mapping (address => uint256)) private _allowances;
    mapping(address => mapping(uint256 => bool))
        private _ownerToUpgradeInitiated;

    /// @notice csnft contract is deployed and linked to ERC1155TUMP
    /// @param _csnftContractAdr deployed csnft contract

    constructor(string memory tierUri, address _csnftContractAdr)
        ERC1155PresetMinterPauser(tierUri)
        ERC2771Context(TRUSTED_FORWARDER)
    {
        require(
            _csnftContractAdr != address(0),
            "ERC998: transfer to the zero address"
        );

        csnftContract = ComposableParentERC721(
            _csnftContractAdr
        );

    }

     // BICONOMY INTEGRATION

    function _msgSender() internal view override(Context, ERC2771Context) returns(address) {
        return ERC2771Context._msgSender();
    }

    function _msgData() internal view override(Context, ERC2771Context) returns(bytes memory) {
        return ERC2771Context._msgData();
    }

    function getUri(uint256 composableId, uint256 tokenID)public view returns (string memory){
        return ERC1155PresetMinterPauser.uri(composableId, tokenID);
    }


    function versionRecipient() external  virtual view returns (string memory){
        return "1";
    }

    // VIEW FUNCTIONS

    function getLatestTierId(address _to) public view returns (uint256) {
        // uint256[] s arr = childIdsForOn(_composableId, tierContract);
        return ownerToTierId[_to];
    }

    function hasTier(address _to, uint256 _tierId) public view returns (bool) {
        // uint256[] s arr = childIdsForOn(_composableId, tierContract);
        return _ownerToUpgradeInitiated[_to][_tierId];
    }

    function _setOwnerTierId(address _to, uint256 _latestTierId) private {
        ownerToTierId[_to] = _latestTierId;
        _ownerToUpgradeInitiated[_to][_latestTierId] = true;
    }

    /// implement claimF engagement points
    //function claim(){}
    /// @notice mints enagagement point onlyMinterRole
    /// @param _to csnftContract Address
    /// @param _amount of F engagement  points
    /// @param _data web3.utils.encodePacked(composableId)
    function mintEngagementPoints(
        address _to,
        uint256 _amount,
        bytes memory _data
    ) public {
        require(
            hasRole(MINTER_ROLE, _msgSender()),
            "ERC1155TUMP unauthorized engagement minter"
        );

        mint(_to, 0, _amount, _data);
    }

    /// @notice upgrade user tier
    /// @dev fetch curent tier of _msgSender()

    function upgradeSNFT(
        uint256 _composableId,
        uint256 _upgradeToTierId,
        string memory _uri,
        bytes calldata data // web3.utils.encodePacked(composableId)
    ) external returns (bool) {
        uint256 _checkingComposableId;
        uint256 _index = msg.data.length - 32;
        assembly {
            _checkingComposableId := calldataload(_index)
        }
        require(_checkingComposableId == _composableId,"Data must be equal to web3.solidityPack value of _composableId");

        //add tier checks  if tierId =1 bal(t-1) == 1
        // at t=0 bal(0) >= _FengagementPOints
        require(_upgradeToTierId != 0, ">Incorrect tierId, L0 ");
        // checks if _to owns the composable
        require(
            csnftContract.ownerToComposableId(_msgSender()) == _composableId,
            ">Unauthorized caller"
        );

        // fetch upgrading cost
        uint256 upgradeCost = csnftContract.getTierUpgradeCost(
            _upgradeToTierId
        );
        require(
            balanceOf(_msgSender(), 0) >= upgradeCost,
            "> insufficient engagement points"
        );
        require(hasTier(_msgSender(), _upgradeToTierId) == false);

        if (_upgradeToTierId == 1) {
            require(getLatestTierId(_msgSender()) != 1, "already upgraded");
        } else {
            require(
                getLatestTierId(_msgSender()) == _upgradeToTierId - 1,
                ">Non-sequential tier upgrade error"
            );
            require(
                hasTier(_msgSender(), _upgradeToTierId - 1) == true,
                ">>Non-sequential tier upgrade error"
            );
        }

        // check if owner has sufficient engagement points

        _mint(address(csnftContract), _upgradeToTierId, 1, data);
        ERC1155PresetMinterPauser._setURI(_composableId, _upgradeToTierId, _uri);
        _setOwnerTierId(_msgSender(), _upgradeToTierId);

        return true;
    }


    function burn(address account, uint256 id, uint256 value) public virtual override(ERC1155Burnable) {
        require(false, "burn is not allowed to be called by definition");
    }


    function burnBatch( address account, uint256[] memory ids, uint256[] memory values) public virtual override(ERC1155Burnable)
    {
        require(false, "burnBatch is not allowed to be called by definition");
    }

    function setApprovalForAll(address operator, bool approved) public override
    {
        require(false, "setApprovalForAll is not allowed to be called by definition");
    }

    function isApprovedForAll(address account, address operator) public view virtual override returns (bool)
    {
        require(false, "isApprovedForAll is not allowed to be called by definition");
        return false;
    }

    function safeTransferFrom(address from, address to, uint256 id, uint256 amount, bytes calldata data) public virtual override
    {
        require(false, "safeTransferFrom is not allowed to be called by definition");
    }

    function safeBatchTransferFrom( address from, address to, uint256[] calldata ids, uint256[] calldata amounts, bytes calldata data) public virtual override
    {
        require(false, "safeBatchTransferFrom is not allowed to be called by definition");
    }

    function function _mint(address to,uint256 id,uint256 amount,bytes memory data) public virtual override
    {
        require(false, "_mint is not allowed to be called by definition");
    }


    function function _mintBatch(address to,uint256[] memory ids,uint256[] memory amounts,bytes memory data) public virtual override
    {
        require(false, "_mintBatch is not allowed to be called by definition");
    }
}