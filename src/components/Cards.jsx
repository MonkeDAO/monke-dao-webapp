import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";

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
      main: "#000000",
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
    fontColor: "white",
    backgroundColor: "#7E3EB0",
  },
  cardText: {
    color: "white",
    fontFamily: "Open Sans",
    fontWeight: "500",
    fontSize: 18,
    marginBottom: 24,
  },
  cardTitle: {
    paddingTop: 10,
    fontFamily: ["Poppins", "Open Sans", "serif"].join(","),
    fontWeight: "600",
    fontSize: 24,
    marginBottom: 24,
  },
  cardButtons: {
    display: "flex",
    justifyContent: "space-between",
  },
  paper: {
    borderRadius: 10,
    padding: 40,
    textAlign: "left",
    color: "white",
    margin: "auto",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
    },
    fontColor: "white",
    width: "100%",
    maxWidth: 496,
    "&.small": {
      padding: 20,
    },
  },
  buttonImageContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonImageSpan: {
    marginRight: 8,
    color: "#7E3EB0",
    textTransform: "none",
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
    buttonText: "Join us",
    bg: "#000000",
    buttonColor: "#FAC300",
    buttonUrl: "https://discord.gg/TscZwJ7jbX",
    cardAccent: "/dao-shake-smb.svg",
    cardAccentAlt: "Image of MonkeDAO handshaking Solana Monkey Business",
  },
  {
    title: "Don't have a monke?",
    description:
      "Buy your first monke from the Solana Monkey Business Marketplace.",
    buttonText: "Visit",
    buttonImage: "/smb-monkey-market-logo.svg",
    buttonAlt: "SMB Monkey Market Logo",
    bg: "#7E3EB0",
    buttonColor: "white",
    buttonTextColor: "black",
    buttonUrl: "https://market.solanamonkey.business/",
  },
];

function GridItem({ classes, data, bg }) {
  const isXsScreenAndSmaller = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    // From 0 to 600px wide (smart-phones), I take up 12 columns, or the whole device width!
    // From 600-690px wide (tablets), I take up 6 out of 12 columns, so 2 columns fit the screen.
    // From 960px wide and above, I take up 25% of the device (3/12), so 4 columns fit the screen.
    <Grid item sm={12} md={6}>
      <Paper
        className={
          isXsScreenAndSmaller ? [classes.paper, "small"] : classes.paper
        }
        style={{ backgroundColor: data.bg }}
      >
        <Grid item xs container direction="column">
          <Grid item>
            <Typography className={classes.cardTitle}>{data.title}</Typography>
            <Typography className={classes.cardText}>
              {data.description}
            </Typography>
          </Grid>
          <Grid item className={classes.cardButtons}>
            <Button
              href={data.buttonUrl}
              variant="contained"
              style={{
                backgroundColor: data.buttonColor,
                color: data.buttonTextColor,
              }}
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
    </ThemeProvider>
  );
}

function buttonContent(
  { buttonText, buttonImage, buttonAlt },
  classes,
  isXsScreenAndSmaller
) {
  if (buttonImage) {
    return (
      <div className={classes.buttonImageContent}>
        <span className={classes.buttonImageSpan}>{buttonText}</span>
        <img
          alt={buttonAlt && buttonAlt}
          src={buttonImage}
          className={isXsScreenAndSmaller && classes.buttonImageSmall}
        />
      </div>
    );
  }

  return buttonText;
}
