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
  },
  lastChild: {
    margin: 0,
    padding: theme.spacing(0),
    borderRadius: 0,
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

const jobPostings = [
  {
    title: "Software Engineer",
    description:
      "We are seeking a highly motivated software engineer to join our team.",
    location: "New York, NY",
    jobType: "Full-time",
  },
  {
    title: "Product Manager",
    description:
      "We are seeking an experienced product manager to lead the development of our new product line.",
    location: "San Francisco, CA",
    jobType: "Contract",
  },
  {
    title: "Data Scientist",
    description:
      "We are seeking a talented data scientist to help us unlock insights from our vast data sets.",
    location: "Seattle, WA",
    jobType: "Full-time",
  },
];

function JobListing() {
  const [jobPostings, setJobPostings] = useState();
  const classes = useStyles();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchData = async () => {
      axiosInstance
        .get("/jobposting/")
        .then((response) => {
          console.log(response.data);
          setJobPostings(response.data);
        })
        .catch((err) => {
          setError(err);
        });
    };
    fetchData();
  }, []);

  return (
    <>
      {jobPostings && (
        <Grid
          container
          spacing={0}
          style={{ marginTop: 40, padding: 16, background: "#FFFFFF" }}
        >
          <BaseContent
            maxWidth={900}
            header="Jobs"
            subheader="Interested in joining our team? See our open positions below."
            boxShadow={2}
            pad={3}
            mt={1}
            mb={1}
            br={1}
            background="#FFFFFF"
          >
            {jobPostings.map((jobPosting, index) => (
              <>
                <BaseContent
                  maxWidth={900}
                  boxShadow={0}
                  pad={2}
                  mt={0}
                  mb={0}
                  background="#FFFFFF"
                >
                  <Grid key={index} item xs={12}>
                    <Paper
                      className={
                        index === jobPostings.length - 1
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
