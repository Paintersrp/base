import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";

import AddButton from "../Parts/Buttons/AddButton";
import BaseBuilder from "../Parts/Layout/BaseBuilder";
import BasicSelect from "../../Elements/Fields/BasicSelect";
import Flexer from "../../Elements/Layout/Container/Flexer";
import FormField from "../../Elements/Fields/FormField";
import HelpText from "../Parts/Text/HelpText";

import { handleDataChange } from "../../../utils/dataHandlers/dataHandlers";
import BaseContent from "../../Elements/Base/BaseContent";

const userStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "white",
    width: "95%",
  },
}));

// Initial Data is abstracted out into a constant
// Such that it can be used for the initial state
// As well as reused when resetting the formData (to create another question/etc)
export const initialPollFormData = {
  style: "List",
  question: "",
  type: "Single",
  votes: "",
  options: [],
};

export default function Poll() {
  const classes = userStyles();
  const [formData, setFormData] = useState(initialPollFormData);
  const [optionVal, setOptionVal] = useState(null);

  const changeFormData = (e) => {
    // Handle Data Change is an imported function
    // It takes in an event and a data state and provides generic data handling
    handleDataChange(e, setFormData, formData);
  };

  const handleOption = (e) => {
    setOptionVal(e.target.value);
  };

  const addOption = (e) => {
    // If check to avoid adding blank entries
    // Options array within formData is set to the previous options plus the new value
    // Option Value is reset to an empty string
    if (optionVal) {
      setFormData({
        ...formData,
        options: [...formData.options, optionVal],
      });
      setOptionVal("");
      console.log([...formData.options, optionVal]);
    }
  };

  /* When clicked this value will be passed to the backend then passed back to the frontend 
  in the preview portion */
  const createQuestion = (e) => {
    e.preventDefault();
    console.log(e.target.value);
  };

  return (
    <>
      <BaseBuilder header="Poll Builder" headerGutter>
        <BaseContent
          header="Poll Settings"
          subheader=""
          justifyChildren="center"
          collapse
          divider
          pad={0}
          boxShadow={0}
        >
          <HelpText>Select Style</HelpText>
          <BasicSelect
            name="style"
            value={formData.style}
            onChange={changeFormData}
          >
            <MenuItem value="" disabled>
              Select Style
            </MenuItem>
            <MenuItem value="Tile">Tile</MenuItem>
            <MenuItem value="Condensed">Condensed</MenuItem>
            <MenuItem value="List">List</MenuItem>
          </BasicSelect>
          <HelpText>Create a Question</HelpText>
          <FormField
            required
            id="question"
            value={formData.question}
            onChange={changeFormData}
          />
          <HelpText>Select Type</HelpText>
          <BasicSelect
            name="type"
            value={formData.type}
            onChange={changeFormData}
          >
            <MenuItem value="" disabled>
              Select Type
            </MenuItem>
            <MenuItem value="Multiple">Multiple Votes</MenuItem>
            <MenuItem value="Single">One Vote</MenuItem>
          </BasicSelect>

          {formData.type === "Multiple" && (
            <>
              <HelpText>Number of User Votes</HelpText>
              <BasicSelect
                name="votes"
                value={formData.votes}
                onChange={changeFormData}
              >
                <MenuItem value="" disabled>
                  Select Number of Votes They Are Allowed To Select
                </MenuItem>
                {/*  
                Just to make things a little easier if the number of votes allowed ever wants to change from 10
                Change length: 15 to desired length 
                */}
                {Array.from({ length: 15 }, (_, i) => i + 1).map((num) => (
                  <MenuItem key={num} value={num}>
                    {num}
                  </MenuItem>
                ))}
              </BasicSelect>
            </>
          )}

          <HelpText>Type in Option</HelpText>
          <FormField
            required
            value={optionVal}
            onChange={handleOption}
            fullWidth
          />
          <Flexer mt={8} j="fe">
            <AddButton label="Option" addFunc={addOption} />
          </Flexer>
        </BaseContent>

        <BaseContent
          header={formData.question}
          subheader={formData.question && "Poll Preview"}
          justifyChildren="flex-start"
          collapse
          divider
          pad={0}
          boxShadow={0}
          pt={2}
        >
          <div>
            {/*
            This should now work to map the options. 
            You will need some data handling for the actual selection process as well
             */}
            {formData.type === "Single" &&
              formData.options.map((x) => {
                return (
                  <Flexer>
                    <HelpText>{x}</HelpText>
                    <input type="radio" value={x} />
                  </Flexer>
                );
              })}
            {formData.type === "Multiple" &&
              formData.options.map((x) => {
                return (
                  <Flexer>
                    <HelpText>{x}</HelpText>
                    <input type="checkbox" value={x} />
                  </Flexer>
                );
              })}
          </div>
        </BaseContent>
      </BaseBuilder>
    </>
  );
}
