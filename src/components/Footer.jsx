import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import { Container, Typography } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
  },
});

const buttonTheme = createTheme({
  palette: {
    primary: {
      main: "#FAC300",
    },
    secondary: {
      main: "#2A90E8",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: "auto",
    bottom: 0,
  },
  toolbar: {
    flexWrap: "wrap",
    maxWidth: 1040,
    display: "flex",
    justifyContent: "center",
    padding: 0,
  },
  disclaimer: {
    fontFamily: ["Poppins", "Open Sans", "serif"].join(","),
    margin: "0 auto",
    maxWidth: 700,
    marginBottom: 75,
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
    marginLeft: 5,
  },
  discordLink: {
    width: 116,
    marginRight: 5,
  },
}));

export function Footer() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="fixed" color="primary" className={classes.appBar}>
          <Container maxWidth="lg" component="div" align="center">
            <Toolbar className={classes.tool}>
              <ThemeProvider theme={buttonTheme}>
                <Grid
                  id="top-row"
                  container
                  alignItems="center"
                  justifyContent="center"
                >
                  <Grid item>
                    <Button
                      href="https://discord.gg/TscZwJ7jbX"
                      color="primary"
                      variant="contained"
                      className={[classes.link, classes.discordLink].join(" ")}
                    >
                      Join us
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      href="https://twitter.com/MonkeDAO"
                      color="secondary"
                      variant="contained"
                      className={[classes.link, classes.twitterLink].join(" ")}
                    >
                      <img
                        alt="Twitter logo"
                        src="/twitter.svg"
                        className={classes.twitterLogo}
                      />
                      @MonkeDAO
                    </Button>
                  </Grid>
                </Grid>
              </ThemeProvider>
            </Toolbar>
          </Container>
          <Typography
            variant="body1"
            align="center"
            className={classes.disclaimer}
            component="p"
            gutterBottom
          >
            MonkeDAO is a community-run initiative, and is not directly
            affiliated nor under the management of Solana Monkey Business
          </Typography>
        </AppBar>
      </ThemeProvider>
    </React.Fragment>
  );
}
