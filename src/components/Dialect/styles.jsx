import { makeStyles } from '@material-ui/core/styles';

export const useDialectStyles = makeStyles((theme) => ({
  primaryBg: {
    backgroundColor: '#f3efcd',
  },
  primaryText: {
    color: '#184623',
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
      border: '1px solid #436047',
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
    },
  },
  input: {
    border: 'none',
  },
  outlinedInput: {
    color: '#184623',
    borderColor: '#184623',
    '&:focus-within': {
      borderColor: '#184623',
      backgroundColor: '#ababab20',
      outline: 'none',
    },
  },
  divider: {
    opacity: '0.3',
    backgroundColor: '#184623'
  },
  addormentButton: {
    color: '#f3efcd',
    backgroundColor: '#184623',
  }
}));
