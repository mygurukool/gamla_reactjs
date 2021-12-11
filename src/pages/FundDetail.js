import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const FundDetails = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div></div>
    </div>
  );
};

export default FundDetails;
