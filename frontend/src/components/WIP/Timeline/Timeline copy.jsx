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

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    margin: theme.spacing(3),
    width: 1000,
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
}));

function ServicesTimeline() {
  const classes = useStyles();

  return (
    <Paper elevation={0} className={classes.paper}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" component="h2">
            Our Services
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Timeline position="alternate">
            {timelineData.map((service) => (
              <TimelineItem key={service.id}>
                <TimelineSeparator>
                  <TimelineDot color="primary" />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={service.image}
                      title={service.title}
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h6" component="h3">
                        {service.title}
                      </Typography>
                      <Typography variant="body1">
                        {service.description}
                      </Typography>
                    </CardContent>
                  </Card>
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
