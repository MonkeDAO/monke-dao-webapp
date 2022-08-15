import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import { Box, Link } from '@material-ui/core';
import { useMediaQuery } from '@material-ui/core';
import clsx from 'clsx';
import { TWITTER_BLUE, DISCORD_BLUE } from '../constants/colors';
import { WalletMultiButton } from '@solana/wallet-adapter-material-ui';
import NotificationsSwitch from './NotificationsSwitch';

const theme = createTheme({
  palette: {
    primary: {
      main: TWITTER_BLUE,
    },
    secondary: {
      main: DISCORD_BLUE,
    },
  },
});

const useStyles = makeStyles((theme) => ({
  '@global': {},
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
  socialContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: theme.spacing(2),
    '&.sm': {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(3),
      gap: theme.spacing(1),
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
  bell: {
    marginRight: theme.spacing(2),
    '&.sm': {
      display: 'inline-block',
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(3),
      verticalAlign: 'bottom',
    },
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
}));

export function Header() {
  const classes = useStyles();
  const isXsScreenAndSmaller = useMediaQuery(theme.breakpoints.down('xs'));
  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="sticky"
        color="default"
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
              alt="MonkeDao logo"
              src="/MonkeDAO_Logo_Positive.png"
              className={classes.logo}
            />
          </Box>
          <Box
            className={clsx(classes.socialContainer, {
              sm: isXsScreenAndSmaller,
            })}
          >
            {/* <DialectProviders>
              <NotificationsButton
                dialectId="monkedao-notifications"
                pollingInterval={5000}
                channels={NOTIFICATION_CHANNELS}
                notifications={NOTIFICATION_TYPES}
              />
            </DialectProviders> */}
            <Box>
              <NotificationsSwitch />
            </Box>

            <Box>
              <WalletMultiButton />
            </Box>
            {/* <Box
            className={clsx(classes.social, classes.discord, {
              sm: isXsScreenAndSmaller,
            })}
          >
            <Button
              href='https://discord.gg/TscZwJ7jbX'
              color='secondary'
              variant='contained'
              className={classes.link}
            >
              <img
                alt='Subscribe logo'
                src='/plus.svg'
                className={classes.plusLogo}
              />
              Subscribe
            </Button>
          </Box> */}
            {/* <Box
            className={clsx(classes.social, classes.discord, {
              sm: isXsScreenAndSmaller,
            })}
          >
            <Button
              href='https://discord.gg/TscZwJ7jbX'
              color='secondary'
              variant='contained'
              className={classes.link}
            >
              <img
                alt='Discord logo'
                src='/discord.svg'
                className={classes.buttonLogo}
              />
              Join the Discord
            </Button>
          </Box> */}
            <Box className={clsx(classes.social, { sm: isXsScreenAndSmaller })}>
              <Button
                href="https://twitter.com/MonkeDAO"
                color="primary"
                variant="contained"
                className={classes.link}
              >
                <img
                  alt="Twitter logo"
                  src="/twitter.svg"
                  className={classes.buttonLogo}
                />
                Follow us
              </Button>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <div className={classes.intro}>
        <p>
          {'We’re the first DAO to launch a staking pool on Solana.'}
          <br />
          <Link
            href="https://daopool.monkedao.io/"
            underline="hover"
            className={classes.stakeLink}
            target="_blank"
            rel="noopener"
          >
            Stake with DAOPool to receive daoSOL, while earning up to 7% on your
            staked SOL! →
          </Link>
        </p>
      </div>
    </ThemeProvider>
  );
}
