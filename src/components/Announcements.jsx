import React, { useCallback, useEffect, useRef, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Link from '@material-ui/core/Link';
import Switch from '@material-ui/core/Switch';
import Checkbox from '@material-ui/core/Checkbox';
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
  IconButton,
  InputAdornment,
} from '@material-ui/core';
import {
  BANANA_ICON_YELLOW,
  BUTTON_YELLOW,
  LIGHT_GREY,
  TEXT_GREY,
} from '../constants/colors';

import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import clsx from 'clsx';
import { TimelineOppositeContent } from '@material-ui/lab';
import { WalletMultiButton } from '@solana/wallet-adapter-material-ui';
import { useAnchorWallet, useConnection, useWallet } from '@solana/wallet-adapter-react';
import { getCreatorAnnouncements, getPublicTopics } from '../utils/notif';
import { useNotifiClient } from '@notifi-network/notifi-react-hooks';
import { PublicKey, Transaction, TransactionInstruction } from '@solana/web3.js';
const theme = createTheme({
  palette: {
    primary: {
      main: BUTTON_YELLOW,
    },
    secondary: {
      main: '#498D5E',
    },
  },
  typography: {
    fontFamily: ['Space Grotesk', 'Open Sans', 'sans-serif'].join(','),
  },
  overrides: {
    MuiPaper: {
      root: {
        backgroundColor: '#184623',
        color: "#f3efcd",
      },
      rounded: {
        borderRadius: 8,
      }
    },
    MuiTypography: {
      colorTextSecondary: {
        color: 'inherit',
      },
    },
    MuiInputBase: {
      root: {
        color: 'inherit',
      },
    },
    MuiDialogActions: {
      root: {
        paddingBottom: 24,
      },
      spacing: {
        ':not(:first-child)': {
          marginLeft: 30,
        }
      }
    },
    MuiDialogContent: {
      root: {
        paddingTop: 16,
      },
    },
    MuiDialogTitle: {
      root: {
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
      }
    },
    MuiFormLabel: {
      root: {
        color: '#184623',
        focused: {
          color: BUTTON_YELLOW,
        }
      },
    },
  }
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
  closeButton: {
    position: 'absolute',
    right: '16px',
    float: 'right',
  },
  titleText: {
    display: 'inline-block',
    width: '100%',
    textAlign: 'center',
  },
  checkbox: {
    color: BUTTON_YELLOW,
  },
  centeredControls: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  notCenteredControls: {
    alignSelf: 'center',
    display: 'flex',
    width: 'fit-content',
    flexDirection: 'column',
    alignItems: 'start',
    margin: 'auto',
  },
  centeredActions: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconTextField: {
    color: '#184623',
    border: `2px solid rgba(0, 0, 0, 0)`,
    backgroundColor: '#F2EFD0',
    borderRadius: 8,
    padding: 8,
    '&:focus-within': {
      borderColor: BUTTON_YELLOW,
    }
  },
  inputAdornment: {
    marginTop: '0px !important',
  },
  smsInputContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 4,
    paddingTop: 6,
    paddingBottom: 7,
  },
  smsIcon: {
    marginRight: 8,
  },
}));

const getAlert = (data, name) => {
  return data?.alerts?.find((alert) => alert.name === name);
}

const getSource = (data, name) => {
  return data?.sources?.find((source) => source.blockchainAddress === name);
};

const areTargetsEmpty = (data) => {
  return (data?.emailTargets?.length ?? 0) === 0
    && (data?.smsTargets?.length ?? 0) === 0
    && (data?.telegramTargets?.length ?? 0) === 0;
}

const DialogHeader = (props) => {
  const classes = useStyles();
  return <DialogTitle className={classes.titleText}>
    {props.hasNoData ?
      'Get announcement notifications' :
      'Notification settings'
    }
    <IconButton className={classes.closeButton} size="small" onClick={props.onClickClose}>
      <img alt='close' src='/x.svg'/>
    </IconButton>
  </DialogTitle>
}

