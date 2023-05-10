import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";

import AddButton from "../Parts/Buttons/AddButton";
import BaseBuilder from "../Parts/Layout/BaseBuilder";
import BaseSection from "../../Elements/Base/BaseSection";
import BasicSelect from "../../Elements/Fields/BasicSelect";
import Flexer from "../../Elements/Layout/Container/Flexer";
import FormField from "../../Elements/Fields/FormField";
import HelpText from "../Parts/Text/HelpText";

import { handleDataChange } from "../../../utils/dataHandlers/dataHandlers";

const userStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "white",
    width: "95%",
  },
}));

// Initial Data is abstracted out into a constant
// Such that it can be used for the initial state
// As well as reused when resetting the formData (to create another question/after submit/etc)
export const initialPollFormData = {
  style: "List",
  question: "",
  type: "Single",
  votes: "Select",
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
    // Options array within formData is set to the previous options plus the new value
    // Option Value is reset to an empty string
    setFormData({
      ...formData,
      options: [...formData.options, optionVal],
    });
    setOptionVal("");
    console.log([...formData.options, optionVal]);
  };

  /* When clicked this value will be passed to the backend then passed back to the frontend 
  in the preview portion */
  const createQuestion = (e) => {
    e.preventDefault();
    console.log(e.target.value);
  };

  return (
    <BaseBuilder header="Poll Builder" headerType="h2">
      <BaseSection
        // Header Text (Optional, leave blank or remove to skip rendering it)
        header="Poll Settings"
        // Header Text Align
        headerAlign="center"
        // Innermost div (children container) justification
        justifyChildren="center"
        // Optional Collapse Property, remove to skip the collapse functionality
        collapse
        // Optional Divider Property - Adds divider under header, remove to skip divider render
        divider
        // Optional Inner Div Max Width (inner is centered by default) {null by default}
        maxWidth={null}
        // Optional background color, #F5F5F5 is the same as default
        background="#F5F5F5"
        // Adjusts the padding of the outer div, a 1 here would be 8px all around
        pad={2}
        // pt={2}       You can also set the paddings individually
        // pb={2}       If you do, it will stack with the pad property
        // pr={2}       So I would only use one or the other (pad or individuals)
        // pl={2}

        // 0 means no box shadow. I'd stick to 0-9 in value. 1 by default
        boxShadow={0}
        // fd is flex direction, it's row by default. Can also be set to a flex column instead
        fd="row"
        // br is border radius, set to 1 by default. Requires boxShadow to be relevant/visible
        br={1}
        // A lot of the "Base" elements for containing content (BaseBuilder/BaseContent/BaseSection/Etc)
        // share most of these properties, or at least properties that are handled the same.
      >
        <HelpText>Select Style</HelpText>
        <BasicSelect
          name="style"
          value={formData.style}
          onChange={changeFormData}
        >
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
          <MenuItem value="Single">Single Vote</MenuItem>
          <MenuItem value="Multiple">Multiple Votes</MenuItem>
        </BasicSelect>

        {formData.type === "Multiple" && (
          <>
            <HelpText>Number of Votes</HelpText>
            <BasicSelect
              name="votes"
              value={formData.votes}
              onChange={changeFormData}
            >
              <MenuItem value="Select" disabled>
                Select Number of Votes
              </MenuItem>
              {/*  
                Just to make things a little easier if the number of votes allowed ever wants to change from 10
                Change length: 69 to desired length 
                */}
              {Array.from({ length: 69 }, (_, i) => i + 1).map((num) => (
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
        {/* 
          Flexer is an element that, by default, is just a div flex box with 100% width.
          It contains a lot of shorthand properties to style it, such as padding, margins, etc
          j: justifyContent -> fe = "flex-end", fs = "flex-start", c = "center", etc. 
          a: alignItems -> l = "left", r = "right", c = "center"
          and so on. If you want a full list of properties/acceptable shorthand values control click a Flexer
          then look at the mapSwitch/justificationMap at the top

          Also accepts classes/inline styles by adding a className/style as with any other div
          */}
        <Flexer mt={8} j="fe">
          {/* Disabled if optionVal is blank to avoid adding empty entries */}
          <AddButton label="Option" addFunc={addOption} disabled={!optionVal} />
        </Flexer>
      </BaseSection>

      <BaseSection
        header="Poll Preview"
        headerAlign="center"
        justifyChildren="flex-start"
        pad={0}
        boxShadow={0}
        pt={2}
      >
        {/*
            This should now work to map the options. 
            You will need some data handling for the actual selection process as well
             */}
        {formData.options.map((option) => {
          return (
            <Flexer>
              <input
                type={formData.type === "Single" ? "radio" : "checkbox"}
                value={option}
              />
              <HelpText>{option}</HelpText>
            </Flexer>
          );
        })}
      </BaseSection>
    </BaseBuilder>
  );
}
