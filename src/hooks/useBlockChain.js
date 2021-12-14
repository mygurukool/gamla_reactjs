import React, { useEffect, useState } from "react";
import abi from "../utils/CommunityFundFactory.json";
import fundabi from "../utils/CommunityFund.json";
import { ethers } from "ethers";
import moment from "moment";
const contractABI = abi.abi;
const fundABI = fundabi.abi;
const contractAddress = "0x6E720F351d76081B718ABE98F242068a697a6F6D";

const useBlockChain = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [allFunds, setAllFunds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshUseEffect, setRefreshUseEffect] = useState('');
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
        const account = ethers.utils.getAddress(accounts[0]);
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

  const createFund = async ({
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
      parseInt((new Date(startDate).getTime() / 1000).toFixed(0)),
      duration
      //   "Unicorn Ironman",
      //   10,
      //   1000,
      //   1639100000,
      //   10
    );

    const waitValues = await createFundTxn.wait()
    const fundAddress = waitValues.events[0].args[0];

    pledgeCollateral(fundAddress, recurringAmount, requiredNbOfParticipants);
    await getContracts(recurringAmount);
  };

  const joinFund = async (data) => {
    const {
      // collateral,
       address } = data;

    //const provider = new ethers.providers.Web3Provider(window.ethereum);
    //const signer = provider.getSigner();
    //const communityFund = new ethers.Contract(address, fundABI, signer);

    //const collateral = parseInt(parseInt(data.amount) * parseInt(data.requiredNumberOfParticipants) * 1.2).toFixed(0);

    // console.debug("data", data);
    // console.debug("collateral", collateral);
    // console.debug(communityFund)

    //const collateralReceipt = await communityFund.collateral({ value: collateral });
    //console.debug("collateralReceipt",collateralReceipt);
    pledgeCollateral(address, data.amount, data.requiredNumberOfParticipants);
    deposit(data);
  };

  const pledgeCollateral = async (address, amount, requiredNumberOfParticipants) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const communityFund = new ethers.Contract(address, fundABI, signer);

    const collateral = parseInt(parseInt(amount) * parseInt(requiredNumberOfParticipants) * 1.2).toFixed(0);
    const collateralReceipt = await communityFund.collateral({ value: collateral });
    console.debug("collateralReceipt: ",collateralReceipt);
  }  

  const deposit = async (data) => {
    const { address } = data;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const communityFund = new ethers.Contract(address, fundABI, signer);

    const depositReceipt  = await communityFund.deposit({ value: parseInt(data.amount) });
    console.debug("depositReceipt",depositReceipt);

    const balance = await (communityFund.participants(contractAddress));
    console.debug("balance", balance);
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
            currency: "USDT",
            users: row.participantsAddress,
            address: d,
          };
        })
      );
      setAllFunds([...allFunds, ...contractsDetails]);
      setIsLoading(false);
    } catch {
      setIsLoading(false);
      setRefreshUseEffect(1);
      alert("Error loading your contracts. Make sure you are connected to Matic Mumbai network!");
    }
  };

  const getFundData = async (address) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const communityFund = new ethers.Contract(address, fundABI, provider);

    const name = await communityFund.name();
    const requiredNbOfParticipants = await communityFund.requiredNbOfParticipants();
    const recurringAmount = await communityFund.recurringAmount();
    const startDate = await communityFund.startDate()*1000*1000;
    const duration = await communityFund.duration();
    try {
      const participantsAddress = await communityFund.getAllParticipants();
      //const participantsAddress = await communityFund.participants(communityFund.address);
      console.log("participantsAddress", participantsAddress)
      return {
        name,
        requiredNbOfParticipants,
        recurringAmount,
        startDate,
        duration,
        participantsAddress,
        //participantsAddress: participantsAddress.map((d) => d.toString()),
      };
    } catch (error) {
     // alert("error ", error)
      console.error("error: ", error)
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    getContracts();
  }, [refreshUseEffect]);

  return {
    allFunds,
    currentAccount,
    connectWallet,
    getContracts,
    isLoading,
    createFund,
    joinFund,
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
