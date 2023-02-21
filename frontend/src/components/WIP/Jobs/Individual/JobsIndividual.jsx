import React, { useEffect, useState } from "react";
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
} from "@material-ui/core";
import { CheckCircleOutline } from "@material-ui/icons";
import BaseForm from "../../../Elements/Base/BaseForm";
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

const JobPosting = () => {
  const classes = useStyles();
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      axiosInstance
        .get("/jobposting/1/")
        .then((response) => {
          console.log(response.data);
          setData(response.data);
        })
        .catch((err) => {
          setError(err);
        });
    };
    fetchData();
  }, []);

  return (
    <>
      {data && (
        <div className={classes.root}>
          <Grid container spacing={3}>
            <BaseForm title="" maxWidth={1200} extraPadding>
              <Grid
                item
                xs={12}
                sm={12}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography variant="h2" className={classes.title}>
                  {data.position}
                </Typography>
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
              <Grid item xs={12} className={classes.form}>
                <BaseForm title="Apply Now" maxWidth={1200}>
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
                </BaseForm>
              </Grid>
            </BaseForm>
          </Grid>
        </div>
      )}
    </>
  );
};

export default JobPosting;
