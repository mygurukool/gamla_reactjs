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
  Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import SearchModal from "../components/SearchModal";
import useBlockChain from "../hooks/useBlockChain";

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

  const { currentAccount, connectWallet } = props;

  return (
    <AppBar
      position="static"
      variant="outlined"
      elevation={0}
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
          <Stack direction="row" spacing={1}>
            {!currentAccount ? (
              <Button size="small" variant="outlined" onClick={connectWallet}>
                Connect Wallet
              </Button>
            ) : (
              <Button size="small" variant="outlined" onClick={connectWallet}>
                Create Fund
              </Button>
            )}
            <SearchModal {...props} />
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
