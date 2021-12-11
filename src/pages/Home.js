import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Card, CardContent, Container, Grid, Typography } from "@mui/material";
import HomeCarousel from "../components/HomeCarousel";

import homeData from "../data/home";
import MyFundCard from "../components/MyFundCard";
import FundCard from "../components/FundCard";
import { useNavigate } from "react-router-dom";
import FundModal from "../components/FundModal";
import Navbar from "../components/Navbar";
import abi from "../utils/CommunityFundFactory.json";
import fundabi from "../utils/CommunityFund.json";
import { ethers } from "ethers";
const Home = (props) => {
  const classes = useStyles();
  const navigation = useNavigate();

  //ether

  const contractAddress = "0x5E6249be9d836b168a67A98F8d3F2854cb0387E2";
  const [currentAccount, setCurrentAccount] = useState("");
  const [allFunds, setAllFunds] = useState([]);
  const [mappedFunds, setMappedFunds] = useState([]);

  const contractABI = abi.abi;
  const fundABI = fundabi.abi;

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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    //alert("getContracts before!");
    checkIfWalletIsConnected();
    getContracts();
    //alert("getContracts after!");
  }, []);

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

  const getContracts = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const communityFundFactory = new ethers.Contract(
      contractAddress,
      contractABI,
      provider
    );

    const contracts = await communityFundFactory.getCommunityFunds();

    const contractsDetails = contracts.map(await getFundData);
    let contractsData = [];

    console.log(contracts);
    console.log(await contractsDetails);

    setAllFunds([]);
    await contractsDetails.forEach((element) => {
      element.then((result) => {
        console.log(result);
        contractsData.push(result);
        setAllFunds((oldFunds) => [...oldFunds, result]);
      });
    });
    console.log("--> ", await contractsData);
    console.log("--> allFunds -:> ", allFunds);

    setMappedFunds(
      allFunds.map((row) => {
        return {
          fundName: row.name.toString(),
          duration: row.duration.toString() + " months",
          amount: row.recurringAmount.toString(),
          currency: "INR",
        };
      })
    );
  };

  //fund details modal

  const [openFund, setOpenFund] = React.useState();
  const handleFundClick = (data) => {
    console.log("dataa sd", data);
    setOpenFund(data);
    // navigation('/funddetail', { state: data })
  };
  return (
    <>
      <Navbar
        onFundClick={handleFundClick}
        data={mappedFunds}
        connectWallet={connectWallet}
      />
      <FundModal
        open={Boolean(openFund)}
        data={openFund}
        onClose={() => setOpenFund()}
      />
      <Container maxWidth="lg">
        <div className={classes.root}>
          <div className={classes.carouselContainer}>
            <HomeCarousel
              title="Your Funds"
              data={homeData.carousel}
              renderItem={(d, i) => <MyFundCard {...d} index={i} />}
              breakpoints={breakpointsCarousel}
            />
          </div>
          <div className={classes.fundsContainer}>
            <HomeCarousel
              title="Trending Funds"
              data={mappedFunds}
              renderItem={(d, i) => (
                <FundCard onClick={() => handleFundClick(d)} {...d} index={i} />
              )}
              swiperProps={swiperProps}
              breakpoints={breakpointsFunds}
            />
          </div>

          <div className={classes.fundsContainer}>
            <HomeCarousel
              title="All Funds"
              data={mappedFunds}
              renderItem={(d, i) => <FundCard {...d} index={i} />}
              swiperProps={swiperProps}
              breakpoints={breakpointsFunds}
            />
          </div>
        </div>
      </Container>
    </>
  );
};

export default Home;

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    minHeight: "100vh",
    background: theme.palette.background.main,
    // display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // justifyContent: "space-evenly",
    color: theme.palette.text.primary,
  },

  carouselContainer: {
    width: "100%",

    flex: 1,
  },
  fundsContainer: {
    width: "100%",

    flex: 1,
  },
}));
const swiperProps = {
  slidesPerView: 4,

  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    // when window width is >= 640px
    640: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
  },
};

const breakpointsCarousel = {
  // when window width is >= 320px
  320: {
    slidesPerView: 1,
    spaceBetween: 20,
  },
  // when window width is >= 480px
  480: {
    slidesPerView: 1,
    spaceBetween: 30,
  },
  // when window width is >= 640px
  640: {
    slidesPerView: 2,
    spaceBetween: 40,
  },
};
const breakpointsFunds = {
  // when window width is >= 320px
  320: {
    slidesPerView: 2,
    spaceBetween: 20,
  },
  // when window width is >= 480px
  480: {
    slidesPerView: 2,
    spaceBetween: 30,
  },
  // when window width is >= 640px
  640: {
    slidesPerView: 3,
    spaceBetween: 40,
  },
};
