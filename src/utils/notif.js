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

  export const getPublicTopics = async () => {
    try {
      const response = await fetch("https://api.notifi.network/gql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
          query PublicTopics {
            publicTopics(input: { collectionName: "smb" }) {
              nodes {
                topicName
                displayName
              }
            }
          }
        `,
        }),
      });
      const result = await response.json();
      return result.data?.publicTopics?.nodes ?? [];
    } catch (e) {
      console.error(e);
      return [];
    }
  }