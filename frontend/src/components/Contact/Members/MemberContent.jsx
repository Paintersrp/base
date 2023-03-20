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
import { Tooltip } from "@material-ui/core";

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
  socialIcon: {
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
      color: theme.palette.secondary.main,
    },
  },
  iconButtonAlt: {
    color: theme.palette.secondary.main,
    "&:hover": {
      color: theme.palette.secondary.main,
    },
  },
  body: {
    padding: 0,
    color: "black",
    minHeight: 100,
  },
  tooltip: {
    backgroundColor: theme.palette.text.secondary,
    color: "#ffffff",
    fontSize: "12px",
  },
}));

const MemberContent = ({ member }) => {
  const classes = useStyles();
  const socialPlatforms = [
    {
      name: "facebook",
      icon: <FacebookIcon />,
    },
    {
      name: "twitter",
      icon: <TwitterIcon />,
    },
    {
      name: "instagram",
      icon: <InstagramIcon />,
    },
    {
      name: "linkedIn",
      icon: <LinkedInIcon />,
    },
    {
      name: "youtube",
      icon: <YouTubeIcon />,
    },
    {
      name: "github",
      icon: <GitHubIcon />,
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
        {socialPlatforms.map((platform, index) => {
          if (member[platform.name]) {
            return (
              <Tooltip
                title={`@${member[platform.name]}`}
                placement="bottom"
                classes={{ tooltip: classes.tooltip }}
              >
                <IconButton
                  key={platform.name}
                  className={classes.iconButton}
                  aria-label={platform.name}
                  href={`https://www.${platform.name}.com/${
                    member[platform.name]
                  }`}
                >
                  {platform.icon}
                </IconButton>
              </Tooltip>
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
