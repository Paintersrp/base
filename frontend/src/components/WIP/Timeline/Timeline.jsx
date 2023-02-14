import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Grid,
  Paper,
  Card,
  CardMedia,
  CardContent,
} from "@material-ui/core";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import timelineData from "./timelineData";
import ServiceCard from "../Magazine/ServiceCard";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    margin: theme.spacing(3),
  },
  card: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  cardMedia: {
    paddingTop: "100%",
  },
  cardContent: {
    flexGrow: 1,
  },
  timelineItem: {
    minHeight: "200px",
  },
  timelineContent: {
    maxWidth: "600px",
  },
  connector: {
    backgroundColor: `${theme.palette.text.hint} !important`,
    width: "1px !important",
  },
  dot: {
    backgroundColor: `${theme.palette.primary.main} !important`,
  },
}));

function ServicesTimeline() {
  const classes = useStyles();

  return (
    <Paper elevation={0} className={classes.paper}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h1" align="center">
            Our Services
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Timeline position="alternate">
            {timelineData.map((service) => (
              <TimelineItem key={service.id} className={classes.timelineItem}>
                <TimelineSeparator>
                  <TimelineDot className={classes.dot} />
                  <TimelineConnector className={classes.connector} />
                </TimelineSeparator>
                <TimelineContent className={classes.timelineContent}>
                  <ServiceCard {...service} />
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default ServicesTimeline;
