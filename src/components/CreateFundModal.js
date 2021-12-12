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
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import CloseIcon from "@mui/icons-material/Close";
import { CURRENCY, DATEFORMAT } from "../constants";
import { makeStyles } from "@mui/styles";
import { useForm, Controller } from "react-hook-form";
import { LocalizationProvider } from "@mui/lab";
import AdapterMoment from "@date-io/moment";
import moment from "moment";

const CreateFundModal = ({ open, onClose, data, onSubmit }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm({});

  const classes = useStyles();

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <InputDisplay
              label="Fund Name"
              control={control}
              name="name"
              error={errors["name"]}
              required={true}
              inputProps={{ margin: "dense" }}
            />
            <InputDisplay
              label="Number of Participants"
              control={control}
              name="requiredNbOfParticipants"
              required={true}
              error={errors["requiredNbOfParticipants"]}
              inputProps={{
                type: "number",
              }}
            />
            <InputDisplay
              label="Amount"
              control={control}
              name="recurringAmount"
              error={errors["recurringAmount"]}
              required={true}
              inputProps={{
                type: "number",
              }}
            />
            <DateDisplay
              label="Start Date"
              control={control}
              name="startDate"
              error={errors["startDate"]}
              required={true}
            />

            <InputDisplay
              label="Duration in months"
              control={control}
              name="duration"
              error={errors["duration"]}
              required={true}
              inputProps={{
                type: "number",
              }}
            />

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
  rules,
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
            {...inputProps}
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
              <MobileDatePicker
                inputFormat={DATEFORMAT}
                label={label}
                value={field.value}
                onChange={(value) => {
                  field.onChange(value);
                }}
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
