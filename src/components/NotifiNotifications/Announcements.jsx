import React from "react";
import { Box, makeStyles, Typography, Paper } from "@material-ui/core";
import { format, parseISO } from 'date-fns';

import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import DialogHeader from './DialogHeader';
import clsx from "clsx";

import {
  BANANA_ICON_YELLOW,
  DARK_GREEN,
  LIGHT_GREY,
  TEXT_GREY,
} from "../../constants/colors";

const useStyles = makeStyles((theme) => ({
  verticallyCenterContent: {
    display: "none",
  },
  date: {
   fontSize: 15,
  },
  connector: {
    backgroundColor: "#ffc919",
    "&.active": {
      backgroundColor: BANANA_ICON_YELLOW,
    },
  },
  paper: {
    padding: '15px 20px',
    backgroundColor: LIGHT_GREY,
    "&.active": {
      backgroundColor: "white",
    },
    color: DARK_GREEN,

  },
  cardBody: {
    fontFamily: "Space Grotesk",
    fontSize: 18,
    textAlign: "left",
    color: TEXT_GREY,
    "&.active": {
      color: "#000000",
    },
  },
  sectionBody: {
    marginTop: '0px',
    padding: '16px',
    maxHeight: '360px',
    overflowY: 'auto'
  },
  titleSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  }
}));

export default function Announcements({timelineCards, handleBackToSelection, setAlertsShow, onClickClose, hasNoData, isAlerts}) {
    const classes = useStyles();

    const onAnnouncementsBackClick = () => setAlertsShow(false);

    return (
    <>
    <DialogHeader onBackClick={handleBackToSelection} onClickClose={onAnnouncementsBackClick} hasNoData={hasNoData} isAlerts={isAlerts} />
    <Timeline className={classes.sectionBody}>
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
            <TimelineContent>
              <Paper
                elevation={0}
                className={
                  isActive ? clsx(classes.paper, "active") : classes.paper
                }
              >
                <Box className={classes.titleSection}>
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
                <Typography
                  variant="h6"
                  component="h3"
                  className={classes.date}
                >
                  {formatDateTime(card.date)}
                </Typography>
                </Box>
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
    </>
    )
}

export const formatDateTime = (utcDate) => {
    const parsedDate = parseISO(utcDate);
    const month = parsedDate.toLocaleString('default', { month: 'long' });
    const day = format(parsedDate, 'd');
    return `${month} ${day}`;
  };
