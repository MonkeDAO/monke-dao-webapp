import React from "react";
import Paper from "@material-ui/core/Paper";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { makeStyles } from "@material-ui/core/styles";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FFFFFF",
    },
    secondary: {
      main: "#000000",
      fontSize: "2rem",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  "@global": {},
  paper: {
    textAlign: "center",
    padding: "10px",
    color: "white",
    fontWeight: "600",
    fontSize: "1.25em",
    background: "linear-gradient(89.55deg, #71EA9E 0%, #7E3EB0 100%)",
    lineHeight: "42px",
  },
  icon: {
    paddingTop: "8px",
    transform: "scale(1.5)",
    "&:hover": {
      color: "black",
    },
  },
}));

export function Banner() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      {/* <Box
        sx={{
          p: 2,
          bgcolor: "background.default",
          display: "grid",
          gridTemplateColumns: { md: "1fr 1fr" },
          gap: 2,
        }}
      > */}{" "}
      <Paper variant="outlined" className={classes.paper}>
        We’re the first decentralized organisation to launch a validator node on
        Solana.
        <br />
        Stake with us and earn up to 7% APY on your SOL!{" "}
        <ArrowRightAltIcon
          className={classes.icon}
          onClick={(event) => (window.location.href = "http://google.com")}
        />
      </Paper>
    </ThemeProvider>
  );
}
