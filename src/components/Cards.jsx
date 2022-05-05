import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";
import clsx from 'clsx'
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { useMediaQuery } from "@material-ui/core";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2A90E8",
    },
    secondary: {
      main: "#184623",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    paddingTop: "50px",
  },
  cards: {
    width: "20vw",
    margin: "auto",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
    },
    fontColor: "#f3efcd",
    backgroundColor: "#184623",
  },
  cardText: {
    color: "#f3efcd",
    fontFamily: "Space Grotesk",
    fontWeight: "500",
    fontSize: 18,
    marginBottom: 24,
    whiteSpace: 'pre-wrap'
  },
  cardTitle: {
    paddingTop: 10,
    fontFamily: "Space Grotesk",
    fontWeight: "600",
    fontSize: 24,
    marginBottom: 24,
    color: '#f3efcd'
  },
  cardButtons: {
    display: "flex",
    justifyContent: "space-between",
  },
  paper: {
    borderRadius: 10,
    padding: 40,
    textAlign: "left",
    backgroundColor: '#184623',
    color: "#f3efcd",
    margin: "auto",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
    },
    fontColor: "#f3efcd",
    width: "100%",
    maxWidth: 496,
    "&.small": {
      padding: 20,
    },

    "&.full": {
      maxWidth: "100%",
      textAlign: "center"
    }
  },
  titleImage: {
    marginRight: 10,
    height: "32px",
    display: "inline",
    verticalAlign: "middle"
  },
  buttonImageContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonImageSpan: {
    marginRight: 8,
    textTransform: "none",
  },
  buttonImageSpanBefore: {
    marginLeft: 8,
    textTransform: "none"
  },
  buttonImageSmall: {
    maxWidth: 180,
  },
}));

const cards = [
  {
    title: "Join MonkeDAO",
    description:
      "MonkeDAO is currently exclusive to Solana Monkey Business owners.",
    buttonText: "Join the discord",
    buttonImage: "/discord-blue.svg",
    buttonImageBefore: true,
    buttonAlt: "Discord logo",
    bg: "#184623",
    buttonColor: "#f3efcd",
    buttonTextColor: "#184623",
    buttonUrl: "https://discord.gg/TscZwJ7jbX"
  },
  {
    title: "Don't have a monke?",
    description:
      "Buy your first monke from the Solana Monkey Business Marketplace.",
    buttonText: "Visit",
    buttonImage: "/smb-market.svg",
    buttonAlt: "SMB Market Logo",
    bg: "#184623",
    buttonColor: "#f3efcd",
    buttonTextColor: "#184623",
    buttonUrl: "https://market.solanamonkey.business/",
  },
  {
    titleImage: "/daopool-logo.svg",
    titleImageAlt: "DAOPool logo",
    description:
      `Stake with DAOPool to receive daoSOL, while earning up to 7% on your staked SOL!

      We were the the first DAO to launch a validator on Solana, and now we’re the first to launch a staking pool. All of the SOL staked in DAOPool is distributed to the Solana communities’ validators, with the goal of further decentralizing the network while supporting all DAOs across the ecosystem.`,
    bg: "#184623",
    buttonText: "Visit DAOPool →",
    buttonColor: "#f3efcd",
    buttonTextColor: "#184623",
    buttonUrl: "https://daopool.monkedao.io/",
    externalLink: true
  }
];

function GridItem({ classes, data, bg, full }) {
  const isXsScreenAndSmaller = useMediaQuery(theme.breakpoints.down("xs"));

  const buttonStyles = {
    backgroundColor: data.buttonColor,
    color: data.buttonTextColor,
    textTransform: "none",
    fontFamily: "Open Sans",
    fontWeight: 700,
    padding: "12px 16px",
  };

  if (full) {
    buttonStyles.margin = "0 auto";
  }

  return (
    // From 0 to 600px wide (smart-phones), I take up 12 columns, or the whole device width!
    // From 600-690px wide (tablets), I take up 6 out of 12 columns, so 2 columns fit the screen.
    // From 960px wide and above, I take up 25% of the device (3/12), so 4 columns fit the screen.
    <Grid item sm={12} md={full ? 12 : 6}>
      <Paper
        className={clsx(classes.paper, { ["small"]: isXsScreenAndSmaller, full })}
        style={{ backgroundColor: data.bg }}
      >
        <Grid item xs container direction="column">
          <Grid item>
            <Typography className={classes.cardTitle}>
              {
                data.titleImage && <img className={classes.titleImage} src={data.titleImage} alt={data.titleImageAlt}/>
              }
              {data.title}
            </Typography>
            <Typography className={classes.cardText}>
              {data.description}
            </Typography>
          </Grid>
          <Grid item className={classes.cardButtons}>
            <Button
              href={data.buttonUrl}
              variant="contained"
              style={buttonStyles}
              target={data.externalLink && "_blank"}
              rel={data.externalLink && "noopener"}
            >
              {buttonContent(data, classes, isXsScreenAndSmaller)}
            </Button>
            {data.cardAccent && (
              <img
                alt={data.cardAccentAlt && data.cardAccentAlt}
                src={data.cardAccent}
              />
            )}
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}

export function Cards() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Grid container justifyContent="space-between" spacing={6}>
        <GridItem classes={classes} data={cards[0]} />
        <GridItem classes={classes} data={cards[1]} />
      </Grid>
      <Grid container justifyContent="space-between" spacing={6}>
        <GridItem classes={classes} data={cards[2]} full={true} />
      </Grid>
    </ThemeProvider>
  );
}

function buttonContent(
  { buttonText, buttonImage, buttonAlt, buttonImageBefore },
  classes,
  isXsScreenAndSmaller
) {
  if (buttonImage) {
    const image = <img
      alt={buttonAlt && buttonAlt}
      src={buttonImage}
      className={
        isXsScreenAndSmaller ? classes.buttonImageSmall : undefined
      }
    />
    return (
      <div className={classes.buttonImageContent}>
        {
          buttonImageBefore && image
        }
        <span className={buttonImageBefore ? classes.buttonImageSpanBefore : classes.buttonImageSpan}>{buttonText}</span>
        {
          !buttonImageBefore && image
        }
      </div>
    );
  }

  return buttonText;
}
