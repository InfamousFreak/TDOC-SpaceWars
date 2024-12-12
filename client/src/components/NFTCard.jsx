import React, { useState } from "react";
import { useGlobalContext } from "../context";

const NFTCard = ({ nft }) => {

  const { contracts, accounts } = useGlobalContext();

  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [price, setPrice] = useState(0);

  const handleListNFT = () => {

    console.log(price);
    console.log(contracts.NFT_MarketPlace._address);

    if(price<=0) return;

    const listNFT = async () => {
      await contracts.NFT_MarketPlace.methods.approve(contracts.NFT_MarketPlace._address, nft.tokenId).send({ from: accounts[0] });
      // await contracts.NFT_MarketPlace.methods.setApprovalForAll(contracts.NFT_MarketPlace._address, true).send({ from: accounts[0]});
      const result = await contracts.NFT_MarketPlace.methods.listNFT(nft.tokenId, price).send({ from: accounts[0] });
      console.log(result);
    }

    listNFT();
  }

  return (
    <div className="w-64 p-4 rounded-lg bg-gradient-to-b from-gray-700 via-gray-800 to-gray-900 shadow-lg">
      <div className="w-fill h-40 md:h-60 flex items-center justify-center bg-gray-600 rounded-md overflow-hidden">
        <img
          src={nft.image}
          // src='../../public/vite.svg'
          alt={nft.name}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="mt-4 text-center">
        <h4 className="text-xl font-semibold text-gray-200">{nft.name}</h4>
        <p className="text-sm text-gray-400 mt-2">{nft.description}</p>
      </div>
      <div className="mt-4 flex justify-center">
        <button
          className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-bold"
          onClick={() => setIsListModalOpen(!isListModalOpen)}
        >
          List
        </button>
      </div>

      {isListModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 h-full flex flex-col items-center justify-evenly">
            <h2 className="text-3xl font-semibold text-center text-gray-200 mb-6">Select Price:</h2>
            <input
              className="p-3 rounded-lg bg-gray-700 text-white"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <div className="flex justify-end gap-4">
            <button
              className="p-3 rounded-lg bg-gray-600 hover:bg-gray-700 text-white font-bold"
              onClick={() => {setIsListModalOpen(false)}}
            >
              Cancel
            </button>
            <button
              className="p-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-bold"
              onClick={handleListNFT}
            >
              List For Sale
            </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NFTCard;
