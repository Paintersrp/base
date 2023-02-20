import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import AllInclusiveIcon from "@material-ui/icons/AllInclusive";
import LockIcon from "@material-ui/icons/Lock";
import DesignIcon from "@material-ui/icons/Brush";
import DevelopIcon from "@material-ui/icons/Code";
import HostingIcon from "@material-ui/icons/Public";
import LaunchIcon from "@material-ui/icons/Launch";
import { useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import ProcessEdit from "./ProcessEdit";
import { SlideIntoViewPort } from "../../Elements/Animations/IntoView/SlideIntoViewPort/SlideIntoViewPort";
import EditButton from "../../Elements/Buttons/EditButton";
import Icon from "../../Elements/Icon/Icon";

const useStyles = makeStyles((theme) => ({
  iconContainer: {
    textAlign: "center",
    marginTop: 20,
  },
  icon: {
    fontSize: "2rem",
    color: theme.palette.primary.dark,
  },
  heading: {
    fontFamily: "Poppins",
    textAlign: "center",
    fontWeight: 700,
    fontSize: "1.5rem",
    border: 0,
  },
  description: {
    fontSize: "0.95rem",
    fontWeight: 400,
    fontFamily: "Roboto",
    textAlign: "center",
    marginBottom: theme.spacing(1),
    color: theme.palette.text.dark,
    minHeight: 80,
  },
  stepContainer: {
    display: "flex",
    justifyContent: "center",
    maxWidth: 550,
  },
  fadeIn: {
    opacity: 0,
    animation: `$fadeIn 0.5s ease-in-out forwards`,
  },
  "@keyframes fadeIn": {
    from: {
      opacity: 0,
      transform: "translateY(-30px)",
    },
    to: {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
}));

export default function Process({ step }) {
  const classes = useStyles();
  const [featureData, setFeatureData] = useState(step);
  const [editing, setEditing] = useState(false);
  const auth = useSelector((state) => state.auth);

  const updateProcess = (updateProcess) => {
    setFeatureData(updateProcess);
    setEditing(false);
  };

  return (
    <>
      <SlideIntoViewPort direction="down" className={classes.fadeIn}>
        <Grid container spacing={1} className={classes.stepContainer}>
          {!editing ? (
            <>
              <Grid className={classes.iconContainer} item xs={12}>
                <Icon icon={featureData.icon} className={classes.icon} />
              </Grid>
              <Grid item xs={12}>
                <Typography className={classes.heading}>
                  {featureData.title}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" className={classes.description}>
                  {featureData.description}
                </Typography>
              </Grid>
            </>
          ) : (
            <ProcessEdit
              process={featureData}
              updateProcess={updateProcess}
              handleCancel={() => setEditing(!editing)}
            />
          )}
          {!editing && auth.is_superuser ? (
            <EditButton
              onClick={() => setEditing(!editing)}
              editState={editing}
            />
          ) : null}
        </Grid>
      </SlideIntoViewPort>
    </>
  );
}
