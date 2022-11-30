import {
  Backend,
  defaultVariables,
  DialectContextProvider,
  DialectThemeProvider,
  DialectUiManagementProvider,
  Notifications,
  TokenStore
} from '@dialectlabs/react-ui';
import { nftModule, operationModule, programModule, resolveClusterFromConnection, rpcModule } from "@metaplex-foundation/js";

import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey } from '@solana/web3.js';
import { useCallback, useMemo } from 'react';
import { useDialectStyles } from './styles';
import { convertWalletToDialectWallet } from './utils';

const MONKE_DAO_PUBLIC_KEY = new PublicKey(
  'BiM9z9TiFFtXF1oh62QBWG8EJycMTDcQ4tfKBhFyuope'
);
const MONKE_DAY_NFT_COLLECTION_KEY = new PublicKey(
  'SMBH3wF6baUj6JWtzYvqcKuj2XCKWDqQxzspY12xPND'
);

const DIALECT_RPC = 'https://dialect-dialect-5d55.mainnet.rpcpool.com/';

const dialectConnection = new Connection(DIALECT_RPC);

class LightweightMetaplex {
  constructor(connection, options = {}) {
    this.connection = connection;
    this.cluster = options.cluster ?? resolveClusterFromConnection(connection);
    this.use(rpcModule());
    this.use(operationModule());
    this.use(programModule());
    this.use(nftModule());
  }

  use(plugin) {
    plugin.install(this);

    return this;
  }
}

const DialectWidget = ({ onModalClose, onBackClick, children }) => {
  const classes = useDialectStyles();
  const wallet = useWallet();
  const dialectWallet = useMemo(
    () => convertWalletToDialectWallet(wallet),
    [wallet]
  );

  // Basic configuration for dialect. Target mainnet-beta and dialect cloud production environment
  const dialectConfig = useMemo(
    () => ({
      backends: [Backend.DialectCloud],
      environment: 'production',
      solana: {
        rpcUrl: DIALECT_RPC,
      },
      dialectCloud: {
        tokenStore: TokenStore.createLocalStorage(),
      },
    }),
    []
  );

  const themeVariables = useMemo(
    () => ({
      light: {
        textStyles: {
          body: `${defaultVariables.light.textStyles.body} ${classes.bold} ${classes.fontFamilyOverride}`,
          small: `${defaultVariables.light.textStyles.small} ${classes.bold} ${classes.fontFamilyOverride}`,
          bigText: `${defaultVariables.light.textStyles.bigText} ${classes.bold} ${classes.fontFamilyOverride}`,
          header: `${defaultVariables.light.textStyles.header} ${classes.bold} ${classes.fontFamilyOverride}`,
          link: `${defaultVariables.light.textStyles.link} ${classes.bold} ${classes.fontFamilyOverride}`,
          input: `${defaultVariables.light.textStyles.input} ${classes.input} ${classes.fontFamilyOverride}`,
          label: `${defaultVariables.light.textStyles.input} ${classes.input} ${classes.fontFamilyOverride}`,
        },
        colors: {
          bg: classes.primaryBg,
          textPrimary: classes.primaryText,
          accent: classes.primaryText,
          highlight: classes.highlight,
          toggleBackground: classes.toggleBackground,
          toggleBackgroundActive: classes.toggleBackgroundActive,
          // Hack to fix logo spacing
          highlightSolid: `${defaultVariables.light.colors.highlightSolid} ${classes.logo}`,
        },
        adornmentButton: `${defaultVariables.light.adornmentButton} ${classes.adornmentButton}`,
        bellButton: classes.notificationButton,
        modal: classes.notificationModal,
        modalWrapper: `${defaultVariables.light.modalWrapper} ${classes.notificationWrapper}`,
        header: `${defaultVariables.light.header} ${classes.header}`,
        button: `${defaultVariables.light.button} ${classes.button}`,
        outlinedInput: `${defaultVariables.light.outlinedInput} ${classes.fontFamilyOverride} ${classes.outlinedInput}`,
        textArea: `${defaultVariables.light.textArea} ${classes.fontFamilyOverride}`,
        divider: `${defaultVariables.light.divider} ${classes.divider}`,
      },
    }),
    [classes]
  );

  const metaplex = useMemo(() => new LightweightMetaplex(dialectConnection), []);

  const gate = useCallback(async () => {
    if (!wallet.publicKey) {
      return false;
    }
    const nfts = await metaplex.nfts().findAllByOwner(wallet.publicKey).run();
    return nfts
      .map((it) => it.collection)
      .filter((it) => Boolean(it))
      .some((it) => MONKE_DAY_NFT_COLLECTION_KEY.equals(it.key));
  }, [wallet, metaplex]);

  return (
    <DialectContextProvider
      config={dialectConfig}
      wallet={dialectWallet}
      dapp={MONKE_DAO_PUBLIC_KEY}
      gate={gate}
    >
      <DialectUiManagementProvider>
        <DialectThemeProvider theme="light" variables={themeVariables}>
          <Notifications
            notifications={[
              {
                name: 'MonkeDAO Announcements',
              },
              {
                name: 'Events & Updates',
              },
              {
                name: 'Upcoming Whitelist Access',
              },
            ]}
            pollingInterval={15000}
            onModalClose={onModalClose}
            onBackClick={onBackClick}
            channels={['web3', 'telegram', 'sms', 'email']}
            gatedView="You must have a SMB in your wallet to sign up for & manage your notifications."
          />
        </DialectThemeProvider>
      </DialectUiManagementProvider>
    </DialectContextProvider>
  );
};

export default DialectWidget;
