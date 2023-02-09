import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#1C1C1C",
    padding: theme.spacing(4),
    borderRadius: 14,
    width: "60%",
    minHeight: 500,
    [theme.breakpoints.down("md")]: {
      width: "90%",
    },
  },
  card: {
    borderRadius: 7,
    color: "white",
    backgroundColor: "#242424",
    width: "100%",
    marginBottom: 15,
    boxShadow:
      "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14), 0px 1px 14px 0px rgba(0,0,0,0.12)",
    "&:hover": {
      boxShadow:
        "0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)",
    },
  },
  title: {
    fontFamily: "Poppins",
    fontWeight: 600,
    fontSize: "1.5rem",
    [theme.breakpoints.down("md")]: {
      fontSize: "1.25rem",
    },
  },
  pos: {
    fontFamily: "Poppins",
    fontWeight: 500,
    marginTop: theme.spacing(4),
    [theme.breakpoints.down("md")]: {
      fontSize: "0.85rem",
    },
  },
  description: {
    fontFamily: "Poppins",
    fontWeight: 500,
    fontSize: "1.2rem",
    [theme.breakpoints.down("md")]: {
      fontSize: "1rem",
    },
  },
  moreInformation: {
    marginTop: theme.spacing(50),
    color: theme.palette.secondary.main,
    [theme.breakpoints.down("md")]: {
      fontSize: "0.85rem",
    },
  },
  tab: {
    borderRadius: 7,
    display: "flex",
    backgroundColor: "#212121",
    color: "#f9f9f9",
    fontWeight: "700",
    fontFamily: "Poppins",
    textTransform: "uppercase",
    marginLeft: 5,
    marginRight: 5,
    fontSize: "0.85rem",
    "&:focus": {
      color: "#f9f9f9",
    },
    "&:hover": {
      transform: "scale(1.02)",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "0.7rem",
    },
  },
  tabs: {
    marginBottom: 20,
  },
  tabsIndicator: {
    backgroundColor: "#f9f9f9",
  },
  flexContainer: {
    display: "flex",
    width: "100%",
  },
}));

export default function EventSchedule({ eventSets }) {
  const classes = useStyles();
  const [value, setValue] = React.useState("Monday");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        variant="fullWidth"
        value={value}
        onChange={handleChange}
        className={classes.tabs}
        classes={{
          indicator: classes.tabsIndicator,
          flexContainer: classes.flexContainer,
        }}
      >
        {Object.keys(eventSets).map((eventSet) => (
          <Tab
            label={eventSet}
            value={eventSet}
            classes={{ root: classes.tab }}
          />
        ))}
      </Tabs>
      <Grid container spacing={2}>
        {eventSets[value].map((event) => (
          <Card key={event.id} className={classes.card}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <Typography variant="h3">{event.time}</Typography>
                </Grid>
                <Grid item xs={10}>
                  <Typography className={classes.title}>
                    {event.title}
                  </Typography>
                  <Typography className={classes.description}>
                    {event.description}
                  </Typography>
                  <Typography className={classes.pos}>
                    {event.presenter} - {event.company}
                  </Typography>
                  <Typography
                    className={classes.moreInformation}
                    component="a"
                    target="_blank"
                  >
                    {event.location}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}
      </Grid>
    </div>
  );
}
