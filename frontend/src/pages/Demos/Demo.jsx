import React from "react";
import { Divider, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  divider: {
    margin: `${theme.spacing(3)}px 0`,
    color: "white",
    backgroundColor: "white",
  },
}));

function Demo({ demoTitle, components }) {
  const classes = useStyles();

  return (
    <div
      style={{
        backgroundColor: "#242424",
        display: "flex",
        width: "100%",
        minHeight: 700,
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            textAlign: "center",
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: 0,
            padding: 0,
          }}
        >
          <Typography variant="h1" style={{ color: "white", paddingTop: 20 }}>
            {demoTitle}
          </Typography>
        </div>
        {components.map((hero, index) => (
          <>
            <Divider
              key={index}
              variant="fullWidth"
              className={classes.divider}
            />
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
                style={{ color: "white", paddingBottom: 20 }}
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
