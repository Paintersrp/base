import React from "react";
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

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: "bold",
    color: "white",
    textAlign: "left !important",
    borderBottom: "1px solid white !important",
    marginBottom: "10px !important",
    paddingBottom: "2px !important",
  },
  subtitle: {
    color: "white",
    marginLeft: 15,
    minWidth: 200,
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
    marginBottom: 30,
  },
  avatar: {
    backgroundColor: "#f2cc23dd",
    color: "theme.palette.primary.contrastText",
  },
}));

export default function CoreValues() {
  const classes = useStyles();

  const valuesRowOne = [
    {
      id: 1,
      icon: FaUser,
      primary: "Customer Satisfaction",
    },
    {
      id: 2,
      icon: FaPencilRuler,
      primary: "Innovation",
    },
    {
      id: 3,
      icon: FaUsers,
      primary: "Collaboration",
    },
    {
      id: 4,
      icon: FaShieldAlt,
      primary: "Integrity",
    },
  ];

  const valuesRowTwo = [
    {
      id: 5,
      icon: FaBook,
      primary: "Knowledge",
    },
    {
      id: 6,
      icon: FaBalanceScale,
      primary: "Equality (for Master Race)",
    },
    {
      id: 7,
      icon: FaCogs,
      primary: "Efficiency",
    },
    {
      id: 8,
      icon: FaGlobe,
      primary: "Global Commitment",
    },
  ];

  return (
    <>
      <Typography variant="h5" className={classes.title}>
        Core Values
      </Typography>
      <Grid container spacing={2} className={classes.gridcontainer}>
        <Grid item xs={12} sm={6} className={classes.listcolumns}>
          <List>
            {valuesRowOne.map((value) => (
              <ListItem>
                <Avatar className={classes.avatar}>
                  <value.icon />
                </Avatar>
                <ListItemText
                  primary={value.primary}
                  className={classes.subtitle}
                />
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.listcolumns}>
          <List>
            {valuesRowTwo.map((value) => (
              <ListItem>
                <Avatar className={classes.avatar}>
                  <value.icon />
                </Avatar>
                <ListItemText
                  primary={value.primary}
                  className={classes.subtitle}
                />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </>
  );
}
