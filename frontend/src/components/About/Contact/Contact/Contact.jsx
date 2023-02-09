import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Typography } from "@material-ui/core";
import Information from "../Information/Information";
import Hours from "../Hours/Hours";
import ContactButtons from "./ContactButtons";
import Social from "../Social/Social";
import { useState } from "react";
import ContactForm from "../../../Elements/Forms/Contact/ContactForm";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100vw",
    marginTop: theme.spacing(5),
    display: "flex",
    justifyContent: "center",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: "black",
    backgroundColor: "white",
    maxWidth: 900,
  },
  contactContainer: {
    display: "flex",
    flexDirection: "column",
    padding: 20,
  },
  container: {
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: theme.spacing(3),
    borderBottom: "1px solid black",
    paddingBottom: theme.spacing(1),
    textAlign: "left",
  },
}));

export default function Contact({ contactData }) {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const options = [
    { label: "General Inquiry", value: "General Inquiry" },
    { label: "Support", value: "Support" },
    { label: "Partnership", value: "Partnership" },
    { label: "Other", value: "Other" },
  ];

  useEffect(() => {
    setData(contactData);
  }, []);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={0}>
        <Grid container spacing={0} className={classes.container}>
          <Grid item xs={12} sm={12} className={classes.section}>
            <Typography variant="h3" className={classes.sectionTitle}>
              Contact Us
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={6} style={{ minHeight: 500 }}>
            <Information contactData={contactData} />
            <Hours contactData={contactData} />
            <Social contactData={contactData} title={true} />
            <ContactButtons contactData={contactData} />
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            style={{
              display: "flex",
              justifyContent: "center",
              minHeight: 500,
            }}
          >
            <div style={{ maxWidth: "85%" }}>
              <Typography variant="h5" style={{ paddingBottom: 20 }}>
                Contact
              </Typography>
              <ContactForm selectOptions={options} />
            </div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
