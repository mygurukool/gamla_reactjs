import React from "react";
import { makeStyles } from "@mui/styles";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  alpha,
  ButtonBase,
} from "@mui/material";
import { CURRENCY, DATEFORMAT } from "../constants";
import moment from "moment";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "auto",
    background: `linear-gradient(to right top, ${theme.palette.background.light},${theme.palette.background.primary})`,
    border: `1px solid ${theme.palette.background.light}`,
  },

  icon: {
    height: "10vh",
    width: "10vh",
  },
  balance: {
    backgroundColor: alpha(theme.palette.background.light, 0.9),
    color: theme.palette.primary.main,
    padding: theme.spacing(1),
    borderRadius: theme.palette.radius.base,
  },
}));

const colors = [
  { light: "#FFF3EC", dark: "#F28300" },
  { light: "#E8EBF5", dark: "#454A75" },
];

const FundCard = ({
  fundName,
  onClick,
  currency,
  duration,
  icon,
  amount,
  index,
  startDate,
}) => {
  const classes = useStyles();
  const myColor = colors[index];
  return (
    <Card key={index} className={classes.root} variant="outlined">
      <ButtonBase
        style={{
          width: "100%",
          justifyContent: "flex-start",
          textAlign: "left",
        }}
        onClick={onClick}
      >
        <CardContent>
          <Grid container>
            <Grid item lg={12} sm={12}>
              <Typography variant="caption" className={classes.balance}>
                {currency}
              </Typography>
              <Typography variant="h6" sx={{ marginTop: 2 }}>
                {fundName}
              </Typography>

              <Typography variant="caption">
                {duration} {', Startdate: ' + startDate}
              </Typography>

              <Typography variant="subtitle1">
                {CURRENCY} {amount}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </ButtonBase>
    </Card>
  );
};

export default FundCard;
