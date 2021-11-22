import React from "react";
import {
  Grid,
  GridItem,
  Item,
  Container,
  createTheme,
  makeStyles,
  ThemeProvider,
  Typography,
  Box,
  useMediaQuery,
} from "@material-ui/core";
import {
  BANANA_ICON_YELLOW,
  BUTTON_YELLOW,
  LIGHT_GREY,
  LIGHT_YELLOW,
  TEXT_BROWN,
  TEXT_GREY,
  TWITTER_BLUE,
} from "../constants/colors";
import Faq from './Faq';
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import clsx from "clsx";
import { TimelineOppositeContent } from "@material-ui/lab";

const theme = createTheme({
  palette: {
    primary: {
      main: TWITTER_BLUE,
    },
    secondary: {
      main: BUTTON_YELLOW,
    },
  },
});

const useStyles = makeStyles((theme) => ({
  card: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
    "&.small": {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    "&.extra-small": {
      paddingLeft: theme.spacing(2),
      paddingRight: 0,
    },
  },
  cardTitle: {
    fontFamily: ["Poppins", "Open Sans", "serif"].join(","),
    fontSize: 24,
    fontWeight: 600,
    color: TEXT_GREY,
    textAlign: "left",
    "&.active": {
      color: TEXT_BROWN,
    },
  },
  cardBody: {
    fontFamily: "Open Sans",
    fontSize: 18,
    textAlign: "left",
    color: TEXT_GREY,
    marginTop: theme.spacing(2),
    "&.active": {
      color: TEXT_BROWN,
    },
  },
  connector: {
    backgroundColor: "#DDD",
    "&.active": {
      backgroundColor: BANANA_ICON_YELLOW,
    },
  },
  dot: {
    backgroundColor: "#DDD",
    "&.active": {
      backgroundColor: BANANA_ICON_YELLOW,
    },
    "&.first": {
      marginTop: theme.spacing(5),
    },
    "&.last": {
      marginBottom: theme.spacing(8),
    },
  },
  introContainer: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(5),
  },
  paper: {
    padding: theme.spacing(3),
    backgroundColor: LIGHT_GREY,
    "&.active": {
      backgroundColor: LIGHT_YELLOW,
    },
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: "600",
  },
  sectionBody: {
    fontSize: 18,
    fontFamily: "Open Sans",
    marginTop: theme.spacing(2.5),
  },
  timelineContainer: {
    paddingBottom: theme.spacing(10),
  },
  root: {
    backgroundColor: "#000000",
    width: "100%",
    color: "white",
    paddingTop: "100px",
  },
  verticallyCenterContent: {
    display: "none",
  },
  validatorImg: {
    width: "60%",
  },
  stakingImg: {
    width: "100%",
  },
  title: {
    fontSize: "3.25em",
  },
  info: {
    fontSize: "1.25em",
  },
}));

export default function Validator(props) {
  const classes = useStyles();
  const isSmScreenAndSmaller = useMediaQuery(theme.breakpoints.down("sm"));
  const isXsScreenAndSmaller = useMediaQuery(theme.breakpoints.down("xs"));

  const timelineCards = [
    {
      emoji: "🎉",
      emojiAria: "celebration",
      title: "Launch MonkeDAO",
      body: "",
      isActive: true,
    },
    {
      emoji: "🤝",
      emojiAria: "handshake",
      title: "Community Building",
      body: "",
      isActive: true,
    },
    {
      emoji: "🏦",
      emojiAria: "bank",
      title: "Launch DAO Treasury",
      body: "",
      isActive: false,
    },
    {
      emoji: "✈️",
      emojiAria: "airplane",
      title: "Airdrop MonkeDAO Commemorative Tokens",
      body: "We will take a snapshot of all verified monkes and airdrop a unique NFT, created by our talented in-house designers.",
      isActive: false,
    },
    {
      emoji: "🐒️",
      emojiAria: "monkey",
      title: "Launch Monke Pet",
      body: "A unique NFT collection that provide benefits when held in the same wallet as a Gen2 Monke.",
      isActive: false,
    },
    {
      emoji: "⚖️",
      emojiAria: "law",
      title: "Introduction of DAO Governance Mechanism",
      body: "",
      isActive: false,
    },
    {
      emoji: "👕",
      emojiAria: "shirt",
      title: "Monke Merchandise",
      body: "",
      isActive: false,
    },
    {
      emoji: "📊",
      emojiAria: "bar-chart",
      title: "Launch MonkeTools",
      body: "A series of useful tools that will automate essential processes for anyone interacting with the Solana ecosystem.",
      isActive: false,
    },
    {
      emoji: "🏘",
      emojiAria: "houses",
      title: "Launch MonkeDAO Village",
      body: "More TBA.",
      isActive: false,
    },
    {
      emoji: "🙊",
      emojiAria: "monkey",
      title: "Fractionalization of selected Monkes to increase ownership",
      body: "More TBA.",
      isActive: false,
    },

    {
      emoji: "📈",
      emojiAria: "line-graph",
      title: "Launch MonkeDAO Capital",
      body: "More TBA.",
      isActive: false,
    },
  ];
  return (
    <ThemeProvider theme={theme}>
      <Box className={classes.root}>
      <Grid
        container
        className={classes.root}
        alignItems="center"
        justifyContent="center"
        direction="row"
      >
        <Grid item xs={3} align="center">
          <img
            alt="validator"
            src="validator-circle.png"
            className={classes.validatorImg}
          />
        </Grid>
        <Grid item xs={3} align="left">
          <h1 className={classes.title}>Our Validator</h1>
          <p className={classes.info}>
            It's official, we're now the first DAO to operate a node on the
            Solana blockchain! We set out to generate value for our members and
            the Solana community as a whole while being stewards of the Solana
            ecosystem. We're hitting our stride and this is just the beginning.
          </p>
          <p className={classes.info}>
            Staking for this pool is open to everyone! Commission rates help
            fund the MonkeDAO and all its initiatives which aim to push the
            Solana ecosystem forward.
          </p>
        </Grid>
      </Grid>
      <Grid
        container
        className={classes.root}
        alignItems="center"
        justifyContent="center"
        direction="row"
      >
        <Grid item xs={3} align="center">
          <h1 className={classes.title}>How to stake with MonkeDAO</h1>
          <p className={classes.info}>Any questions? Try our Staking FAQ.</p>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={6}
        className={classes.root}
        alignItems="center"
        justifyContent="center"
        direction="row"
      >
        <Grid item xs={4} align="center">
          <img
            alt="staking"
            src="staking1.png"
            className={classes.stakingImg}
          />
        </Grid>
        <Grid item xs={4} align="center">
          <img
            alt="staking"
            src="staking2.png"
            className={classes.stakingImg}
          />
        </Grid>
      </Grid>
      <Grid
        container
        spacing={6}
        className={classes.root}
        alignItems="center"
        justifyContent="center"
        direction="row"
      >
        <Grid item xs={4} align="center">
          <img
            alt="staking"
            src="staking1.png"
            className={classes.stakingImg}
          />
        </Grid>
        <Grid item xs={4} align="center">
          <img
            alt="staking"
            src="staking2.png"
            className={classes.stakingImg}
          />
        </Grid>
      </Grid>
      <Grid
        container
        className={classes.root}
        alignItems="center"
        justifyContent="center"
        direction="row"
      >
        <Grid item xs={6} align="center">
          <h1 className={classes.title}>Staking FAQ</h1>
          <Faq />
        </Grid>
      </Grid>
      </Box>
    </ThemeProvider>
  );
}
