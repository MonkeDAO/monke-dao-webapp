import React, { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {
  Box,
  Container,
  createTheme,
  makeStyles,
  ThemeProvider,
  Typography,
  Paper,
  useMediaQuery,
} from '@material-ui/core';
import {
  BANANA_ICON_YELLOW,
  BUTTON_YELLOW,
  LIGHT_GREY,
  TEXT_GREY,
  TWITTER_BLUE,
} from '../constants/colors';

import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import clsx from 'clsx';
import { TimelineOppositeContent } from '@material-ui/lab';
import { WalletMultiButton } from '@solana/wallet-adapter-material-ui';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { getCreatorAnnouncements } from '../utils/notif';
import {
  BlockchainEnvironment,
  useNotifiClient,
} from '@notifi-network/notifi-react-hooks';
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
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: '#f3efcd',
    height: 86,
    '&.sm': {
      height: 'auto',
    },
  },
  logo: {
    width: 168,
  },
  titleContainer: {
    flexGrow: 1,
    '&.sm': {
      marginTop: 26,
    },
  },
  intro: {
    background: 'linear-gradient(to right, #ffc919, #184623)',
    padding: '2px 0 2px 0',
    textAlign: 'center',
    fontSize: '16px',
    color: '#f3efcd',
    width: '100%',
    lineHeight: '2em',
    fontFamily: ['Space Grotesk', 'serif'].join(','),
  },
  toolbar: {
    // flexWrap: "wrap",
    maxWidth: 1072,
    // maxWidth: 1040,
    height: '100%',
    width: '100%',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    // padding: 0,
    padding: `0 ${theme.spacing(2)}`,
    '&.sm': {
      display: 'block',
      textAlign: 'center',
      height: 'auto',
    },
  },
  social: {
    height: 38,
    '&.sm': {
      display: 'inline-block',
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(3),
    },
  },
  discord: {
    marginRight: theme.spacing(2),
  },
  toolbarTitle: {
    padding: `10px`,
    flexGrow: 1,
    fontFamily: ['Space Grotesk', 'Open Sans', 'sans-serif'].join(','),
    fontWeight: '600',
    fontSize: 18,
  },
  emoji: {
    fontSize: '32px',
    '&.small': {
      fontSize: 38,
    },
  },
  link: {
    textTransform: 'none',
    fontFamily: 'Space Grotesk',
    fontWeight: '600',
    fontSize: 16,
    boxShadow: 'none',
    borderRadius: 8,
    height: 38,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    padding: '8px 16px',
  },
  stakeLink: {
    color: 'white',
  },
  buttonLogo: {
    marginRight: 8,
  },
  plusLogo: {
    marginRight: 8,
    width: '15%',
    filter: 'invert(1)',
  },
  card: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
    '&.small': {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    '&.extra-small': {
      paddingLeft: theme.spacing(2),
      paddingRight: 0,
    },
  },
  cardTitle: {
    fontFamily: ['Space Grotesk', 'serif'].join(','),
    fontSize: 24,
    fontWeight: 600,
    color: TEXT_GREY,
    textAlign: 'left',
    '&.active': {
      color: '#184623',
    },
  },
  cardBody: {
    fontFamily: 'Space Grotesk',
    fontSize: 18,
    textAlign: 'left',
    color: TEXT_GREY,
    marginTop: theme.spacing(2),
    '&.active': {
      color: '#000000',
    },
  },
  connector: {
    backgroundColor: '#ffc919',
    '&.active': {
      backgroundColor: BANANA_ICON_YELLOW,
    },
  },
  dot: {
    backgroundColor: '#ffc919',
    width: 24,
    height: 24,
    boxShadow: 'none',
    marginBottom: 0,
    marginTop: 0,
    '&.active': {
      backgroundColor: '"#ffc919',
    },
    '&.first': {
      marginTop: theme.spacing(5),
    },
    '&.last': {
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
    '&.active': {
      backgroundColor: 'white',
    },
  },
  sectionTitle: {
    color: '#184623',
    fontSize: 32,
    fontWeight: '600',
    fontFamily: ['Space Grotesk', 'serif'].join(','),
  },
  sectionBody: {
    fontSize: 18,
    fontFamily: 'Space Grotesk',
    marginTop: theme.spacing(2.5),
  },
  timelineContainer: {
    paddingBottom: theme.spacing(10),
  },
  root: {
    backgroundColor: '#f3efcd',
    width: '100%',
  },
  verticallyCenterContent: {
    display: 'none',
  },
}));

