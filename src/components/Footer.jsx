import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    '@global': {
      ul: {
        margin: 0,
        padding: 0,
        listStyle: 'none',
      },
    },
    appBar: {
      borderBottom: `1px solid ${theme.palette.divider}`,
			marginBottom: '100px',
    },
    toolbar: {
    	flexWrap: 'wrap',
    },
    toolbarTitle: {
			padding: `5px`,
      flexGrow: 1,
    },
		link: {
			margin: theme.spacing(1, 1.5),
		},
}));

export function Footer() {
    const classes = useStyles();
  
    return (
      <React.Fragment>
        {/* Footer */}
        <Container maxWidth="md" component="footer" className={classes.footer}>
            <Grid container spacing={4} justifyContent="space-evenly">
            {footers.map((footer) => (
                <Grid item xs={6} sm={3} key={footer.title}>
                <Typography variant="h6" color="textPrimary" gutterBottom>
                    {footer.title}
                </Typography>
                <ul>
                    {footer.description.map((item) => (
                    <li key={item}>
                        <Link href="#" variant="subtitle1" color="textSecondary">
                        {item}
                        </Link>
                    </li>
                    ))}
                </ul>
                </Grid>
            ))}
            </Grid>
            <Box mt={5}>
            <Copyright />
            </Box>
        </Container>
        {/* End footer */}
      </React.Fragment>
    );
  }