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
import axiosInstance from "../../../../lib/Axios/axiosInstance";

const Questionaire = ({
  services,
  setRecommendedServices,
  setUnrecommendedServices,
  quizData,
}) => {
  const classes = quizStyles();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [currentStep, setCurrentStep] = useState(0);
  const [nextDisabled, setNextDisabled] = useState(false);
  const [prevDisabled, setPrevDisabled] = useState(true);

  const [weeklyServiceHours, setWeeklyServiceHours] = useState("");
  const [weeklyServiceId, setWeeklyServiceId] = useState("");
  const [hourlyBudget, setHourlyBudget] = useState("");
  const [hourlyBudgetId, setHourlyBudgetId] = useState("");
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
    console.log(event.target.value);
    setWeeklyServiceHours(Number(event.target.value));
    console.log(newQuestions[currentStep].answer_choices);

    const selectedAnswerChoice = newQuestions[currentStep].answer_choices.find(
      (choice) => Number(choice.value) === Number(event.target.value)
    );
    const answerChoiceId = selectedAnswerChoice.id;

    setWeeklyServiceId(answerChoiceId);
  };

  const handleHourlyBudgetChange = (event) => {
    setHourlyBudget(Number(event.target.value));

    const selectedAnswerChoice = newQuestions[currentStep].answer_choices.find(
      (choice) => Number(choice.value) === Number(event.target.value)
    );
    const answerChoiceId = selectedAnswerChoice.id;
    setHourlyBudgetId(answerChoiceId);
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
    console.log("newQuestions0: ", newQuestions[0]);
    console.log("newQuestions1: ", newQuestions[1]);
    console.log("newQuestions2: ", newQuestions[2]);
    const { newScores, recommendedService, unrecommendedServices } =
      calculateQuizResult(services, hourlyBudget, preferredFeatures);

    setServiceScores(newScores);
    setRecommendedServices(recommendedService);
    setUnrecommendedServices(unrecommendedServices);
    console.log("newScores: ", newScores);

    const formData = new FormData();
    formData.append("questionnaire", 2);
    formData.append(
      "results",
      JSON.stringify({
        [newQuestions[0].id]: weeklyServiceId,
        [newQuestions[1].id]: hourlyBudgetId,

      })
    );

    axiosInstance
      .post(`/questionnaireresults/`, formData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleNext = () => {
    const newStep = currentStep + 1;
    setCurrentStep(newStep);
    if (newStep === newQuestions.length) {
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
    setCurrentStep(newQuestions.length);
    setNextDisabled(true);
    setPrevDisabled(false);
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  console.log("quizData: ", quizData.question_sets[0].questions);
  const newQuestions = quizData.question_sets[0].questions;

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
          {newQuestions.map((set, index) => (
            <Step key={set.id}>
              <StepLabel>{set.text}</StepLabel>
            </Step>
          ))}
          <Step key="Features">
            <StepLabel>Features</StepLabel>
          </Step>
        </Stepper>

        {currentStep < newQuestions.length ? (
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
                {newQuestions.map(
                  (set, index) => currentStep === index && set.text
                )}
              </FormLabel>

              <RadioGroup
                aria-label={newQuestions[currentStep].name}
                name={newQuestions[currentStep].value}
                value={
                  newQuestions[currentStep].order === 1
                    ? weeklyServiceHours
                    : newQuestions[currentStep].order === 2
                    ? hourlyBudget
                    : newQuestions[currentStep].order === 3
                    ? weeklyServiceHours
                    : "Ass"
                }
                onChange={
                  currentStep === 0
                    ? handleServiceHoursChange
                    : currentStep === 1
                    ? handleHourlyBudgetChange
                    : currentStep === 2
                    ? handleServiceHoursChange
                    : null
                }
                className={classes.radioGroup}
              >
                {newQuestions[currentStep].answer_choices.map((data, index) => (
                  <FormControlLabel
                    value={Number(data.value)}
                    control={<Radio color="primary" />}
                    label={data.text}
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
