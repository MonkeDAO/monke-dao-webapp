import {
  Backend,
  defaultVariables,
  DialectContextProvider,
  DialectThemeProvider,
  DialectUiManagementProvider,
  TokenStore,
} from "@dialectlabs/react-ui";
// import { Metaplex } from "@metaplex-foundation/js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useCallback, useMemo } from "react";
import { useDialectStyles } from "./styles";
import { convertWalletToDialectWallet } from "./utils";

const MONKE_DAO_PUBLIC_KEY = new PublicKey(
  "BiM9z9TiFFtXF1oh62QBWG8EJycMTDcQ4tfKBhFyuope"
);
const MONKE_DAY_NFT_COLLECTION_KEY = new PublicKey(
  "SMBH3wF6baUj6JWtzYvqcKuj2XCKWDqQxzspY12xPND"
);

const DialectProviders = ({ children }) => {
  const { connection } = useConnection();
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
      environment: "production",
      solana: {
        rpcUrl: connection.rpcEndpoint,
      },
      dialectCloud: {
        tokenStore: TokenStore.createLocalStorage(),
      },
    }),
    [connection.rpcEndpoint]
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

        },
        colors: {
          bg: classes.primaryBg,
          primary: classes.primaryText,
          accent: classes.primaryText,
          highlight: classes.highlight,
          // Hack to fix logo spacing
          highlightSolid: `${defaultVariables.light.colors.highlightSolid} ${classes.logo}`,
        },
        addormentButton: `${defaultVariables.light.addormentButton} ${classes.addormentButton}`,
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

  // const metaplex = useMemo(() => new Metaplex(connection), [connection]);

  // const gate = useCallback(async () => {
  //   if (!wallet.publicKey) {
  //     return false;
  //   }
  //   const nfts = await metaplex.nfts().findAllByOwner(wallet.publicKey).run();
  //   return nfts
  //     .map((it) => it.collection)
  //     .filter((it) => Boolean(it))
  //     .some((it) => MONKE_DAY_NFT_COLLECTION_KEY.equals(it.key));
  // }, [wallet, metaplex]);

  return (
    <DialectContextProvider
      config={dialectConfig}
      wallet={dialectWallet}
      dapp={MONKE_DAO_PUBLIC_KEY}
    // gate={gate}
    >
      <DialectUiManagementProvider>
        <DialectThemeProvider theme="light" variables={themeVariables}>
          {children}
        </DialectThemeProvider>
      </DialectUiManagementProvider>
    </DialectContextProvider>
  );
};

export default DialectProviders;
