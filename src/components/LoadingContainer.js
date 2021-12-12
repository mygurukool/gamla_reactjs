import React from "react";
import { makeStyles } from "@mui/styles";
import { CircularProgress } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100%",
    width: "100%",
    minHeight: "20vh",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const LoadingContainer = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CircularProgress color="primary" size={40} />
    </div>
  );
};

export default LoadingContainer;
