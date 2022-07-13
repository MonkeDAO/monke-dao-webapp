export const convertWalletToDialectWallet = (wallet) => ({
  publicKey: wallet.publicKey,
  connected:
    wallet.connected &&
    !wallet.connecting &&
    !wallet.disconnecting &&
    Boolean(wallet.publicKey),
  signMessage: wallet.signMessage,
  signTransaction: wallet.signTransaction,
  signAllTransactions: wallet.signAllTransactions,
  // In case Sollet will become an option
  diffieHellman: wallet.wallet?.adapter?._wallet?.diffieHellman
    ? async (pubKey) => {
      return wallet.wallet?.adapter?._wallet?.diffieHellman(pubKey);
    }
    : undefined,
});
