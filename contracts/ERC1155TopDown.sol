// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155Receiver.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/EnumerableSet.sol";

import "./IERC1155TopDown.sol";

contract ERC1155TopDown is
    ERC721,
    ERC1155Receiver,
    IERC1155TopDown
{
    using EnumerableSet for EnumerableSet.AddressSet;
    using EnumerableSet for EnumerableSet.UintSet;

    mapping(uint256 => mapping(address => mapping(uint256 => uint256)))
        private _balances;

    mapping(address => mapping(uint256 => EnumerableSet.UintSet))
        private _holdersOf;

    mapping(uint256 => EnumerableSet.AddressSet) private _childContract;

    mapping(uint256 => mapping(address => EnumerableSet.UintSet))
        private _childsForChildContract;

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _baseURI
    ) public ERC721(_name, _symbol) {
        _setBaseURI(_baseURI);
    }

    /**
     * @notice tier level for a composable
     *
     *
     * @dev Gives child balance for a specific child contract and child id .
     * @param composableId, composable ID
     * @param childContract 1155tier upgrade contract
     * @param tierId tier level
     * @return uint tier
     */
    function childBalance(
        uint256 composableId,
        address childContract, // ERC1155TUMP contract address
        uint256 tierId
    ) external view override returns (uint256) {
        return _balances[composableId][childContract][tierId];
    }

    /**
     *
     *
     * @dev Gives list of child contract where token ID has childs.
     */

    function childContractsFor(uint256 composableId)
        external
        view
        override
        returns (address[] memory)
    {
        address[] memory childContracts = new address[](
            _childContract[composableId].length()
        );

        for (uint256 i = 0; i < _childContract[composableId].length(); i++) {
            childContracts[i] = _childContract[composableId].at(i);
        }

        return childContracts;
    }

    /**
     * @dev Gives list of owned child ID on a child contract by token ID.
     */
    function childIdsForOn(uint256 composableId, address childContract)
        public
        view
        override
        returns (uint256[] memory)
    {
        uint256[] memory tierIds = new uint256[](
            _childsForChildContract[composableId][childContract].length()
        );

        for (
            uint256 i = 0;
            i < _childsForChildContract[composableId][childContract].length();
            i++
        ) {
            tierIds[i] = _childsForChildContract[composableId][childContract]
                .at(i);
        }

        return tierIds;
    }

    function onERC1155Received(
        address operator,
        address from,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public virtual override returns (bytes4) {
        // require(id == (tier.add(1)));
        // checks
        require(
            data.length == 32,
            "ERC998: data must contain the unique uint256 tokenId to transfer the child token to"
        );
        _beforeChildTransfer(
            operator,
            0,
            address(this),
            from,
            _asSingletonArray(id),
            _asSingletonArray(amount),
            data
        );
        uint256 _receiverTokenId;
        uint256 _index = msg.data.length - 32;
        assembly {
            _receiverTokenId := calldataload(_index)
        }

        _receiveChild(_receiverTokenId, msg.sender, id, amount);
        ReceivedChild(from, _receiverTokenId, msg.sender, id, amount);
        //  tier++;
        return this.onERC1155Received.selector;
    }

    // function _upgradeSNFTtier() {}

    function _receiveChild(
        uint256 tokenId, // composableId
        address childContract, // 1155 tier contract
        uint256 tierId,
        uint256 amount // must be 1   a tier can only be upgrded once
    ) internal virtual {
        // check
        if (!_childContract[tokenId].contains(childContract)) {
            _childContract[tokenId].add(childContract);
        }
        if (_balances[tokenId][childContract][tierId] == 0) {
            _childsForChildContract[tierId][childContract].add(tierId);
        }
        _balances[tokenId][childContract][tierId] += amount; //this
    }

    function _removeChild(
        uint256 tokenId,
        address childContract,
        uint256 tierId,
        uint256 amount
    ) internal virtual {
        require(
            amount != 0 || _balances[tokenId][childContract][tierId] >= amount,
            "ERC998: insufficient child balance for transfer"
        );
        _balances[tokenId][childContract][tierId] -= amount;
        if (_balances[tokenId][childContract][tierId] == 0) {
            _holdersOf[childContract][tierId].remove(tokenId);
            _childsForChildContract[tokenId][childContract].remove(tierId);
            if (_childsForChildContract[tokenId][childContract].length() == 0) {
                _childContract[tokenId].remove(childContract);
            }
        }
    }

    function _beforeChildTransfer(
        address operator,
        uint256 fromTokenId,
        address to,
        address childContract,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal virtual {}

    function _asSingletonArray(uint256 element)
        private
        pure
        returns (uint256[] memory)
    {
        uint256[] memory array = new uint256[](1);
        array[0] = element;

        return array;
    }

    /**
     * @dev Receives a batch of child tokens, the receiver token ID must be
     * encoded in the field data.
     */
    function onERC1155BatchReceived(
        address operator,
        address from,
        uint256[] memory ids,
        uint256[] memory values,
        bytes memory data
    ) public virtual override returns (bytes4) {
        require(
            data.length == 32,
            "ERC998: data must contain the unique uint256 tokenId to transfer the child token to"
        );
        require(
            ids.length == values.length,
            "ERC1155: ids and values length mismatch"
        );
        _beforeChildTransfer(
            operator,
            0,
            address(this),
            from,
            ids,
            values,
            data
        );

        uint256 _receiverTokenId;
        uint256 _index = msg.data.length - 32;
        assembly {
            _receiverTokenId := calldataload(_index)
        }
        for (uint256 i = 0; i < ids.length; i++) {
            _receiveChild(_receiverTokenId, msg.sender, ids[i], values[i]);
            ReceivedChild(
                from,
                _receiverTokenId,
                msg.sender,
                ids[i],
                values[i]
            );
        }
        return this.onERC1155BatchReceived.selector;
    }
}
