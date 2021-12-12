import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { CURRENCY, DATEFORMAT } from "../constants";
import { makeStyles } from "@mui/styles";
import useBlockChain from "../hooks/useBlockChain";

import homeData from "../data/home";
import moment from "moment";

const pleadgeOptions = homeData.carousel;

const FundModal = ({ open, onClose, data }) => {
  const classes = useStyles();

  const [plegingState, setPlagingState] = React.useState();
  const { joinFund } = useBlockChain();

  const handleSubmit = () => {
    if (!plegingState) {
      alert("Please Pledge collatral");
    }

    joinFund({ ...data, collateral: plegingState });
  };

  return (
    <Dialog
      maxWidth="md"
      fullWidth
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className={classes.root}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {data?.fundName}
        {onClose ? (
          <IconButton aria-label="close" onClick={onClose} color="primary">
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <SectionDisplay
            title="Subscribed Users"
            value={data?.users}
          ></SectionDisplay>
          <SectionDisplay
            title="Duration"
            value={data?.duration}
          ></SectionDisplay>
          <SectionDisplay
            title="Currency"
            value={data?.currency}
          ></SectionDisplay>
          <SectionDisplay
            title="Monthly Amount"
            value={CURRENCY + data?.amount}
          ></SectionDisplay>
          <SectionDisplay
            title="Start Date"
            value={moment(data?.startDate).format(DATEFORMAT)}
          ></SectionDisplay>

          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Typography variant="caption">Pledging collateral</Typography>
            <TextField
              select
              style={{ marginTop: 15 }}
              fullWidth
              label="Select Pledging collateral"
              color="primary"
              onChange={(e) => setPlagingState(e.target.value)}
            >
              {pleadgeOptions.map((option) => (
                <MenuItem key={option.fundName} value={option.fundName}>
                  {option.fundName} {option.amount}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <FormControlLabel
              control={<Checkbox />}
              label="I understand the fund details, and agree to join by pledging the required collateral"
            />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={handleSubmit}
            >
              JOIN THE FUND
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

const SectionDisplay = ({ title, value }) => {
  const classes = useStyles();
  return (
    <Grid item lg={6} md={12} sm={12} xs={12}>
      <Card className={classes.card} elevation={0}>
        <Typography variant="caption">{title}</Typography>
        <Typography variant="h6">{value}</Typography>
      </Card>
    </Grid>
  );
};

export default FundModal;

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiPaper-root": {
      borderRadius: theme.palette.radius.big,
      background: theme.palette.background.main,
    },
  },
  card: {
    border: `1px solid ${theme.palette.background.light}`,

    paddingLeft: theme.spacing(4),
    height: "100%",
  },
}));

const currencies = [
  {
    value: "USD",
    label: "$",
  },
  {
    value: "EUR",
    label: "€",
  },
  {
    value: "BTC",
    label: "฿",
  },
  {
    value: "JPY",
    label: "¥",
  },
];
