import React from "react";
import { makeStyles, createTheme } from "@material-ui/core/styles";
import { Container, Grid, Typography, Link, useMediaQuery } from "@material-ui/core";
import Staking from "./Staking";
import StakingFAQ from "./StakingFAQ";

const theme = createTheme({
  palette: {
    primary: {
      main: "#184623",
    },
    secondary: {
      main: "#f3efcd",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "#184623",
    color: "#f3efcd",
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
  },
  validatorIntro: {
    marginBottom: theme.spacing(10)
  },
  image: {
    float: "right",
  },
  imageSm: {
    margin: "0 auto 40px auto",
    display: "block",
    position: "relative",
    left: "5%"
  },
  stakingHeader: {
    fontFamily: ["Space Grotesk", "Open Sans", "serif"].join(","),
    fontSize: 32
  },
  stakingIntro: {
    marginBottom: theme.spacing(3),
    fontFamily: ["Space Grotesk", "serif"].join(","),
  },
  stakingIntroSm: {
    textAlign: "center",
  },
  solanabeach: {
    display: "inline-block",
    backgroundColor: "#f3efcd",
    borderRadius: "8px",
    padding: "12px 16px",
    color: "black",
    fontSize: "16px",
    lineHeight: "1em"
  },
  center: {
    textAlign: "center"
  },
  solanaBeachImage: {
    display: "inline-block",
    verticalAlign: "middle",
    marginRight: "10px"
  }
}))

export default function Validator() {
  const classes = useStyles();
  const isSmScreenAndSmaller = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Container
      p={2}
      maxWidth="100%"
      component="section"
      className={classes.container}
    >
      <Container
        maxWidth="md"
        className={classes.validatorIntro}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <img
              alt="MonkeDAO validator"
              src="/validator.svg"
              className={isSmScreenAndSmaller ? classes.imageSm : classes.image}
            />
          </Grid>
          <Grid item xs={12} md={6} className={isSmScreenAndSmaller && classes.center}>
            <Typography
              component="h3"
              variant="h5"
              gutterBottom
              className={classes.stakingHeader}
            >
              MonkeDAO Validator
            </Typography>
            <Typography
              component="p"
              className={classes.stakingIntro}
            >
              It's official, we're now the first DAO to operate a node on the
              Solana blockchain! We set out to generate value for our members
              and the Solana community as a whole while being stewards of the
              Solana ecosystem. We're hitting our stride and this is just the
              beginning.
            </Typography>
            <Typography
              component="p"
              className={classes.stakingIntro}
            >
              Staking for this pool is open to everyone! Commission rates help
              fund the MonkeDAO and all its initiatives which aim to push the
              Solana ecosystem forward.
            </Typography>
            <Link
              target="_blank"
              href="https://solanabeach.io/validator/DfpdmTsSCBPxCDwZwgBMfjjV8mF8xHkGRcXP8dJBVmrq"
              className={classes.solanabeach}
              underline="none"
            >
              <img
                alt="Solana Beach"
                src="/solana-beach.svg"
                className={classes.solanaBeachImage}
              />
              View on Solana Beach
            </Link>
          </Grid>
        </Grid>
      </Container>
      <Staking />
      <StakingFAQ />
    </Container>
  );
}
