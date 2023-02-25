import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Paper,
  Typography,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Input,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import { CheckCircleOutline } from "@material-ui/icons";
import BaseContent from "../../../Elements/Base/BaseContent.jsx";
import StyledButton from "../../../Elements/Buttons/StyledButton";
import axiosInstance from "../../../../lib/Axios/axiosInstance";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0),
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
  const formRef = useRef(null);
  const [data, setData] = useState(job);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("xs"));

  const handleApplyNowClick = () => {
    formRef.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return (
    <>
      {data && (
        <div className={classes.root}>
          <Grid container spacing={3}>
            <BaseContent header="" maxWidth={1200} pad={6} mt={3} mb={3} br={1}>
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
                    {data.position}
                  </Typography>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={12}>
                <Typography variant="subtitle2" className={classes.location}>
                  {data.location}
                </Typography>
                <Typography
                  variant="subtitle2"
                  className={classes.employmentType}
                >
                  {data.type}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h4" className={classes.sectionTitle}>
                  Who We Are
                </Typography>
                <Typography variant="body2">{data.who_we_are}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h4" className={classes.sectionTitle}>
                  What We're Looking For
                </Typography>
                <Typography variant="body2">{data.looking_for}</Typography>
                <Typography variant="h4" className={classes.sectionTitle}>
                  Job Requirements
                </Typography>
                <List>
                  {data.requirements.map((requirement) => (
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
                  {data.responsibilities.map((responsibility) => (
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
                  {data.why_apply}
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                className={classes.form}
                id="apply-now-form"
                ref={formRef}
              >
                <BaseContent title="Apply Now" maxWidth={1200}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        variant="outlined"
                        label="Name"
                        required
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        variant="outlined"
                        label="Email"
                        type="email"
                        required
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        label="Phone"
                        required
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        label="Cover Letter"
                        required
                        fullWidth
                        multiline
                        rows={4}
                      />
                    </Grid>
                    {/* <Grid item xs={12}>
                <Input variant="outlined" label="Resume" required fullWidth />
              </Grid> */}
                    <Grid
                      item
                      xs={12}
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <StyledButton
                        color="primary"
                        size="medium"
                        type="submit"
                        buttonText="Submit Application"
                        minWidth="0"
                      />
                    </Grid>
                  </Grid>
                </BaseContent>
              </Grid>
            </BaseContent>
          </Grid>
        </div>
      )}
    </>
  );
};

export default JobPosting;
