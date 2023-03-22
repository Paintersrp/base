import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import BaseContent from "../../../Elements/Base/BaseContent.jsx";
import ApplicationForm from "./ApplicationForm.jsx";
import JobListing from "../Listing/Listing.jsx";
import axiosInstance from "../../../../lib/Axios/axiosInstance.js";
import { useDispatch, useSelector } from "react-redux";
import JobDetails from "./JobDetails.jsx";
import AdminButton from "../../../Elements/Buttons/AdminButton.jsx";
import JobEdit from "./JobEdit.jsx";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(5),
    padding: theme.spacing(0),
    display: "flex",
    justifyContent: "center",
  },

  sectionTitle: {
    fontWeight: "bold",
    marginBottom: theme.spacing(0.5),
    marginTop: theme.spacing(4),
    color: "black",
  },
  whyApply: {
    marginBottom: theme.spacing(4),
    color: "black",
  },
  container: {
    background: theme.palette.background.default,
    width: "100%",
  },
}));

const JobPosting = ({ job, setJob }) => {
  const classes = useStyles();
  const [jobsData, setJobsData] = useState(null);
  const formRef = useRef(null);
  const dispatch = useDispatch();
  const editmode = useSelector((state) => state.editmode);

   

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
          <Grid container spacing={3} className={classes.container}>
            <BaseContent
              header=""
              maxWidth={1200}
              pad={6}
              mt={3}
              mb={3}
              br={1}
              background="#F5F5F5"
            >
              {editmode.editMode && (
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "flex-end",
                    marginBottom: 8,
                  }}
                >
                  <AdminButton
                    link="jobposting"
                    tooltipText="Job Openings"
                    size="medium"
                    placement="top"
                  />
                </div>
              )}
              <JobDetails
                job={job}
                handleApplyNowClick={handleApplyNowClick}
                editMode={editmode.editMode}
              />

              <ApplicationForm
                job={job}
                formRef={formRef}
                editMode={editmode.editMode}
              />
              <JobListing
                jobsData={jobsData}
                header="Looking for something else?"
                subheader="See all our open positions below."
                currentId={job.id}
                editMode={editmode.editMode}
              />
            </BaseContent>
          </Grid>
        </div>
      )}
    </>
  );
};

export default JobPosting;
