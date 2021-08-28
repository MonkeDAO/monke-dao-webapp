import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

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
  toolbar: {
    flexWrap: "wrap",
    maxWidth: 1040,
    height: "100%",
    width: "100%",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
  },
  toolbarTitle: {
    padding: `10px`,
    flexGrow: 1,
  },
  emoji: {
    fontSize: "20px",
  },
}));

export function Header() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="sticky"
        color="default"
        elevation={0}
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <span role="img" aria-label="monkey" className={classes.emoji}>
            🐵
          </span>{" "}
          <Typography
            variant="h5"
            color="inherit"
            noWrap
            className={classes.toolbarTitle}
          >
            MonkeDAO
          </Typography>
          <Box mr={2}>
            <Button
              href="#"
              color="secondary"
              variant="contained"
              className={classes.link}
            >
              Join us
            </Button>
          </Box>
          <Box>
            <Button
              href="#"
              color="primary"
              variant="contained"
              className={classes.link}
            >
              @monkeDAO
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}
