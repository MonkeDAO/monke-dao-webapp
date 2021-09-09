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
  LIGHT_YELLOW,
  TEXT_BROWN,
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
    backgroundColor: "#FFF",
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
        <Container maxWidth="sm" className={classes.introContainer}>
          <Typography
            variant="h4"
            align="center"
            className={classes.sectionTitle}
          >
            Roadmap
          </Typography>
          <Typography
            variant="h6"
            align="center"
            className={classes.sectionBody}
            component="p"
            gutterBottom
          >
            The MonkeDAO has only just begun. While we're climbing on treetops
            right now, Monkes on the Moon is where our journey will take us.
            Below is a roadmap outlining the milestones we have planned for the
            future of the DAO, including growth, monetization, investment and
            more.
          </Typography>
        </Container>
        <Container maxWidth="md" className={classes.timelineContainer}>
          <Timeline>
            {timelineCards.map((card, i) => {
              const isNotFirst = i !== 0;
              const isNotLast = i !== timelineCards.length - 1;
              const isActive = card.isActive;
              const previousIsActive =
                isNotFirst && timelineCards[i - 1].isActive;
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
                          previousIsActive
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
                      <img
                        src={
                          isActive
                            ? "/banana_timeline_icon.svg"
                            : "/banana_timeline_inactive_icon.svg"
                        }
                        alt="Banana icon"
                      />
                    </TimelineDot>
                    {isNotLast && (
                      <TimelineConnector
                        className={
                          isActive
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
