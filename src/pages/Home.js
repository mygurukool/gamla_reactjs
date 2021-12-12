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

import useBlockChain from "../hooks/useBlockChain";
import LoadingContainer from "../components/LoadingContainer";
import CreateFundModal from "../components/CreateFundModal";
import moment from "moment";
const Home = (props) => {
  const classes = useStyles();

  //ether
  const { allFunds, connectWallet, createContract, isLoading, currentAccount } =
    useBlockChain();

  //fund details modal

  // remove duplicates from allFunds
  let uniqueFunds = [...new Map(allFunds.map((v) => [v.address, v])).values()];

  const joinedFunds = uniqueFunds.filter((fund) =>
    fund.users.includes(currentAccount)
  );

  const pastFunds = uniqueFunds.filter((fund) => {
    return moment(fund.startDate).isAfter(moment());
  });

  const [openFund, setOpenFund] = React.useState();

  const [openCreateFund, setOpenCreateFund] = React.useState(false);

  const handleFundClick = (data) => {
    setOpenFund(data);
  };

  const hanldeCreateFund = async (data) => {
    // console.log("hanldeCreateFund", data);
    await createContract({
      ...data,
      startDate: moment(data.startDate).unix(),
    });
    setOpenCreateFund(false);
  };

  const onCreateFund = () => {
    setOpenCreateFund(true);
  };
  return (
    <>
      <Navbar
        onFundClick={handleFundClick}
        data={uniqueFunds}
        connectWallet={connectWallet}
        currentAccount={currentAccount}
        onCreateFund={onCreateFund}
      />
      <FundModal
        open={Boolean(openFund)}
        data={openFund}
        onClose={() => setOpenFund()}
      />

      <CreateFundModal
        open={Boolean(openCreateFund)}
        onClose={() => setOpenCreateFund()}
        onSubmit={(data) => hanldeCreateFund(data)}
      />
      <Container maxWidth="lg">
        <div className={classes.root}>
          <div className={classes.carouselContainer}>
            <HomeCarousel
              title="Your wallet funds"
              data={homeData.carousel}
              renderItem={(d, i) => <MyFundCard {...d} index={i} />}
              breakpoints={breakpointsCarousel}
            />
          </div>
          {isLoading ? (
            <LoadingContainer />
          ) : uniqueFunds?.length > 0 ? (
            <>
              <div className={classes.fundsContainer}>
                <HomeCarousel
                  title="Funds you joined"
                  data={joinedFunds}
                  renderItem={(d, i) => (
                    <FundCard
                      onClick={() => handleFundClick(d)}
                      {...d}
                      index={i}
                    />
                  )}
                  swiperProps={swiperProps}
                  breakpoints={breakpointsFunds}
                />
                {joinedFunds.length === 0 && (
                  <Typography marginLeft={4}>
                    <h4>You have not joined any funds</h4>
                    <h4>Find awesome funds from the lists below</h4>
                  </Typography>
                )}
              </div>

              <div className={classes.fundsContainer}>
                <HomeCarousel
                  title="Funds open for subscription"
                  data={pastFunds}
                  renderItem={(d, i) => (
                    <FundCard
                      onClick={() => handleFundClick(d)}
                      {...d}
                      index={i}
                    />
                  )}
                  swiperProps={swiperProps}
                  breakpoints={breakpointsFunds}
                />
                {pastFunds.length === 0 && (
                  <Typography marginLeft={4}>
                    <h4>There are no funds open for subscription at the moment.</h4>
                  </Typography>
                )}
              </div>

              <div className={classes.fundsContainer}>
                <HomeCarousel
                  title="All Funds"
                  data={uniqueFunds}
                  renderItem={(d, i) => <FundCard {...d} index={i} />}
                  swiperProps={swiperProps}
                  breakpoints={breakpointsFunds}
                />
              </div>
            </>
          ) : (
            <div className={classes.NoFundsContainer}>
              <Typography>No Funds Found</Typography>
            </div>
          )}
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
  NoFundsContainer: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
