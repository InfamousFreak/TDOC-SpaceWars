// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721URIStorage {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("GameItem", "ITM") {}

    // Mapping from owner to list of NFT IDs
    mapping(address => uint256[]) internal ownedNFTs;

    function createNFT(string calldata tokenURI) public returns (uint256){
        uint256 tokenId = _tokenIds.current();
        _mint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI);

        ownedNFTs[msg.sender].push(tokenId);

        _tokenIds.increment();
        return tokenId;
    }

    function getOwnedNFTs() public view returns (uint256[] memory) {
        return ownedNFTs[msg.sender];
    }
}