import React from "react";
import {
  Box,
  Button,
  Container,
  createTheme,
  makeStyles,
  ThemeProvider,
  Typography,
  Paper,
  Grid,
} from "@material-ui/core";
import yellow from "@material-ui/core/colors/yellow";
import { BUTTON_YELLOW, TWITTER_BLUE } from "../constants/colors";

import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";

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
  roadmap: {
    backgroundColor: "white",
    bottom: 0,
    left: 0,
    right: 0,
    maxWidth: "100%",
  },
  roadmapContent: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(12),
  },
  yellowPaper: {
    backgroundColor: yellow[300],
  },
  roadmapText: {
    color: "black",
    textAlign: "center",
    fontFamily: "Open Sans",
    fontSize: 18,
    paddingBottom: 50,
    maxWidth: 530,
    margin: "0 auto",
    marginTop: theme.spacing(3),
  },
  root: {
    flexGrow: 1,
    overflow: "hidden",
    padding: theme.spacing(0, 3),
  },
  paper: {
    maxWidth: 800,
    backgroundColor: "#FEF6D8",
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(6),
    textAlign: "left",
    marginBottom: 50,
  },
  inActivePaper: {
    maxWidth: 800,
    backgroundColor: "#d3d3d3",
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(6),
    textAlign: "left",
    marginBottom: 50,
  },
  cardTitle: {
    fontFamily: ["Poppins", "Open Sans", "serif"].join(","),
    fontSize: 24,
    fontWeight: 600,
    color: "#875811",
    textAlign: "left",
  },
  cardText: {
    color: "#875811",
    fontFamily: "Open Sans",
    fontSize: 18,
    textAlign: "left",
  },
  inActiveCardTitle: {
    fontFamily: ["Poppins", "Open Sans", "serif"].join(","),
    color: "gray",
    textAlign: "left",
  },
  roadmapHeader: {
    fontFamily: ["Poppins", "Open Sans", "serif"].join(","),
    fontWeight: 600,
    fontSize: 32,
  },
  root: {
    maxWidth: 1090,
    margin: "0 auto",
  },
  timelineDot: {
    backgroundColor: "#FAC300",
  },
  timelineSeperator: {
    marginTop: 100,
    marginBottom: -100,
  },
  timelineConnector: {
    backgroundColor: "#FAC300",
  },
}));

function TimelineCard({ active }) {
  const classes = useStyles();
  return (
    <Paper className={active === true ? classes.paper : classes.inActivePaper}>
      <Grid container wrap="nowrap" spacing={4}>
        <Grid item></Grid>
        <Grid item xs zeroMinWidth>
          <Typography
            component="h1"
            variant="h4"
            align="center"
            className={
              active === true ? classes.cardTitle : classes.inActiveCardTitle
            }
            gutterBottom
          >
            Roadmap Item Example Heading
          </Typography>
          <Typography
            className={
              active === true ? classes.cardText : classes.inActiveCardTitle
            }
          >
            This is all copy pasted placeholder text. We’ve set up some
            goalposts for ourselves. Once we hit a target sell through
            percentage, we will begin to work on realizing the stated goal.
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default function Roadmap(props) {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <Container className={classes.roadmap}>
        <Box className={classes.roadmapContent}>
          <div className={classes.root}>
            <Timeline>
              <TimelineItem>
                <BananaTimeline />
                <TimelineOppositeContent style={{ flex: 0.1, width: 0 }} />
                <TimelineContent>
                  <TimelineCard active />
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <BananaTimeline />
                <TimelineOppositeContent style={{ flex: 0.1, width: 0 }} />
                <TimelineContent>
                  <TimelineCard active />
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <BananaTimeline />
                <TimelineOppositeContent style={{ flex: 0.1, width: 0 }} />
                <TimelineContent>
                  {" "}
                  <TimelineCard />
                </TimelineContent>
              </TimelineItem>
            </Timeline>
          </div>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

function BananaTimelineIcon() {
  return (
    <TimelineDot color="secondary">
      <img src="/banana_timeline_icon.svg" />
    </TimelineDot>
  );
}

function BananaTimeline({ children }) {
  const classes = useStyles();

  return (
    <TimelineSeparator className={classes.timelineSeperator}>
      <BananaTimelineIcon />
      <TimelineConnector className={classes.timelineConnector} />
    </TimelineSeparator>
  );
}
