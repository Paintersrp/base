import React from "react";
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

  return (
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
              Job Position
            </Typography>
            {/* <StyledButton
              size="medium"
              buttonText="Apply Now"
              color="primary"
              minWidth="0"
            /> */}
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography variant="subtitle2" className={classes.location}>
              Job Location
            </Typography>
            <Typography variant="subtitle2" className={classes.employmentType}>
              Employment Type
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4" className={classes.sectionTitle}>
              Who We Are
            </Typography>
            <Typography variant="body2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in
              neque eu augue ultricies rhoncus.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4" className={classes.sectionTitle}>
              What We're Looking For
            </Typography>
            <Typography variant="body2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in
              neque eu augue ultricies rhoncus.
            </Typography>
            <List>
              <ListItem className={classes.requirementItem}>
                <ListItemIcon className={classes.requirementIcon}>
                  <CheckCircleOutline />
                </ListItemIcon>
                <ListItemText primary="Body text for requirement 1" />
              </ListItem>
              <ListItem className={classes.requirementItem}>
                <ListItemIcon className={classes.requirementIcon}>
                  <CheckCircleOutline />
                </ListItemIcon>
                <ListItemText primary="Body text for requirement 2" />
              </ListItem>
              <ListItem className={classes.requirementItem}>
                <ListItemIcon className={classes.requirementIcon}>
                  <CheckCircleOutline />
                </ListItemIcon>
                <ListItemText primary="Body text for requirement 3" />
              </ListItem>
              <ListItem className={classes.requirementItem}>
                <ListItemIcon className={classes.requirementIcon}>
                  <CheckCircleOutline />
                </ListItemIcon>
                <ListItemText primary="Body text for requirement 4" />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4" className={classes.sectionTitle}>
              Why Apply?
            </Typography>
            <Typography variant="body2" className={classes.whyApply}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in
              neque eu augue ultricies rhoncus.
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
  );
};

export default JobPosting;
