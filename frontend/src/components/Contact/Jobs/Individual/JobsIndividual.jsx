import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import { CheckCircleOutline } from "@material-ui/icons";
import BaseContent from "../../../Elements/Base/BaseContent.jsx";
import StyledButton from "../../../Elements/Buttons/StyledButton";
import ApplicationForm from "./ApplicationForm.jsx";
import JobListing from "../Listing/Listing.jsx";
import ApprovalSharpIcon from "@mui/icons-material/ApprovalSharp";
import axiosInstance from "../../../../lib/Axios/axiosInstance.js";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0),
    backgroundColor: theme.palette.background.light,
  },
  title: {
    fontWeight: "bold",
    marginBottom: theme.spacing(1),
  },
  location: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(0),
  },
  employmentType: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(0),
  },
  applyButton: {
    marginLeft: "auto",
    maxHeight: 40,
  },
  referButton: {
    marginRight: theme.spacing(2),
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: theme.spacing(0.5),
    marginTop: theme.spacing(4),
  },
  requirementItem: {
    marginBottom: theme.spacing(0),
  },
  requirementIcon: {
    color: theme.palette.primary.main,
  },
  whyApply: {
    marginBottom: theme.spacing(4),
  },
  form: {
    marginTop: theme.spacing(0),
  },
  submitButton: {
    marginTop: theme.spacing(0),
  },
}));

const JobPosting = ({ job }) => {
  const classes = useStyles();
  const [jobsData, setJobsData] = useState(null);
  const formRef = useRef(null);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("xs"));
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
              <Grid container>
                <Grid
                  item
                  xs={12}
                  sm={4}
                  style={{
                    display: "flex",
                    justifyContent: isSmallScreen ? "center" : "flex-end",
                    order: isSmallScreen ? 0 : 1,
                  }}
                >
                  <StyledButton
                    size="small"
                    buttonText="Apply Now"
                    onClick={handleApplyNowClick}
                    startIcon={<ApprovalSharpIcon />}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={8}
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    order: isSmallScreen ? 1 : 0,
                  }}
                >
                  <Typography variant="h2" className={classes.title}>
                    {job.position}
                  </Typography>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={12}>
                <Typography variant="subtitle2" className={classes.location}>
                  {job.location}
                </Typography>
                <Typography
                  variant="subtitle2"
                  className={classes.employmentType}
                >
                  {job.type}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h4" className={classes.sectionTitle}>
                  Who We Are
                </Typography>
                <Typography variant="body2">{job.who_we_are}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h4" className={classes.sectionTitle}>
                  What We're Looking For
                </Typography>
                <Typography variant="body2">{job.looking_for}</Typography>
                <Typography variant="h4" className={classes.sectionTitle}>
                  Job Requirements
                </Typography>
                <List>
                  {job.requirements.map((requirement) => (
                    <ListItem className={classes.requirementItem}>
                      <ListItemIcon className={classes.requirementIcon}>
                        <CheckCircleOutline />
                      </ListItemIcon>
                      <ListItemText primary={requirement.detail} />
                    </ListItem>
                  ))}
                </List>
                <Typography variant="h4" className={classes.sectionTitle}>
                  Job Responsibilities
                </Typography>
                <List>
                  {job.responsibilities.map((responsibility) => (
                    <ListItem className={classes.requirementItem}>
                      <ListItemIcon className={classes.requirementIcon}>
                        <CheckCircleOutline />
                      </ListItemIcon>
                      <ListItemText primary={responsibility.detail} />
                    </ListItem>
                  ))}
                </List>
              </Grid>
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
