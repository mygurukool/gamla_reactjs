import React from "react";
import { makeStyles } from "@mui/styles";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { CURRENCY } from "../constants";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },

  icon: {
    height: "10vh",
    width: "10vh",
  },
}));

const colors = [
  { light: "#FFF3EC", dark: "#F28300" },
  { light: "#E8EBF5", dark: "#454A75" },
];

const MyFundCard = ({ fundName, value, icon, amount, index }) => {
  const classes = useStyles();
  const myColor = colors[index];
  return (
    <Card key={index} className={classes.root} variant="outlined">
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
