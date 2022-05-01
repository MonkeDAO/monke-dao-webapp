import React from "react";
import { Header } from "./components/Header";
import { Cards } from "./components/Cards";
import SmoothScroll from "smooth-scroll";
import "./App.css";

import { Container, Typography, useMediaQuery } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import { TEXT_BROWN } from "./constants/colors";
import clsx from "clsx";
import Validator from "./components/Validator";
import Footer from "./components/Footer";
import Roadmap from "./components/Roadmap";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const useStyles = makeStyles((theme) => ({
  "@global": {
    body: {
      minHeight: "100vh",
      position: "relative",
      paddingBottom: 247,
    },
  },
  bananasBackground: {
    backgroundColor:'#f3efcd',
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    width: "100%",
    height: "100%",
    zIndex: "-1",

    "&.small-bananas-background": {
      backgroundImage: "url('bananas-muted.svg')",
      backgroundSize: "cover",
    },
    "&.xs-bananas-background": {
      backgroundImage: "url('bananas-muted.svg')",
      backgroundSize: "contain",
    },
  },
  heroTitle: {
    color: '#184623',
    flexGrow: 1,
    fontWeight: "600",
    marginTop: 0,
    fontSize: 32,
    "&.sm": {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  heroContent: {
    fontFamily: "Space Grotesk",
    color: '#184623',
    marginTop: theme.spacing(2.5),
    padding: 0,
    fontSize: 18,
    "&.container": {
      marginTop: 0,
      paddingTop: theme.spacing(11),
    },
    "&.sm": {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  cardsContainer: {
    maxWidth: 1072,
    // maxWidth: 1040,
    width: "100%",
    margin: "0 auto",
    marginTop: 120,
    paddingBottom: 50,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

const theme = createTheme({
  typography: {
    fontFamily: ["Space Grotesk", "serif"].join(","),
  },
});

const App = () => {
  const classes = useStyles();
  const isSmScreenAndSmaller = useMediaQuery(theme.breakpoints.down("sm"));
  const isXsScreenAndSmaller = useMediaQuery(theme.breakpoints.down("xs"));
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <div
        className={
          isXsScreenAndSmaller
            ? clsx(classes.bananasBackground, "xs-bananas-background")
            : isSmScreenAndSmaller
            ? clsx(classes.bananasBackground, "small-bananas-background")
            : classes.bananasBackground
        }
      >
        <Container
          p={2}
          maxWidth="sm"
          component="main"
          className={clsx(classes.heroContent, "container")}
        >
          <Typography
            component="h1"
            variant="h4"
            align="center"
            className={clsx(classes.heroTitle, { sm: isXsScreenAndSmaller })}
            gutterBottom
          >
            MonkeDAO is a curated community of monkes
          </Typography>
          <Typography
            variant="h6"
            align="center"
            className={clsx(classes.heroContent, { sm: isXsScreenAndSmaller })}
            component="p"
            gutterBottom
          >
            Welcome to MonkeDAO, the first NFT DAO on Solana.
          </Typography>
          <Typography
            variant="h6"
            align="center"
            className={clsx(classes.heroContent, { sm: isXsScreenAndSmaller })}
            component="p"
            gutterBottom
          >
            We’re working to become the premier decentralized community of Web3, by providing unparalleled value to our members and the Solana ecosystem through community-led projects, connections and innovations.
          </Typography>
        </Container>

        <div className={classes.cardsContainer}>
          <Cards />
        </div>

        <Validator />
      </div>
      <Roadmap />
      <Footer />
    </ThemeProvider>
  );
};

export default App;
