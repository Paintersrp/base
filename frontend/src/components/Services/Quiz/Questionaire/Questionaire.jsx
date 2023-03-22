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
  TextField,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import NavigationButtons from "./NavigationButtons";
import { quizStyles } from "../styles";
import { calculateQuizResult } from "../Quiz/QuizUtiils";
import axiosInstance from "../../../../lib/Axios/axiosInstance";
import AdminButton from "../../../Elements/Buttons/AdminButton";
import Validate from "../../../../hooks/Validate";
import useFormValidation from "../../../../hooks/useFormValidation";

const Questionaire = ({
  services,
  setRecommendedServices,
  setUnrecommendedServices,
  quizData,
  editMode,
}) => {
  const classes = quizStyles();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [currentStep, setCurrentStep] = useState(0);
  const [nextDisabled, setNextDisabled] = useState(false);
  const [prevDisabled, setPrevDisabled] = useState(true);

  const [contactData, setContactData] = useState({});
  const [businessType, setBusinessType] = useState("");
  const [businessTypeId, setBusinessTypeId] = useState("");
  const [businessSize, setBusinessSize] = useState("");
  const [businessSizeId, setBusinessSizeId] = useState("");
  const [hourlyBudget, setHourlyBudget] = useState("");
  const [hourlyBudgetId, setHourlyBudgetId] = useState("");
  const [preferredFeatures, setPreferredFeatures] = useState([]);
  const [preferredFeaturesId, setPreferredFeaturesId] = useState([]);
  const [serviceScores, setServiceScores] = useState({});

  const serviceFeatures = [];
  services.forEach((service) => {
    service.features.forEach((feature) => {
      if (!serviceFeatures.includes(feature.detail)) {
        serviceFeatures.push(feature.detail);
      }
    });
  });

  const handleBusinessTypeChange = (event) => {
    setBusinessType(Number(event.target.value));
    const selectedAnswerChoice = newQuestions[currentStep].answer_choices.find(
      (choice) => Number(choice.value) === Number(event.target.value)
    );
    const answerChoiceId = selectedAnswerChoice.id;
    setBusinessTypeId(answerChoiceId);
  };

  const handleBusinessSizeChange = (event) => {
    setBusinessSize(Number(event.target.value));
    const selectedAnswerChoice = newQuestions[currentStep].answer_choices.find(
      (choice) => Number(choice.value) === Number(event.target.value)
    );
    const answerChoiceId = selectedAnswerChoice.id;
    setBusinessSizeId(answerChoiceId);
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
    console.log("feature", feature);
    if (event.target.checked) {
      setPreferredFeatures((prevState) => [...prevState, feature.text]);
      setPreferredFeaturesId((prevState) => [...prevState, feature.id]);
    } else {
      setPreferredFeatures((prevState) =>
        prevState.filter((item) => item !== feature.text)
      );
      setPreferredFeaturesId((prevState) =>
        prevState.filter((item) => item !== feature.id)
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
        [newQuestions[0].id]: businessTypeId,
        [newQuestions[1].id]: businessSizeId,
        [newQuestions[2].id]: hourlyBudgetId,
        [newQuestions[3].id]: preferredFeaturesId,
      })
    );
    formData.append("contact_name", values.fullName);
    formData.append("contact_email", values.email);
    formData.append("contact_phone", values.phone);
    formData.append("contact_state", values.state);

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
    if (newStep === newQuestions.length + 1) {
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

  // const handleChange = (event) => {
  //   const { name, value, checked } = event.target;
  //   setContactData({
  //     ...contactData,
  //     [name]: value,
  //   });
  //   console.log(contactData);
  // };

  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm,
  } = useFormValidation(contactData, Validate, handleQuizResult);

  console.log("quizData: ", quizData);
  const newQuestions = quizData.question_sets[0].questions;

  return (
    <Box
      style={{
        maxWidth: isSmallScreen ? 375 : null,
        width: isSmallScreen ? "100%" : 800,
      }}
      className={`${classes.formContainer} ${classes.fadeIn}`}
    >
      {editMode && (
        <div
          style={{ display: "flex", width: "100%", justifyContent: "flex-end" }}
        >
          <AdminButton link="questionnaire" tooltipText="Questionnaire" />
        </div>
      )}

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
              <StepLabel>{set.slug}</StepLabel>
            </Step>
          ))}
          <Step key="Submit">
            <StepLabel>Submit</StepLabel>
          </Step>
        </Stepper>
        {currentStep < newQuestions.length ? (
          <>
            {!newQuestions[currentStep].text.includes("feature") ? (
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
                        ? businessType
                        : newQuestions[currentStep].order === 2
                        ? businessSize
                        : newQuestions[currentStep].order === 3
                        ? hourlyBudget
                        : "Ass"
                    }
                    onChange={
                      currentStep === 0
                        ? handleBusinessTypeChange
                        : currentStep === 1
                        ? handleBusinessSizeChange
                        : currentStep === 2
                        ? handleHourlyBudgetChange
                        : null
                    }
                    className={classes.radioGroup}
                  >
                    {newQuestions[currentStep].answer_choices.map(
                      (data, index) => (
                        <FormControlLabel
                          value={Number(data.value)}
                          control={<Radio color="primary" />}
                          label={data.text}
                          className={classes.formControlLabel}
                          classes={{ root: classes.formControlRootLabel }}
                        />
                      )
                    )}
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
                    {newQuestions[currentStep].answer_choices.map(
                      (data, index) => (
                        <FormControlLabel
                          checked={preferredFeatures.includes(data.text)}
                          control={<Checkbox color="primary" />}
                          label={data.text}
                          className={classes.formControlLabel}
                          classes={{ root: classes.formControlRootLabel }}
                          onChange={(event) =>
                            handlePreferredFeatureChange(event, data)
                          }
                        />
                      )
                    )}
                  </FormGroup>
                  <br />
                </FormControl>
                <Box mt={3} display="flex" justifyContent="space-between">
                  <NavigationButtons
                    onClickBtnOne={handlePrev}
                    onClickBtnTwo={handleNext}
                    onClickBtnThree={handleSkip}
                    disabledBtnOne={prevDisabled}
                    disabledBtnTwo={nextDisabled}
                  />
                </Box>
              </Grid>
            )}
          </>
        ) : (
          <Grid container flex justifyContent="center">
            <FormControl component="fieldset" className={classes.fieldset}>
              <FormLabel component="legend" className={classes.formLabel}>
                Contact Information
              </FormLabel>
              <Grid container flex justifyContent="center">
                <Grid item xs={6} style={{ paddingRight: 4 }}>
                  <TextField
                    margin="dense"
                    label="Full Name"
                    id="fullName"
                    name="fullName"
                    variant="outlined"
                    value={values.name}
                    fullWidth
                    className={classes.formField}
                    onChange={handleChange}
                    error={!!errors.name}
                    helperText={errors.name}
                    required
                  />
                </Grid>
                <Grid item xs={6} style={{ paddingLeft: 4 }}>
                  <TextField
                    margin="dense"
                    label="Email"
                    id="email"
                    name="email"
                    variant="outlined"
                    value={values.email}
                    fullWidth
                    className={classes.formField}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    required
                  />
                </Grid>
                <Grid item xs={6} style={{ paddingRight: 4 }}>
                  <TextField
                    margin="dense"
                    label="Phone"
                    id="phone"
                    name="phone"
                    variant="outlined"
                    fullWidth
                    value={values.phone}
                    className={classes.formField}
                    error={!!errors.phone}
                    helperText={errors.phone}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6} style={{ paddingLeft: 4 }}>
                  <TextField
                    margin="dense"
                    label="State of Residence"
                    id="state"
                    name="state"
                    variant="outlined"
                    fullWidth
                    value={values.state}
                    className={classes.formField}
                    error={!!errors.state}
                    helperText={errors.state}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
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
