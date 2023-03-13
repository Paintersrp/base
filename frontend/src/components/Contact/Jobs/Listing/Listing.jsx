import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Button,
  Paper,
  useMediaQuery,
  useTheme,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import StyledButton from "../../../Elements/Buttons/StyledButton";
import BaseContent from "../../../Elements/Base/BaseContent.jsx";
import axiosInstance from "../../../../lib/Axios/axiosInstance";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(0),
    borderRadius: 0,
    backgroundColor: theme.palette.background.light,
  },
  lastChild: {
    margin: 0,
    padding: theme.spacing(0),
    borderRadius: 0,
    backgroundColor: theme.palette.background.light,
  },

  title: {
    fontWeight: "bold",
    marginBottom: "8px",
  },
  description: {
    marginBottom: "16px",
  },
  locationTypeContainer: {
    display: "flex",
    alignItems: "center",
  },
  location: {
    marginRight: "8px",
  },
  button: {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

function JobListing({
  jobsData,
  header = "Jobs",
  subheader = "Interested in joining our team? See our open positions below.",
  currentId = null,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // useEffect(() => {
  //   const fetchData = async () => {
  //     axiosInstance
  //       .get("/jobposting/")
  //       .then((response) => {
  //         console.log(response.data);
  //         setJobPostings(response.data);
  //       })
  //       .catch((err) => {
  //         setError(err);
  //       });
  //   };
  //   fetchData();
  // }, []);

  return (
    <>
      {jobsData && (
        <Grid
          container
          spacing={0}
          style={{ marginTop: 40, padding: 16, background: "#F5F5F5" }}
        >
          <BaseContent
            maxWidth={900}
            header={header}
            subheader={subheader}
            boxShadow={2}
            pad={3}
            mt={1}
            mb={1}
            br={1}
            background="#F5F5F5"
            showIcon={true}
          >
            {jobsData.map((jobPosting, index) => (
              <>
                <BaseContent
                  maxWidth={900}
                  boxShadow={0}
                  pad={2}
                  mt={0}
                  mb={0}
                  background="#F5F5F5"
                >
                  <Grid key={index} item xs={12}>
                    <Paper
                      className={
                        index === jobsData.length - 1
                          ? classes.lastChild
                          : classes.root
                      }
                      elevation={0}
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={7}>
                          <Typography variant="h6" className={classes.title}>
                            {jobPosting.position}
                          </Typography>
                          <Typography
                            variant="body1"
                            className={classes.description}
                          >
                            {jobPosting.tagline}
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          md={5}
                          className={classes.locationTypeContainer}
                          style={{
                            justifyContent: isSmallScreen
                              ? "space-between"
                              : "flex-end",
                          }}
                        >
                          <Typography
                            variant="body1"
                            className={classes.location}
                          >
                            {jobPosting.location} - {jobPosting.type}
                          </Typography>
                          {currentId !== jobPosting.id ? (
                            <Link to={`/jobposting/${jobPosting.id}`}>
                              <StyledButton
                                color={
                                  index % 2 === 0
                                    ? theme.palette.secondary.dark
                                    : theme.palette.primary.main
                                }
                                buttonText="Apply"
                                minWidth={0}
                                size="small"
                              />
                            </Link>
                          ) : (
                            <StyledButton
                              buttonText="Apply"
                              minWidth={0}
                              size="small"
                              disabled
                            />
                          )}
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                  <Divider
                    style={{
                      backgroundColor:
                        index % 2 === 0
                          ? theme.palette.primary.light
                          : theme.palette.secondary.dark,
                      width: "100%",
                      marginTop: theme.spacing(1),
                    }}
                  />
                </BaseContent>
              </>
            ))}
          </BaseContent>
        </Grid>
      )}
    </>
  );
}

export default JobListing;
