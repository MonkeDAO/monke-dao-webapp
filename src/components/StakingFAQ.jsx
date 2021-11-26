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
      fontWeight: "bold",
      fontSize: "20px;",
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
          <details className={classes.details}>
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
            title: "FAQ Title",
            content: "NFT stands for \"non-fungible token.\" An NFT is basically data that is stored or accounted for in a digital ledger, and that data represents something specific. An NFT can, for example, represent a piece of art, a music album or other types of digital files."
          },
          {
            title: "Why would I want to own an NFT? Can I make money on it?",
            content: "NFT stands for \"non-fungible token.\" An NFT is basically data that is stored or accounted for in a digital ledger, and that data represents something specific. An NFT can, for example, represent a piece of art, a music album or other types of digital files."
          },
          {
            title: "What’s the role of the Operations Multisig?",
            content: "NFT stands for \"non-fungible token.\" An NFT is basically data that is stored or accounted for in a digital ledger, and that data represents something specific. An NFT can, for example, represent a piece of art, a music album or other types of digital files."
          },
          {
            title: "If I stake my xSUSHI on another platform do I continue to earn SUSHI rewards?",
            content: "NFT stands for \"non-fungible token.\" An NFT is basically data that is stored or accounted for in a digital ledger, and that data represents something specific. An NFT can, for example, represent a piece of art, a music album or other types of digital files."
          },
          {
            title: "My SLP’s aren’t showing up on the site or in my wallet?",
            content: "NFT stands for \"non-fungible token.\" An NFT is basically data that is stored or accounted for in a digital ledger, and that data represents something specific. An NFT can, for example, represent a piece of art, a music album or other types of digital files."
          },
        ]}
      />
    </Container>
  )
}
