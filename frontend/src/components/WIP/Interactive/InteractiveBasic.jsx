import React, { useState } from "react";
import {
  Slider,
  Typography,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";

const InteractiveBasic = () => {
  const [sliderValue, setSliderValue] = useState(0);
  const [serviceType, setServiceType] = useState("basic");

  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
  };

  const handleServiceTypeChange = (event) => {
    setServiceType(event.target.value);
  };

  const handleButtonClick = () => {
    // handle logic for when the user clicks the "Select Service" button
  };

  return (
    <div>
      <Typography variant="h5">Find the Right Service for You</Typography>
      <Typography variant="subtitle1">
        Use the sliders and buttons below to find the service that fits your
        needs.
      </Typography>
      <Slider
        value={sliderValue}
        min={0}
        max={100}
        step={1}
        onChange={handleSliderChange}
      />
      <Typography variant="subtitle1">
        Budget: ${sliderValue} per hour
      </Typography>
      <FormControl component="fieldset">
        <FormLabel component="legend">Service Type</FormLabel>
        <RadioGroup
          aria-label="service-type"
          name="service-type"
          value={serviceType}
          onChange={handleServiceTypeChange}
        >
          <FormControlLabel
            value="basic"
            control={<Radio />}
            label="Basic Service"
          />
          <FormControlLabel
            value="premium"
            control={<Radio />}
            label="Premium Service"
          />
        </RadioGroup>
      </FormControl>
      <Button variant="contained" color="primary" onClick={handleButtonClick}>
        Select Service
      </Button>
    </div>
  );
};

export default InteractiveBasic;
