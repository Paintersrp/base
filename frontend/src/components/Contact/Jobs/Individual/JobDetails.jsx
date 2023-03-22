import React, { useEffect, useState } from "react";
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
import StyledButton from "../../../Elements/Buttons/StyledButton";
import ApprovalSharpIcon from "@mui/icons-material/ApprovalSharp";
import JobEdit from "./JobEdit";
import EditDeleteButtonMenu from "../../../Elements/Buttons/EditDeleteButtonMenu";
import ManyToManyEdit from "../../../Services/Individual/ManyToManyEdit";

const useStyles = makeStyles((theme) => ({
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
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: theme.spacing(0.5),
    marginTop: theme.spacing(4),
    color: "black",
  },
  requirementItem: {
    marginBottom: theme.spacing(0),
  },
  requirementIcon: {
    color: theme.palette.primary.main,
  },
  requirementIconAlt: {
    color: theme.palette.secondary.main,
  },
  container: {
    background: theme.palette.background.default,
    color: "black",
  },
}));

const JobDetails = ({ job, handleApplyNowClick, editMode }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const [jobData, setJobData] = useState(job);
  const [editing, setEditing] = useState(false);
  const [requirementEditing, setRequirementEditing] = useState(false);
  const [responsibilityEditing, setResponsibilityEditing] = useState(false);

  useEffect(() => {
    setJobData(job);
  }, [job]);

  const updateJobData = (updateJobData) => {
    setJobData(updateJobData);
    setEditing(false);
  };

  const updateRequirementData = (updateService) => {
    setJobData(updateService);
    setRequirementEditing(false);
  };

  const updateResponsibilityData = (updateResponsibilityData) => {
    setJobData(updateResponsibilityData);
    setResponsibilityEditing(false);
  };

  return (
    <div style={{ marginBottom: 24, width: "100%" }}>
      {!editing ? (
        <>
          <Grid container className={classes.container}>
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
                maxHeight={30.75}
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
                {jobData.position}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} style={{ width: "100%" }}>
            <Typography variant="subtitle2" className={classes.location}>
              {jobData.location}
            </Typography>
            <Typography variant="subtitle2" className={classes.employmentType}>
              {jobData.type}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4" className={classes.sectionTitle}>
              Who We Are
            </Typography>
            <Typography variant="body2" style={{ color: "black" }}>
              {jobData.who_we_are}
            </Typography>
            <Typography variant="h4" className={classes.sectionTitle}>
              What We're Looking For
            </Typography>
            <Typography variant="body2" style={{ color: "black" }}>
              {jobData.looking_for}
            </Typography>
            <Typography variant="h4" className={classes.sectionTitle}>
              Why Apply?
            </Typography>
            <Typography
              variant="body2"
              className={classes.whyApply}
              style={{ color: "black" }}
            >
              {job.why_apply}
            </Typography>
          </Grid>
        </>
      ) : (
        <JobEdit
          initialData={jobData}
          updateJobData={updateJobData}
          handleCancel={() => setEditing(!editing)}
        />
      )}
      {!editing && editMode ? (
        <div style={{ width: "100%", marginTop: 8 }}>
          <EditDeleteButtonMenu
            hideDelete
            editClick={() => setEditing(!editing)}
            position="flex-end"
            placement="bottom"
            adminLink="jobposting"
            text="Job Details"
          />
        </div>
      ) : null}

      <Grid item xs={12}>
        {!requirementEditing ? (
          <>
            <Typography variant="h4" className={classes.sectionTitle}>
              Job Requirements
            </Typography>

            <List>
              {jobData.requirements &&
                jobData.requirements.map((requirement, index) => (
                  <ListItem className={classes.requirementItem}>
                    <ListItemIcon
                      className={
                        index % 2 === 0
                          ? classes.requirementIcon
                          : classes.requirementIconAlt
                      }
                    >
                      <CheckCircleOutline />
                    </ListItemIcon>
                    <ListItemText
                      primary={requirement.detail}
                      style={{ color: "black" }}
                    />
                  </ListItem>
                ))}
            </List>
          </>
        ) : (
          <ManyToManyEdit
            data={jobData}
            updateData={updateRequirementData}
            endpoint="jobposting"
            handleCancel={() => setRequirementEditing(!requirementEditing)}
            id={jobData.id}
            fieldName="requirements"
            title="Edit Requirements"
          />
        )}
        {!requirementEditing && editMode ? (
          <div style={{ width: "100%" }}>
            <EditDeleteButtonMenu
              editClick={() => setRequirementEditing(!requirementEditing)}
              hideDelete
              position="start"
              text="Requirements"
              obj={jobData.id}
            />
          </div>
        ) : null}
        {!responsibilityEditing ? (
          <>
            <Typography variant="h4" className={classes.sectionTitle}>
              Job Responsibilities
            </Typography>
            <List>
              {jobData.responsibilities &&
                jobData.responsibilities.map((responsibility, index) => (
                  <ListItem className={classes.requirementItem}>
                    <ListItemIcon
                      className={
                        index % 2 === 0
                          ? classes.requirementIcon
                          : classes.requirementIconAlt
                      }
                    >
                      <CheckCircleOutline />
                    </ListItemIcon>
                    <ListItemText
                      primary={responsibility.detail}
                      style={{ color: "black" }}
                    />
                  </ListItem>
                ))}
            </List>
          </>
        ) : (
          <div style={{ marginTop: 24 }}>
            <ManyToManyEdit
              data={jobData}
              updateData={updateResponsibilityData}
              endpoint="jobposting"
              handleCancel={() =>
                setResponsibilityEditing(!responsibilityEditing)
              }
              id={jobData.id}
              fieldName="responsibilities"
              title="Edit Responsibilities"
            />
          </div>
        )}
        {!responsibilityEditing && editMode ? (
          <div style={{ width: "100%" }}>
            <EditDeleteButtonMenu
              editClick={() => setResponsibilityEditing(!responsibilityEditing)}
              hideDelete
              position="start"
              text="Responsibilities"
              obj={jobData.id}
            />
          </div>
        ) : null}
      </Grid>
    </div>
  );
};

export default JobDetails;
