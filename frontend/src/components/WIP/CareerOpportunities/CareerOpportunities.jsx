import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { FaBriefcase, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import { Grid, Divider } from "@material-ui/core";
import opportunities from "./opportunities.js";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#1C1C1C",
    minWidth: 350,
    maxWidth: 1400,
  },
  card: {
    display: "flex",
    justifyContent: "center",
    margin: 10,
    padding: 10,
    backgroundColor: "#1C1C1C",
    maxWidth: "90%",
    "&:hover": {
      transform: "scale(1.05)",
      opacity: 0.9,
    },
  },
  cardcontainer: {
    display: "flex",
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  icon: {
    paddingRight: theme.spacing(2),
    color: theme.palette.grey[300],
  },
  opportunity: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  opportunityDescription: {
    paddingTop: 5,
    color: theme.palette.common.white,
    minWidth: 350,
    textAlign: "left",
  },
  featuregrid: {
    textAlign: "left",
    alignItems: "start",
    fontSize: "0.8rem",
    fontFamily: "Poppins",
    fontWeight: 500,
  },
  subtitle: {
    textAlign: "left",
    alignItems: "start",
    fontSize: "0.8rem",
    fontFamily: "Poppins",
    fontWeight: 500,
  },
  subtitle2: {
    textAlign: "left",
    alignItems: "start",
    fontSize: "1rem",
    fontFamily: "Poppins",
    fontWeight: 700,
  },
  divider: {
    margin: `${theme.spacing(3)}px 0`,
    color: "white",
    backgroundColor: "white",
    width: "100",
  },
  title: {
    textAlign: "center",
    color: "#f9f9f9",
    fontWeight: "700",
    fontFamily: "Poppins",
    paddingBottom: 5,
  },
  containergrid: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
  },
}));

const CareersOpportunities = () => {
  const classes = useStyles();

  return (
    <>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        className={classes.containergrid}
      >
        <Grid item xs={12}>
          <Typography variant="h4" className={classes.title}>
            Career Opportunities
          </Typography>
        </Grid>
        <Grid container spacing={2} className={classes.cardcontainer}>
          {opportunities.map((opportunity, index) => (
            <Paper elevation={6} className={classes.card}>
              <Grid item xs={12} sm={6} key={index} className={classes.card}>
                <div className={classes.opportunity}>
                  {opportunity.type === "Full-Time" && (
                    <FaBriefcase className={classes.icon} />
                  )}
                  {opportunity.type === "Part-Time" && (
                    <FaClock className={classes.icon} />
                  )}
                  {opportunity.type === "Internship" && (
                    <FaMapMarkerAlt className={classes.icon} />
                  )}
                  <div className={classes.opportunityDescription}>
                    <Typography
                      variant="subtitle1"
                      className={classes.subtitle}
                    >
                      {opportunity.type}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      className={classes.subtitle2}
                    >
                      {opportunity.position}
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography
                          variant="body2"
                          className={classes.featuregrid}
                        >
                          Location:
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography
                          variant="body2"
                          className={classes.featuregrid}
                        >
                          {opportunity.location}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography
                          variant="body2"
                          className={classes.featuregrid}
                        >
                          Date Posted:
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography
                          variant="body2"
                          className={classes.featuregrid}
                        >
                          {opportunity.posted}
                        </Typography>
                      </Grid>
                    </Grid>
                  </div>
                </div>
              </Grid>
            </Paper>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default CareersOpportunities;
