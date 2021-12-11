import React from "react";
import { makeStyles } from "@mui/styles";
import { Card, CardContent, Container, Grid, Typography } from "@mui/material";
import HomeCarousel from "../components/HomeCarousel";

import homeData from "../data/home";
import MyFundCard from "../components/MyFundCard";
import FundCard from "../components/FundCard";

const Home = (props) => {
  const classes = useStyles();

  return (
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
            data={homeData.trendingFunds}
            renderItem={(d, i) => <FundCard {...d} index={i} />}
            swiperProps={swiperProps}
            breakpoints={breakpointsFunds}
          />
        </div>

        <div className={classes.fundsContainer}>
          <HomeCarousel
            title="All Funds"
            data={homeData.trendingFunds}
            renderItem={(d, i) => <FundCard {...d} index={i} />}
            swiperProps={swiperProps}
            breakpoints={breakpointsFunds}
          />
        </div>
      </div>
    </Container>
  );
};

export default Home;

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    // minHeight: "90vh",

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
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
