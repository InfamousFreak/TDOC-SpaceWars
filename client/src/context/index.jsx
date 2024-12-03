import React , { createContext , useContext , useEffect , useState , useRef } from "react";
//import ethers from "ethers";
//import web3Modal from "web3modal";
//import useNavigate from "react-router-dom";

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
    return(
        <GlobalContext.Provider value={{
            demo: "test"
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);