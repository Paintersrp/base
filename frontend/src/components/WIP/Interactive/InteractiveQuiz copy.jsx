import React, { useState } from "react";
import {
  Typography,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Grid,
  Checkbox,
  FormGroup,
  Step,
  StepLabel,
  Stepper,
  Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import ServicesResult from "./ServicesResult";
import NavigationButtons from "./NavigationButtons";
import { servicesData } from "./servicesData";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
  avatar: {
    backgroundColor: red[500],
  },
  fieldset: {
    minHeight: 325,
    border: "none",
    width: "100%",
  },
  button: {
    minWidth: 140,
    margin: theme.spacing(1),
    boxShadow: theme.shadows[3],
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderRadius: 50,
    transition: "0.3s",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: theme.shadows[7],
      backgroundColor: theme.palette.primary.dark,
    },
  },
  formHeader: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#333",
  },
  formContainer: {
    backgroundColor: "#F2F2F2",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  formLabel: {
    fontSize: "1.25rem",
    fontWeight: "bold",
    color: "#333",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  radioGroup: {
    marginBottom: theme.spacing(2),
  },
  formControlLabel: {
    fontSize: "1rem",
  },
}));

const InteractiveQuiz = () => {
  const [services, setServices] = useState(servicesData);
  const [currentStep, setCurrentStep] = useState(0);
  const [nextDisabled, setNextDisabled] = useState(false);
  const [prevDisabled, setPrevDisabled] = useState(true);
  const classes = useStyles();
  const [recommendedServices, setRecommendedServices] = useState("");
  const [weeklyServiceHours, setWeeklyServiceHours] = useState("");
  const [hourlyBudget, setHourlyBudget] = useState("");
  const [preferredFeatures, setPreferredFeatures] = useState([]);
  const [unrecommendedServices, setUnrecommendedServices] = useState([]);
  const [serviceScores, setServiceScores] = useState({});

  const handleServiceHoursChange = (event) => {
    setWeeklyServiceHours(Number(event.target.value));
  };
  const handleHourlyBudgetChange = (event) => {
    setHourlyBudget(Number(event.target.value));
  };
  const handlePreferredFeatureChange = (event, feature) => {
    console.log(preferredFeatures);
    if (event.target.checked) {
      setPreferredFeatures((prevState) => [...prevState, feature]);
    } else {
      setPreferredFeatures((prevState) =>
        prevState.filter((item) => item !== feature)
      );
    }
  };

  const serviceFeatures = [];
  services.forEach((service) => {
    service.features.forEach((feature) => {
      if (!serviceFeatures.includes(feature)) {
        serviceFeatures.push(feature);
      }
    });
  });

  const handleQuizResult = () => {
    const newScores = {};
    services.forEach((service) => {
      let score = 0;
      if (service.price <= hourlyBudget) {
        score++;
      }
      service.features.forEach((feature) => {
        if (preferredFeatures.includes(feature)) {
          score++;
        }
      });
      newScores[service.title] = score;
    });

    const recommendedService = services.reduce((prev, current) =>
      newScores[prev.title] > newScores[current.title] ? prev : current
    );

    const unrecommendedServices = services.filter(
      (service) => service.title !== recommendedService.title
    );

    setServiceScores(newScores);
    setRecommendedServices(recommendedService);
    setUnrecommendedServices(unrecommendedServices);
    console.log(unrecommendedServices);
  };

  const questions = [
    {
      question: "How many hours per week do you need this service?",
      options: [
        { label: "Less than 10 hours", value: 10 },
        { label: "10-20 hours", value: 20 },
        { label: "More than 20 hours", value: Infinity },
      ],
      state: weeklyServiceHours,
      handle: handleServiceHoursChange,
      name: "service-hours",
    },
    {
      question: "What is your budget per month?",
      options: [
        { label: "Less than $30", value: 30 },
        { label: "Between $30 and $100", value: 100 },
        { label: "Over $100", value: Infinity },
      ],
      state: hourlyBudget,
      handle: handleHourlyBudgetChange,
      name: "budget-group",
    },
  ];

  const handleNext = () => {
    const newStep = currentStep + 1;
    setCurrentStep(newStep);
    if (newStep === questions.length) {
      setNextDisabled(true);
    } else {
      setPrevDisabled(false);
    }
  };

  const handlePrev = () => {
    const newStep = currentStep - 1;
    setCurrentStep(newStep);
    if (newStep === 0) {
      setPrevDisabled(true);
    } else {
      setNextDisabled(false);
    }
  };

  return (
    <div className={classes.root}>
      <Grid container flex justifyContent="center">
        <Box style={{ maxWidth: 500 }} className={classes.formContainer}>
          <Typography
            variant="h1"
            align="center"
            className={classes.formHeader}
          >
            {currentStep < questions.length
              ? "Question " + (currentStep + 1)
              : "Select Features"}
          </Typography>
          <Grid item xs={12}>
            <br />
            <Stepper activeStep={currentStep}>
              {questions.map((set, index) => (
                <Step key={set.name}>
                  <StepLabel>{set.name}</StepLabel>
                </Step>
              ))}
              <Step key="Features">
                <StepLabel>Features</StepLabel>
              </Step>
            </Stepper>

            {currentStep < questions.length ? (
              <Grid container flex justifyContent="center">
                <FormControl component="fieldset" className={classes.fieldset}>
                  <FormLabel component="legend" className={classes.formLabel}>
                    {questions.map(
                      (set, index) => currentStep === index && set.question
                    )}
                  </FormLabel>
                  <RadioGroup
                    aria-label={questions[currentStep].name}
                    name={questions[currentStep].name}
                    value={questions[currentStep].state}
                    onChange={questions[currentStep].handle}
                    className={classes.radioGroup}
                  >
                    {questions[currentStep].options.map((data, index) => (
                      <FormControlLabel
                        value={data.value}
                        control={<Radio color="primary" />}
                        label={data.label}
                        className={classes.formControlLabel}
                      />
                    ))}
                  </RadioGroup>
                  <br />
                </FormControl>
                <NavigationButtons
                  onClickBtnOne={handlePrev}
                  onClickBtnTwo={handleNext}
                  disabledBtnOne={prevDisabled}
                  disabledBtnTwo={nextDisabled}
                />
              </Grid>
            ) : (
              <Grid container flex justifyContent="center">
                <FormControl component="fieldset" className={classes.fieldset}>
                  <FormLabel component="legend" className={classes.formLabel}>
                    What feature is most important to you?
                  </FormLabel>
                  <FormGroup>
                    {serviceFeatures.map((feature, index) => (
                      <FormControlLabel
                        key={index}
                        checked={preferredFeatures.includes(feature)}
                        control={<Checkbox color="primary" />}
                        label={feature}
                        onChange={(event) =>
                          handlePreferredFeatureChange(event, feature)
                        }
                        className={classes.formControlLabel}
                      />
                    ))}
                  </FormGroup>
                  <br />
                </FormControl>
                <NavigationButtons
                  onClickBtnOne={handlePrev}
                  onClickBtnTwo={handleQuizResult}
                  disabledBtnOne={prevDisabled}
                  disabledBtnTwo={false}
                  textBtnTwo="Find Service"
                />
              </Grid>
            )}
          </Grid>
        </Box>
        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {recommendedServices ? (
            <div>
              <ServicesResult
                recommended={recommendedServices}
                others={unrecommendedServices}
              />
              <Grid container flex justifyContent="center">
                <Button
                  size="large"
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  Book a Service
                </Button>
              </Grid>
            </div>
          ) : null}
        </Grid>
      </Grid>
    </div>
  );
};

export default InteractiveQuiz;
