import React , { createContext , useContext , useEffect , useState , useRef } from "react";
//import ethers from "ethers";
import Web3Modal from "web3modal";
//import useNavigate from "react-router-dom";

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {

    const [walletAddress, setWalletAddress] = useState("");
    const [showAlert, setShowAlert] = useState({
        status: "false",
        type: "info",
        message: ""
    })

    useEffect(() => {
        if(showAlert?.status) {
            const timer = setTimeout(() => {
                setShowAlert({
                    status: "false",
                    type: "info",
                    message: ""
                })
            }, [5000]);

            return () => clearTimeout(timer);
        }
    }, [showAlert]);

    const updateCurrentWalletAddress = async () => {
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts"
        });
        console.log(accounts);
    }

    useEffect(() => {
        updateCurrentWalletAddress();
    }, []);

    useEffect(() => {
        const setSmartContractAndProvider = async () => {
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const newProvider = new ethers.providers.Web3Provider(connection);
            const signer = newProvider.signer();
            const newContract = new ethers.Contract();
        }

        setSmartContractAndProvider();
    })
    
    
    return(
        <GlobalContext.Provider value={{
            showAlert, setShowAlert,
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);