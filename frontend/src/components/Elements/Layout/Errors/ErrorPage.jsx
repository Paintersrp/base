import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, Grid, Fade } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import PageContainer from "../PageContainer";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 700,
    padding: theme.spacing(4),
  },
  iconContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.palette.error.main,
    color: theme.palette.common.white,
    borderRadius: "50%",
    height: 64,
    width: 64,
    marginBottom: theme.spacing(2),
  },
  icon: {
    fontSize: 36,
  },
  errorMessage: {
    color: theme.palette.error.main,
    marginBottom: theme.spacing(0),
    fontWeight: 700,
  },
  description: {
    marginBottom: theme.spacing(4),
    color: theme.palette.text.secondary,
  },
  instructions: {
    marginBottom: theme.spacing(0),
    color: theme.palette.text.secondary,
    fontWeight: 400,
  },
  backButton: {
    marginTop: theme.spacing(2),
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

const ErrorPage = ({ message, description, instructions, thanks }) => {
  const classes = useStyles();
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <PageContainer
      editing={editing}
      setEditing={setEditing}
      backgroundColor="#F5F5F5"
      page_name="Default"
    >
      <Fade in={true} timeout={1000}>
        <Grid container className={classes.container}>
          <Grid item xs={12} sm={6} md={4}>
            <div className={classes.iconContainer}>
              <Typography variant="h2" className={classes.icon}>
                !
              </Typography>
            </div>
            <Typography variant="h4" className={classes.errorMessage}>
              {message || "Oops, something went wrong!"}
            </Typography>
            <Typography variant="subtitle2" className={classes.description}>
              {description ||
                "We couldn't retrieve the data you were looking for. Please try again later."}
            </Typography>
            <Typography variant="h5" className={classes.instructions}>
              {instructions ||
                "We couldn't retrieve the data you were looking for. Please try again later."}
            </Typography>
            <Button
              variant="contained"
              className={classes.backButton}
              onClick={handleBackClick}
              startIcon={<ArrowBack />}
            >
              Go Back
            </Button>
            <div style={{ marginTop: 16 }}>
              <Typography
                variant="caption"
                style={{ marginTop: "8px", color: "grey" }}
              >
                {thanks}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Fade>
    </PageContainer>
  );
};

export default ErrorPage;
