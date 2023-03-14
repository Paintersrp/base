import React from "react";
import {
  Typography,
  IconButton,
  makeStyles,
  Grid,
  Paper,
  Box,
} from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { Link } from "react-router-dom";
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
    margin: theme.spacing(4, 0, 0, 0),
  },
  sectionDescription: {
    fontWeight: 400,
    color: "#718096",
    marginBottom: theme.spacing(2),
  },
}));

const ReadMessage = ({ message, url, keys, appName, model, metadata, id }) => {
  const classes = useStyles();

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
            <Link
              to={`/admin${url}`}
              state={{
                url: url,
                keys: keys,
                appName: appName,
                model: model,
                metadata: metadata,
                id: id,
              }}
              key={appName}
              className={classes.activeLink}
            >
              <IconButton
                size="small"
                color="primary"
                className={classes.backButton}
              >
                <ArrowBack />
              </IconButton>
            </Link>
          </div>
        </Box>
        <Typography variant="h4" className={classes.title}>
          {message.subject}
        </Typography>
        <Typography variant="subtitle1" className={classes.subtitle}>
          {message.name} | {new Date(message.created_at).toLocaleString()}
        </Typography>
        <Typography variant="body1" className={classes.messageText}>
          {message.message}
        </Typography>
        <div>
          <Typography variant="h5" className={classes.sectionTitle}>
            Message Details
          </Typography>
          <Typography
            variant="subtitle1"
            className={classes.sectionDescription}
          >
            View the details of the message below.
          </Typography>
        </div>

        <Grid container spacing={2}>
          {Object.keys(message).map((key) =>
            key === "id" || key === "message" ? null : (
              <Grid item xs={12} sm={6} md={4} lg={3} key={key}>
                <Box className={classes.infoBox}>
                  <Typography variant="subtitle2" className={classes.label}>
                    {key.charAt(0).toUpperCase() +
                      key.slice(1).replace(/_/g, " ")}
                    :
                  </Typography>
                  <Typography variant="body1" className={classes.value}>
                    {typeof message[key] === "boolean"
                      ? message[key]
                        ? "Yes"
                        : "No"
                      : key === "created_at"
                      ? `${new Date(message.created_at).toLocaleString()}`
                      : message[key]}
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

export default ReadMessage;
