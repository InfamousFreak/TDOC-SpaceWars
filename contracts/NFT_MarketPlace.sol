// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./NFT.sol";

struct NFTListing {
    uint256 price;
    address seller;
}

contract NFT_MarketPlace is Ownable, NFT {

    mapping(uint256 => NFTListing) private _listings;

    function listNFT(uint256 tokenID, uint256 price) public {
        require(price > 0, "NFTMarket: price must be greater than 0");
        ERC721(address(this)).transferFrom(msg.sender, address(this), tokenID);
        // Remove NFT from the sender's list
        uint256[] storage senderNFTs = ownedNFTs[msg.sender];
        for (uint256 i = 0; i < senderNFTs.length; i++) {
            if (senderNFTs[i] == tokenID) {
                senderNFTs[i] = senderNFTs[senderNFTs.length - 1];
                senderNFTs.pop();
                break;
            }
        }

    }

    function buyNFT(uint256 tokenID) public payable {
        NFTListing memory listing = _listings[tokenID];
        require(listing.price > 0, "NFTMarket: nft not listed for sale");
        require(msg.value == listing.price, "NFTMarket: incorrect price");
        ERC721(address(this)).transferFrom(address(this), msg.sender, tokenID);
        ownedNFTs[msg.sender].push(tokenID);
        clearListing(tokenID);
        payable(listing.seller).transfer(listing.price);
    }

    function cancelListing(uint256 tokenID) public {
        NFTListing memory listing = _listings[tokenID];
        require(listing.price > 0, "NFTMarket: nft not listed for sale");
        require(
            listing.seller == msg.sender,
            "NFTMarket: you're not the seller"
        );
        ERC721(address(this)).transferFrom(address(this), msg.sender, tokenID);
        clearListing(tokenID);
    }

    function clearListing(uint256 tokenID) private {
        _listings[tokenID].price = 0;
        _listings[tokenID].seller = address(0);
    }
}
