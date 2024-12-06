import React, { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { ABI, ADDRESS } from "../contract";

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [provider, setProvider] = useState("");
  const [contract, setContract] = useState("");
  const [showAlert, setShowAlert] = useState({
    status: "false",
    type: "info",
    message: "",
  });

  useEffect(() => {
    if (showAlert?.status) {
      const timer = setTimeout(() => {
        setShowAlert({
          status: "false",
          type: "info",
          message: "",
        });
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  const updateCurrentWalletAddress = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      if (accounts) {
        setWalletAddress(accounts[0]);
      }
    } else {
      setShowAlert({
        status: "true",
        type: "error",
        message: "No wallet extension detected. Please install MetaMask.",
      });
      console.log("No wallet extension detected. Please install MetaMask.");
    }
  };

  useEffect(() => {
    updateCurrentWalletAddress();
  }, []);

  useEffect(() => {
    console.log("UseEffect triggered");
    const setSmartContractAndProvider = async () => {
      //   const web3Modal = new Web3Modal();
      //   const connection = await web3Modal.connect();
      console.log("function triggered");
      console.log(ethers);
      const newProvider = new ethers.BrowserProvider(
        window.ethereum
      );
      console.log("Provider created: ", newProvider);
      if (!newProvider) {
        throw new Error("Failed to get provider");
      }
      const signer = await newProvider.getSigner();
      const newContract = new ethers.Contract(ADDRESS, ABI, signer);

      setProvider(newProvider);
      setContract(newContract);
    };

    setSmartContractAndProvider();
  }, []);

  // useEffect(() => {
  //     const setSmartContractAndProvider = async () => {
  //         if (window.ethereum) {
  //             const newProvider = ((window.ethereum != null) ? new ethers.providers.Web3Provider(window.ethereum) : ethers.providers.getDefaultProvider());
  //             console.log(newProvider);
  //             const signer = newProvider.getSigner();
  //             const newContract = new ethers.Contract(ADDRESS, ABI, signer);

  //             setProvider(newProvider);
  //             setContract(newContract);
  //         } else {
  //             setShowAlert({
  //                 status: "true",
  //                 type: "error",
  //                 message: "No wallet extension detected. Please install MetaMask."
  //             });
  //             console.log("No wallet extension detected. Please install MetaMask.");
  //         }
  //     };

  //     setSmartContractAndProvider();
  // }, []);

  return (
    <GlobalContext.Provider
      value={{
        showAlert,
        setShowAlert,
        contract,
        walletAddress,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
