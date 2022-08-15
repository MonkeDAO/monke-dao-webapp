import { defaultVariables } from '@dialectlabs/react-ui';
import clsx from 'clsx';
import DialectNotifications from '../DialectNotifications';
import NotificationBox from './NotificationBox';

import useOutsideAlerter from './useOutsideAlerter';

import { useRef, useState } from 'react';

import { Box, Button, makeStyles, Typography } from '@material-ui/core';

const MODAL_STATE_SELECTION = 'selection';
const MODAL_STATE_DIALECT = 'dialect';

const notificationSolutions = [
  {
    channels: ['Wallet', 'Email', 'Text', 'Telegram'],
    description: `Get announcements delivered directly to your wallet, along with telegram, sms and email.`,
    modalState: MODAL_STATE_DIALECT,
    name: 'Dialect',
  },
];

export default function NotificationsSwitch() {
  const classes = useStyles();
  const wrapperRef = useRef(null);
  const bellRef = useRef(null);
  const [modalState, setModalState] = useState(MODAL_STATE_SELECTION);
  const [openModal, setOpenModal] = useState(false);
  useOutsideAlerter(wrapperRef, bellRef, setOpenModal);

  return (
    <div ref={wrapperRef}>
      {openModal && (
        <div className={clsx(defaultVariables.dark.modalWrapper, classes.modalWrapper)}>
          {modalState === MODAL_STATE_SELECTION && (
            // className="w-fit h-fit bg-bkg-5 -top-4 right-0 absolute rounded-lg shadow-md"
            <Box className={classes.selectionWrapper}>
              {/* className="h-full flex flex-col items-center pt-4"  */}
              <Typography variant="h5" gutterBottom className={classes.header}>
                MonkeDAO Notifications
              </Typography>
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
          )}

          {modalState === 'dialect' && (
            <DialectNotifications
              onModalClose={() => {
                setOpenModal(false);
              }}
              onBackClick={() => setModalState(MODAL_STATE_SELECTION)}
            />
          )}
        </div>
      )}
      <Button
        className={classes.announcementsButton}
        color='secondary'
        variant='contained'
        onClick={() => setOpenModal((prev) => !prev)}
        ref={bellRef}
      >
        <img
          alt='Announcements logo'
          src='/speaker.png'
          className={classes.announcementsLogo}
        />
        Announcements
      </Button>
    </div>
  );
}

const useStyles = makeStyles({
  announcementsButton: {
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
  announcementsLogo: {
    marginRight: 8,
    width: '15%',
    filter: "invert(1)"
  },
  modalWrapper: {
    height: 'fit-content',
  },
  header: {
    fontFamily: 'Space Grotesk',
    fontWeight: '600',
  },
  selectionWrapper: {
    color: '#f3efcd',
    fontFamily: 'Space Grotesk',
    fontWeight: '600',
    position: 'absolute',
    right: 0,
    backgroundColor: '#164120',
    padding: '1rem',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});
