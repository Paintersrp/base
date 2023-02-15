import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  Box,
} from "@material-ui/core";
import benefitsData from "./benefitsData";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.light,
    padding: theme.spacing(2, 0),
  },
  benefit: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(0),
    borderRadius: theme.shape.borderRadius,
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(0),
    },
  },
  benefitTitle: {
    fontWeight: 600,
    color: theme.palette.primary.light,
    marginBottom: theme.spacing(2),
  },
  benefitDescription: {
    color: "#6B6B6B",
    marginBottom: theme.spacing(2),
  },
  benefitImage: {
    height: "100px",
    [theme.breakpoints.up("md")]: {
      height: "200px",
    },
  },
  benefitButton: {
    marginTop: theme.spacing(2),
  },
  gridItem: {
    display: "flex",
    padding: 20,
  },
  benefitContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: "100%",
  },
  icon: {
    display: "flex",
    justifyContent: "center",
    paddingBottom: 20,
    color: theme.palette.primary.dark,
    fontSize: "2rem",
  },
}));

const Benefit = ({ title, description, icon, buttonText, buttonLink }) => {
  const classes = useStyles();

  return (
    <Card className={classes.benefit}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <div className={classes.icon}>{icon}</div>
          <Typography variant="h5" className={classes.benefitTitle}>
            {title}
          </Typography>
        </Box>
        <Typography variant="body1" className={classes.benefitDescription}>
          {description}
        </Typography>

        {buttonText && (
          <Button
            variant="contained"
            color="primary"
            href={buttonLink}
            className={classes.benefitButton}
          >
            {buttonText}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

const Benefits = () => {
  const classes = useStyles();
  const maxDescriptionHeight = Math.max(
    ...benefitsData.map((b) => b.description.length)
  );

  // <Grid item xs={12} md={4} className={classes.gridItem}>

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Why Choose Us?
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          We believe that our commitment to quality and customer satisfaction
          sets us apart from our competitors. Here are a few of the benefits of
          working with us:
        </Typography>
        <div className={classes.benefitContainer}>
          {benefitsData.map((benefit) => (
            <Grid item xs={12} md={4} className={classes.gridItem}>
              <Benefit
                key={benefit.title}
                title={benefit.title}
                description={benefit.description}
                icon={benefit.icon}
                maxHeight={maxDescriptionHeight}
              />
            </Grid>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Benefits;
