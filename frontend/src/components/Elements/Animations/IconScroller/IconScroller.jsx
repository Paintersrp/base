import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";

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
    "@keyframes scrolling": {
      "0%": { transform: "translateX(0)" },
      "25%": { transform: "translateX(-25%)" },
      "50%": { transform: "translateX(-50%)" },
      "75%": { transform: "translateX(-25%)" },
      "100%": { transform: "translateX(0)" },
    },
  };
});

export default function IconScroller({ data }) {
  const classes = useStyles();
  const duplicatedPartners = [...data, ...data, ...data];
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
          {duplicatedPartners.map((partner) => (
            <div key={partner.id} className={classes.icon}>
              {React.createElement(partner.icon, {
                size: 50,
                color: partner.color,
              })}
            </div>
          ))}
        </div>
      </div>
    </Paper>
  );
}
