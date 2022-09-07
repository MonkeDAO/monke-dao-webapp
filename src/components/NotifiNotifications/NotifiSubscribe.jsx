import React, { useCallback, useEffect, useRef, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Link from "@material-ui/core/Link";
import Switch from "@material-ui/core/Switch";
import Checkbox from "@material-ui/core/Checkbox";
import MuiPhoneNumber from "material-ui-phone-number";
import LinkOffIcon from "@mui/icons-material/LinkOff";
import {
  Box,
  createTheme,
  makeStyles,
  ThemeProvider,
  FormGroup,
  FormControlLabel,
  InputAdornment,
} from "@material-ui/core";
import { BUTTON_YELLOW, TEXT_GREY } from "../../constants/colors";
import DialogHeader from "./DialogHeader";
import Announcements from "./Announcements";

import clsx from "clsx";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import { getCreatorAnnouncements, getPublicTopics } from "../../utils/notif";
import { useNotifiClient } from "@notifi-network/notifi-react-hooks";
import {
  PublicKey,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";

const theme = createTheme({
  palette: {
    primary: {
      main: BUTTON_YELLOW,
    },
    secondary: {
      main: "#498D5E",
    },
  },
  typography: {
    fontFamily: ["Space Grotesk", "Open Sans", "sans-serif"].join(","),
  },
  overrides: {
    MuiPaper: {
      root: {
        backgroundColor: "#184623",
        color: "#f3efcd",
      },
      rounded: {
        borderRadius: 8,
      },
    },
    MuiTypography: {
      colorTextSecondary: {
        color: "inherit",
      },
    },
    MuiInputBase: {
      root: {
        color: "inherit",
      },
      input: {
        "&:-webkit-autofill": {
          "-webkit-box-shadow": "0 0 0 100px #F2EFD0 inset",
        },
      },
    },
    MuiDialogActions: {
      root: {
        paddingBottom: 20,
      },
      spacing: {
        ":not(:first-child)": {
          marginLeft: 30,
        },
      },
    },
    MuiDialogContent: {
      root: {
        paddingTop: 16,
      },
    },
    MuiDialogTitle: {
      root: {
        backgroundColor: "rgba(255, 255, 255, 0.15)",
      },
    },
    MuiFormLabel: {
      root: {
        color: "#184623",
        focused: {
          color: BUTTON_YELLOW,
        },
      },
    },
  },
});

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: "#f3efcd",
    height: 86,
    "&.sm": {
      height: "auto",
    },
  },
  logo: {
    width: 168,
  },
  titleContainer: {
    flexGrow: 1,
    "&.sm": {
      marginTop: 26,
    },
  },
  intro: {
    background: "linear-gradient(to right, #ffc919, #184623)",
    padding: "2px 0 2px 0",
    textAlign: "center",
    fontSize: "16px",
    color: "#f3efcd",
    width: "100%",
    lineHeight: "2em",
    fontFamily: ["Space Grotesk", "serif"].join(","),
  },
  toolbar: {
    // flexWrap: "wrap",
    maxWidth: 1072,
    // maxWidth: 1040,
    height: "100%",
    width: "100%",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    // padding: 0,
    padding: `0 ${theme.spacing(2)}`,
    "&.sm": {
      display: "block",
      textAlign: "center",
      height: "auto",
    },
  },
  social: {
    height: 38,
    "&.sm": {
      display: "inline-block",
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
    fontFamily: ["Space Grotesk", "Open Sans", "sans-serif"].join(","),
    fontWeight: "600",
    fontSize: 18,
  },
  emoji: {
    fontSize: "32px",
    "&.small": {
      fontSize: 38,
    },
  },
  link: {
    textTransform: "none",
    fontFamily: "Space Grotesk",
    fontWeight: "600",
    fontSize: 16,
    boxShadow: "none",
    borderRadius: 8,
    height: 38,
    whiteSpace: "nowrap",
    overflow: "hidden",
    padding: "8px 16px",
  },
  disabled: {
    backgroundColor: "#F2EFD0",
    color: "#808080",
    pointerEvents: "none",
    textTransform: "none",
    fontFamily: "Space Grotesk",
    fontWeight: "400",
    fontSize: 16,
    boxShadow: "none",
    borderRadius: 8,
    height: 38,
    whiteSpace: "nowrap",
    overflow: "hidden",
    padding: "8px 16px",
  },
  announcementsLink: {
    color: "#F2EFD0",
    marginTop: "3px",
    fontSize: 12,
    fontWeight: "400",
    fontFamily: "Space Grotesk",
    textTransform: "none",
    textAlign: "center",
  },
  stakeLink: {
    color: "white",
  },
  buttonLogo: {
    marginRight: 8,
  },
  plusLogo: {
    marginRight: 8,
    width: "15%",
    filter: "invert(1)",
  },
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
  sectionTitle: {
    color: "#184623",
    fontSize: 32,
    fontWeight: "600",
    fontFamily: ["Space Grotesk", "serif"].join(","),
  },
  sectionBody: {
    fontSize: 18,
    fontFamily: "Space Grotesk",
    backgroundColor: "#194824",
    color: "#f3efcd",
    borderRadius: 18,
  },
  root: {
    backgroundColor: "#f3efcd",
    width: "100%",
  },
  checkbox: {
    color: BUTTON_YELLOW,
  },
  centeredControls: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  notCenteredControls: {
    alignSelf: "center",
    display: "flex",
    width: "fit-content",
    flexDirection: "column",
    alignItems: "start",
    margin: "auto",
  },
  centeredActions: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  iconTextField: {
    backgroundColor: "#F2EFD0",
    color: "#184623",
    border: `2px solid rgba(0, 0, 0, 0)`,
    borderRadius: 8,
    padding: 8,
    "&:focus-within": {
      borderColor: BUTTON_YELLOW,
    },
  },
  inputAdornment: {
    marginTop: "0px !important",
  },
  smsInputContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 8,
    marginBottom: 4,
    paddingTop: 6,
    paddingBottom: 7,
  },
  smsIcon: {
    marginRight: 8,
  },
  walletNotConnectedBody: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "10px",
  },
}));

