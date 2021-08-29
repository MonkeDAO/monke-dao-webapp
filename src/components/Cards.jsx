import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

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
    fontWeight: "600",
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
    height: 268,
    width: "100%",
  },
}));

const cards = [
  {
    title: "Join MonkeDao",
    description:
      "MonkeDAO is currently exclusive to Solana Monkey Business owners.",
    buttonText: "Join us",
    bg: "#000000",
    buttonColor: "#FAC300",
  },
  {
    title: "Don't have a monke?",
    description:
      "Buy your first monke from the Solana Monkey Business Marketplace.",
    buttonText: "Visit SMB Monkey Market",
    bg: "#7E3EB0",
    buttonColor: "white",
    buttonTextColor: "black",
  },
];

function GridItem({ classes, data, bg }) {
  return (
    // From 0 to 600px wide (smart-phones), I take up 12 columns, or the whole device width!
    // From 600-690px wide (tablets), I take up 6 out of 12 columns, so 2 columns fit the screen.
    // From 960px wide and above, I take up 25% of the device (3/12), so 4 columns fit the screen.
    <Grid item xs={12} sm={6} md={6} style={{ maxWidth: 496 }}>
      <Paper className={classes.paper} style={{ backgroundColor: data.bg }}>
        <Grid item xs container direction="column">
          <Grid item>
            <Typography className={classes.cardTitle}>{data.title}</Typography>
            <Typography className={classes.cardText}>
              {data.description}
            </Typography>
          </Grid>
          <Grid item>
            <Button
              href="#"
              variant="contained"
              style={{
                backgroundColor: data.buttonColor,
                color: data.buttonTextColor,
              }}
            >
              {data.buttonText}
            </Button>
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
      <Grid container justifyContent="space-between">
        <GridItem classes={classes} data={cards[0]} />
        <GridItem classes={classes} data={cards[1]} />
      </Grid>
    </ThemeProvider>
  );
}
