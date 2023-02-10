import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";

const useStyles = makeStyles((theme) => ({
  cardContent: {
    padding: "0px 16px 0px 16px",
  },
  socialIcons: {
    marginTop: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
  },
  iconButton: {
    padding: theme.spacing(1),
    color: theme.palette.primary.dark,
  },
  body: {
    padding: 0,
    color: "black",
    minHeight: 100,
  },
}));

const MemberContent = ({ member }) => {
  const classes = useStyles();

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
        <IconButton
          className={classes.iconButton}
          href={member.linkedIn}
          target="_blank"
          aria-label="LinkedIn"
        >
          <LinkedInIcon />
        </IconButton>
        <IconButton
          className={classes.iconButton}
          href={member.github}
          target="_blank"
          aria-label="GitHub"
        >
          <GitHubIcon />
        </IconButton>
        <IconButton
          className={classes.iconButton}
          href={member.twitter}
          target="_blank"
          aria-label="Twitter"
        >
          <TwitterIcon />
        </IconButton>
      </div>
    </CardContent>
  );
};

export default MemberContent;
