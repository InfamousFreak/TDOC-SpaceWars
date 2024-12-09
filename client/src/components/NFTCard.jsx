import React from "react";

const NFTCard = ({ nft }) => {
    return (
      <div className="w-64 p-4 rounded-lg bg-gradient-to-b from-gray-700 via-gray-800 to-gray-900 shadow-lg">
        <div className="w-fill h-40 md:h-60 flex items-center justify-center bg-gray-600 rounded-md overflow-hidden">
          <img
            src={nft.image}
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
          >
            List
          </button>
        </div>
      </div>
    );
  };
  
  export default NFTCard;
  