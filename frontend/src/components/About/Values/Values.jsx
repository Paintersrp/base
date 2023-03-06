import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import { useState } from "react";
import Value from "./Value";

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: "bold",
    marginBottom: theme.spacing(3),
    borderBottom: "1px solid black",
    paddingBottom: theme.spacing(1),
  },
  listColumns: {
    justifyContent: "center !important",
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  gridContainer: {
    justifyContent: "center !important",
    display: "flex",
    flexDirection: "row",
    width: "100%",
    background: theme.palette.background.light,
  },
}));

export default function Values({ valuesData }) {
  const classes = useStyles();
  const [rowOne, setRowOne] = useState(null);
  const [rowTwo, setRowTwo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const half = Math.ceil(valuesData.length / 2);
    const row1 = [];
    const row2 = [];

    for (let i = 0; i < valuesData.length; i++) {
      if (i < half) {
        row1.push(valuesData[i]);
      } else {
        row2.push(valuesData[i]);
      }
    }

    setRowOne(row1);
    setRowTwo(row2);
    setLoading(false);
  }, [valuesData]);

  return (
    <>
      {!loading ? (
        <>
          <Typography variant="h3" className={classes.title}>
            Core Values
          </Typography>
          <Grid container spacing={1} className={classes.gridContainer}>
            <Grid item xs={12} sm={6} className={classes.listColumns}>
              <List>
                {rowOne.map((value) => (
                  <Value value={value} />
                ))}
              </List>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.listColumns}>
              <List>
                {rowTwo.map((value) => (
                  <Value value={value} />
                ))}
              </List>
            </Grid>
          </Grid>
        </>
      ) : null}
    </>
  );
}