export default function Announcements(props) {
  const wallet: any = useAnchorWallet();
  const classes = useStyles();
  const isSmScreenAndSmaller = useMediaQuery(theme.breakpoints.down('sm'));
  const isXsScreenAndSmaller = useMediaQuery(theme.breakpoints.down('xs'));
  const [timelineCards, setTimelineCards] = useState([]);
  let env = BlockchainEnvironment.MainNetBeta;
  const { data, logIn, fetchData, isAuthenticated, createAlert, updateAlert } =
    useNotifiClient({
      dappAddress: '',
      walletPublicKey: '',
      env,
    });
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [telegram, setTelegram] = useState('');
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubscribe = async () => {
    const alertResult = await createAlert({
      name: `${realm?.account.name} notifications`,
      emailAddress: email === '' ? null : email,
      phoneNumber: phone.length < 12 ? null : phone,
      telegramId: telegram === '' ? null : telegram,
      sourceId: source?.id ?? '',
      filterId: filter?.id ?? '',
    })

    if (alertResult) {
      if (alertResult.targetGroup?.telegramTargets?.length > 0) {
        const target = alertResult.targetGroup?.telegramTargets[0]
        if (target && !target.isConfirmed) {
          if (target.confirmationUrl) {
            window.open(target.confirmationUrl)
          }
        }
      }
    }
  }
    setOpen(false);
  };
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value
    if (val.length > 1) {
      val = val.substring(2)
    }

    const re = /^[0-9\b]+$/
    if (val === '' || (re.test(val) && val.length <= 10)) {
      setPhone('+1' + val)
    }
  }


  useEffect(() => {
    try {
      (async () => {
        const publicAnnouncements = await getCreatorAnnouncements();
        const timelineCardsObject = publicAnnouncements.map((announcement) => {
          return {
            emoji: '',
            emojiAria: '',
            title: announcement.variables[2].value,
            body: announcement.variables[1].value,
            date: announcement.date,
            isActive: true,
          };
        });
        setTimelineCards(timelineCardsObject);
      })();
    } catch {
      console.log('error');
    }
  }, [wallet]);

  const formCard = (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to MonkeDAO announcements, please enter your email or
          phone number.
        </DialogContentText>
        <TextField
          autoFocus
          margin='dense'
          id='name'
          label='Email Address'
          type='email'
          fullWidth
          variant='standard'
          onChange={handleEmail}
        />
        <TextField
          autoFocus
          margin='dense'
          id='name'
          label='Phone Number'
          type='phone'
          fullWidth
          variant='standard'
          onChange={handlePhone}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubscribe}>Subscribe</Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position='sticky'
        color='default'
        elevation={0}
        className={clsx(classes.appBar, { sm: isXsScreenAndSmaller })}
      >
        <Toolbar
          className={clsx(classes.toolbar, { sm: isXsScreenAndSmaller })}
        >
          <Box
            className={clsx(classes.titleContainer, {
              sm: isXsScreenAndSmaller,
            })}
          >
            <img
              alt='MonkeDao logo'
              src='/MonkeDAO_Logo_Positive.png'
              className={classes.logo}
            />
          </Box>
          <Box
            className={clsx(classes.social, classes.discord, {
              sm: isXsScreenAndSmaller,
            })}
          >
            {/* <Button
              href='/'
              color='secondary'
              variant='contained'
              className={classes.link}
              onClick={handleClickOpen}
            >
              <img
                alt='Announcements logo'
                src='/speaker.png'
                className={classes.plusLogo}
              />
              Subscribe
            </Button> */}
          </Box>
          <Box className={clsx(classes.social, { sm: isXsScreenAndSmaller })}>
            <WalletMultiButton />
          </Box>
        </Toolbar>
      </AppBar>
      <Box className={classes.root}>
        <Container maxWidth='sm' className={classes.introContainer}>
          <Typography
            variant='h4'
            align='center'
            className={classes.sectionTitle}
          >
            Announcements
          </Typography>
          <Button variant='contained' onClick={handleClickOpen}>
            Subscribe +
          </Button>
        </Container>

        <Container maxWidth='md' className={classes.timelineContainer}>
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
                    align='right'
                    variant='body2'
                    color='textSecondary'
                  ></TimelineOppositeContent>
                  <TimelineSeparator>
                    {isNotFirst && (
                      <TimelineConnector
                        className={
                          isActive
                            ? clsx(classes.connector, 'active')
                            : classes.connector
                        }
                      />
                    )}
                    {isNotLast && (
                      <TimelineConnector
                        className={
                          nextIsActive
                            ? clsx(classes.connector, 'active')
                            : classes.connector
                        }
                      />
                    )}
                  </TimelineSeparator>
                  <TimelineContent
                    className={
                      isXsScreenAndSmaller
                        ? clsx(classes.card, 'extra-small')
                        : isSmScreenAndSmaller
                        ? clsx(classes.card, 'small')
                        : classes.card
                    }
                  >
                    <Paper
                      elevation={0}
                      className={
                        isActive ? clsx(classes.paper, 'active') : classes.paper
                      }
                    >
                      <Typography
                        variant='h6'
                        component='h3'
                        className={
                          isActive
                            ? clsx(classes.cardTitle, 'active')
                            : classes.cardTitle
                        }
                      >
                        {
                          <span role='img' aria-label={card.emojiAria}>
                            {card.emoji}
                          </span>
                        }{' '}
                        {card.title}
                      </Typography>
                      {!!card.body && (
                        <Typography
                          className={
                            isActive
                              ? clsx(classes.cardBody, 'active')
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
        {formCard}
      </Box>
    </ThemeProvider>
  );
}
