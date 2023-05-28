import React, { useEffect, useState } from "react";

import AddButton from "../Parts/Buttons/AddButton";
import BaseBuilder from "../Parts/Layout/BaseBuilder";
import BaseSection from "../../Elements/Base/BaseSection";
import Flexer from "../../Elements/Layout/Container/Flexer";
import FormField from "../../Elements/Fields/FormField";
import HelpText from "../Parts/Text/HelpText";
import MappedSelectField from "./MappedSelectField";
import Pollv2List from "./Pollv2List";

import { handleDataChange } from "../../../utils/dataHandlers/dataHandlers";
import Pollv2Tile from "./Pollv2Tile";
import Text from "../../Elements/Layout/Text/Text";

const initialPollFormData = {
  style: "List",
  listStyle: "",
  tileStyle: "",
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

const listStyleOptions = [
  { label: "None", value: "None" },
  { label: "Numbered", value: "Numbered" },
  { label: "Alphabetical", value: "Alphabetical" },
];

const tileStyleOptions = [
  { label: "Rectangle", value: "Rectangle" },
  { label: "Square", value: "Square" },
];

export default function Pollv2() {
  const [formData, setFormData] = useState(initialPollFormData);
  const [submitFormData, setSubmitFormData] = useState([]);
  const [optionVal, setOptionVal] = useState(null);
  const [voteBtn, setVoteBtn] = useState(false);
  const [vote, setVote] = useState();
  const [results, setResults] = useState();
  const [display, setDisplay] = useState();

  useEffect(() => {
    console.log(vote);
  }, [vote]);

  const changeFormData = (e) => {
    handleDataChange(e, setFormData, formData);
    console.log(formData);
  };

  const handleOption = (e) => {
    setOptionVal(e.target.value);
  };

  const addOption = (e) => {
    setVoteBtn(true);
    setFormData({
      ...formData,
      options: [...formData.options, optionVal],
    });
    setOptionVal("");
    console.log([...formData.options, optionVal]);
    console.log(formData);
  };

  const handleVote = (e) => {
    e.preventDefault();
    console.log(vote);
    if (vote.single !== undefined) {
      setResults(vote.single);
    } else {
      setResults(vote.multiple);
    }
  };

  const handleChange = (e) => {
    if (formData.type === "Multiple") {
      const existingValues = submitFormData[e.target.name] || [];
      const updatedValue = existingValues.includes(e.target.value)
        ? existingValues.filter((value) => value !== e.target.value)
        : [...existingValues, e.target.value];

      console.log("New Value: ", updatedValue);

      setSubmitFormData({
        ...submitFormData,
        [e.target.name]: updatedValue,
      });
    } else {
      console.log("New Value: ", [e.target.value]);
      setSubmitFormData({
        ...submitFormData,
        [e.target.name]: [e.target.value],
      });
    }
  };

  useEffect(() => {
    setDisplay(results);
  }, [results]);

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
        {formData.style === "List" && (
          <MappedSelectField
            value={formData.listStyle}
            name="listStyle"
            onChange={changeFormData}
            helpText="Select List Style"
            optionsArray={listStyleOptions}
          />
        )}
        {formData.style === "Tile" && (
          <MappedSelectField
            value={formData.tileStyle}
            name="tileStyle"
            onChange={changeFormData}
            helpText="Select Tile Style"
            optionsArray={tileStyleOptions}
          />
        )}
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
            optionsArray={Array.from({ length: 4 }, (_, i) => ({
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
        fd="column"
        justifyChildren="center"
        alignChildren="center"
        pad={2}
        boxShadow={1}
        pt={2}
      >
        <Text a="c" t="h4" mt={8} mb={-10}>
          {formData.question}
        </Text>
        <form
          onSubmit={handleVote}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {formData.style === "List" && (
            <Pollv2List
              style={formData.listStyle}
              options={formData.options}
              type={formData.type}
              vote={setVote}
              handleChange={handleChange}
            />
          )}
          {formData.style === "Tile" && (
            <Pollv2Tile
              style={formData.tileStyle}
              options={formData.options}
              type={formData.type}
            />
          )}
          <Flexer j="c">
            {voteBtn && (
              <button
                type="submit"
                style={{
                  padding: "5px",
                  letterSpacing: "1.2px",
                  fontWeight: 600,
                  borderRadius: "4px",
                }}
              >
                Vote
              </button>
            )}
          </Flexer>
        </form>
      </BaseSection>

      <div>
        <p>{display}</p>
      </div>
    </BaseBuilder>
  );
}
