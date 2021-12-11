import React from "react";
import { makeStyles } from "@mui/styles";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { CURRENCY } from "../constants";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "auto",
    backgroundColor: theme.palette.background.paper,
  },

  icon: {
    height: "10vh",
    width: "10vh",
  },
  balance: {
    backgroundColor: theme.palette.primary.lighter,
    color: theme.palette.primary.main,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),

    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  },
}));

const colors = [
  { light: "#FFF3EC", dark: "#F28300" },
  { light: "#E8EBF5", dark: "#454A75" },
];

const FundCard = ({ fundName, currency, duration, icon, amount, index }) => {
  const classes = useStyles();
  const myColor = colors[index];
  return (
    <Card key={index} className={classes.root} variant="outlined">
      <CardContent>
        <Grid container>
          <Grid item lg={12} sm={12}>
            <Typography variant="caption" className={classes.balance}>
              {currency}
            </Typography>
            <Typography variant="h6">{fundName}</Typography>

            <Typography variant="caption">{duration}</Typography>

            <Typography variant="subtitle1">
              {CURRENCY} {amount}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default FundCard;
