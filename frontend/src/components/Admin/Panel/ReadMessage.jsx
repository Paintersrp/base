import React, { useEffect, useState } from "react";
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
import StatusChanger from "./Table/ControlPanel/Mixins/StatusChanger";
import { getCookie } from "../../../Utils";
import axios from "axios";
import { useDispatch } from "react-redux";
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
    // backgroundColor: "#FAFAFA",
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
    marginBottom: theme.spacing(3),
  },
  valueYes: {
    color: theme.palette.success.light,
    fontWeight: 500,
    wordBreak: "break-word",
    marginBottom: theme.spacing(3),
  },
  valueNo: {
    color: theme.palette.error.light,
    fontWeight: 500,
    wordBreak: "break-word",
    marginBottom: theme.spacing(3),
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
    marginBottom: theme.spacing(1),
  },
  subtitle: {
    fontWeight: 400,
    color: "#718096",
    marginBottom: theme.spacing(3),
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
  messageCount: {
    fontWeight: 400,
    color: "#718096",
  },
  tooltip: {
    backgroundColor: theme.palette.text.secondary,
    color: "#ffffff",
    fontSize: "11px",
  },
}));

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

const ReadMessage = ({
  message,
  metadata,
  goBack = true,
  deleteBtn = true,
  save = true,
}) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(message);
  const [originalRead, setOriginalRead] = useState(message.is_read);
  const [originalArchived, setOriginalArchived] = useState(message.is_archived);

  useEffect(() => {
    setFormData(message);
  }, [message]);

  const handleBackButtonClick = () => {
    navigate(-1);
    setTimeout(() => {
      scrollToTop();
    }, 250);
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
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
    console.log("item:", item);
  };

  const confirmedDelete = (selected) => {
    const deleteEndpoint = `messages/${selected.id}/`;

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
        `http://localhost:8000/api/messages/${formData.id}/`,
        formData,
        config
      );
      setFormData(res.data);
      setOriginalRead(res.data.is_read);
      setOriginalArchived(res.data.is_archived);
      dispatch({ type: "ALERT_SUCCESS", message: "Data updated" });
    } catch (error) {
      console.log(error);
    }
  };

  const optionsYesNo = [
    { value: true, display: "Yes" },
    { value: false, display: "No" },
  ];

  return (
    <BaseContent pt={0} pb={2} boxShadow={0}>
      <Paper className={classes.paper} elevation={0}>
        <Box
          display="flex"
          alignItems="center"
          mb={4}
          style={{ marginBottom: 16 }}
        >
          {goBack && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
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
              <Typography variant="subtitle2" className={classes.messageCount}>
                #{formData.id}
              </Typography>
            </div>
          )}
        </Box>
        <Typography variant="h4" className={classes.title}>
          {formData.subject}
        </Typography>
        <Typography variant="subtitle1" className={classes.subtitle}>
          {formData.name} |{" "}
          {formData.created_at
            ? new Date(formData.created_at).toLocaleString()
            : new Date(Date.now()).toLocaleString()}
        </Typography>
        <Typography variant="body1" className={classes.messageText}>
          {formData.message}
        </Typography>
        <Divider style={{ marginTop: 24 }} />
        <div>
          <Typography variant="h5" className={classes.sectionTitle}>
            Message Details
          </Typography>
          <Typography
            variant="subtitle1"
            className={classes.sectionDescription}
          >
            View the details of the message below
          </Typography>
        </div>

        <Grid container spacing={2}>
          {Object.keys(formData).map((key) =>
            key === "id" || key === "message" || key === "is_replied" ? null : (
              <Grid item xs={12} sm={6} md={4} lg={3} key={key}>
                <Box className={classes.infoBox}>
                  <Typography variant="subtitle2" className={classes.label}>
                    {metadata[key].verbose_name}:
                  </Typography>
                  <Typography
                    variant="body1"
                    className={
                      typeof formData[key] === "boolean"
                        ? formData[key]
                          ? classes.valueYes
                          : classes.value
                        : classes.value
                    }
                  >
                    {key === "created_at" ? (
                      `${new Date(formData.created_at).toLocaleString()}`
                    ) : key === "is_read" || key === "is_archived" ? (
                      <StatusChanger
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        value={formData[key]}
                        originalValue={
                          key === "is_read" ? originalRead : originalArchived
                        }
                        options={optionsYesNo}
                        name={key}
                        save={save}
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
        {deleteBtn && (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <Tooltip
              title={`Delete Message Object: ${formData.id}`}
              placement="top"
              classes={{ tooltip: classes.tooltip }}
            >
              <IconButton size="small" onClick={() => handleDelete(message)}>
                <DeleteIcon color="error" />
              </IconButton>
            </Tooltip>
          </div>
        )}
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

export default ReadMessage;
