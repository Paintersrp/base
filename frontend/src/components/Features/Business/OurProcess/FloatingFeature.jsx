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
import TileEdit from "../../Content/FeatureTiles/TileEdit";
import ProcessEdit from "./ProcessEdit";
import { SlideOnScroll } from "../../../Animations/IntoView/Slide/SlideViewPort";

const useStyles = makeStyles((theme) => ({
  iconContainer: {
    textAlign: "center",
    marginTop: 20,
  },
  icon: {
    fontSize: "2rem",
    color: "gold",
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
    color: "white",
  },
  stepContainer: {
    display: "flex",
    justifyContent: "center",
    maxWidth: 550,
  },
}));

const Icon = ({ icon, className }) => {
  console.log(icon);
  switch (icon) {
    case "DesignIcon":
      return <DesignIcon className={className} />;
    case "DevelopIcon":
      return <DevelopIcon className={className} />;
    case "LockIcon":
      return <LockIcon className={className} />;
    case "HostingIcon":
      return <HostingIcon className={className} />;
    case "LaunchIcon":
      return <LaunchIcon className={className} />;
    case "AllInclusiveIcon":
      return <AllInclusiveIcon className={className} />;
    default:
      return <></>;
  }
};

export default function FloatingFeature({ step }) {
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
      <SlideOnScroll direction="down">
        <Grid container spacing={1} className={classes.stepContainer}>
          {auth.is_superuser ? (
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "flex-start",
              }}
            >
              <Button
                variant="outlined"
                style={{
                  color: "white",
                  borderColor: "grey",
                  height: 25,
                  fontSize: "0.75rem",
                }}
                onClick={() => setEditing(!editing)}
              >
                {editing ? "Cancel" : "Edit"}
              </Button>
            </div>
          ) : null}
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
            <ProcessEdit process={featureData} updateProcess={updateProcess} />
          )}
        </Grid>
      </SlideOnScroll>
    </>
  );
}
