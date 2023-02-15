import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import Countdown from "react-countdown-now";

const useStyles = makeStyles((theme) => ({
  countdownWrapper: {
    backgroundColor: "#3f3f3f",
    color: "#fff",
    padding: "1rem",
    textAlign: "center",
  },
  countdownItem: {
    textAlign: "center",
    fontSize: "2rem",
    fontWeight: "bold",
    padding: "1rem",
    borderRight: "1px solid #fff",
    "&:last-child": {
      borderRight: "none",
    },
  },
  units: {
    fontSize: "1rem",
    color: "#fff",
    marginTop: "10px",
  },
}));

const Completionist = () => (
  <span style={{ color: "#fff", fontWeight: "bold", fontSize: "1.5rem" }}>
    Event has launched!
  </span>
);

function CountdownBlock() {
  const classes = useStyles();
  const endDate = moment("2023-12-31 23:59:59");

  return (
    <div className={classes.countdownWrapper}>
      <Countdown
        date={endDate}
        renderer={({ days, hours, minutes, seconds }) => (
          <Grid container>
            <Grid item xs={3}>
              <div className={classes.countdownItem}>
                <Typography variant="h4">{days}</Typography>
                <Typography variant="body1" className={classes.units}>
                  Days
                </Typography>
              </div>
            </Grid>
            <Grid item xs={3}>
              <div className={classes.countdownItem}>
                <Typography variant="h4">{hours}</Typography>
                <Typography variant="body1" className={classes.units}>
                  Hours
                </Typography>
              </div>
            </Grid>
            <Grid item xs={3}>
              <div className={classes.countdownItem}>
                <Typography variant="h4">{minutes}</Typography>
                <Typography variant="body1" className={classes.units}>
                  Minutes
                </Typography>
              </div>
            </Grid>
            <Grid item xs={3}>
              <div className={classes.countdownItem}>
                <Typography variant="h4">{seconds}</Typography>
                <Typography variant="body1" className={classes.units}>
                  Seconds
                </Typography>
              </div>
            </Grid>
          </Grid>
        )}
        onComplete={Completionist}
      />
    </div>
  );
}

export default CountdownBlock;
