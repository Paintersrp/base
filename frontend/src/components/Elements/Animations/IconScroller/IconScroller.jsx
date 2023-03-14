import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link, Paper } from "@material-ui/core";
import {
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaGithub,
} from "react-icons/fa";

const useStyles = makeStyles((theme) => {
  return {
    paper: {
      backgroundColor: theme.palette.background.light,
      color: theme.palette.primary.main,
      paddingBottom: theme.spacing(8),
    },
    container: {
      justifyContent: "center",
      width: "100%",
      overflow: "hidden",
      alignItems: "center",
    },
    wrapper: {
      width: "400%",
      display: "flex",
      overflow: "hidden",
      whiteSpace: "nowrap",
      animation: `$scrolling 120s linear infinite`,
      animationIterationCount: "infinite",
      minHeight: 75,
      justifyContent: "center",
      alignItems: "center",
    },
    icon: {
      width: "25%",
      display: "inline-block",
      marginRight: theme.spacing(32),
      textAlign: "center",
      transition: "0.3s",
      "&:hover": {
        transform: "translateY(-10px)",
        color: theme.palette.secondary.main,
      },
    },
    link: {
      "&:hover": {
        transform: "translateY(-10px)",
        color: theme.palette.secondary.main,
      },
    },
    "@keyframes scrolling": {
      "0%": { transform: "translateX(0)" },
      "25%": { transform: "translateX(-25%)" },
      "50%": { transform: "translateX(-50%)" },
      "75%": { transform: "translateX(-25%)" },
      "100%": { transform: "translateX(0)" },
    },
  };
});

const partners = [
  {
    id: 1,
    icon: FaTwitter,
    name: "twitter",
    profile: "EdgelordsLLC",
  },
  {
    id: 2,
    icon: FaFacebook,
    name: "facebook",
    profile: "EdgelordsLLC",
  },
  {
    id: 3,
    icon: FaInstagram,
    name: "instagram",
    profile: "EdgelordsLLC",
  },
  {
    id: 4,
    icon: FaLinkedin,
    name: "linkedin",
    profile: "EdgelordsLLC",
  },
  {
    id: 5,
    icon: FaYoutube,
    name: "youtube",
    profile: "EdgelordsLLC",
  },
  {
    id: 6,
    icon: FaGithub,
    name: "github",
    profile: "EdgelordsLLC",
  },
];

export default function IconScroller({}) {
  const classes = useStyles();
  const duplicatedPartners = [...partners, ...partners, ...partners];
  const [isScrolling, setIsScrolling] = useState(true);

  return (
    <Paper className={classes.paper} elevation={0}>
      <div
        className={classes.container}
        onMouseEnter={() => setIsScrolling(false)}
        onMouseLeave={() => setIsScrolling(true)}
      >
        <div
          className={classes.wrapper}
          style={{ animationPlayState: isScrolling ? "running" : "paused" }}
        >
          {duplicatedPartners.map((social) => (
            <div key={social.id} className={classes.icon}>
              <Link
                className={classes.link}
                href={`https://www.${social.name}.com/${social.profile}`}
              >
                {React.createElement(social.icon, {
                  size: 50,
                  color: social.color,
                })}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Paper>
  );
}
