import React, { useState } from "react";

import AddButton from "../Parts/Buttons/AddButton";
import BaseBuilder from "../Parts/Layout/BaseBuilder";
import BaseSection from "../../Elements/Base/BaseSection";
import Flexer from "../../Elements/Layout/Container/Flexer";
import FormField from "../../Elements/Fields/FormField";
import HelpText from "../Parts/Text/HelpText";
import MappedSelectField from "./MappedSelectField";

import { handleDataChange } from "../../../utils/dataHandlers/dataHandlers";

const initialPollFormData = {
  style: "List",
  question: "",
  type: "Single",
  votes: "Select Number of Votes",
  options: [],
};
const typeOptions = [
  { label: "Single Vote", value: "Single" },
  { label: "Multiple Votes", value: "Multiple" },
];
const styleOptions = [
  { label: "Tile", value: "Tile" },
  { label: "Condensed", value: "Condensed" },
  { label: "List", value: "List" },
];

export default function Pollv2() {
  const [formData, setFormData] = useState(initialPollFormData);
  const [optionVal, setOptionVal] = useState(null);

  const changeFormData = (e) => {
    handleDataChange(e, setFormData, formData);
  };

  const handleOption = (e) => {
    setOptionVal(e.target.value);
  };

  const addOption = (e) => {
    setFormData({
      ...formData,
      options: [...formData.options, optionVal],
    });
    setOptionVal("");
    console.log([...formData.options, optionVal]);
  };

  return (
    <BaseBuilder header="Poll Builder" headerType="h2">
      <BaseSection
        header="Poll Settings"
        headerAlign="center"
        justifyChildren="center"
        pad={0}
        boxShadow={0}
      >
        <MappedSelectField
          value={formData.style}
          name="style"
          onChange={changeFormData}
          helpText="Select Style"
          optionsArray={styleOptions}
        />
        <HelpText>Create a Question</HelpText>
        <FormField
          required
          id="question"
          value={formData.question}
          onChange={changeFormData}
        />
        <MappedSelectField
          value={formData.type}
          name="type"
          onChange={changeFormData}
          helpText="Select Type"
          optionsArray={typeOptions}
          firstOptionText="Select Type"
        />
        {formData.type === "Multiple" && (
          <MappedSelectField
            value={formData.votes}
            name="votes"
            onChange={changeFormData}
            helpText="Select Number of Votes"
            optionsArray={Array.from({ length: 69 }, (_, i) => ({
              label: `${i + 1}`,
              value: `${i + 1}`,
            }))}
          />
        )}
        <HelpText>Type in Option</HelpText>
        <FormField
          required
          value={optionVal}
          onChange={handleOption}
          fullWidth
        />
        <Flexer mt={8} j="fe">
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
