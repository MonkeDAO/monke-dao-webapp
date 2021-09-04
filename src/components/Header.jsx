import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { useMediaQuery } from "@material-ui/core";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2A90E8",
    },
    secondary: {
      main: "#000000",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  "@global": {},
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: "white",
    height: 86,
  },
  logo: {
    width: "35%",
    paddingTop: "24px",
    paddingBottom: "24px",
    minWidth: 168,
  },
  toolbar: {
    // flexWrap: "wrap",
    maxWidth: 1072,
    // maxWidth: 1040,
    height: "100%",
    width: "100%",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    // padding: 0,
    padding: `0 ${theme.spacing(2)}`,
  },
  toolbarTitle: {
    padding: `10px`,
    flexGrow: 1,
    fontFamily: ["Poppins", "Open Sans", "serif"].join(","),
    fontWeight: "600",
    fontSize: 18,
  },
  emoji: {
    fontSize: "32px",
    "&.small": {
      fontSize: 38,
    },
  },
  link: {
    textTransform: "none",
    fontFamily: "Open Sans",
    fontWeight: "600",
    fontSize: 16,
    boxShadow: "none",
    borderRadius: 8,
    height: 38,
  },
  twitterLogo: {
    marginRight: 8,
  },
  twitterLink: {
    width: 164,
  },
  twitterLinkSmall: {
    width: 40,
    minWidth: 40,
  },
  discordLink: {
    width: 116,
  },
}));

export function Header() {
  const classes = useStyles();
  const isXsScreenAndSmaller = useMediaQuery(theme.breakpoints.down("xs"));
  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="sticky"
        color="default"
        elevation={0}
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <span>
            <img
              alt="MonkeDao logo"
              src="/MonkeDAO_Logo_Positive.png"
              className={classes.logo}
            />
          </span>
          <Box mr={2} height={38}>
            <Button
              href="https://discord.gg/TscZwJ7jbX"
              color="secondary"
              variant="contained"
              className={
                isXsScreenAndSmaller
                  ? classes.link
                  : [classes.link, classes.discordLink].join(" ")
              }
            >
              {isXsScreenAndSmaller ? "Join" : "Join us"}
            </Button>
          </Box>
          <Box height={38}>
            <Button
              href="https://twitter.com/MonkeDAO"
              color="primary"
              variant="contained"
              className={[
                classes.link,
                isXsScreenAndSmaller
                  ? classes.twitterLinkSmall
                  : classes.twitterLink,
              ].join(" ")}
            >
              <img
                alt="Twitter logo"
                src="/twitter.svg"
                className={!isXsScreenAndSmaller && classes.twitterLogo}
              />
              {!isXsScreenAndSmaller && "@MonkeDAO"}
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}
