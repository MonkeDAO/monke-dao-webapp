import React, { useMemo } from 'react';
import { Header } from './components/Header';
import { Cards } from './components/Cards';
import SmoothScroll from 'smooth-scroll';
import './App.css';

import { Container, Typography, useMediaQuery } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  createTheme,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core/styles';
import clsx from 'clsx';
import Validator from './components/Validator';
import Footer from './components/Footer';
import Roadmap from './components/Roadmap';
import Announcements from './components/Announcements';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { WalletDialogProvider } from '@solana/wallet-adapter-material-ui';
import { ConnectionConfig, clusterApiUrl } from '@solana/web3.js';
import {
	ConnectionProvider,
	WalletProvider,
} from '@solana/wallet-adapter-react';
import {
  PhantomWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import {
  createDefaultAuthorizationResultCache,
  SolanaMobileWalletAdapter,
} from '@solana-mobile/wallet-adapter-mobile';
import * as anchor from '@project-serum/anchor';

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const useStyles = makeStyles((theme) => ({
  '@global': {
    body: {
      minHeight: '100vh',
      position: 'relative',
      paddingBottom: 247,
    },
  },
  bananasBackground: {
    backgroundColor: '#f3efcd',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    height: '100%',
    zIndex: '-1',

    '&.small-bananas-background': {
      backgroundSize: 'cover',
    },
    '&.xs-bananas-background': {
      backgroundSize: 'contain',
    },
  },
  heroTitle: {
    color: '#184623',
    flexGrow: 1,
    fontWeight: '600',
    marginTop: 0,
    fontSize: 32,
    '&.sm': {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  heroContent: {
    fontFamily: 'Space Grotesk',
    color: '#184623',
    marginTop: theme.spacing(2.5),
    padding: 0,
    fontSize: 18,
    '&.container': {
      marginTop: 0,
      paddingTop: theme.spacing(11),
    },
    '&.sm': {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  cardsContainer: {
    maxWidth: 1072,
    // maxWidth: 1040,
    width: '100%',
    margin: '0 auto',
    marginTop: 120,
    paddingBottom: 50,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

const theme = createTheme({
  typography: {
    fontFamily: ['Space Grotesk', 'serif'].join(','),
  },
});

const App = () => {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = WalletAdapterNetwork.Devnet;
  const rpcHost = process.env.REACT_APP_SOLANA_RPC_HOST;
  const config = {
    /** Optional commitment level */
    commitment: 'finalized',
    /** Optional Disable retring calls when server responds with HTTP 429 (Too Many Requests) */
    disableRetryOnRateLimit: false,
    /** time to allow for the server to initially process a transaction (in milliseconds) */
    confirmTransactionInitialTimeout: 150000,
  };
  const connection = new anchor.web3.Connection(
    rpcHost ? rpcHost : anchor.web3.clusterApiUrl('devnet'),
    config
  );
  
  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
  // Only the wallets you configure here will be compiled into your application, and only the dependencies
  // of wallets that your users connect to will be loaded.
  const wallets = useMemo(
    () => [
        new PhantomWalletAdapter(),
    ],
    [network]
);
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletDialogProvider>
          <Router>
            <Routes>
              <Route path='/announcements' element={<Announcements />} />
              <Route path='/' element={<Home />} />
            </Routes>
          </Router>
        </WalletDialogProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

const Home = () => {
  const classes = useStyles();
  const isSmScreenAndSmaller = useMediaQuery(theme.breakpoints.down('sm'));
  const isXsScreenAndSmaller = useMediaQuery(theme.breakpoints.down('xs'));
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <div
        className={
          isXsScreenAndSmaller
            ? clsx(classes.bananasBackground, 'xs-bananas-background')
            : isSmScreenAndSmaller
            ? clsx(classes.bananasBackground, 'small-bananas-background')
            : classes.bananasBackground
        }
      >
        <Container
          p={2}
          maxWidth='sm'
          component='main'
          className={clsx(classes.heroContent, 'container')}
        >
          <Typography
            component='h1'
            variant='h4'
            align='center'
            className={clsx(classes.heroTitle, { sm: isXsScreenAndSmaller })}
            gutterBottom
          >
            MonkeDAO is a curated community of monkes
          </Typography>
          <Typography
            variant='h6'
            align='center'
            className={clsx(classes.heroContent, { sm: isXsScreenAndSmaller })}
            component='p'
            gutterBottom
          >
            Welcome to MonkeDAO, the first NFT DAO on Solana.
          </Typography>
          <Typography
            variant='h6'
            align='center'
            className={clsx(classes.heroContent, { sm: isXsScreenAndSmaller })}
            component='p'
            gutterBottom
          >
            We’re working to become the premier decentralized community of Web3,
            by providing unparalleled value to our members and the Solana
            ecosystem through community-led projects, connections and
            innovations.
          </Typography>
        </Container>

        <div className={classes.cardsContainer}>
          <Cards />
        </div>

        <Validator />
      </div>
      <Roadmap />
      <Footer />
    </ThemeProvider>
  );
};

export default App;
