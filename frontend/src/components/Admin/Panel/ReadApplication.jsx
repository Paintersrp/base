import React from "react";
import {
  Typography,
  IconButton,
  makeStyles,
  Grid,
  Paper,
  Box,
  Divider,
} from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import BaseContent from "../../Elements/Base/BaseContent";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4),
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    width: "100%",
    backgroundColor: "#FAFAFA",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.05)",
    borderRadius: 16,
  },
  activeLink: {
    color: "#007BFF",
    marginRight: theme.spacing(4),
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  label: {
    fontWeight: 600,
    color: theme.palette.secondary.main,
    marginBottom: theme.spacing(0),
  },
  value: {
    color: "#718096",
    fontWeight: 500,
    wordBreak: "break-word",
    marginBottom: theme.spacing(1),
  },
  messageText: {
    wordBreak: "break-word",
    fontWeight: 500,
    fontSize: "1rem",
    color: "#2D3748",
  },
  backButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    fontWeight: 600,
    color: "#2D3748",
  },
  subtitle: {
    fontWeight: 400,
    color: "#718096",
    marginBottom: theme.spacing(3),
  },
  details: {
    fontWeight: 400,
    color: "#718096",
    marginBottom: theme.spacing(0),
  },
  sectionTitle: {
    fontWeight: 600,
    color: "#4A5568",
    margin: theme.spacing(3, 0, 0, 0),
  },
  sectionDescription: {
    fontWeight: 400,
    color: "#718096",
    marginBottom: theme.spacing(2),
  },
}));

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

const ReadApplication = ({ application, job }) => {
  console.log("Job: ", job);
  console.log("application: ", application);
  const classes = useStyles();
  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    navigate(-1);
    setTimeout(() => {
      scrollToTop();
    }, 250);
  };

  return (
    <BaseContent pt={0} pb={4} boxShadow={0}>
      <Paper className={classes.paper} elevation={0}>
        <Box
          display="flex"
          alignItems="center"
          mb={4}
          style={{ marginBottom: 16 }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconButton
              size="small"
              color="primary"
              onClick={handleBackButtonClick}
              className={classes.backButton}
            >
              <ArrowBack />
            </IconButton>
          </div>
        </Box>

        <Typography variant="h4" className={classes.title}>
          {job.position} Application
        </Typography>
        <Typography variant="subtitle1" className={classes.details}>
          {job.location} | {job.type}
        </Typography>
        <Typography variant="subtitle1" className={classes.subtitle}>
          From: {application.first_name} {application.last_name} |{" "}
          {application.created_at
            ? new Date(application.created_at).toLocaleString()
            : new Date(Date.now()).toLocaleString()}
        </Typography>
        <Divider />
        <div>
          <Typography variant="h5" className={classes.sectionTitle}>
            Application Details
          </Typography>
          <Typography
            variant="subtitle1"
            className={classes.sectionDescription}
          >
            View the details of the application below.
          </Typography>
        </div>

        <Grid container spacing={2}>
          {Object.keys(application).map((key) =>
            key === "id" || key === "message" || key === "job" ? null : (
              <Grid item xs={12} sm={6} md={4} lg={3} key={key}>
                <Box className={classes.infoBox}>
                  <Typography variant="subtitle2" className={classes.label}>
                    {key.charAt(0).toUpperCase() +
                      key.slice(1).replace(/_/g, " ")}
                    :
                  </Typography>
                  <Typography variant="body1" className={classes.value}>
                    {typeof application[key] === "boolean"
                      ? application[key]
                        ? "Yes"
                        : "No"
                      : key === "created_at"
                      ? `${new Date(application.created_at).toLocaleString()}`
                      : application[key]}
                  </Typography>
                </Box>
              </Grid>
            )
          )}
        </Grid>
        <Divider style={{ marginTop: 16 }} />
        <div>
          <Typography variant="h5" className={classes.sectionTitle}>
            Job Details
          </Typography>
          <Typography
            variant="subtitle1"
            className={classes.sectionDescription}
          >
            View the details of the job below.
          </Typography>
        </div>

        <Grid container spacing={2}>
          {Object.keys(job).map((key) =>
            key === "id" ||
            key === "requirements" ||
            key === "responsibilities" ||
            key === "who_we_are" ||
            key === "why_apply" ||
            key === "looking_for" ||
            key === "tagline" ? null : (
              <Grid item xs={12} sm={6} md={4} lg={3} key={key}>
                <Box className={classes.infoBox}>
                  <Typography variant="subtitle2" className={classes.label}>
                    {key.charAt(0).toUpperCase() +
                      key.slice(1).replace(/_/g, " ")}
                    :
                  </Typography>
                  <Typography variant="body1" className={classes.value}>
                    {typeof job[key] === "boolean"
                      ? job[key]
                        ? "Yes"
                        : "No"
                      : key === "created_at"
                      ? `${new Date(job.created_at).toLocaleString()}`
                      : job[key]}
                  </Typography>
                </Box>
              </Grid>
            )
          )}
        </Grid>
      </Paper>
    </BaseContent>
  );
};

export default ReadApplication;
