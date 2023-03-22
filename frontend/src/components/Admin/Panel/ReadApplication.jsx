import React, { useState } from "react";
import {
  Typography,
  IconButton,
  makeStyles,
  Grid,
  Paper,
  Box,
  Divider,
  Tooltip,
} from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import BaseContent from "../../Elements/Base/BaseContent";
import AdminButton from "../../Elements/Buttons/AdminButton";
import axios from "axios";
import { getCookie } from "../../../Utils";
import { useDispatch } from "react-redux";
import StatusChanger from "./Table/ControlPanel/Mixins/StatusChanger";
import axiosInstance from "../../../lib/Axios/axiosInstance";
import DeleteConfirmationModal from "../../Elements/Modals/DeleteConfirmationModal";
import { Delete as DeleteIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4),
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(0),
    width: "100%",
    backgroundColor: theme.palette.background.default,
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
  tooltip: {
    backgroundColor: theme.palette.text.secondary,
    color: "#ffffff",
    fontSize: "11px",
  },
  resumeLink: {
    color: theme.palette.info.light,
  },
  select: {
    width: "100%",
    marginTop: 4,
    height: "40px",
    overflow: "auto",
    background: "#F5F5F5",
    color: theme.palette.text.dark,
    "& .MuiSelect-icon": {
      color: theme.palette.text.dark,
    },
    "& .MuiOutlinedInput-input": {
      color: theme.palette.text.dark,
    },
    "& .MuiSelect-select": {},
    "& .MuiSelect-select:focus": {},
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white !important",
      },
    },
    "& .MuiFormLabel-root": {
      color: "red",
      fontWeight: "700",
      fontSize: "0.9rem",
    },
    "& input": {
      color: theme.palette.text.dark,
    },
    "& .MuiMenu-paper": {
      maxHeight: 40,
      overflowY: "auto",
    },
  },
}));

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

