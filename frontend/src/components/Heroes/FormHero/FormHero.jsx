import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { Grid, Paper, Slide } from "@material-ui/core";
import HeroBlock from "../../Elements/TextBlocks/HeroBlock/HeroBlock";
import ContactButtons from "../../Elements/Buttons/ContactButtons";
import SocialSection from "../../Elements/Buttons/SocialButtons";
import ContactForm from "../../Forms/Contact/ContactForm";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    background: "#242424",
    padding: theme.spacing(3),
    maxWidth: "100%",
    color: "white",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
    },
  },
  socialLinks: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "1rem",
  },
  paper: {
    backgroundColor: "#242424",
    padding: 20,
    maxWidth: "95%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

function FormHero() {
  const classes = useStyles();

  const options = [
    { label: "Website Development", value: "Website Development" },
    { label: "Mobile App Development", value: "Mobile App Development" },
    { label: "Digital Marketing", value: "Digital Marketing" },
    { label: "General Inquiry", value: "General Inquiry" },
    { label: "Support", value: "Support" },
    { label: "Partnership", value: "Partnership" },
    { label: "Other", value: "Other" },
  ];

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Paper elevation={9} className={classes.paper}>
          <Grid container spacing={3}>
            <Slide in={true} direction="right" timeout={1000}>
              <Grid item xs={12} md={6} className={classes.socialLinks}>
                <HeroBlock
                  title="Custom Designs"
                  heading="Modern Framework, <br /> Design, and Hosting"
                  text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pretium elit sed consectetur ultricies. Praesent lacinia luctus lacus, sit amet cursus nisl faucibus ac. Proin sollicitudin, tellus et scelerisque hendrerit, leo turpis ornare diam, ac fermentum massa diam a nisi."
                  btnText="Get Started"
                  btnLink="/about"
                  showButton={true}
                />

                <Grid item xs={12} md={6} style={{ width: "100%" }}>
                  <ContactButtons />
                  <div className={classes.socialLinks}>
                    <SocialSection />
                  </div>
                </Grid>
              </Grid>
            </Slide>

            <Slide in={true} direction="left" timeout={1000}>
              <Grid item xs={12} md={6}>
                <ContactForm selectOptions={options} />
              </Grid>
            </Slide>
          </Grid>
        </Paper>
      </div>
    </div>
  );
}

export default FormHero;
