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
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import SearchModal from "../components/SearchModal";

const useStyles = makeStyles((theme) => ({
  root: {
    borderBottom: `1px solid ${theme.palette.background.light}`,
  },
  box: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  appName: {
    color: theme.palette.text.primary,
  },
}));

const Navbar = (props) => {
  const classes = useStyles();
  const history = useNavigate();
  return (
    <AppBar
      position="static"
      variant="outlined"
      elevation={1}
      className={classes.root}
      style={{
        backgroundColor: "transparent",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box className={classes.box}>
            <IconButton>
              <Avatar alt="Remy Sharp" src="/images/logo.png" />
            </IconButton>
            <Typography variant="h5" className={classes.appName}>
              Gamla Fund
            </Typography>
          </Box>
          <Button variant="contained" onClick={props.connectWallet}>
            Connect Wallet
          </Button>
          <SearchModal {...props} />
          {/* <IconButton onClick={() => history(`/search`)}>
            <SearchIcon />
          </IconButton> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
