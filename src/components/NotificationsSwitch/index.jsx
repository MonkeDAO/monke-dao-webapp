import { defaultVariables } from "@dialectlabs/react-ui";
import clsx from "clsx";
import DialectNotifications from "../DialectNotifications";
import NotificationBox from "./NotificationBox";
import NotifiSubscribe from '../NotifiNotifications/NotifiSubscribe'

import useOutsideAlerter from "./useOutsideAlerter";

import { useRef, useState } from "react";

import { Box, IconButton, makeStyles, Typography } from "@material-ui/core";

const MODAL_STATE_SELECTION = "selection";
const MODAL_STATE_DIALECT = "dialect";
const MODAL_STATE_NOTIFI = "notifi";

const notificationSolutions = [
  {
    channels: ["Wallet", "Email", "Text", "Telegram"],
    description: `Get announcements delivered directly to your wallet, along with telegram, sms and email.`,
    modalState: MODAL_STATE_DIALECT,
    name: "Dialect",
  },
  {
    channels: ["Email", "Text", "Telegram", "Notifi Hub"],
    description: `Get announcements delivered directly to your email address, phone number, and/or Telegram.`,
    modalState: MODAL_STATE_NOTIFI,
    name: "Notifi",
  }
];

export default function NotificationsSwitch() {
  const classes = useStyles();
  const wrapperRef = useRef(null);
  const bellRef = useRef(null);
  const phoneRef = useRef(null);
  const [modalState, setModalState] = useState(MODAL_STATE_SELECTION);
  const [openModal, setOpenModal] = useState(false);

  useOutsideAlerter(wrapperRef, bellRef, phoneRef, setOpenModal);

  const BellIcon = defaultVariables.dark.icons.bell;

  return (
    <div className={classes.wrapper} ref={wrapperRef}>
      {openModal && (
        <div
          className={clsx(
            defaultVariables.dark.modalWrapper,
            classes.modalWrapper
          )}
        >
          {modalState === MODAL_STATE_SELECTION && (
            <Box className={classes.selectionWrapper}>
              <Typography variant="h5" gutterBottom className={classes.header}>
                MonkeDAO Notifications
              </Typography>
              <Box className={classes.notificationsWrapper}>
                {notificationSolutions.map((solution) => (
                  <NotificationBox
                    channels={solution.channels}
                    description={solution.description}
                    key={solution.name}
                    name={solution.name}
                    onSelect={() => setModalState(solution.modalState)}
                  />
                ))}
              </Box>
            </Box>
          )}

          {modalState === "dialect" && (
            <DialectNotifications
              onModalClose={() => {
                setOpenModal(false);
              }}
              onBackClick={() => setModalState(MODAL_STATE_SELECTION)}
            />
          )}
          {modalState === "notifi" && (
            <NotifiSubscribe
              phoneRef={phoneRef}
              onModalClose={() => {
                setOpenModal(false);
              }}
              onBackClick={() =>
                setModalState(MODAL_STATE_SELECTION)}
              setModalState={setModalState}
            />
          )}
        </div>
      )}
      <IconButton
        className={classes.announcementsButton}
        color="primary"
        onClick={() => setOpenModal((prev) => !prev)}
        ref={bellRef}
      >
        <BellIcon />
      </IconButton>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  wrapper: { position: "relative" },
  modalWrapper: {},
  announcementsButton: {
    color: "#f3efcd !important",
    backgroundColor: "#164120 !important",
  },
  announcementsLogo: {
    marginRight: 8,
    width: "15%",
    filter: "invert(1)",
  },
  header: {
    fontFamily: "Space Grotesk",
    fontWeight: "600",
  },
  notificationsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  selectionWrapper: {
    color: "#f3efcd",
    fontFamily: "Space Grotesk",
    fontWeight: "600",
    position: "absolute",
    right: 0,
    backgroundColor: "#164120",
    padding: "1rem",
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));