export default function Announcements(props) {
  const wallet = useAnchorWallet();
  const { publicKey, signMessage, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const classes = useStyles();
  const isSmScreenAndSmaller = useMediaQuery(theme.breakpoints.down('sm'));
  const isXsScreenAndSmaller = useMediaQuery(theme.breakpoints.down('xs'));
  const [timelineCards, setTimelineCards] = useState([]);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [telegramConfirmationUrl, setTelegramConfirmationUrl] = useState('');
  const [unverifiedEmailTarget, setUnverifiedEmailTarget] = useState(null);
  const [publicTopics, setPublicTopics] = useState([]);

  const {
    beginLoginViaTransaction,
    completeLoginViaTransaction,
    logIn,
    fetchData,
    createAlert,
    createSource,
    deleteAlert,
    updateAlert,
    sendEmailTargetVerification,
    data,
    isAuthenticated,
    isInitialized,
  } =
    useNotifiClient({
      dappAddress: 'monkedao',
      walletPublicKey: publicKey?.toBase58() ?? '',
      env: 'Production',
    });

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [telegram, setTelegram] = useState('');
  const [open, setOpen] = useState(false);
  const [useHardwareWallet, setUseHardwareWallet] = useState(false);

  const hasNoData = areTargetsEmpty(data);

  const handleClickOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [checkedStates, setCheckedStates] = useState({});

  const handleTopicChecked = useCallback((topicName) => {
    setCheckedStates((state) => ({ ...state, [topicName]: !state[topicName] }));
  }, []);

  const handleHardwareWalletToggled = () => {
    setUseHardwareWallet(!useHardwareWallet);
  };


  const updateSubscription = (data, name, source) => {
    if (source) {
      return createOrUpdateAlert(data, {
        name,
        emailAddress: email === '' ? null : email,
        telegramId: telegram === '' ? null : telegram,
        phoneNumber: phone.length < 4 ? null : phone,
        sourceId: source.id,
        filterId: source.applicableFilters[0]?.id ?? '',
      }).then(fetchData);
    } else {
      return maybeDeleteAlert(data, {
        name,
      }).then(fetchData);
    }
  }

  const handleSubscribe = async () => {
    if (wallet && publicKey && (email || telegram)) {
      try {
        const freshData = await fetchData();

        const currentTopics = [...publicTopics];
        const currentCheckedState = {
          ...checkedStates,
        };

        await Promise.all(currentTopics.map(topic => {
          return currentCheckedState[topic.topicName] ? ensureSource(freshData, topic.topicName) : Promise.resolve(undefined);
        }));

        // Create alerts serially because of a bug in SDK
        const dataAfterSources = await fetchData();
        let eventPromises = Promise.resolve(dataAfterSources);
        currentTopics.forEach(topic => {
          const source = currentCheckedState[topic.topicName] ? getSource(dataAfterSources, topic.topicName) : undefined;
          eventPromises = eventPromises.then(data => updateSubscription(data, topic.displayName, source));
        });

        const dataAfterAlertCreation = await eventPromises;
        reflectNotifiData(dataAfterAlertCreation);
      } catch (e) {
        if (e) {
          console.log('Invalid Signature', e);
        }
      }
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
    const targets = data?.emailTargets ?? [];
    const maybeTarget = targets.find(target => target?.emailAddress === e.target.value.toLowerCase());
    setUnverifiedEmailTarget((maybeTarget && !maybeTarget.isConfirmed) ? maybeTarget : null);
  };

  const handleTelegram = (e) => {
    setTelegram(e.target.value);
    const targets = data?.telegramTargets ?? [];
    const maybeTarget = targets.find(target => target?.telegramId === e.target.value.toLowerCase());
    setTelegramConfirmationUrl(maybeTarget?.telegramConfirmationUrl ?? '');
  };

  const handlePhone = (value) => {
    const formattedPhoneNum = `+${value.replace(/\D+/gi, '')}`;
    setPhone(formattedPhoneNum);
  };

  const reflectNotifiData = useCallback((data) => {
    // Look for email and target associated with an alert
    let emailTarget = undefined;
    let smsTarget = undefined;
    let telegramTarget = undefined;
    let checkedStates = {};

    // Defined in here to capture the variables in scope
    function handleAlert(topic) {
      const alert = getAlert(data, topic.displayName);
      if (alert) {
        emailTarget = alert.targetGroup?.emailTargets?.[0];
        smsTarget = alert.targetGroup?.smsTargets?.[0];
        telegramTarget = alert.targetGroup?.telegramTargets?.[0];
        checkedStates[topic.topicName] = true;
      } else {
        checkedStates[topic.topicName] = false;
      }
    }

    publicTopics.forEach(handleAlert);
    setCheckedStates(checkedStates);

    if (emailTarget) {
      // Find by id from the data to get latest data
      emailTarget = data.emailTargets?.find(email => email.id === emailTarget?.id);
      setEmail(emailTarget?.emailAddress);
      setUnverifiedEmailTarget((emailTarget && !emailTarget.isConfirmed) ? emailTarget : null);
    } else {
      setEmail('');
      setUnverifiedEmailTarget(null);
    }

    if (smsTarget) {
      // Find by id from the data to get latest data
      smsTarget = data.smsTargets?.find(sms => sms.id === smsTarget?.id);
      setPhone(smsTarget?.phoneNumber ?? '');
    } else {
      setPhone('');
    }

    if (telegramTarget) {
      telegramTarget = data.telegramTargets?.find(telegram => telegram.id === telegramTarget?.id);
      setTelegram(telegramTarget?.telegramId);
      setTelegramConfirmationUrl(telegramTarget.confirmationUrl);
    } else {
      setTelegram('');
      setTelegramConfirmationUrl('');
    }
  }, [publicTopics]);

  useEffect(() => {
    try {
      (async () => {
        const [topics, publicAnnouncements] = await Promise.all([
          getPublicTopics(),
          getCreatorAnnouncements(),
        ]);

        setPublicTopics(topics);
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
    } catch (e) {
      console.log('error', e);
    }
  }, []);

  const handleSoftware = useCallback(async () => {
    setIsLoggingIn(true);
    try {
      await logIn({ signMessage });
      const dataAfterLoggingIn = await fetchData();
      reflectNotifiData(dataAfterLoggingIn);
    } catch (e) {
      console.log('error', e);
    }
    setIsLoggingIn(false);
  }, [fetchData, logIn, reflectNotifiData, signMessage]);

  const isNotifiInitialized = useRef(false);
  useEffect(() => {
    if (isNotifiInitialized.current) {
      if (!publicKey) {
        isNotifiInitialized.current = false;
      }
      return;
    }

    if (isInitialized && isAuthenticated && publicKey && data && publicTopics.length > 0) {
      isNotifiInitialized.current = true;
      reflectNotifiData(data);
    }
  }, [reflectNotifiData, data, isInitialized, isAuthenticated, publicKey, publicTopics]);

  const broadcastMemo = useCallback(async (logValue) => {
    const latestBlockHash = await connection.getLatestBlockhash();

    const txn = new Transaction();
    txn.recentBlockhash = latestBlockHash.blockhash;
    txn.feePayer = publicKey;
    txn.add(
      new TransactionInstruction({
        keys: [
          {
            pubkey: publicKey,
            isSigner: true,
            isWritable: false,
          }
        ],
        data: Buffer.from(logValue, "utf-8"),
        programId: new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"),
      })
    );

    const blockHashAgain = await connection.getLatestBlockhash();
    const signature = await sendTransaction(txn, connection);
    await connection.confirmTransaction({
      blockhash: blockHashAgain.blockhash,
        lastValidBlockHeight: blockHashAgain.lastValidBlockHeight,
        signature,
    });

    return signature;
  }, [connection, publicKey, sendTransaction]);

  // Disabled if No alerts selected and inputs are empty
  const isSubscribeDisabled =
    !Object.keys(checkedStates).some(key => checkedStates[key])
    || (email === '' && telegram === '' && phone.length < 4);

  const handleHardware = useCallback(async () => {
    setIsLoggingIn(true);
    try {
      const { logValue } = await beginLoginViaTransaction();
      const signature = await broadcastMemo(logValue);
      await completeLoginViaTransaction({ transactionSignature: signature });
      const dataAfterLoggingIn = await fetchData();
      reflectNotifiData(dataAfterLoggingIn);
    } catch (e) {
      console.log('error', e);
    }
    setIsLoggingIn(false);
  }, [beginLoginViaTransaction, broadcastMemo, completeLoginViaTransaction, fetchData, reflectNotifiData]);

  const handleLogIn = useCallback(async () => {
    if (useHardwareWallet) {
      await handleHardware();
    } else {
      await handleSoftware();
    }
  }, [handleHardware, handleSoftware, useHardwareWallet]);

  const logInForm = (
    <>
      <DialogHeader hasNoData={hasNoData} onClickClose={handleClose}  />
      <DialogContent>
        <DialogContentText>
          Sign a message with your wallet to log in to Notifi
          <br />
          <br />
          Using a hardware wallet requires you to broadcast a transaction.
          <br />
          This will cost gas!
        </DialogContentText>
        <FormGroup  className={classes.centeredControls}>
          <FormControlLabel
            control={
              <Checkbox className={classes.checkbox} color="primary" checked={useHardwareWallet} onChange={handleHardwareWalletToggled} />
            }
            label='Use Hardware Wallet'
          />
        </FormGroup>
      </DialogContent>
      <DialogActions className={classes.centeredActions}>
        <Button className={classes.link} color="primary" variant="contained" disabled={isLoggingIn} onClick={handleLogIn}>Log In</Button>
      </DialogActions>
    </>
  );

  const subscribeForm = (
    <><DialogHeader hasNoData={hasNoData} onClickClose={handleClose} />
      <DialogContent>
        <DialogContentText>
          To subscribe to MonkeDAO announcements, please enter your your email address, Telegram ID, and/or phone number.
        </DialogContentText>
        <TextField
          autoFocus
          id='name'
          type='email'
          value={email}
          className={classes.iconTextField}
          margin='dense'
          fullWidth
          variant='standard'
          onChange={handleEmail}
          InputProps={{
            className: classes.textFieldInput,
            disableUnderline: true,
            placeholder: 'Email Address',
            startAdornment: (
              <InputAdornment className={classes.inputAdornment} position="start" variant='filled'>
                <img alt='Email Address' src='/icn-mail.svg' />
              </InputAdornment>
            ),
            endAdornment: (unverifiedEmailTarget
              ? <Link href="#" color="secondary" onClick={() => {
                  sendEmailTargetVerification({ targetId: unverifiedEmailTarget.id })
                    .catch(e => { console.log(e, 'error') })
                }} target="_blank" rel="noopener">Resend&nbsp;Verification</Link>
              : null
            )
          }}
        />
        <br />
        <TextField
          id='name'
          type='text'
          margin='dense'
          value={telegram}
          className={classes.iconTextField}
          fullWidth
          variant='standard'
          onChange={handleTelegram}
          InputProps={{
            className: classes.textFieldInput,
            disableUnderline: true,
            placeholder: 'Telegram ID',
            startAdornment: (
              <InputAdornment className={classes.inputAdornment} position="start" variant='filled'>
                <img alt='Telegram ID' src='/icn-telegram.svg' />
              </InputAdornment>
            ),
            endAdornment: (telegramConfirmationUrl
              ? <Link color="secondary" href={telegramConfirmationUrl} target="_blank" rel="noopener">Verify&nbsp;telegram</Link>
              : null
            )
          }}
        />
        <br />
        <div className={clsx(classes.iconTextField, classes.smsInputContainer)}>
          <img className={classes.smsIcon} alt='Phone Number' src='/icn-sms.svg' />
          <MuiPhoneNumber
            name='phone'
            data-cy='user-phone'
            defaultCountry={'us'}
            value={phone}
            fullWidth
            variant='standard'
            onChange={handlePhone}
            InputProps={{
              className: classes.textFieldInput,
              placeholder: 'Phone Number',
              disableUnderline: true,
            }}
          />
        </div>
        <br />
        <FormGroup className={classes.notCenteredControls}>
          {publicTopics.map(topic => {
            const { topicName, displayName } = topic;
            return (<FormControlLabel key={topicName}
              control={
                <Switch
                  color='primary'
                  checked={checkedStates[topicName]}
                  onChange={() => handleTopicChecked(topicName)} />
              }
              label={displayName}
            />)
          })}
        </FormGroup>
      </DialogContent>
      <DialogActions className={classes.centeredActions}>
        <Button disabled={hasNoData ? isSubscribeDisabled : false} className={classes.link} color="primary" variant="contained" onClick={handleSubscribe}>
          {hasNoData ? 'Subscribe' : 'Update Settings'}
        </Button>
      </DialogActions></>)

  const formCard = (
    <Dialog open={open} onClose={handleClose} fullScreen={isXsScreenAndSmaller}>
      {isAuthenticated ? subscribeForm : logInForm}
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
          {(wallet && publicKey && <Box
            className={clsx(classes.social, classes.discord, {
              sm: isXsScreenAndSmaller,
            })}
          >
            <Button
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
            <WalletMultiButton className={clsx(classes.social, classes.link)} />
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

        {(wallet && publicKey && !isAuthenticated) ? (
          <Container maxWidth='md' className={classes.timelineContainer}>
            <Typography align="center">
              Please approve message transaction to login with Notifi to configure announcement subscription.
            </Typography>
          </Container>
        ) : null}

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
