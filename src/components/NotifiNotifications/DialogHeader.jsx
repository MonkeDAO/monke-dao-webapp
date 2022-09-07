import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton, makeStyles  } from '@material-ui/core';
import TuneIcon from '@mui/icons-material/Tune';

const useStyles = makeStyles(() => ({
  titleText: {
      display: "inline-block",
      width: "100%",
      textAlign: "center",
      backgroundColor: "#498D5E",
      color: "#ffffff",
      borderRadius: `15px 15px 0 0`,
  },
  arrowButton: {
      position: "absolute",
      left: "16px",
      marginTop: "-8px",
      float: "left",
  },
  closeButton: {
      position: "absolute",
      right: "16px",
      float: "right",
  },
  settingsButton: {
    color: "#F2EFD0"
},
}));

export default function DialogHeader({onBackClick, onClickClose, hasNoData, isAlerts}) {
    const classes = useStyles();

    return (
      <DialogTitle className={classes.titleText}>
        <IconButton
          className={classes.arrowButton}
          onClick={onBackClick}
          color="primary"
          aria-label="back-to-notification-selection"
        >
          <ArrowBackIcon />
        </IconButton>
        {setTitle(hasNoData, isAlerts)}
        <IconButton
          className={classes.closeButton}
          size="small"
          onClick={onClickClose}
        >
          {isAlerts ? <TuneIcon className={classes.settingsButton} /> : <img alt="close" src="/x.svg" />}
        </IconButton>
      </DialogTitle>
  )};


  function setTitle(hasNoData, isAlerts) {

    if (isAlerts) {
     return 'Announcements';
    } else if (hasNoData) {
     return 'Get announcement notifications'
    } else return 'Notification settings'
  }
