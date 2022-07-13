export const getCreatorAnnouncements = async (topicName: string) => {
    try {
      const response = await fetch("https://api.notifi.network/gql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
          query PublicUserTopicPost {
            publicUserTopicPost(getPublicUserTopicPostInput: {topicName: "smb__creatorUpdates"}) {
              nodes {
                id
                topicName
                variables {
                  key
                  value
                }
                createdDate
              }
            }
          }
        `,
        }),
      });
      const result = await response.json();
      return result.data.publicUserTopicPost.nodes;
    } catch (e) {
      console.error(e);
      return [];
    }
  };

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
  diffieHellman: wallet.wallet?.adapter?._wallet?.diffieHellman
    ? async (pubKey) => {
      return wallet.wallet?.adapter?._wallet?.diffieHellman(pubKey);
    }
    : undefined,
});
