import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    display: "flex",
    width: "100%",
    minHeight: 700,
    flexDirection: "column",
    justifyContent: "center",
    paddingBottom: theme.spacing(4),
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
    color: "white",
    paddingTop: 40,
  },
}));

function Demo({ demoTitle, components }) {
  console.log(components[0].component.name);
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
        {components.map((item, index) => (
          <>
            <div
              key={index}
              style={{
                paddingBottom: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h2"
                style={{ color: "black", paddingBottom: 20, paddingTop: 40 }}
              >
                {item.title ? item.title : item.component.name}
              </Typography>
              {React.createElement(item.component, item.props)}
            </div>
          </>
        ))}
      </div>
    </div>
  );
}

export default Demo;
