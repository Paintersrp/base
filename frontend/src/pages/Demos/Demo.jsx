import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.light,
    display: "flex",
    width: "100%",
    minHeight: 700,
    flexDirection: "column",
    justifyContent: "center",
  },
  divider: {
    color: "white",
    backgroundColor: "white",
  },
  title: {
    textAlign: "center",
    color: theme.palette.text.dark,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
    padding: 0,
  },
  heading: {
    color: "black",
    paddingTop: 40,
    paddingBottom: 40,
  },
}));

function Demo({ demoTitle, components }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div className={classes.title}>
          <Typography variant="h1" className={classes.heading}>
            {demoTitle}
          </Typography>
        </div>
        {components.map((hero, index) => (
          <>
            <div
              key={index}
              style={{
                paddingBottom: 100,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h2"
                style={{ color: "black", paddingBottom: 20 }}
              >
                {hero.title}
              </Typography>
              {React.createElement(hero.component, hero.props)}
            </div>
          </>
        ))}
      </div>
    </div>
  );
}

export default Demo;
