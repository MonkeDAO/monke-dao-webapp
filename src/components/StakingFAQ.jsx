import React from "react";
import { Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useAccordionStyles = makeStyles(theme => ({
  accordion: {
    marginTop: theme.spacing(5),
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: "8px",
    padding: theme.spacing(5)
  },
  details: {
    fontSize: "16px",
    borderBottom: "1px solid white",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    position: "relative",

    "&:last-child": {
      borderBottom: "none"
    },

    "& summary": {
      cursor: "pointer",
      fontWeight: "600",
      fontSize: "18px;",
      listStyle: "none",
      paddingRight: "1.5em",

      "&::-webkit-details-marker": {
        display: "none"
      }
    },
    "& summary::after": {
      content: "'+'",
      position: "absolute",
      top: "20px",
      lineHeight: "20px",
      fontSize: "26px",
      fontWeight: "normal",
      right: "0"
    },

    "&[open] summary::after": {
      content: "'-'"
    }
  }
}))

function Accordion({ items }) {
  const classes = useAccordionStyles();

  return (
    <div className={classes.accordion}>
      {
        items.map((item, index) => (
          <details key={index} className={classes.details}>
            <summary>{item.title}</summary>
            <p>{item.content}</p>
          </details>
        ))
      }
    </div>
  )
}



export default function StakingFAQ() {
  return (
    <Container maxWidth="md" id="staking-faq">
      <Typography
        component="h3"
        variant="h5"
        align="center"
        gutterBottom
      >
        Staking FAQ
      </Typography>
      <Accordion
        items={[
          {
            title: "What is a validator?",
            content: "A validator is one of the basic building blocks of the Solana blockchain. They are servers running specialized software that help secure each and every transaction. From minting an NFT to exchanging tokens on a DEX, the reason you can trust that any action you take on Solana will succeed and be recorded is because of the work validators do behind the scenes."
          },
          {
            title: "Why did MonkeDAO start a validator?",
            content: "MonkeDAO is a completely independent, community organized DAO. We felt the best way to showcase our principles while securing the blockchain we rely on was to contribute to its community of validators. We want to highlight the positive, constructive aspects of crypto while serving as a resource for the entire Solana ecosystem."
          },
          {
            title: "What is staking and why should I do it?",
            content: "Staking is essential to how the Solana blockchain works. Solana runs on a “proof of stake” system, where individual owners of SOL can earn APY on their holdings by staking it with the validator. By doing so, you signal your support of that validator and provide it with a small share of the yield it provides."
          },
          {
            title: "Who is in control of my SOL while it is staked?",
            content: "You are! When you stake, your SOL always remains in your custody. A staking wallet paired to your private key holds your SOL and delegates it to a validator. At no point does the validator, MonkeDAO, or anyone else ever come in contact with your funds!"
          },
          {
            title: "How much do I make staking with MonkeDAO? How is it different than staking elsewhere?",
            content: "The staking rewards are largely determined by the solana ecosystem, but generally hover between 6%-7% APY."
          },
          {
            title: "What are the downsides to staking my SOL?",
            content: "The biggest inconvenience when staking is the brief staking/unstaking period that takes place. Solana runs on “epochs” and each epoch lasts roughly 2-3 days. Staking and unstaking both require a full epoch to take effect, so it can take up to 3 days to unstake your SOL before it returns to your standard wallet."
          },
          {
            title: "Why should I support MonkeDAO?",
            content: "MonkeDAO is committed to growing the entire Solana ecosystem and every SOL staked with us is put towards that goal. If there are other projects you support, be sure to check out our staking pool that is coming soon. Our staking pool will support a network of community run validators with the goal of helping others contribute to the Solana Ecosystem."
          },
        ]}
      />
    </Container>
  )
}
