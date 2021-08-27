import React from "react";
import { Header } from './components/Header';
import { Cards } from './components/Cards';
import SmoothScroll from "smooth-scroll";
import "./App.css";

import { Container, Typography } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const useStyles = makeStyles((theme) => ({
  '@global': {
    body: {
      backgroundColor: '#FEF6D8',
      // background: '#FEF6D8 url(\'/banana-tp-rs.png\') right repeat'
    },
  },
  heroTitle: {
    color: '#875811',
    flexGrow: 1,
    fontWeight: '400',
  },
  heroContent: {
    color: '#875811',
  },
}));

const App = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <Container p={2} maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography component="h1" variant="h2" align="center" className={classes.heroTitle} gutterBottom>
          MonkeDAO is a curated community of monkes        
        </Typography>
        <Typography variant="h5" align="center" className={classes.heroContent} component="p" gutterBottom>
            Within the community, everyone is family. We share alpha, jokes, bullshit like there's no tomorrow but have zero tolerance for hatred. We welcome you to the MonkeDAO family!
        </Typography>
        <Typography variant="h5" align="center" className={classes.heroContent} component="p">
            We welcome you to the MonkeDAO family!
        </Typography>
      </Container>
      <br />
      <br />
      <br />
      <br />
      <Cards/>
    </React.Fragment>
  );
};

export default App