const ReadApplication = ({ application, job, metadata }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(application);
  const [jobData, setJobData] = useState(job);
  const [originalStatus, setOriginalStatus] = useState(application.status);
  const [originalFilled, setOriginalFilled] = useState(job.filled);

  const handleBackButtonClick = () => {
    navigate(-1);
    setTimeout(() => {
      scrollToTop();
    }, 250);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleConfirmDelete = () => {
    confirmedDelete(selected);
    handleClose();
  };

  const handleDelete = (item) => {
    handleOpen();
    setSelected(item);
  };

  const confirmedDelete = (selected) => {
    const deleteEndpoint = `application/${selected.id}/`;

    axiosInstance
      .delete(deleteEndpoint)
      .then(() => {
        handleBackButtonClick();
        dispatch({
          type: "ALERT_SUCCESS",
          message: `Message - Object: ${selected.id} Deleted`,
        });
      })
      .catch((err) => {
        console.log(err);
        // setError(err);
      });
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const handleJobChange = (event) => {
    setJobData({
      ...jobData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);

    const config = {
      headers: {
        Authorization: `JWT ${getCookie("jwt")}`,
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      const res = await axios.patch(
        `http://localhost:8000/api/application/${formData.id}/`,
        formData,
        config
      );
      setFormData(res.data);
      setOriginalStatus(res.data.status);
      dispatch({ type: "ALERT_SUCCESS", message: "Data updated" });
    } catch (error) {
      console.log(error);
    }
  };

  const handleJobSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);

    const config = {
      headers: {
        Authorization: `JWT ${getCookie("jwt")}`,
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      const res = await axios.patch(
        `http://localhost:8000/api/jobposting/${jobData.id}/`,
        jobData,
        config
      );
      setJobData(res.data);
      setOriginalFilled(res.data.filled);
      dispatch({ type: "ALERT_SUCCESS", message: "Data updated" });
    } catch (error) {
      console.log(error);
    }
  };

  const optionsYesNo = [
    { value: true, display: "Yes" },
    { value: false, display: "No" },
  ];
  const optionsStatus = [
    { value: "Pending", display: "Pending" },
    { value: "Accepted", display: "Accepted" },
    { value: "Rejected", display: "Rejected" },
  ];

  return (
    <BaseContent pt={0} pb={2} mb={0} boxShadow={0}>
      <Paper className={classes.paper} elevation={0}>
        <Box
          display="flex"
          alignItems="center"
          mb={4}
          style={{ marginBottom: 16 }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Tooltip
              title={`Go Back`}
              placement="top"
              classes={{ tooltip: classes.tooltip }}
            >
              <IconButton
                size="small"
                color="primary"
                onClick={handleBackButtonClick}
                className={classes.backButton}
              >
                <ArrowBack />
              </IconButton>
            </Tooltip>
          </div>
        </Box>

        <Typography variant="h4" className={classes.title}>
          {jobData.position} Application
        </Typography>
        <Typography variant="subtitle1" className={classes.details}>
          {jobData.location} | {jobData.type}
        </Typography>
        <Typography variant="subtitle1" className={classes.subtitle}>
          From: {formData.first_name} {formData.last_name} |{" "}
          {formData.created_at
            ? new Date(formData.created_at).toLocaleString()
            : new Date(Date.now()).toLocaleString()}
        </Typography>
        <Divider />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
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
          <AdminButton link={`jobposting`} tooltipText="Job" />
        </div>

        <Grid container spacing={2}>
          {Object.keys(jobData).map((key) =>
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
                    {key === "created_at"
                      ? "Created At"
                      : key.charAt(0).toUpperCase() +
                        key.slice(1).replace(/_/g, " ")}
                    :
                  </Typography>
                  <Typography variant="body1" className={classes.value}>
                    {key === "created_at" ? (
                      `${new Date(jobData.created_at).toLocaleString()}`
                    ) : key === "filled" ? (
                      <StatusChanger
                        handleSubmit={handleJobSubmit}
                        handleChange={handleJobChange}
                        value={jobData.filled}
                        originalValue={originalFilled}
                        options={optionsYesNo}
                        name="filled"
                      />
                    ) : (
                      jobData[key]
                    )}
                  </Typography>
                </Box>
              </Grid>
            )
          )}
        </Grid>
        <Divider style={{ marginTop: 24 }} />
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
          {Object.keys(formData).map((key) =>
            key === "id" || key === "message" || key === "job" ? null : (
              <Grid item xs={12} sm={6} md={4} lg={3} key={key}>
                <Box className={classes.infoBox}>
                  <Typography variant="subtitle2" className={classes.label}>
                    {metadata[key].verbose_name}:
                  </Typography>
                  <Typography variant="body1" className={classes.value}>
                    {typeof formData[key] === "boolean" ? (
                      formData[key] ? (
                        "Yes"
                      ) : (
                        "No"
                      )
                    ) : key === "created_at" ? (
                      `${new Date(formData.created_at).toLocaleString()}`
                    ) : key === "resume" ? (
                      <a
                        href={formData[key]}
                        download
                        className={classes.resumeLink}
                      >
                        Download Resume
                      </a>
                    ) : key === "status" ? (
                      <StatusChanger
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        value={formData.status}
                        originalValue={originalStatus}
                        options={optionsStatus}
                        name="status"
                      />
                    ) : (
                      formData[key]
                    )}
                  </Typography>
                </Box>
              </Grid>
            )
          )}
        </Grid>
        <div
          style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
        >
          <Tooltip
            title={`Delete Application Object: ${formData.id}`}
            placement="top"
            classes={{ tooltip: classes.tooltip }}
          >
            <IconButton size="small" onClick={() => handleDelete(application)}>
              <DeleteIcon color="error" />
            </IconButton>
          </Tooltip>
        </div>
      </Paper>
      <DeleteConfirmationModal
        open={open}
        handleClose={handleClose}
        handleConfirmDelete={handleConfirmDelete}
        message={"Are you sure you want to delete this?"}
      />
    </BaseContent>
  );
};

export default ReadApplication;
