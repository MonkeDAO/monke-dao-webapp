import React from "react";
import {
  Box,
  Button,
  Container,
  createTheme,
  makeStyles,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import { DISCORD_BLUE, TWITTER_BLUE } from "../constants/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: TWITTER_BLUE,
    },
    secondary: {
      main: DISCORD_BLUE,
    },
  },
});

const useStyles = makeStyles((theme) => ({
  discordLink: {
    width: 116,
  },
  footer: {
    backgroundColor: "#184623",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  footerContent: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(12),
  },
  footerText: {
    color: "#f3efcd",
    textAlign: "center",
    marginTop: theme.spacing(3),
    fontFamily: "Space Grotesk",
  },
  link: {
    textTransform: "none",
    fontFamily: "Space Grotesk",
    fontWeight: "600",
    fontSize: 16,
    boxShadow: "none",
    borderRadius: 8,
    height: 38,
    whiteSpace: "nowrap",
    overflow: "hidden",
    padding: "8px 16px",
    width: "100%"
  },
  buttonLogo: {
    marginRight: 8,
  },
  logo: {
    marginBottom: theme.spacing(3),
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    width: '75%',
    height: '75%'
  }
}));

export default function Footer(props) {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <footer className={classes.footer}>
        <Container p={2} maxWidth="sm">
          <Box className={classes.footerContent}>
            <img
              src="/monkedao-logo-negative.svg"
              alt="MonkeDAO Logo"
              className={classes.logo}
            />
            <Box display="flex" justifyContent="center" alignItems="center">
              <Box marginRight="20px">
                <Button
                  href="https://discord.gg/TscZwJ7jbX"
                  color="secondary"
                  variant="contained"
                  className={[classes.link, classes.discordLink].join(" ")}
                >
                  <img
                    alt="Discord logo"
                    src="/discord.svg"
                    className={classes.buttonLogo}
                  />
                  Join the Discord
                </Button>
              </Box>
              <Box>
                <Button
                  href="https://twitter.com/MonkeDAO"
                  color="primary"
                  variant="contained"
                  className={[classes.link, classes.twitterLink].join(" ")}
                >
                  <img
                    alt="Twitter logo"
                    src="/twitter.svg"
                    className={classes.buttonLogo}
                  />
                  @MonkeDAO
                </Button>
              </Box>
            </Box>
            <Box>
              <Typography variant="body2" className={classes.footerText}>
                MonkeDAO is a community-run initiative, and is not directly
                affiliated nor under the management of Solana Monkey Business
              </Typography>
            </Box>
          </Box>
        </Container>
      </footer>
    </ThemeProvider>
  );
}

// import React from 'react';
// import AppBar from '@material-ui/core/AppBar';
// import Button from '@material-ui/core/Button';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import Link from '@material-ui/core/Link';
// import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles((theme) => ({
//     '@global': {
//       ul: {
//         margin: 0,
//         padding: 0,
//         listStyle: 'none',
//       },
//     },
//     appBar: {
//       borderBottom: `1px solid ${theme.palette.divider}`,
// 			marginBottom: '100px',
//     },
//     toolbar: {
//     	flexWrap: 'wrap',
//     },
//     toolbarTitle: {
// 			padding: `5px`,
//       flexGrow: 1,
//     },
// 		link: {
// 			margin: theme.spacing(1, 1.5),
// 		},
// }));

// export function Footer() {
//     const classes = useStyles();

//     return (
//       <React.Fragment>
//         {/* Footer */}
//         <Container maxWidth="md" component="footer" className={classes.footer}>
//             <Grid container spacing={4} justifyContent="space-evenly">
//             {footers.map((footer) => (
//                 <Grid item xs={6} sm={3} key={footer.title}>
//                 <Typography variant="h6" color="textPrimary" gutterBottom>
//                     {footer.title}
//                 </Typography>
//                 <ul>
//                     {footer.description.map((item) => (
//                     <li key={item}>
//                         <Link href="#" variant="subtitle1" color="textSecondary">
//                         {item}
//                         </Link>
//                     </li>
//                     ))}
//                 </ul>
//                 </Grid>
//             ))}
//             </Grid>
//             <Box mt={5}>
//             <Copyright />
//             </Box>
//         </Container>
//         {/* End footer */}
//       </React.Fragment>
//     );
//   }
