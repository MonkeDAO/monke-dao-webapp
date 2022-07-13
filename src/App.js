import React, { useMemo } from 'react';
import { Header } from './components/Header';
import { Cards } from './components/Cards';
import SmoothScroll from 'smooth-scroll';
import '@dialectlabs/react-ui/index.css';
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
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { WalletDialogProvider } from '@solana/wallet-adapter-material-ui';
import {ConnectionConfig, clusterApiUrl, PublicKey} from '@solana/web3.js';
import {
  ConnectionProvider, useWallet,
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
import {
  Backend, defaultVariables,
  DialectContextProvider,
  DialectThemeProvider,
  DialectUiManagementProvider,
  TokenStore
} from "@dialectlabs/react-ui";
import {convertWalletToDialectWallet} from "./utils/notif";

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
    '.dialect': {
      fontFamily: 'Space Grotesk, serif',
    }
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

const useDialectStyles = makeStyles((theme) => ({
  // Dialect Styles
  primaryBg: {
    backgroundColor: '#f3efcd',
  },
  primaryText: {
    color: '#184623'
  },
  highlight: {
    backgroundColor: '#ffffff',
  },
  toggleBackground: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)'
  },
  bold: {
    fontWeight: 'bold'
  },
  notificationButton: {
    backgroundColor: '#184623',
    color: '#f3efcd',
    width: theme.spacing(5),
    height: theme.spacing(5)
  },
  notificationWrapper: {
    top: theme.spacing(6)
  },
  notificationModal: {
    border: '1px solid #A5973D',
    borderRadius: 10,
  },
  header: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  button: {
    backgroundColor: '#184623',
    color: '#f3efcd',
    borderColor: '#184623'
  },
  logo: {
    '& svg': {
      marginTop: theme.spacing(0.4)
    },
  },
  fontFamilyOverride: {
    fontFamily: 'Space Grotesk, serif',
    '&::placeholder': {
      fontFamily: 'Space Grotesk, serif',
    }
  }
}))

const theme = createTheme({
  typography: {
    fontFamily: ['Space Grotesk', 'serif'].join(','),
  },
});

const RPC_URL = process.env.REACT_APP_SOLANA_RPC_HOST;
const MONKE_DAO_PUBLIC_KEY = new PublicKey('BiM9z9TiFFtXF1oh62QBWG8EJycMTDcQ4tfKBhFyuope');

const DialectProviders = ({ children }) => {
  const classes = useDialectStyles();
  const wallet = useWallet();
  const dialectWallet = useMemo(() => convertWalletToDialectWallet(wallet), [wallet]);

  // Basic configuration for dialect. Target mainnet-beta and dialect cloud production environment
  const dialectConfig = useMemo(
    () => ({
      backends: [Backend.DialectCloud, Backend.Solana],
      environment: 'production',
      solana: {
        rpcUrl: RPC_URL
      },
      dialectCloud: {
        tokenStore: TokenStore.createLocalStorage(),
      },
    }),
[]
  );

  const themeVariables = useMemo(() => ({
    light: {
      textStyles: {
        body: `${defaultVariables.light.textStyles.body} ${classes.bold}`,
        small: `${defaultVariables.light.textStyles.small} ${classes.bold}`,
        bigText: `${defaultVariables.light.textStyles.bigText} ${classes.bold}`,
        header: `${defaultVariables.light.textStyles.header} ${classes.bold}`,
        link: `${defaultVariables.light.textStyles.link} ${classes.bold}`,
      },
      colors: {
        bg: classes.primaryBg,
        primary: classes.primaryText,
        accent: classes.primaryText,
        highlight: classes.highlight,
        // Hack to fix logo spacing
        highlightSolid: `${defaultVariables.light.colors.highlightSolid} ${classes.logo}`,
        toggleBackground: classes.toggleBackground
      },
      bellButton: classes.notificationButton,
      modal: classes.notificationModal,
      modalWrapper: `${defaultVariables.light.modalWrapper} ${classes.notificationWrapper}`,
      header: `${defaultVariables.light.header} ${classes.header}`,
      button: `${defaultVariables.light.button} ${classes.button}`,
      input: `${defaultVariables.light.input} ${classes.fontFamilyOverride}`,
      outlinedInput: `${defaultVariables.light.outlinedInput} ${classes.fontFamilyOverride}`,
      textArea: `${defaultVariables.light.textArea} ${classes.fontFamilyOverride}`,
    }
  }), [classes]);

  return (
    <DialectContextProvider
      config={dialectConfig}
      wallet={dialectWallet}
      dapp={MONKE_DAO_PUBLIC_KEY}
    >
      <DialectUiManagementProvider>
        <DialectThemeProvider theme="light" variables={themeVariables}>
          {children}
        </DialectThemeProvider>
      </DialectUiManagementProvider>
    </DialectContextProvider>
  );
}

const App = () => {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = WalletAdapterNetwork.Devnet;
  const config = {
    /** Optional commitment level */
    commitment: 'finalized',
    /** Optional Disable retring calls when server responds with HTTP 429 (Too Many Requests) */
    disableRetryOnRateLimit: false,
    /** time to allow for the server to initially process a transaction (in milliseconds) */
    confirmTransactionInitialTimeout: 150000,
  };
  const connection = new anchor.web3.Connection(
    RPC_URL ? RPC_URL : anchor.web3.clusterApiUrl('devnet'),
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
          <DialectProviders>
            <Router>
              <Routes>
                <Route path='/' element={<Home />} />
              </Routes>
            </Router>
          </DialectProviders>
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
