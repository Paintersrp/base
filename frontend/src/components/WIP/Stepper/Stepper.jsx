import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  card: {
    marginBottom: theme.spacing(2),
  },
  actions: {
    justifyContent: "flex-end",
  },
  backButton: {
    padding: theme.spacing(0),
  },
}));

function getSteps() {
  const classes = useStyles();
  return [
    {
      label: "Step 1",
      title: "Title for Step 1",
      subtitle: "Subtitle for Step 1",
      description: "A longer description of Step 1",
      image: "/images/step1-image.jpg",
      additionalContent: <Typography>Additional content for Step 1</Typography>,
    },
    {
      label: "Step 2",
      title: "Title for Step 2",
      subtitle: "Subtitle for Step 2",
      description: "A longer description of Step 2",
      image: "/images/step2-image.jpg",
      additionalContent: (
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Additional Content for Step 2
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              This card contains additional content for Step 2, such as an
              infographic, chart, or other visual aids.
            </Typography>
          </CardContent>
          <CardActions className={classes.actions}>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      ),
    },
    {
      label: "Step 3",
      title: "Title for Step 3",
      subtitle: "Subtitle for Step 3",
      description: "A longer description of Step 3",
      image: "/images/step3-image.jpg",
      additionalContent: <Typography>Additional content for Step 3</Typography>,
    },
  ];
}

export default function ServiceProcess() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Grid container flex justifyContent="center" style={{ maxWidth: 1000 }}>
        <Grid item xs={12}>
          <Stepper activeStep={activeStep} orientation="horizontal">
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel>{step.label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Grid>
        <Grid item xs={12} style={{ maxWidth: 800 }}>
          {activeStep === steps.length ? (
            <div>
              <Grid
                container
                justifyContent="center"
                style={{ marginBottom: 20 }}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleReset}
                  className={classes.backButton}
                  style={{ marginRight: 5 }}
                >
                  Reset
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={[]}
                  style={{ marginLeft: 5 }}
                >
                  Done
                </Button>
              </Grid>
              <Typography className={classes.instructions}>
                All steps completed - you&apos;re finished
              </Typography>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <Grid
                container
                justifyContent="center"
                alignContent="end"
                style={{ marginBottom: 20 }}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.backButton}
                  style={{ marginRight: 5 }}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  style={{ marginLeft: 5 }}
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </Grid>
              <Typography className={classes.instructions}>
                {steps[activeStep].title}
              </Typography>
              <Typography className={classes.instructions}>
                {steps[activeStep].subtitle}
              </Typography>
              <Typography className={classes.instructions}>
                {steps[activeStep].description}
              </Typography>
              {steps[activeStep].image && (
                <img
                  src={steps[activeStep].image}
                  alt={steps[activeStep].title}
                />
              )}
              {steps[activeStep].additionalContent}
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
