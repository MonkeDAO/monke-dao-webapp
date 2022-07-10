export const getCreatorAnnouncements = async (topicName: string) => {
    try {
      const response = await fetch("https://api.notifi.network/gql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
          query PublicUserTopicPost {
            publicUserTopicPost(getPublicUserTopicPostInput: {topicName: "thebryanjun__creatorUpdates"}) {
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