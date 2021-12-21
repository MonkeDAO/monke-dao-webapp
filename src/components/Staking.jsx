import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Grid,
  Typography,
  Link
} from '@material-ui/core';

const useCardStyles = makeStyles(theme => ({
  card: {
    background: "rgba(255, 255, 255, 0.15)",
    borderRadius: "8px",
    padding: "24px",
    position: "relative"
  },
  circle: {
    width: "48px",
    height: "48px",
    position: "absolute",
    top: "-24px",
    left: "-24px",
    borderRadius: "100%",
    backgroundColor: "#FAC300",
    color: "black",
    textAlign: "center",
    fontSize: "24px",
    lineHeight: "48px"
  },
  imageWrapper: {
    position: "relative"
  },
  pointer: {
    position: "absolute",

    right: "-10%"
  },
  bullet: {
    margin: 0,
    position: "absolute"
  },
  image: {
    height: "100%",
    width: "100%"
  }
}))

function Card({ num, pointerOffset, img, bullets }) {
  const classes = useCardStyles();
  return (
    <Grid item sm={12} md={6}>
      <div className={classes.card}>
        <div className={classes.circle}>{num}</div>
        <Grid container>
          <Grid item xs={7}>
            <div className={classes.imageWrapper}>
              <img src={img.src} alt={img.alt} className={classes.image} />
              <img alt="Pointer" src="/pointer.svg" className={classes.pointer} style={{ top: `${pointerOffset}%` }} />
            </div>
          </Grid>
          <Grid item xs={5} style={{ position: "relative" }}>
            {
              bullets.map((bullet, index) => (
                <ul key={index} className={classes.bullet} style={{ top: `${bullet.offset}%` }}><li>{ bullet.text }</li></ul>
              ))
            }
          </Grid>
        </Grid>
      </div>
    </Grid>
  )
}

const useStakingStyles = makeStyles(theme => ({
  stakingFaqLink: {
    color: "#FFFFFF"
  },
  grid: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5)
  }
}))

export default function Staking() {
  const classes = useStakingStyles();

  return (
    <Container maxWidth="md">
      <Typography
        component="h3"
        variant="h5"
        align="center"
        gutterBottom
      >
        How to stake with the MonkeDAO Validator
      </Typography>

      <Typography
        component="p"
        align="center"
      >
        Any questions? Try our <Link href="#staking-faq" underline="always" className={classes.stakingFaqLink}>Staking FAQ.</Link>
      </Typography>

      <Grid container justify="space-around" spacing={6} className={classes.grid}>
        <Card
          num={1}
          pointerOffset={56}
          img={{
            src: "/phantom1.svg",
            alt: "Step 1"
          }}
          bullets={[
            {
              text: "Open wallet",
            },
            {
              text: "Select ‘Solana’",
              offset: 46
            }
          ]}
        />
        <Card
          num={2}
          pointerOffset={64}
          img={{
            src: "/phantom2.svg",
            alt: "Step 2"
          }}
          bullets={[
            {
              text: "Select ‘Start earning SOL’",
              offset: 55
            }
          ]}
        />
        <Card
          num={3}
          pointerOffset={43}
          img={{
            src: "/phantom3.svg",
            alt: "Step 3"
          }}
          bullets={[
            {
              text: "Search “Monke”",
              offset: 10
            },
            {
              text: "Select “MonkeDAO”",
              offset: 30
            }
          ]}
        />
        <Card
          num={4}
          pointerOffset={92}
          img={{
            src: "/phantom4.svg",
            alt: "Step 4"
          }}
          bullets={[
            {
              text: "Choose SOL amount to stake",
              offset: 32
            },
            {
              text: "Select ‘Stake’",
              offset: 88
            }
          ]}
        />
      </Grid>
    </Container>
  )
}
