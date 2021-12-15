import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  IconButton,
  MenuItem,
  Typography,
  Stack,
  FormControl,
  InputLabel,
  Input,
} from "@mui/material";
import DateTimePicker from "@mui/lab/DateTimePicker";
import CloseIcon from "@mui/icons-material/Close";
import { CURRENCY, DATEFORMAT } from "../constants";
import { makeStyles } from "@mui/styles";
import { useForm, Controller } from "react-hook-form";
import { LocalizationProvider } from "@mui/lab";
import AdapterMoment from "@date-io/moment";
import homeData from "../data/home";
import moment from "moment";

var items = ['Midnight Thing', 'Shadow of Struggle', 'Thunder Excuse', 'Circle of Nothing', 'Beach Daughters', 'Meaning of Diamonds', 'Extreme Riddle', 'Century Thing', 'Brave Connection', 'Axis', 'Carefree Nation'];
var item = items[Math.floor(Math.random() * items.length)];

let pledgeWallet ="";
const CreateFundModal = ({ open, onClose, data, onSubmit, actualWalletFunds }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },

    control,
  } = useForm({});
  const [duration, setDuration] = React.useState();
  const [pledgingState, setPledgingState] = React.useState();
  pledgeWallet = actualWalletFunds;

  const classes = useStyles();
  const localSubmit = (data) => {
    if (!pledgingState) {
      alert("Please accept pledging of deposit collateral");
    }else {
      onSubmit({
        ...data,
        duration: duration,
      });
    }
  };
  return (
    <Dialog
      maxWidth="sm"
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
        Create New Fund
        {onClose ? (
          <IconButton aria-label="close" onClick={onClose} color="primary">
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(localSubmit)}>
          <Grid container spacing={2}>
            <InputDisplay
              label="Fund Name"
              control={control}
              name="name"
              error={errors["name"]}
              required={true}
              inputProps={{ margin: "dense", border: "4px solid red" }}
              defaultValue={item}
            />
            <InputDisplay
              label="Number of Participants"
              control={control}
              name="requiredNbOfParticipants"
              required={true}
              error={errors["requiredNbOfParticipants"]}
              inputProps={{
                type: "number",
                min: 1,
                step: 1,
              }}
              onCustomChange={(val) => setDuration(val)}
            />
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <TextField
                size="small"
                label={"Duration"}
                fullWidth
                id="my-input"
                margin="none"
                //variant="filled"
                disabled
                value={'' + duration}
              />
              <Typography variant="caption">
                * Fund duration will be same as Number of participants
              </Typography>
            </Grid>

            {/* <InputDisplay
              label="Duration in months"
              control={control}
              name="duration"
              error={errors["duration"]}
              required={true}
              inputProps={{
                type: "number",
                disabled: true,
                helperText:
                  "The duration will be same as Number of participants ",
              }}
            /> */}

            <InputDisplay
              label="Recurring Amount"
              control={control}
              name="recurringAmount"
              error={errors["recurringAmount"]}
              required={true}
              inputProps={{
                type: "number",
                min: 0,
              }}
            />
            <DateDisplay
              label="Start Date"
              control={control}
              name="startDate"
              error={errors["startDate"]}
              required={true}
            />
            <SelectDisplay
              label=" Pledging collateral"
              control={control}
              name="collateral"
              error={errors["collateral"]}
              required={true}
            />
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <FormControlLabel
                control={<Checkbox />}
                label="I understand the fund details, and agree to create a new fund by pledging the first month's depoist and required collateral"
                onChange={(e) => setPledgingState(e.target.value)}
              />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Stack spacing={3} direction="row" justifyContent="flex-end">
                <Button onClick={onClose}>Close</Button>

                <Button type="submit" variant="contained">
                  Submit
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const InputDisplay = ({
  name,
  label,
  defaultValue,
  control,
  size = 12,
  inputProps,
  required,
  error,
  isDisabled,
  rules,
  onCustomChange,
}) => {
  const classes = useStyles();
  return (
    <Grid item lg={size} md={size} sm={size} xs={size}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            size="small"
            label={label}
            fullWidth
            id="my-input"
            {...field}
            margin="none"
            error={error}
            helperText={error && error.message}
            disabled = {isDisabled} //default: value false
            {...inputProps}
            inputProps={inputProps}
            onChange={(e) => {
              const value = e.target.value;

              field.onChange(e);

              if (onCustomChange) {
                onCustomChange(value);
              }
            }}
          />
        )}
        defaultValue={defaultValue || ""}
        rules={{
          ...(required && {
            required: {
              value: true,
              message: `${label} is Required`,
            },
          }),
          ...rules,
        }}
      />
    </Grid>
  );
};
const SelectDisplay = ({
  name,
  label,
  defaultValue,
  control,
  size = 12,
  inputProps,
  required,
  error,
  rules,
  onCustomChange,
}) => {
  const classes = useStyles();
  return (
    <Grid item lg={size} md={size} sm={size} xs={size}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            select
            size="small"
            label={label}
            fullWidth
            id="my-input"
            {...field}
            margin="none"
            error={error}
            helperText={error && error.message}
            {...inputProps}
            onChange={(e) => {
              const value = e.target.value;

              field.onChange(e);

              if (onCustomChange) {
                onCustomChange(value);
              }
            }}
          >
            {pledgeWallet.map((option) => (
              <MenuItem key={option.fundName} value={option.fundName}>
                {option.fundName} {option.amount}
              </MenuItem>
            ))}
          </TextField>
        )}
        defaultValue={defaultValue || ""}
        rules={{
          ...(required && {
            required: {
              value: true,
              message: `${label} is Required`,
            },
          }),
          ...rules,
        }}
      />
    </Grid>
  );
};

const DateDisplay = ({
  name,
  label,
  defaultValue,
  control,
  size = 12,
  inputProps,
  required,
  error,
  rules,
}) => {
  const classes = useStyles();
  return (
    <Grid item lg={size} md={size} sm={size} xs={size}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Controller
          name={name}
          control={control}
          render={({ field }) => {
            return (
              <DateTimePicker
                inputFormat={DATEFORMAT}
                label={label}
                value={field.value}
                onChange={(value) => {
                  field.onChange(value);
                }}
                minDateTime={moment()}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    margin="none"
                    error={error}
                    fullWidth
                    helperText={error && error.message}
                    {...inputProps}
                    // value={moment(params.value).format(DATEFORMAT)}
                  />
                )}
              />
            );
          }}
          defaultValue={defaultValue || ""}
          rules={{
            ...(required && {
              required: {
                value: true,
                message: `${label} is Required`,
              },
            }),
            ...rules,
          }}
        />
      </LocalizationProvider>
    </Grid>
  );
};

export default CreateFundModal;

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiPaper-root": {
      borderRadius: theme.palette.radius.big,
      background: theme.palette.background.main,
    },
  },
  card: {
    border: `1px solid ${theme.palette.background.light}`,
  },
  disabled: {
    border: "1px solid white",
    color: "white",
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
