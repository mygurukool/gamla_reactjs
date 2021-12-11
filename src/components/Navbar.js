import React from "react";
import { makeStyles } from "@mui/styles";
import {
  AppBar,
  Container,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Avatar,
} from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "white",
  },
}));

const Navbar = (props) => {
  const classes = useStyles();
  return (
    <AppBar
      position="static"
      variant="outlined"
      elevation={1}
      className={classes.root}
      style={{
        backgroundColor: "white",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <IconButton>
            <Avatar alt="Remy Sharp" src="/images/logo.png" />
          </IconButton>
          <Typography variant="h6" noWrap color="MenuText">
            Gamla Fund
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
