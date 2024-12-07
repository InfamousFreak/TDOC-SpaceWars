// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFT is ERC721URIStorage {

    uint private _tokenIds=0;

    constructor() ERC721("GameItem", "ITM") {}

    function createNFT(string calldata tokenURI) public returns (uint256){
        _tokenIds++;
        _mint(msg.sender, _tokenIds);
        _setTokenURI(_tokenIds, tokenURI);
        return _tokenIds;
    }
}