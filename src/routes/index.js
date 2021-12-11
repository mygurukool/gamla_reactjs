import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";
import Home from "../pages/Home";

const RoutesContainer = () => {
  const classes = useStyles()
  return (
    <BrowserRouter>
      <div className={classes.root}>

        <Routes>


          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.main
  },

}));

export default RoutesContainer;
