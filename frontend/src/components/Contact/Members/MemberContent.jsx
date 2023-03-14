import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import YouTubeIcon from "@material-ui/icons/YouTube";

const useStyles = makeStyles((theme) => ({
  cardContent: {
    padding: "0px 16px 0px 16px",
  },
  socialIcons: {
    marginTop: theme.spacing(0),
    display: "flex",
    justifyContent: "center",
    "&:hover": {
      color: theme.palette.primary.light,
    },
  },
  iconButton: {
    color: theme.palette.primary.dark,
    "&:hover": {
      color: theme.palette.primary.gold,
    },
  },
  body: {
    padding: 0,
    color: "black",
    minHeight: 100,
  },
}));

const MemberContent = ({ member }) => {
  const classes = useStyles();
  const socialPlatforms = [
    {
      name: "facebook",
      icon: <FacebookIcon className={classes.iconButton} />,
    },
    {
      name: "twitter",
      icon: <TwitterIcon className={classes.iconButton} />,
    },
    {
      name: "instagram",
      icon: <InstagramIcon className={classes.iconButton} />,
    },
    {
      name: "linkedIn",
      icon: <LinkedInIcon className={classes.iconButton} />,
    },
    {
      name: "youtube",
      icon: <YouTubeIcon className={classes.iconButton} />,
    },
    {
      name: "github",
      icon: <GitHubIcon className={classes.iconButton} />,
    },
  ];

  return (
    <CardContent className={classes.cardContent}>
      <Typography
        variant="body2"
        color="textSecondary"
        component="p"
        className={classes.body}
      >
        {member.bio}
      </Typography>
      <div className={classes.socialIcons}>
        {socialPlatforms.map((platform) => {
          if (member[platform.name]) {
            return (
              <IconButton
                key={platform.name}
                className={classes.socialIcons}
                aria-label={platform.name}
                href={`https://www.${platform.name}.com/${
                  member[platform.name]
                }`}
              >
                {platform.icon}
              </IconButton>
            );
          } else {
            return null;
          }
        })}
      </div>
    </CardContent>
  );
};

export default MemberContent;
