import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Grid,
  Paper,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import {
  Timeline as TimelineContainer,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import { timelineItemClasses } from "@mui/lab/TimelineItem";
import servicesData from "./servicesData";
import ServiceCard from "./ServiceCard";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(0, 3, 0, 3),
    margin: theme.spacing(3),
    maxWidth: 1200,
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(0),
      margin: theme.spacing(3),
    },
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
    maxWidth: "700px",
    [theme.breakpoints.down("md")]: {
      marginBottom: `${theme.spacing(3)}px !important`,
    },
  },
  connector: {
    backgroundColor: `${theme.palette.text.hint} !important`,
    width: "1px !important",
  },
  dot: {
    backgroundColor: `${theme.palette.primary.main} !important`,
  },
}));

function Timeline() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();

  return (
    <Grid container justifyContent="center">
      <Paper elevation={0} className={classes.paper}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h1" align="center">
              Services Overview
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TimelineContainer
              position={!isSmallScreen ? "alternate" : "right"}
              sx={{
                [isSmallScreen && `& .${timelineItemClasses.root}:before`]: {
                  flex: 0,
                  padding: 0,
                },
              }}
            >
              {servicesData.map((service) => (
                <TimelineItem key={service.id} className={classes.timelineItem}>
                  <TimelineSeparator>
                    {!isSmallScreen && (
                      <>
                        <TimelineDot className={classes.dot} color="primary" />
                        <TimelineConnector className={classes.connector} />
                      </>
                    )}
                  </TimelineSeparator>
                  <TimelineContent className={classes.timelineContent}>
                    <ServiceCard {...service} showStudies={true} />
                  </TimelineContent>
                </TimelineItem>
              ))}
            </TimelineContainer>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}

export default Timeline;
