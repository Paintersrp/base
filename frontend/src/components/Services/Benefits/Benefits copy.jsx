import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
} from "@material-ui/core";
import benefitsData from "./benefitsData";
import StyledButton from "../../Elements/Buttons/StyledButton";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.light,
    padding: theme.spacing(8, 0),
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
    color: theme.palette.primary.black,
    marginBottom: theme.spacing(2),
  },
  benefitDescription: {
    color: "#6B6B6B",
    marginBottom: theme.spacing(2),
    minHeight: 100,
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

const Benefit = ({
  title,
  description,
  icon,
  buttonText,
  buttonLink,
  minHeight,
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.benefit}>
      <CardContent>
        <Container disableGutters display="flex">
          <Grid item xs={12}>
            <div className={classes.icon}>{icon}</div>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" className={classes.benefitTitle}>
              {title}
            </Typography>
          </Grid>
        </Container>
        <Typography
          variant="body2"
          className={classes.benefitDescription}
          style={{ minHeight: minHeight }}
        >
          {description}
        </Typography>

        {buttonText && (
          <Container
            disableGutters
            style={{ display: "flex", justifyContent: "center" }}
          >
            <StyledButton size="small" buttonText={buttonText} />
          </Container>
        )}
      </CardContent>
    </Card>
  );
};

const Benefits = () => {
  const classes = useStyles();
  const maxDescriptionHeight = Math.max(
    ...benefitsData.map((b) => b.description.split(" ").length)
  );

  console.log(maxDescriptionHeight);

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
        <Container maxWidth="md">
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            We believe that our commitment to quality and customer satisfaction
            sets us apart from our competitors. Here are a few of the benefits
            of working with us
          </Typography>
        </Container>
        <div className={classes.benefitContainer}>
          {benefitsData.map((benefit) => (
            <Grid item xs={12} md={4} className={classes.gridItem}>
              <Benefit
                key={benefit.title}
                title={benefit.title}
                description={benefit.description}
                icon={benefit.icon}
                minHeight={100}
                buttonText={benefit.buttonText ? benefit.buttonText : null}
              />
            </Grid>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Benefits;
