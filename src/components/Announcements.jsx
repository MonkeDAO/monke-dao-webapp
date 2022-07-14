import React, { useCallback, useEffect, useRef, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Link from '@mui/material/Link';
import Switch from '@mui/material/Switch';
import MuiPhoneNumber from 'material-ui-phone-number';
import {
  Box,
  Container,
  createTheme,
  makeStyles,
  ThemeProvider,
  Typography,
  Paper,
  useMediaQuery,
  FormGroup,
  FormControlLabel,
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
import { useAnchorWallet, useWallet } from '@solana/wallet-adapter-react';
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

const MONKEDAO_ANNOUNCEMENTS = 'MonkeDAO Announcements';
const EVENT_ANNOUNCEMENTS = 'Events & Updates';
const WHITELIST_ANNOUNCEMENTS = 'Upcoming Whitelist Access';
const MONKEDAO_SOURCE = 'smb__creatorUpdates';
const EVENT_SOURCE = 'smb__eventsAndUpdates';
const WHITELIST_SOURCE = 'smb__accessInstructions';
export default function Announcements(props) {
  const wallet = useAnchorWallet();
  const { publicKey, signMessage } = useWallet();
  const classes = useStyles();
  const isSmScreenAndSmaller = useMediaQuery(theme.breakpoints.down('sm'));
  const isXsScreenAndSmaller = useMediaQuery(theme.breakpoints.down('xs'));
  const [timelineCards, setTimelineCards] = useState([]);
  const [wlChecked, setWLChecked] = useState(false);
  const [eventChecked, setEventsChecked] = useState(false);
  const [monkeDaoChecked, setMonkeDaoChecked] = useState(false);
  const [telegramConfirmationUrl, setTelegramConfirmationUrl] = useState('');
  const alertMap = [
    { type: 'smb__creatorUpdates', name: MONKEDAO_ANNOUNCEMENTS },
    { type: 'smb__eventsAndUpdates', name: EVENT_ANNOUNCEMENTS },
    { type: 'smb__accessInstructions', name: WHITELIST_ANNOUNCEMENTS },
  ];

  let env = BlockchainEnvironment.MainNetBeta;
  const { logIn, fetchData, createAlert, createSource, deleteAlert, updateAlert, isInitialized, isAuthenticated } =
    useNotifiClient({
      dappAddress: 'monkedao',
      walletPublicKey: wallet?.publicKey?.toString() ?? '',
      env,
    });

  const [isNotifiLoggedIn, setNotifiLoggedIn] = useState(false);
  const [isNotifiLoggingIn, setNotifiLoggingIn] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isAuthed, setIsAuthed] = useState(false);
  const [telegram, setTelegram] = useState('');
  const [open, setOpen] = useState(false);
  const [handleSubscribeCalled, setHandleSubscribeCalled] = useState(false);
  const [contentForModal, setContentForModal] = useState('');
  const handleClickOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };
  const handleClose = () => {
    setHandleSubscribeCalled(false);
    setOpen(false);
  };

  const handleWlChecked = () => {
    setWLChecked(!wlChecked);
  };
  const handleEventChecked = () => {
    setEventsChecked(!eventChecked);
  };
  const handleDaoChecked = () => {
    setMonkeDaoChecked(!monkeDaoChecked);
  };

  const getAlert = (data, name) => {
    return data?.alerts?.find((alert) => alert.name === name);
  }

  const getSource = (data, name) => {
    return data?.sources?.find((source) => source.name === name);
  };

  const updateSubscription = (data, name, source) => {
    if (source) {
      return createOrUpdateAlert(data, {
        name,
        emailAddress: email === '' ? null : email,
        telegramId: telegram === '' ? null : telegram,
        phoneNumber: phone === '' ? null : phone,
        sourceId: source.id,
        filterId: source.applicableFilters[0]?.id ?? '',
      });
    } else {
      return maybeDeleteAlert(data, {
        name,
      });
    }
  }

  const handleSubscribe = async () => {
    if (wallet && publicKey && (email || telegram)) {
      try {
        const sourcePromises = [];

        const freshData = await fetchData();
        sourcePromises.push(wlChecked ? ensureSource(freshData, WHITELIST_SOURCE) : Promise.resolve(undefined));
        sourcePromises.push(eventChecked ? ensureSource(freshData, EVENT_SOURCE) : Promise.resolve(undefined));
        sourcePromises.push(monkeDaoChecked ? ensureSource(freshData, MONKEDAO_SOURCE) : Promise.resolve(undefined));
        
        const [wlSource, eventSource, monkeDaoSource] = await Promise.all(sourcePromises);

        const eventPromises = [];
        eventPromises.push(updateSubscription(freshData, WHITELIST_ANNOUNCEMENTS, wlSource));
        eventPromises.push(updateSubscription(freshData, EVENT_ANNOUNCEMENTS, eventSource));
        eventPromises.push(updateSubscription(freshData, MONKEDAO_ANNOUNCEMENTS, monkeDaoSource));

        await Promise.all(eventPromises);
        const dataAfterAlertCreation = await fetchData();
        const unverifiedTelegramTarget = dataAfterAlertCreation.telegramTargets.find(telegramTarget => !!telegramTarget.confirmationUrl);
        
        let content = 'Check your email for verification if you entered one. Texts are automatically subscribed.';
        if (unverifiedTelegramTarget) {
          const confirmationUrl = unverifiedTelegramTarget.confirmationUrl;
          setTelegramConfirmationUrl(confirmationUrl);
          content = content + ` Please confirm you want to receive telegram notifications at ${confirmationUrl}`;
        }
        setContentForModal(content);
        reflectNotifiData(dataAfterAlertCreation);
      } catch (e) {
        if (e) {
          console.log('Invalid Signature', e);
          setContentForModal('Something went wrong. Refresh and try again.');
        }
      }
      setHandleSubscribeCalled(true);
    }
  };

  const maybeDeleteAlert = async (data, payload) => {
    const alertId = getAlert(data, payload.name)?.id;
    if (alertId) {
      const result = await deleteAlert({ alertId, keepTargetGroup: true, keepSourceGroup: true });
      return result;
    }
  }

  const createOrUpdateAlert = async (data, payload) => {
    const alertId = getAlert(data, payload.name)?.id;
    if (alertId) {
      const result = await updateAlert({
        alertId,
        ...payload,
      });
      return result;
    } else {
      const result = await createAlert({
        ...payload
      });
      return result;
    }
  }

  const ensureSource = async (data, type) => {
    const existingSource = getSource(data, type);
    if (existingSource) {
      return existingSource;
    }

    const newSource = await runCreateSource({ name: type });
    return newSource;
  }

  const runCreateSource = async (data) => {
    await createSource({
      name: data.name,
      blockchainAddress: data.name,
      type: 'BROADCAST',
    });
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleTelegram = (e) => {
    setTelegram(e.target.value);
  };

  const handlePhone = (value) => {
    const formattedPhoneNum = `+${value.replace(/\D+/gi, '')}`;
    setPhone(formattedPhoneNum);
  };

  const reflectNotifiData = useCallback((data) => {
    // Look for email and target associated with an alert
    let emailTarget = undefined;
    let telegramTarget = undefined;
    let hasAnyAlert = false;

    // Defined in here to capture the variables in scope
    function handleAlert(name, toggleSetter) {
      const alert = getAlert(data, name);
      if (alert) {
        emailTarget = alert.targetGroup?.emailTargets?.[0];
        telegramTarget = alert.targetGroup?.telegramTargets?.[0];
        hasAnyAlert = true;
        toggleSetter(true);
      } else {
        toggleSetter(false);
      }
    }
    handleAlert(WHITELIST_ANNOUNCEMENTS, setWLChecked);
    handleAlert(EVENT_ANNOUNCEMENTS, setEventsChecked);
    handleAlert(MONKEDAO_ANNOUNCEMENTS, setMonkeDaoChecked);

    if (!hasAnyAlert) {
      emailTarget = data.emailTargets?.[0];
    } else {
      // Find by id from the data to get latest data
      emailTarget = data.emailTargets?.find(email => email.id === emailTarget?.id);
    }
    if (emailTarget) {
      setEmail(emailTarget.emailAddress);
    }

    if (!hasAnyAlert) {
      telegramTarget = data.telegramTargets?.[0];
    } else {
      telegramTarget = data.telegramTargets?.find(telegram => telegram.id === telegramTarget?.id);
    }
    if (telegramTarget) {
      setTelegram(telegramTarget.telegramId);
      setTelegramConfirmationUrl(telegramTarget.confirmationUrl);
    } else {
      setTelegramConfirmationUrl('');
    }
  }, []);

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

  const initializedNotifiState = useRef(false);
  useEffect(() => {
    if (!initializedNotifiState.current) {
      if (wallet && publicKey && isInitialized) {
        initializedNotifiState.current = true;

        try {
          (async () => {
            if (!isAuthenticated) {
              await logIn({ signMessage });
            }
            
            const dataAfterLoggingIn = await fetchData();
            reflectNotifiData(dataAfterLoggingIn);
            setNotifiLoggedIn(true);
          })();
        } catch {
          console.log('error');
        }
      }
    }
  }, [wallet, publicKey, isInitialized, isAuthenticated, logIn, signMessage, fetchData, reflectNotifiData]);

  const subscribeForm = (
    <><DialogTitle>Subscribe</DialogTitle>
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
          value={email}
          variant='standard'
          onChange={handleEmail}
        />
        <br />
        <br />
        <TextField
          autoFocus
          margin='dense'
          id='name'
          label='Telegram ID'
          type='text'
          fullWidth
          value={telegram}
          variant='standard'
          onChange={handleTelegram}
        />
        {telegramConfirmationUrl ? <>
          <br />
          <Link
            href={telegramConfirmationUrl}
            target="_blank"
            rel="noopener">
              Click to confirm
          </Link>
        </> : null}
        <br />
        <br />
        <MuiPhoneNumber
          name='phone'
          label='Phone Number'
          data-cy='user-phone'
          defaultCountry={'us'}
          value={phone}
          onChange={handlePhone}
        />
        <br />
        <br />
        <FormGroup>
          <FormControlLabel
            control={
              <Switch checked={monkeDaoChecked} onChange={handleDaoChecked} />
            }
            label='MonkeDAO Announcements'
          />
          <FormControlLabel
            control={
              <Switch checked={eventChecked} onChange={handleEventChecked} />
            }
            label='Events & Updates'
            onChange={handleEventChecked}
          />
          <FormControlLabel
            control={<Switch checked={wlChecked} onChange={handleWlChecked} />}
            label='Upcoming Whitelist Access'
          />
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubscribe}>Subscribe</Button>
      </DialogActions></>)

  const formCard = (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Subscribe</DialogTitle>
      {handleSubscribeCalled ? (
        <DialogContent>
          <DialogContentText>
            {contentForModal}
          </DialogContentText>
        </DialogContent>
      ) : subscribeForm}
    </Dialog >
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
          {(wallet && publicKey && isNotifiLoggedIn && <Box
            className={clsx(classes.social, classes.discord, {
              sm: isXsScreenAndSmaller,
            })}
          >
            <Button
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
            </Button>
          </Box>) || null }
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
          {/* <Button variant='contained' onClick={handleClickOpen}>
            Subscribe +
          </Button> */}
        </Container>

        {(wallet && publicKey && !isNotifiLoggedIn && (
          <Container maxWidth='md' className={classes.timelineContainer}>
            Please approve message transaction to login with Notifi to configure announcement subscription.
            </Container>
          ))
          || null }

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
