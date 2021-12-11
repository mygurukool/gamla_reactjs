import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const SearchResults = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div>SearchResults</div>
    </div>
  );
};

export default SearchResults;
