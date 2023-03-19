import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import BaseContent from "../../../Elements/Base/BaseContent.jsx";
import ApplicationForm from "./ApplicationForm.jsx";
import JobListing from "../Listing/Listing.jsx";
import axiosInstance from "../../../../lib/Axios/axiosInstance.js";
import { useDispatch } from "react-redux";
import JobDetails from "./JobDetails.jsx";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0),
    backgroundColor: theme.palette.background.light,
  },

  sectionTitle: {
    fontWeight: "bold",
    marginBottom: theme.spacing(0.5),
    marginTop: theme.spacing(4),
  },
  whyApply: {
    marginBottom: theme.spacing(4),
  },
}));

const JobPosting = ({ job }) => {
  const classes = useStyles();
  const [jobsData, setJobsData] = useState(null);
  const formRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_DATA_REQUEST" });
    const fetchData = async () => {
      axiosInstance
        .get("/jobposting/")
        .then((response) => {
          console.log(response.data);
          setJobsData(response.data);
        })
        .then(dispatch({ type: "FETCH_DATA_SUCCESS" }))
        .catch((err) => {
          setError(err);
        })
        .then(dispatch({ type: "FETCH_DATA_FAILURE" }));
    };
    fetchData();
  }, []);

  const handleApplyNowClick = () => {
    formRef.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return (
    <>
      {job && jobsData && (
        <div className={classes.root}>
          <Grid container spacing={3}>
            <BaseContent
              header=""
              maxWidth={1200}
              pad={6}
              mt={3}
              mb={3}
              br={1}
              background="#F5F5F5"
            >
              <JobDetails job={job} handleApplyNowClick={handleApplyNowClick} />
              <Grid item xs={12}>
                <Typography variant="h4" className={classes.sectionTitle}>
                  Why Apply?
                </Typography>
                <Typography variant="body2" className={classes.whyApply}>
                  {job.why_apply}
                </Typography>
              </Grid>
              <ApplicationForm job={job} formRef={formRef} />
              <JobListing
                jobsData={jobsData}
                header="Looking for something else?"
                subheader="See all our open positions below."
                currentId={job.id}
              />
            </BaseContent>
          </Grid>
        </div>
      )}
    </>
  );
};

export default JobPosting;
