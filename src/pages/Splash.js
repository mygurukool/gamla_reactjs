import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const Splash = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div>Splash</div>
    </div>
  );
};

export default Splash;
