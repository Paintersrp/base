import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import {
  FaUser,
  FaUsers,
  FaShieldAlt,
  FaPencilRuler,
  FaBook,
  FaBalanceScale,
  FaCogs,
  FaGlobe,
} from "react-icons/fa";
import { useState } from "react";
import Value from "./Value";

const Icon = ({ icon }) => {
  switch (icon) {
    case "FaUser":
      return <FaUser />;
    case "FaUsers":
      return <FaUsers />;
    case "FaShieldAlt":
      return <FaShieldAlt />;
    case "FaPencilRuler":
      return <FaPencilRuler />;
    case "FaBook":
      return <FaBook />;
    case "FaBalanceScale":
      return <FaBalanceScale />;
    case "FaCogs":
      return <FaCogs />;
    case "FaGlobe":
      return <FaGlobe />;
    default:
      return <></>;
  }
};

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: "bold",
    marginBottom: theme.spacing(3),
    borderBottom: "1px solid black",
    paddingBottom: theme.spacing(1),
  },
  subtitle: {
    color: "black",
    marginLeft: 15,
    minWidth: 200,
    fontWeight: 500,
    fontFamily: "Poppins",
    fontSize: "0.9rem",
  },
  listcolumns: {
    justifyContent: "center !important",
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  gridcontainer: {
    justifyContent: "center !important",
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  avatar: {
    backgroundColor: "#ffe01b",
    color: "white",
  },
}));

export default function CoreValues({ valuesData }) {
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
          <Grid container spacing={2} className={classes.gridcontainer}>
            <Grid item xs={12} sm={6} className={classes.listcolumns}>
              <List>
                {rowOne.map((value) => (
                  <Value value={value} />
                ))}
              </List>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.listcolumns}>
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
