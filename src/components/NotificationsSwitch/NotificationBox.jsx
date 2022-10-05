import { DeviceMobileIcon } from "@heroicons/react/outline";
import { BellIcon, MailIcon } from "@heroicons/react/solid";
import { makeStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import TelegramIcon from "./TelegramIcon";
import { Typography } from "@material-ui/core";

const TagToIcon = {
  Email: MailIcon,
  "Notifi Hub": BellIcon,
  Telegram: TelegramIcon,
  Text: DeviceMobileIcon,
  Wallet: BellIcon,
};

const Tag = ({
  channelName,
  tagWrapperClassName,
  iconClassName,
  textClassName,
}) => {
  const Icon = TagToIcon[channelName];
  return (
    <div className={tagWrapperClassName}>
      <Icon className={iconClassName} />
      <span className={textClassName}>{channelName}</span>
    </div>
  );
};

const NotificationBox = ({ channels, description, onSelect, name }) => {
  const classes = useStyles();

  const tagWrapperClassName = classes.tagWrapper;
  const iconClassName = classes.icon;
  const textClassName = classes.textWrapper;

  return (
    <div className={classes.wrapper}>
      <h2 className={classes.title}>{name}</h2>
      <div className={classes.iconsWrapper}>
        {channels.map((channel) => (
          <div key={name + "-" + channel}>
            <Tag
              channelName={channel}
              tagWrapperClassName={tagWrapperClassName}
              iconClassName={iconClassName}
              textClassName={textClassName}
            />
          </div>
        ))}
      </div>

      <Typography className={classes.description}>{description}</Typography>

      <div className="flex w-full justify-center pt-3">
        <Button
          variant="contained"
          className={classes.button}
          onClick={onSelect}
        >
          Use {name}
        </Button>
      </div>
    </div>
  );
};

export default NotificationBox;

const useStyles = makeStyles((theme) => ({
  wrapper: {
    fontFamily: "Space Grotesk",
    width: "100%",
    padding: "0 1rem 1rem 1rem",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#194824",
    color: "#f3efcd",
    borderRadius: 10,
  },
  title: {
    borderBottom: "1px solid #246A35",
    paddingBottom: theme.spacing(2),
    color: "white",
  },
  iconsWrapper: {
    display: "flex",
  },
  icon: {
    float: "left",
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginRight: theme.spacing(1),
  },
  tagWrapper: {
    fontFamily: "Space Grotesk",
    display: "flex",
    borderRadius: 8,
    alignItems: "center",
    padding: "5px 8px",
    color: "#f3efcd",
    backgroundColor: "#164120",
    marginRight: theme.spacing(1),
  },
  button: {
    fontFamily: "Space Grotesk",
    color: "#184623",
    backgroundColor: "#f3efcd",
    "&:hover": {
      backgroundColor: "#f3efcd",
    },
  },
  description: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    color: "#f3efcd",
    fontFamily: "Space Grotesk",
    fontWeight: "500",
    fontSize: 18,
    whiteSpace: "pre-wrap",
  },
  textWrapper: {
    whiteSpace: "nowrap",
  },
}));