const getAlert = (data, name) => {
  return data?.alerts?.find((alert) => alert.name === name);
};

const getSource = (data, name) => {
  return data?.sources?.find((source) => source.blockchainAddress === name);
};

const areTargetsEmpty = (data) => {
  return (
    (data?.emailTargets?.length ?? 0) === 0 &&
    (data?.smsTargets?.length ?? 0) === 0 &&
    (data?.telegramTargets?.length ?? 0) === 0
  );
};

export default function NotifiSubscribe({
  phoneRef,
  setPhoneRef,
  onModalClose,
  onBackClick,
  setModalState,
}) {
  const wallet = useAnchorWallet();
  const { publicKey, signMessage, sendTransaction } = useWallet();

  const { connection } = useConnection();
  const classes = useStyles();
  const [timelineCards, setTimelineCards] = useState([]);
  const [alertExists, setAlertExists] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [telegramConfirmationUrl, setTelegramConfirmationUrl] = useState("");
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
  } = useNotifiClient({
    dappAddress: "monkedao",
    walletPublicKey: publicKey?.toBase58() ?? "",
    env: "Production",
  });

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [telegram, setTelegram] = useState("");
  const [subscribeLoading, setSubscribeLoading] = useState(false);

  const [useHardwareWallet, setUseHardwareWallet] = useState(false);
  const [alertsShow, setAlertsShow] = useState(false);

  const hasNoData = areTargetsEmpty(data);

  const [checkedStates, setCheckedStates] = useState({});

  const handleBackToSelection = () => {
    setModalState('selection');
  }

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
        emailAddress: email === "" ? null : email,
        telegramId: telegram === "" ? null : telegram,
        phoneNumber: phone.length < 4 ? null : phone,
        sourceId: source.id,
        filterId: source.applicableFilters[0]?.id ?? "",
      }).then(fetchData);
    } else {
      return maybeDeleteAlert(data, {
        name,
      }).then(fetchData);
    }
  };

  const handleSubscribe = async () => {
    if (wallet && publicKey && (email || telegram)) {
      try {
        setSubscribeLoading(true);
        const freshData = await fetchData();

        const currentTopics = [...publicTopics];
        const currentCheckedState = {
          ...checkedStates,
        };

        await Promise.all(
          currentTopics.map((topic) => {
            return currentCheckedState[topic.topicName]
              ? ensureSource(freshData, topic.topicName)
              : Promise.resolve(undefined);
          })
        );

        // Create alerts serially because of a bug in SDK
        const dataAfterSources = await fetchData();
        let eventPromises = Promise.resolve(dataAfterSources);
        currentTopics.forEach((topic) => {
          const source = currentCheckedState[topic.topicName]
            ? getSource(dataAfterSources, topic.topicName)
            : undefined;
          eventPromises = eventPromises.then((data) =>
            updateSubscription(data, topic.displayName, source)
          );
        });

        const dataAfterAlertCreation = await eventPromises;
        reflectNotifiData(dataAfterAlertCreation);
        setSubscribeLoading(false);
      } catch (e) {
        setSubscribeLoading(false);
        if (e) {
          console.log("Invalid Signature", e);
        }
      }
    }
  };

  const showSubscribeText = () => {
    if (subscribeLoading) return "Loading";

    if (hasNoData) {
      return "Subscribe";
    } else return "Update Settings";
  };

  const maybeDeleteAlert = async (data, payload) => {
    const alertId = getAlert(data, payload.name)?.id;
    if (alertId) {
      const result = await deleteAlert({
        alertId,
        keepTargetGroup: true,
        keepSourceGroup: true,
      });
      return result;
    }
  };

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
        ...payload,
      });
      return result;
    }
  };

  const ensureSource = async (data, type) => {
    const existingSource = getSource(data, type);
    if (existingSource) {
      return existingSource;
    }

    const newSource = await runCreateSource({ name: type });
    return newSource;
  };

  const runCreateSource = async (data) => {
    await createSource({
      name: data.name,
      blockchainAddress: data.name,
      type: "BROADCAST",
    });
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    const targets = data?.emailTargets ?? [];
    const maybeTarget = targets.find(
      (target) => target?.emailAddress === e.target.value.toLowerCase()
    );
    setUnverifiedEmailTarget(
      maybeTarget && !maybeTarget.isConfirmed ? maybeTarget : null
    );
  };

  const handleTelegram = (e) => {
    setTelegram(e.target.value);
    const targets = data?.telegramTargets ?? [];
    const maybeTarget = targets.find(
      (target) => target?.telegramId === e.target.value.toLowerCase()
    );
    setTelegramConfirmationUrl(maybeTarget?.telegramConfirmationUrl ?? "");
  };

  const handlePhone = async (value) => {
    const formattedPhoneNum = `+${value.replace(/\D+/gi, "")}`;
    setPhone(formattedPhoneNum);
  };

  const reflectNotifiData = useCallback(
    (data) => {
      // Look for email and target associated with an alert
      let emailTarget = "";
      let smsTarget = "";
      let telegramTarget = "";
      let checkedStates = {};

      // Defined in here to capture the variables in scope
      async function handleAlert(topic) {
        const alert = getAlert(data, topic.displayName);
        if (alert) {
          setAlertExists(true)
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
        emailTarget = data.emailTargets?.find(
          (email) => email.id === emailTarget?.id
        );
        setEmail(emailTarget?.emailAddress);
        setUnverifiedEmailTarget(
          emailTarget && !emailTarget.isConfirmed ? emailTarget : null
        );
      } else {
        setEmail("");
        setUnverifiedEmailTarget(null);
      }

      if (smsTarget) {
        // Find by id from the data to get latest data
        smsTarget = data.smsTargets?.find((sms) => sms.id === smsTarget?.id);
        setPhone(smsTarget?.phoneNumber ?? "");
      } else {
        setPhone("");
      }

      if (telegramTarget) {
        telegramTarget = data.telegramTargets?.find(
          (telegram) => telegram.id === telegramTarget?.id
        );
        setTelegram(telegramTarget?.telegramId);
        setTelegramConfirmationUrl(telegramTarget.confirmationUrl);
      } else {
        setTelegram("");
        setTelegramConfirmationUrl("");
      }
    },
    [publicTopics]
  );

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
            emoji: "",
            emojiAria: "",
            title: announcement.variables[2].value,
            body: announcement.variables[1].value,
            date: announcement.date,
            isActive: true,
          };
        });
        setTimelineCards(timelineCardsObject);
        if (isAuthenticated && publicAnnouncements > 0 && alertExists) setAlertsShow(true);
      })();
    } catch (e) {
      console.log("error", e);
    }
  }, [alertExists, isAuthenticated]);

  const handleSoftware = useCallback(async () => {
    setIsLoggingIn(true);
    try {
      await logIn({ signMessage });
      const dataAfterLoggingIn = await fetchData();
      reflectNotifiData(dataAfterLoggingIn);
    } catch (e) {
      console.log("error", e);
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

    if (
      isInitialized &&
      isAuthenticated &&
      publicKey &&
      data &&
      publicTopics.length > 0
    ) {
      isNotifiInitialized.current = true;
      reflectNotifiData(data);
    }
  }, [
    reflectNotifiData,
    data,
    isInitialized,
    isAuthenticated,
    publicKey,
    publicTopics,
  ]);

  const broadcastMemo = useCallback(
    async (logValue) => {
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
            },
          ],
          data: Buffer.from(logValue, "utf-8"),
          programId: new PublicKey(
            "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"
          ),
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
    },
    [connection, publicKey, sendTransaction]
  );

  // Disabled if No alerts selected and inputs are empty
  const isSubscribeDisabled =
    !Object.keys(checkedStates).some((key) => checkedStates[key]) ||
    (email === "" && telegram === "" && phone.length < 4) ||
    subscribeLoading;

  const handleHardware = useCallback(async () => {
    setIsLoggingIn(true);
    try {
      const { logValue } = await beginLoginViaTransaction();
      const signature = await broadcastMemo(logValue);
      await completeLoginViaTransaction({ transactionSignature: signature });
      const dataAfterLoggingIn = await fetchData();
      reflectNotifiData(dataAfterLoggingIn);
    } catch (e) {
      console.log("error", e);
    }
    setIsLoggingIn(false);
  }, [
    beginLoginViaTransaction,
    broadcastMemo,
    completeLoginViaTransaction,
    fetchData,
    reflectNotifiData,
  ]);

  const handleLogIn = useCallback(async () => {
    if (useHardwareWallet) {
      await handleHardware();
    } else {
      await handleSoftware();
    }
  }, [handleHardware, handleSoftware, useHardwareWallet]);


  const announcements = (
    <Announcements
      timelineCards={timelineCards}
      setAlertsShow={setAlertsShow}
      onClickClose={onModalClose}
      isAlerts={true}
      handleBackToSelection={handleBackToSelection}
    ></Announcements>
  );

  const noConnectedWallet = (
    <DialogContent>
      <DialogContentText className={classes.walletNotConnectedBody}>
        <LinkOffIcon />
        Wallet not connected!
        <br />
      </DialogContentText>
    </DialogContent>
  );

  const signMessageForm = (
    <>
      <DialogHeader
        hasNoData={hasNoData}
        onClickClose={onModalClose}
        onBackClick={onBackClick}
      />
      {publicKey !== null ? (
        <>
          <DialogContent>
            <DialogContentText>
              Sign a message with your wallet to log in to Notifi
              <br />
              <br />
              Using a hardware wallet requires you to broadcast a transaction.
              <br />
              This will cost gas!
            </DialogContentText>
            <FormGroup className={classes.centeredControls}>
              <FormControlLabel
                control={
                  <Checkbox
                    className={classes.checkbox}
                    color="primary"
                    checked={useHardwareWallet}
                    onChange={handleHardwareWalletToggled}
                  />
                }
                label="Use Hardware Wallet"
              />
            </FormGroup>
          </DialogContent>
          <DialogActions className={classes.centeredActions}>
            <Button
              className={classes.link}
              color="primary"
              variant="contained"
              disabled={isLoggingIn}
              onClick={handleLogIn}
            >
              Sign Message
            </Button>
          </DialogActions>
        </>
      ) : (
        noConnectedWallet
      )}
    </>
  );

  const subscribeForm = (
    <>
      <DialogHeader
        hasNoData={hasNoData}
        onClickClose={onModalClose}
        onBackClick={onBackClick}
      />
      <DialogContent>
        <DialogContentText>
            To subscribe to MonkeDAO announcements, please enter your email address, Telegram ID, and/or phone number.
        </DialogContentText>
        <TextField
          autoFocus
          id="name"
          type="email"
          className={classes.iconTextField}
          margin="dense"
          fullWidth
          variant="standard"
          value={email}
          onChange={handleEmail}
          InputProps={{
            className: classes.textFieldInput,
            disableUnderline: true,
            placeholder: "Email Address",
            startAdornment: (
              <InputAdornment
                className={classes.inputAdornment}
                position="start"
                variant="filled"
              >
                <img alt="Email Address" src="/icn-mail.svg" />
              </InputAdornment>
            ),
            endAdornment: unverifiedEmailTarget ? (
              <Link
                href="#"
                color="secondary"
                onClick={() => {
                  sendEmailTargetVerification({
                    targetId: unverifiedEmailTarget.id,
                  }).catch((e) => {
                    console.log(e, "error");
                  });
                }}
                target="_blank"
                rel="noopener"
              >
                Resend&nbsp;Verification
              </Link>
            ) : null,
          }}
        />
        <br />
        <TextField
          id="name"
          type="text"
          margin="dense"
          className={classes.iconTextField}
          fullWidth
          variant="standard"
          value={telegram}
          onChange={handleTelegram}
          InputProps={{
            className: classes.textFieldInput,
            disableUnderline: true,
            placeholder: "Telegram ID",
            startAdornment: (
              <InputAdornment
                className={classes.inputAdornment}
                position="start"
                variant="filled"
              >
                <img alt="Telegram ID" src="/icn-telegram.svg" />
              </InputAdornment>
            ),
            endAdornment: telegramConfirmationUrl ? (
              <Link
                color="secondary"
                href={telegramConfirmationUrl}
                target="_blank"
                rel="noopener"
              >
                Verify&nbsp;telegram
              </Link>
            ) : null,
          }}
        />
        <br />
        <div className={clsx(classes.iconTextField, classes.smsInputContainer)}>
          <img
            className={classes.smsIcon}
            alt="Phone Number"
            src="/icn-sms.svg"
          />
          <div ref={phoneRef}>
            <MuiPhoneNumber
              name="phone"
              data-cy="user-phone"
              defaultCountry={"us"}
              onlyCountries={[
                "us",
                "au",
                "at",
                "be",
                "br",
                "ca",
                "dk",
                "fi",
                "fr",
                "de",
                "hk",
                "hu",
                "is",
                "my",
                "no",
                "ph",
                "pl",
                "pt",
                "sg",
                "kr",
                "es",
                "se",
                "ch",
                "tw",
                "uk",
              ]}
              variant="standard"
              value={phone}
              onChange={handlePhone}
              inputClass={classes.textFieldInput}
              InputProps={{
                placeholder: "Phone Number",
                disableUnderline: true,
              }}
            />
          </div>
        </div>
        <br />
        <FormGroup className={classes.notCenteredControls}>
          {publicTopics.map((topic) => {
            const { topicName, displayName } = topic;
            return (
              <FormControlLabel
                key={topicName}
                control={
                  <Switch
                    color="primary"
                    checked={checkedStates[topicName] || false}
                    onChange={() => handleTopicChecked(topicName)}
                  />
                }
                label={displayName}
              />
            );
          })}
        </FormGroup>
      </DialogContent>
      <DialogActions className={classes.centeredActions}>
        <Button
          disabled={hasNoData ? isSubscribeDisabled : false}
          className={isSubscribeDisabled ? classes.disabled : classes.link}
          color="primary"
          variant="contained"
          onClick={handleSubscribe}
        >
          {showSubscribeText()}
        </Button>
      </DialogActions>
    </>
  );

  function setCard(isAuthenticated, alertsShow) {

    if (!isAuthenticated) return signMessageForm;
    if (alertsShow) return announcements;

    if (isAuthenticated && alertsShow === false) {
      return subscribeForm;
    }
  }

  const formCard = (
    <Box className={classes.sectionBody}>
      {setCard(isAuthenticated, alertsShow)}
    </Box>
  );

  return <ThemeProvider theme={theme}>{formCard}</ThemeProvider>;
}
