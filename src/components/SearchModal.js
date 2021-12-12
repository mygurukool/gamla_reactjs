import * as React from "react";
import Box from "@mui/material/Box";
import {
  Card,
  CardContent,
  CardHeader,
  Paper,
  Popover,
  Popper,
  Typography,
  Grid,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { makeStyles, styled } from "@mui/styles";
import { alpha } from "@mui/material/styles";

import useSearch from "../hooks/useSearch";
import LoadingContainer from "./LoadingContainer";
import FundCard from "./FundCard";
import Scrollbars from "react-custom-scrollbars-2";
import { SEARCHPARAMS } from "../constants";

const useStyles = makeStyles((theme) => ({
  root: {},
  popper: {
    zIndex: 10,
    background: theme.palette.background.main,
    border: `1px solid ${theme.palette.background.light}`,
    borderRadius: theme.palette.radius.big,
    boxShadow: "10px 10px 30px -1px rgba(0,0,0,0.5)",
  },
  searchCard: {
    width: "70vw",
    minHeight: "50vh",
    maxHeight: "70vh",
    padding: theme.spacing(3),
    zIndex: 10,
    overflow: "hidden",
    // '& .MuiCardContent-root': {
    //   background: theme.palette.background.main,
    // }
  },
}));

export default function SimplePopper({ data: fundData, onFundClick }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const inputRef = React.useRef();

  const { query, setQuery, data, setData, isLoading } = useSearch({
    array: fundData,
    fields: SEARCHPARAMS,
    open: Boolean(anchorEl),
  });

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;
  const handleFundClick = (data) => {
    onFundClick(data);
    // navigation('/funddetail', { state: data })
  };
  return (
    <div>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search by amount, duration or currency"
          inputProps={{ "aria-label": "search", ref: inputRef }}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          // ref={inputRef}
          onFocus={handleClick}
          // onBlur={(e) => setAnchorEl()}
        />
      </Search>
      <Popper
        id={id}
        open={open}
        onMouseLeave={() => {
          console.log("input ref ", inputRef.current);
          inputRef.current && inputRef.current.blur();

          setAnchorEl();
        }}
        anchorEl={anchorEl}
        placement={"bottom-end"}
        className={classes.popper}
      >
        <Box className={classes.searchCard}>
          <Scrollbars
            style={{
              minHeight: "50vh",
              maxHeight: "70vh",
            }}
          >
            {isLoading ? (
              <LoadingContainer />
            ) : (
              <Grid container spacing={3}>
                {data.map((d, i) => {
                  return (
                    <Grid item lg={4} md={4} sm={6} xs={12} key={i}>
                      <FundCard onClick={() => handleFundClick(d)} {...d} />
                    </Grid>
                  );
                })}
              </Grid>
            )}
          </Scrollbars>
        </Box>
      </Popper>
    </div>
  );
}

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.palette.radius.medium,
  backgroundColor: alpha(theme.palette.background.light, 0.7),
  "&:hover": {
    backgroundColor: alpha(theme.palette.background.light, 1),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.primary.main,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "35ch",
      "&:focus": {
        width: "40ch",
      },
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      "&:focus": {
        width: "100%",
      },
    },
  },
}));
// import React from "react";
// import { makeStyles, styled } from "@mui/styles";
// import { alpha } from "@mui/material/styles";

// import { Popover, Popper, Typography } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import InputBase from "@mui/material/InputBase";

// const useStyles = makeStyles((theme) => ({
//   root: {},
// }));

// const Search = styled("div")(({ theme }) => ({
//   position: "relative",
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   "&:hover": {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginLeft: 0,
//   width: "100%",
//   [theme.breakpoints.up("sm")]: {
//     marginLeft: theme.spacing(1),
//     width: "auto",
//   },
// }));

// const SearchIconWrapper = styled("div")(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: "100%",
//   position: "absolute",
//   pointerEvents: "none",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: "inherit",
//   "& .MuiInputBase-input": {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create("width"),
//     width: "100%",
//     // [theme.breakpoints.up("sm")]: {
//     //   width: "30ch",
//     //   "&:focus": {
//     //     width: "40ch",
//     //   },
//     // },
//   },
// }));

// const SearchModal = (props) => {
//   const [anchorEl, setAnchorEl] = React.useState();

//   console.log("anchor", anchorEl);
//   const classes = useStyles();
//   return (
//     <>
//   <Search>
//     <SearchIconWrapper>
//       <SearchIcon />
//     </SearchIconWrapper>
//     <StyledInputBase
//       placeholder="Search by amount, duration or currency"
//       inputProps={{ "aria-label": "search" }}
//       onChange={(e) => {
//         !anchorEl && setAnchorEl(e.currentTarget);
//       }}
//       //   onFocus={(e) => !anchorEl && setAnchorEl(e.currentTarget)}
//       //   onBlur={(e) => anchorEl && setAnchorEl()}
//     />
//   </Search>
//       <Popover
//         open={Boolean(anchorEl)}
//         anchorEl={anchorEl}
//         anchorOrigin={{
//           vertical: "bottom",
//           horizontal: "left",
//         }}
//       >
//         <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
//       </Popover>
//     </>
//   );
// };

// export default SearchModal;
