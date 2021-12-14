import React from "react";
import { makeStyles } from "@mui/styles";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { CURRENCY } from "../constants";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    background: `linear-gradient(to left top, ${theme.palette.background.light},${theme.palette.background.primary})`,
    border: `1px solid ${theme.palette.background.light}`,
  },

  icon: {
    height: "10vh",
    width: "10vh",
  },
}));

const colors = {
  BTC: { light: "#fcc079", dark: "#F7931A" },
  ETH: { light: "#727ac4", dark: "#454A75" },
  MATIC: { light: "#b479fc", dark: "#5929c4" }, //#b479fc ,#5929c4
  AAVE: { light: "#fc79ce", dark: "#1bacac" }, //#fc79ce, a414df 
};

const MyFundCard = ({ fundName, value, icon, amount, index }) => {
  const classes = useStyles();
  const myColor = colors[fundName];
  return (
    <Card
      key={index}
      className={classes.root}
      sx={{
        background: `linear-gradient(to left, ${myColor.light} 10%,${myColor.dark})`,
      }}
    >
      <CardContent>
        <Grid container>
          <Grid item lg={8} md={8} sm={8} xs={8}>
            <Typography variant="caption">BALANCE</Typography>
            <Typography variant="h6">
              {" "}
              {fundName} {value}
            </Typography>

            <Typography variant="h6">
              {CURRENCY} {amount}
            </Typography>
          </Grid>
          <Grid
            item
            container
            alignItems="center"
            justifyContent="center"
            lg={4}
            md={4}
            sm={4}
            xs={4}
          >
            <img src={icon} className={classes.icon} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default MyFundCard;
