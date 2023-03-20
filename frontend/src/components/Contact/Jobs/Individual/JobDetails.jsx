import React from "react";
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

const JobDetails = ({ job, handleApplyNowClick }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("xs"));

  return (
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

      <Grid item xs={12} sm={12} style={{ width: "100%" }}>
        <Typography variant="subtitle2" className={classes.location}>
          {job.location}
        </Typography>
        <Typography variant="subtitle2" className={classes.employmentType}>
          {job.type}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4" className={classes.sectionTitle}>
          Who We Are
        </Typography>
        <Typography variant="body2" style={{ color: "black" }}>
          {job.who_we_are}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4" className={classes.sectionTitle}>
          What We're Looking For
        </Typography>
        <Typography variant="body2" style={{ color: "black" }}>
          {job.looking_for}
        </Typography>
        <Typography variant="h4" className={classes.sectionTitle}>
          Job Requirements
        </Typography>
        <List>
          {job.requirements.map((requirement, index) => (
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
        <Typography variant="h4" className={classes.sectionTitle}>
          Job Responsibilities
        </Typography>
        <List>
          {job.responsibilities.map((responsibility, index) => (
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
      </Grid>
    </>
  );
};

export default JobDetails;
