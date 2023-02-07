import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Box } from "@material-ui/core";
import TitleBlock from "../../../Elements/TextBlocks/TitleBlock";
import FloatingFeature from "../../Content/FloatingFeature";

const useStyles = makeStyles((theme) => ({
  root: {
    color: "white",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    minHeight: 550,
    minWidth: 325,
    padding: 0,
    margin: 0,
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    padding: 20,
    textAlign: "center",
    color: "white",
    backgroundColor: "#1C1C1C",
    maxWidth: 1400,
  },
  gridContainer: {
    display: "flex",
    justifyContent: "center",
    minWidth: 350,
  },
  center: {
    display: "flex",
    justifyContent: "center",
  },
}));

export default function OurProcess({ data, title, subtitle }) {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Grid container spacing={0}>
        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 0,
            margin: 0,
          }}
        >
          <Paper elevation={9} className={classes.paper}>
            <TitleBlock
              subtitle={subtitle}
              title={title}
              alignment="center"
              showDivider={false}
            />
            <Grid container spacing={2} className={classes.gridContainer}>
              {data.map((step, index) => (
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                  lg={4}
                  className={classes.center}
                >
                  <FloatingFeature step={step} />
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
