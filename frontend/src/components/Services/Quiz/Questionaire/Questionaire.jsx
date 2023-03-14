import React, { useState } from "react";
import {
  Typography,
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
  useMediaQuery,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import NavigationButtons from "./NavigationButtons";
import { quizStyles } from "../styles";
import { calculateQuizResult } from "../Quiz/QuizUtiils";

const Questionaire = ({
  services,
  setRecommendedServices,
  setUnrecommendedServices,
}) => {
  const classes = quizStyles();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [currentStep, setCurrentStep] = useState(0);
  const [nextDisabled, setNextDisabled] = useState(false);
  const [prevDisabled, setPrevDisabled] = useState(true);

  const [weeklyServiceHours, setWeeklyServiceHours] = useState("");
  const [hourlyBudget, setHourlyBudget] = useState("");
  const [preferredFeatures, setPreferredFeatures] = useState([]);
  const [serviceScores, setServiceScores] = useState({});

  const serviceFeatures = [];
  services.forEach((service) => {
    service.features.forEach((feature) => {
      if (!serviceFeatures.includes(feature.detail)) {
        serviceFeatures.push(feature.detail);
      }
    });
  });

  const handleServiceHoursChange = (event) => {
    setWeeklyServiceHours(Number(event.target.value));
  };

  const handleHourlyBudgetChange = (event) => {
    setHourlyBudget(Number(event.target.value));
  };

  const handlePreferredFeatureChange = (event, feature) => {
    if (event.target.checked) {
      setPreferredFeatures((prevState) => [...prevState, feature]);
    } else {
      setPreferredFeatures((prevState) =>
        prevState.filter((item) => item !== feature)
      );
    }
  };

  const handleQuizResult = () => {
    const { newScores, recommendedService, unrecommendedServices } =
      calculateQuizResult(services, hourlyBudget, preferredFeatures);

    setServiceScores(newScores);
    setRecommendedServices(recommendedService);
    setUnrecommendedServices(unrecommendedServices);
  };

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

  const handleSkip = () => {
    const recommendedService = services.find(
      (service) => service.service_title === "Professional Tier"
    );
    const unrecommendedServices = services.filter(
      (service) => service.service_title !== "Professional Tier"
    );
    setRecommendedServices(recommendedService);
    setUnrecommendedServices(unrecommendedServices);
    setCurrentStep(questions.length);
    setNextDisabled(true);
    setPrevDisabled(false);
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const questions = [
    {
      question: "Placeholder Text",
      options: [
        { label: "Less than 10 hours", value: 10 },
        { label: "10-20 hours", value: 20 },
        { label: "More than 20 hours", value: Infinity },
      ],
      state: weeklyServiceHours,
      handle: handleServiceHoursChange,
      name: "Needs",
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
      name: "Budget",
    },
    {
      question: "Placeholder Text",
      options: [
        { label: "Less than 10 hours", value: 10 },
        { label: "10-20 hours", value: 20 },
        { label: "More than 20 hours", value: Infinity },
      ],
      state: weeklyServiceHours,
      handle: handleServiceHoursChange,
      name: "Urgency",
    },
  ];

  return (
    <Box
      style={{
        maxWidth: isSmallScreen ? 375 : null,
        width: isSmallScreen ? "100%" : 800,
      }}
      className={`${classes.formContainer} ${classes.fadeIn}`}
    >
      <Typography variant="h2" align="center" className={classes.formHeader}>
        Service Finder
      </Typography>
      <Grid item xs={12}>
        <br />
        <Stepper
          orientation={isSmallScreen ? "vertical" : "horizontal"}
          activeStep={currentStep}
          className={classes.stepper}
          style={{ padding: "0px !important" }}
        >
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
            <FormControl
              component="fieldset"
              className={classes.fieldset}
              style={{
                maxWidth: isSmallScreen ? 500 : null,
                width: isSmallScreen ? "100%" : 800,
              }}
            >
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
                    classes={{ root: classes.formControlRootLabel }}
                  />
                ))}
              </RadioGroup>
              <br />
            </FormControl>
            <NavigationButtons
              onClickBtnOne={handlePrev}
              onClickBtnTwo={handleNext}
              onClickBtnThree={handleSkip}
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
            <Box mt={3} display="flex" justifyContent="space-between">
              <NavigationButtons
                onClickBtnOne={handlePrev}
                onClickBtnTwo={handleQuizResult}
                onClickBtnThree={handleSkip}
                disabledBtnOne={prevDisabled}
                disabledBtnTwo={false}
                textBtnTwo="Find Service"
              />
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Questionaire;
