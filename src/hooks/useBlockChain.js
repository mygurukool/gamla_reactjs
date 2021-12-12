import React, { useEffect, useState } from "react";
import abi from "../utils/CommunityFundFactory.json";
import fundabi from "../utils/CommunityFund.json";
import { ethers } from "ethers";
import moment from "moment";
const contractABI = abi.abi;
const fundABI = fundabi.abi;
const contractAddress = "0x5E6249be9d836b168a67A98F8d3F2854cb0387E2";

const useBlockChain = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [allFunds, setAllFunds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
        getContracts();
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
      getContracts();
    } catch (error) {
      console.log(error);
    }
  };

  const createContract = async ({
    name,
    requiredNbOfParticipants,
    recurringAmount,
    startDate,
    duration,
  }) => {
    console.log(
      "upcoming data",
      name,
      requiredNbOfParticipants,
      recurringAmount,
      startDate,
      duration
    );
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const communityFundFactory = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );
    const createFundTxn = await communityFundFactory.createCommunityFund(
      name,
      requiredNbOfParticipants,
      recurringAmount,
      startDate,
      duration
      //   "Unicorn Ironman",
      //   10,
      //   1000,
      //   1639100000,
      //   10
    );

    await createFundTxn.wait();
    await getContracts();
    // console.log("upcoming Mined -- ", createFundTxn.hash);
  };

  const getContracts = async () => {
    setIsLoading(true);
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const communityFundFactory = new ethers.Contract(
        contractAddress,
        contractABI,
        provider
      );

      const contracts = await communityFundFactory.getCommunityFunds();
      const contractsDetails = await Promise.all(
        contracts.map(async (d) => {
          const row = await getFundData(d);

          return {
            fundName: row.name.toString(),
            duration: row.duration.toString() + " months",
            amount: row.recurringAmount.toString(),
            requiredNumberOfParticipants:
              row.requiredNbOfParticipants.toString(),
            startDate: moment(row.startDate).format("DD/MM/YYYY HH:mm"),
            currency: "INR",
          };
        })
      );
      setAllFunds([...allFunds, ...contractsDetails]);
      setIsLoading(false);
    } catch {
      setIsLoading(false);
      alert("An Error Occured");
    }
  };

  const getFundData = async (address) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const communityFund = new ethers.Contract(address, fundABI, provider);

    const name = await communityFund.name();

    const requiredNbOfParticipants =
      await communityFund.requiredNbOfParticipants();
    const recurringAmount = await communityFund.recurringAmount();
    const startDate = await communityFund.startDate();
    const duration = await communityFund.duration();

    return {
      name,
      requiredNbOfParticipants,
      recurringAmount,
      startDate,
      duration,
    };
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return {
    allFunds,
    currentAccount,
    connectWallet,
    getContracts,
    isLoading,
    createContract,
  };
};

export default useBlockChain;

// const connectWallet = async () => {
//     try {
//       const { ethereum } = window;

//       if (!ethereum) {
//         alert("Get MetaMask!");
//         return;
//       }

//       const accounts = await ethereum.request({
//         method: "eth_requestAccounts",
//       });

//       console.log("Connected", accounts[0]);
//       setCurrentAccount(accounts[0]);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     //alert("getContracts before!");
//     checkIfWalletIsConnected();
//     getContracts();
//     //alert("getContracts after!");
//   }, []);

//   const getFundData = async (address) => {
//     const provider = new ethers.providers.Web3Provider(window.ethereum);
//     const communityFund = new ethers.Contract(address, fundABI, provider);

//     const name = await communityFund.name();

//     const requiredNbOfParticipants =
//       await communityFund.requiredNbOfParticipants();
//     const recurringAmount = await communityFund.recurringAmount();
//     const startDate = await communityFund.startDate();
//     const duration = await communityFund.duration();

//     return {
//       name,
//       requiredNbOfParticipants,
//       recurringAmount,
//       startDate,
//       duration,
//     };
//   };

//   const getContracts = async () => {
//     const provider = new ethers.providers.Web3Provider(window.ethereum);
//     const signer = provider.getSigner();

//     const communityFundFactory = new ethers.Contract(
//       contractAddress,
//       contractABI,
//       provider
//     );

//     const contracts = await communityFundFactory.getCommunityFunds();

//     const contractsDetails = contracts.map(await getFundData);
//     let contractsData = [];

//     console.log(contracts);
//     console.log(await contractsDetails);

//     setAllFunds([]);
//     await contractsDetails.forEach((element) => {
//       element.then((result) => {
//         console.log(result);
//         contractsData.push(result);
//         setAllFunds((oldFunds) => [...oldFunds, result]);
//       });
//     });
//     console.log("--> ", await contractsData);
//     console.log("--> allFunds -:> ", allFunds);

//     setMappedFunds(
//       allFunds.map((row) => {
//         return {
//           fundName: row.name.toString(),
//           duration: row.duration.toString() + " months",
//           amount: row.recurringAmount.toString(),
//           currency: "INR",
//         };
//       })
//     );
//   };
