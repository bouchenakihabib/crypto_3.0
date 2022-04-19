import React, {useEffect, useState} from "react";
import {ethers} from "ethers";

import {contractABI, contractAddress} from "../utils/constants";

export const TransactionContext = React.createContext();

const {ethereum} = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);
    
    return transactionContract;
}

export const TransactionProvider = ({children}) => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [formData, setFormData] = useState({addressTo: '', amount: '', keyword: '', message: ''});
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));
    const [transactions, setTransactions] = useState([]);

    const handleChange = (e, name) => {
        setFormData((prevState) => ({...prevState, [name]: e.target.value}));
    }

    const getAllTransactions = async () => {
        try{
            if(!ethereum) return alert('Please install metamask');
            const transactionContract = await getEthereumContract();
            const availableTransactions = await transactionContract.getAllTransactions();

            const structuredTransactions = availableTransactions.map((transaction) => ({
                addressTo: transaction.receiver,
                addressFrom: transaction.from,
                timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                message: transaction.message,
                keyword: transaction.keyword,
                amount: parseInt(transaction.amount._hex ) / (10 ** 18)
            }));
            setTransactions(structuredTransactions);
        }catch(error){
            console.log(error);
        }
    }

    const checkIfWalletIsConnected = async () => {
        try{
            if(!ethereum) return alert('Please install metamask');

            const accounts = await ethereum.request({method: 'eth_accounts'});

            if(accounts.length) {
                setCurrentAccount(accounts[0]);

                getAllTransactions();
            }else {
                console.log('No accounts found');
            }

            console.log(accounts);
        }catch(error) {
            console.log(error);
        }
    }

    const checkIfTransactionExist = async () => {
        try{

            window.localStorage.setItem('transactionCount', transactionCount);
        }catch(error) {
            console.log(error);
        }
    }

    const connectWallet = async () => {
        try{
            if(!ethereum) return alert('Please install metamask');

            const accounts = await ethereum.request({method: 'eth_requestAccounts'});

            setCurrentAccount(accounts[0]);
        }catch(error){
            console.log(error);

            throw new Error("No ethereum wallet found");
        }
    }

    const sendTransaction = async () => {
        try {
            if(!ethereum) return alert('Please install metamask');
            
            const { addressTo, amount, keyword, message } = formData;
            const transactionContract = getEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount);
            await ethereum.request({method: 'eth_sendTransaction', 
            params: [{
                from: currentAccount,
                to: addressTo,
                gas: '0x5208', //21000 GWEI
                value: parsedAmount._hex, //0.00001 ETH
            }]
            });
            const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);
            setIsLoading(true);
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            console.log(`Success - ${transactionHash.hash}`);
            setIsLoading(false);

            const transactionsCount = await transactionContract.getTransactionsCount();

            setTransactionCount(transactionsCount.toNumber());
            window.reload();
        } catch(error){
            console.log(error);
            throw new Error("No ethereum wallet found");
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
        checkIfTransactionExist();
    }, []);
    return (
        <TransactionContext.Provider value={{ connectWallet,currentAccount, formData, setFormData, handleChange, sendTransaction, transactions, isLoading }}>
            {children}
        </TransactionContext.Provider>
    )
}