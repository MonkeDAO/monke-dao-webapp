import React from "react";
import { Header } from "./components/Header";
import { Cards } from "./components/Cards";
import SmoothScroll from "smooth-scroll";
import "./App.css";

import { Container, Typography } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import { TEXT_BROWN } from "./constants/colors";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const useStyles = makeStyles((theme) => ({
  "@global": {
    body: {
      backgroundColor: "#FEF6D8",
      // background: '#FEF6D8 url(\'/banana-tp-rs.png\') right repeat'
    },
  },
  heroTitle: {
    color: TEXT_BROWN,
    flexGrow: 1,
    fontWeight: "600",
  },
  heroContent: {
    color: TEXT_BROWN,
    fontFamily: "Open Sans",
    marginTop: theme.spacing(2.5),
  },
}));

const theme = createTheme({
  typography: {
    fontFamily: ["Poppins", "Open Sans", "serif"].join(","),
  },
});

const App = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Container
          p={2}
          maxWidth="sm"
          component="main"
          className={classes.heroContent}
        >
          <Typography
            component="h1"
            variant="h4"
            align="center"
            className={classes.heroTitle}
            gutterBottom
          >
            MonkeDAO is a curated community of monkes
          </Typography>
          <Typography
            variant="h6"
            align="center"
            className={classes.heroContent}
            component="p"
            gutterBottom
          >
            Within the community, everyone is family. We share alpha, jokes,
            bullshit like there's no tomorrow but have zero tolerance for
            hatred.
          </Typography>
          <Typography
            variant="h6"
            align="center"
            className={classes.heroContent}
            component="p"
          >
            We welcome you to the MonkeDAO family!
          </Typography>
        </Container>
        <br />
        <br />
        <br />
        <br />
        <Cards />
      </ThemeProvider>
    </React.Fragment>
  );
};

export default App;
