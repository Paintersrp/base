import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return {
    paper: {
      padding: 10,
      backgroundColor: "#212121",
      color: "white",
      marginBottom: 20,
    },
    container: {
      width: "100%",
      overflow: "hidden",
    },
    wrapper: {
      width: "400%",
      display: "flex",
      overflow: "hidden",
      whiteSpace: "nowrap",
      animation: `$scrolling 120s linear infinite`,
      animationIterationCount: "infinite",
    },
    icon: {
      width: "25%",
      display: "inline-block",
      marginRight: theme.spacing(32),
      textAlign: "center",
      "&:hover": {
        transform: "scale(1.05)",
        color: "gold",
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
    <Paper className={classes.paper} elevation={9}>
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
