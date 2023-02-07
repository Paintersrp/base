import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Typography } from "@material-ui/core";
import ContactSection from "./ContactSection";
import HoursSection from "./HoursSection";
import ContactButtons from "../../../Elements/Buttons/ContactButtons";
import SocialSection from "../../../Elements/Buttons/SocialButtons";
import ContactForm from "../../../Forms/Contact/ContactForm";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: "85%",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: "white",
    backgroundColor: "#1C1C1C",
  },
  contactContainer: {
    display: "flex",
    flexDirection: "column",
    padding: 20,
  },
}));

export default function BetterContact() {
  const classes = useStyles();
  const options = [
    { label: "General Inquiry", value: "General Inquiry" },
    { label: "Support", value: "Support" },
    { label: "Partnership", value: "Partnership" },
    { label: "Other", value: "Other" },
  ];

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={9}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6}>
            <ContactSection />
            <HoursSection />
            <SocialSection title={true} />
            <ContactButtons />
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div style={{ maxWidth: "85%" }}>
              <Typography variant="h5" style={{ paddingBottom: 20 }}>
                Contact Us
              </Typography>
              <ContactForm selectOptions={options} />
            </div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
