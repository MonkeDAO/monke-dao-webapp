import React from "react";
import {
  Box,
  Container,
  createTheme,
  makeStyles,
  ThemeProvider,
  Typography,
  Paper,
  useMediaQuery,
} from "@material-ui/core";
import {
  BANANA_ICON_YELLOW,
  BUTTON_YELLOW,
  LIGHT_GREY,
  TEXT_GREY,
  TWITTER_BLUE,
} from "../constants/colors";

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
    fontFamily: ["Space Grotesk", "serif"].join(","),
    fontSize: 24,
    fontWeight: 600,
    color: TEXT_GREY,
    textAlign: "left",
    "&.active": {
      color: "#184623",
    },
  },
  cardBody: {
    fontFamily: "Space Grotesk",
    fontSize: 18,
    textAlign: "left",
    color: TEXT_GREY,
    marginTop: theme.spacing(2),
    "&.active": {
      color: "#000000",
    },
  },
  connector: {
    backgroundColor: "#ffc919",
    "&.active": {
      backgroundColor: BANANA_ICON_YELLOW,
    },
  },
  dot: {
    backgroundColor: "#ffc919",
    width: 24,
    height: 24,
    boxShadow: "none",
    marginBottom: 0,
    marginTop: 0,
    "&.active": {
      backgroundColor: '"#ffc919',
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
      backgroundColor: 'white',
    },
  },
  sectionTitle: {
    color: '#184623',
    fontSize: 32,
    fontWeight: "600",
    fontFamily: ["Space Grotesk", "serif"].join(","),
  },
  sectionBody: {
    fontSize: 18,
    fontFamily: "Space Grotesk",
    marginTop: theme.spacing(2.5),
  },
  timelineContainer: {
    paddingBottom: theme.spacing(10),
  },
  root: {
    backgroundColor: "#f3efcd",
    width: "100%",
  },
  verticallyCenterContent: {
    display: "none",
  },
}));

export default function Roadmap(props) {
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
      emoji: "🏦",
      emojiAria: "bank",
      title: "Create DAO Treasury",
      body: "",
      isActive: true,
    },
    {
      emoji: "⚖️",
      emojiAria: "law",
      title: "Hold Elections for First Monke Board",
      body: "",
      isActive: true,
    },
    {
      emoji: "⛓",
      emojiAria: "validator",
      title: "Launch Solana Validator Node",
      body: "",
      isActive: true,
    },
    {
      emoji: "🙊",
      emojiAria: "monkey",
      title: "Purchase and Fractionalize SMB Mascot",
      body: "",
      isActive: true,
    },
    {
      emoji: "💧",
      emojiAria: "droplet",
      title: "Launch Solana Community Staking Pool",
      body: "",
      isActive: true,
    },
    {
      emoji: "🗃",
      emojiAria: "card file box",
      title: "Incorporate MonkeDAO",
      body: "",
      isActive: false,
    },
    {
      emoji: "💎",
      emojiAria: "gem stone",
      title: "Launch Monkeverse 3D Metaverse ready avatars",
      body: "",
      isActive: false,
    },
    {
      emoji: "🐒",
      emojiAria: "monkey",
      title: "Launch Monkeverse NFTs with ecosystem functionality",
      body: "",
      isActive: false,
    },
    {
      emoji: "💲",
      emojiAria: "dollar",
      title: "Launch $MONKE Token",
      body: "",
      isActive: false,
    },
    {
      emoji: "🏛",
      emojiAria: "building",
      title: "Launch MonkeDAO Capital",
      body: "",
      isActive: false,
    },
  ];
  return (
    <ThemeProvider theme={theme}>
      <Box className={classes.root}>
        <Container maxWidth="sm" className={classes.introContainer}>
          <Typography
            variant="h4"
            align="center"
            className={classes.sectionTitle}
          >
            Roadmap
          </Typography>
          {/* <Typography
            variant="h6"
            align="center"
            className={classes.sectionBody}
            component="p"
            gutterBottom
          >
            We’ve set up some goalposts for ourselves. Once we hit a target sell through percentage, we will begin to work on realizing the stated goal.
          </Typography> */}
        </Container>
        <Container maxWidth="md" className={classes.timelineContainer}>
          <Timeline>
            {timelineCards.map((card, i) => {
              const isNotFirst = i !== 0;
              const isNotLast = i !== timelineCards.length - 1;
              const isActive = card.isActive;
              const nextIsActive = isNotLast && timelineCards[i + 1].isActive;
              return (
                <TimelineItem key={i}>
                  <TimelineOppositeContent
                    className={classes.verticallyCenterContent}
                    align="right"
                    variant="body2"
                    color="textSecondary"
                  ></TimelineOppositeContent>
                  <TimelineSeparator>
                    {isNotFirst && (
                      <TimelineConnector
                        className={
                          isActive
                            ? clsx(classes.connector, "active")
                            : classes.connector
                        }
                      />
                    )}
                    <TimelineDot
                      className={
                        !isNotFirst
                          ? clsx(classes.dot, "first", "active")
                          : !isNotLast
                          ? isActive
                            ? clsx(classes.dot, "last", "active")
                            : clsx(classes.dot, "last")
                          : isActive
                          ? clsx(classes.dot, "active")
                          : classes.dot
                      }
                    >
                    </TimelineDot>
                    {isNotLast && (
                      <TimelineConnector
                        className={
                          nextIsActive
                            ? clsx(classes.connector, "active")
                            : classes.connector
                        }
                      />
                    )}
                  </TimelineSeparator>
                  <TimelineContent
                    className={
                      isXsScreenAndSmaller
                        ? clsx(classes.card, "extra-small")
                        : isSmScreenAndSmaller
                        ? clsx(classes.card, "small")
                        : classes.card
                    }
                  >
                    <Paper
                      elevation={0}
                      className={
                        isActive ? clsx(classes.paper, "active") : classes.paper
                      }
                    >
                      <Typography
                        variant="h6"
                        component="h3"
                        className={
                          isActive
                            ? clsx(classes.cardTitle, "active")
                            : classes.cardTitle
                        }
                      >
                        {
                          <span role="img" aria-label={card.emojiAria}>
                            {card.emoji}
                          </span>
                        }{" "}
                        {card.title}
                      </Typography>
                      {!!card.body && (
                        <Typography
                          className={
                            isActive
                              ? clsx(classes.cardBody, "active")
                              : classes.cardBody
                          }
                        >
                          {card.body}
                        </Typography>
                      )}
                    </Paper>
                  </TimelineContent>
                </TimelineItem>
              );
            })}
          </Timeline>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
