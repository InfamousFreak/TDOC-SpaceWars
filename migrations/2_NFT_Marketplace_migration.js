const NFT_Marketplace = artifacts.require("NFT_Marketplace");

module.exports = function (deployer) {
    deployer.deploy(NFT_Marketplace);
};
