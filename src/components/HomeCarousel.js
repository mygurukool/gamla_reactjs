import React, { Component } from "react";
import ReactDOM from "react-dom";

import { makeStyles } from "@mui/styles";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import "swiper/swiper.min.css";
import "swiper/modules/pagination/pagination.min.css";
import { Typography, Grid } from "@mui/material";

import SwiperCore, { Pagination } from 'swiper';

SwiperCore.use([Pagination]);

// Import Swiper styles
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
  },
  gridContainer: {
    padding: theme.spacing(2),
  },
  titleContainer: {
    paddingBottom: theme.spacing(2),
  },
}));

const HomeCarousel = ({
  title,
  accountInfo,
  breakpoints,
  data,
  renderItem,
  swiperProps,
}) => {
  const classes = useStyles();
  return (
    <Grid container className={classes.gridContainer}>
      <Grid
        item
        lg={12}
        md={12}
        sm={12}
        xs={12}
        className={classes.titleContainer}
      >
        <Typography variant="h6">{title}</Typography>
        <Typography variant="caption">{accountInfo}</Typography>
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <Swiper pagination={{ "dynamicBullets": true }}
          spaceBetween={50}
          slidesPerView={3}
          // onSlideChange={() => console.log("slide change")}
          // onSwiper={(swiper) => console.log(swiper)}
          {...swiperProps}
          breakpoints={breakpoints}
        >
          {data.map((d, i) => (
            <SwiperSlide key={i}>{renderItem(d, i)}</SwiperSlide>
          ))}
        </Swiper>
      </Grid>
    </Grid>
  );
};

export default HomeCarousel;
