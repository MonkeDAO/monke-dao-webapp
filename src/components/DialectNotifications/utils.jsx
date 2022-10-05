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
});

export const NOTIFICATION_CHANNELS = ['sms', 'email', 'telegram', 'web3'];

export const NOTIFICATION_TYPES = [
  {
    name: 'MonkeDAO Announcements',
  },
  {
    name: 'Events & Updates',
  },
  {
    name: 'Upcoming Whitelist Access',
  },
];
