// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

struct NFTListing {
    uint256 price;
    address seller;
}

contract NFT_MarketPlace is Ownable {
    constructor(address initialOwner) Ownable(initialOwner) {}

    mapping(uint256 => NFTListing) private _listings;

    event NFTTransfer(
        uint256 tokenID,
        address from,
        address to,
        string tokenURI,
        uint256 price
    );

    function safeMultiplication(
        uint256 a,
        uint256 b
    ) public pure returns (uint256) {
        (bool success, uint256 result) = Math.tryMul(a, b);
        require(success, "Multiplication overflow");
        return result;
    }

    function safeDivision(uint256 a, uint256 b) public pure returns (uint256) {
        (bool success, uint256 result) = Math.tryDiv(a, b);
        require(success, "Division overflow");
        return result;
    }

    function listNFT(uint256 tokenID, uint256 price) public {
        require(price > 0, "NFTMarket: price must be greater than 0");
        ERC721(address(this)).transferFrom(msg.sender, address(this), tokenID);
        _listings[tokenID] = NFTListing(price, msg.sender);
        emit NFTTransfer(tokenID, msg.sender, address(this), "", price);
    }

    function buyNFT(uint256 tokenID) public payable {
        NFTListing memory listing = _listings[tokenID];
        require(listing.price > 0, "NFTMarket: nft not listed for sale");
        require(msg.value == listing.price, "NFTMarket: incorrect price");
        ERC721(address(this)).transferFrom(address(this), msg.sender, tokenID);
        clearListing(tokenID);
        payable(listing.seller).transfer(
            safeMultiplication(safeDivision(listing.price, 95), 100)
        );
        emit NFTTransfer(tokenID, address(this), msg.sender, "", 0);
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
        emit NFTTransfer(tokenID, address(this), msg.sender, "", 0);
    }

    function withdrawFunds() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "NFTMarket: balance is zero");
        payable(msg.sender).transfer(balance);
    }

    function clearListing(uint256 tokenID) private {
        _listings[tokenID].price = 0;
        _listings[tokenID].seller = address(0);
    }
}
