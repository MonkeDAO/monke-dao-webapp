import { makeStyles } from '@material-ui/core/styles';

export const useDialectStyles = makeStyles((theme) => ({
  primaryBg: {
    backgroundColor: '#164120',
  },
  primaryText: {
    color: '#f3efcd',
  },
  highlight: {
    color: '#f3efcd',
    backgroundColor: '#184623',
  },
  bold: {
    fontWeight: 'bold',
  },
  notificationButton: {
    backgroundColor: '#184623',
    color: '#f3efcd',
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  notificationWrapper: {
    [theme.breakpoints.up('sm')]: {
      top: theme.spacing(6),
    },
  },
  notificationModal: {
    [theme.breakpoints.up('sm')]: {
      border: '1px solid #184623',
      borderRadius: 10,
    },
  },
  header: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    borderColor: '#184623',
  },
  button: {
    backgroundColor: '#f3efcd',
    color: '#254526',
    borderColor: '#184623',
  },
  logo: {
    color: '#f3efcd',
    backgroundColor: '#184623',
    '& svg': {
      marginTop: theme.spacing(0.4),
    },
  },
  fontFamilyOverride: {
    fontFamily: 'Space Grotesk, serif',
    '&::placeholder': {
      fontFamily: 'Space Grotesk, serif',
      color: '#738668'
    },
  },
  input: {
    border: 'none',
    color: '#f3efcd'
  },
  outlinedInput: {
    color: '#738668',
    borderColor: '#246A35',
    '&:focus-within': {
      borderColor: '#246A35',
      backgroundColor: '#ababab20',
      outline: 'none',
      borderStyle: 'dashed'
    },
  },
  divider: {
    backgroundColor: '#246A35'
  },
  adornmentButton: {
    color: '#f3efcd',
    backgroundColor: '#184623',
  },
  toggleBackground: {
    backgroundColor: '#9e9c88'
  },
  toggleBackgroundActive: {
    backgroundColor: '#8e8939'
  }
}));
