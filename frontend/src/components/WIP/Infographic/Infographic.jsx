import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Chart from "./Chart";
import LinearProgress from "@material-ui/core/LinearProgress";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { GrTransaction as SalesIcon } from "react-icons/gr";
import {
  IoMdPerson as CustomersIcon,
  IoIosMap as MapIcon,
} from "react-icons/io";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4),
    margin: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    backgroundColor: "#f5f5f5",
    borderRadius: theme.shape.borderRadius,
    maxWidth: 1200,
  },
  salesIcon: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    fill: theme.palette.primary.main,
  },
  customersIcon: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    fill: theme.palette.secondary.main,
  },
  mapIcon: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    fill: theme.palette.info.main,
  },
  chartContainer: {
    width: "100%",
    height: theme.spacing(40),
    marginTop: theme.spacing(4),
  },
  progressContainer: {
    marginTop: theme.spacing(4),
    maxWidth: "50%",
  },
  progressIcon: {
    marginRight: theme.spacing(1),
  },
  mapContainer: {
    width: "100%",
    height: theme.spacing(40),
    marginTop: theme.spacing(4.5),
  },
}));

function Infographic(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6}>
          <SalesIcon className={classes.salesIcon} />
          <Typography variant="h4" component="h2" gutterBottom>
            {props.salesTitle}
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            {props.salesDescription}
          </Typography>
          <div className={classes.chartContainer}>
            <Chart data={props.salesData} />
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomersIcon className={classes.customersIcon} />
          <Typography variant="h4" component="h2" gutterBottom>
            {props.customersTitle}
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            {props.customersDescription}
          </Typography>
          <div className={classes.chartContainer}>
            <Chart data={props.customersData} />
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            paddingTop: 70,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h4" component="h2" gutterBottom>
            {props.progressTitle}
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            {props.progressDescription}
          </Typography>
          <Grid container flex justifyContent="center">
            <Grid
              container
              spacing={2}
              alignItems="center"
              className={classes.progressContainer}
            >
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" component="p" gutterBottom>
                  {props.progressSubtitle1}
                </Typography>
                <Typography variant="subtitle1" component="p" gutterBottom>
                  {props.progressValue1}%
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={props.progressValue1}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" component="p" gutterBottom>
                  {props.progressSubtitle2}
                </Typography>
                <Typography variant="subtitle1" component="p" gutterBottom>
                  {props.progressValue2}%
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={props.progressValue2}
                />
              </Grid>
            </Grid>
          </Grid>
          {props.progressComplete ? (
            <Grid container flex justifyContent="center">
              <div className={classes.progressContainer}>
                <CheckCircleOutlineIcon className={classes.progressIcon} />
                <Typography variant="body1" component="p" gutterBottom>
                  {props.progressCompleteMessage}
                </Typography>
              </div>
            </Grid>
          ) : null}
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Infographic;
