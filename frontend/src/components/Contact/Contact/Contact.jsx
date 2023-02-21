import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Typography } from "@material-ui/core";
import Information from "../Information/Information";
import Hours from "../Hours/Hours";
import Social from "../Social/Social";
import ContactForm from "../../Elements/Forms/ContactForm/ContactForm";
import { baseClasses } from "../../../classes";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    marginTop: theme.spacing(5),
    display: "flex",
    justifyContent: "center",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.primary,
    maxWidth: 900,
  },
  container: {
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
  },
  sectionTitle: {
    marginBottom: theme.spacing(1),
    borderBottom: "1px solid black",
    paddingBottom: theme.spacing(1),
    textAlign: "left",
  },
  formTitle: {
    fontWeight: 600,
    paddingBottom: theme.spacing(2),
  },
}));

export default function Contact({ contactData, color = "light" }) {
  const classes = useStyles();
  const { flexCenter } = baseClasses();

  const options = [
    { label: "General Inquiry", value: "General Inquiry" },
    { label: "Support", value: "Support" },
    { label: "Partnership", value: "Partnership" },
    { label: "Other", value: "Other" },
  ];

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={0}>
        <Grid container spacing={0} className={classes.container}>
          <Grid item xs={12} sm={12} className={classes.section}>
            <Typography variant="h2" className={classes.sectionTitle}>
              Contact Us
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Information contactData={contactData} />
            <Hours contactData={contactData} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} className={flexCenter}>
            <div style={{ width: "90%" }}>
              <Typography variant="h3" className={classes.formTitle}>
                Contact
              </Typography>
              <ContactForm selectOptions={options} />
            </div>
          </Grid>
          <Social color={color} contactData={contactData} title={true} />
        </Grid>
      </Paper>
    </div>
  );
}
