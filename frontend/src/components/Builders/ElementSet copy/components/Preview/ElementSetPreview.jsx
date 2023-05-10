import React from "react";
import { Divider } from "@material-ui/core";

import BaseContent from "../../../../Elements/Base/BaseContent";
import BaseSection from "../../../../Elements/Base/BaseSection";
import Flexer from "../../../../Elements/Layout/Container/Flexer";

import useExampleSwitch from "../../../Parts/Menus/ExampleSwitch/useExampleSwitch";
import ExampleSwitchMenu from "../../../Parts/Menus/ExampleSwitch/ExampleSwitchMenu";

import SectionSkeleton from "../../skeletons/OneColumnSkeleton";

import TwoColumnImageText from "../../examples/TwoColumnImageText";
import TwoColumnImageCard from "../../examples/TwoColumnImageCard";
import TwoColumnTextDense from "../../examples/TwoColumnTextDense";
import TwoColumnAccordionImage from "../../examples/TwoColumnAccordionImage";

import OneColumnImageText from "../../examples/OneColumnImageText";
import OneColumnTextDense from "../../examples/OneColumnTextDense";
import OneColumnAccordionImage from "../../examples/OneColumnAccordionImage";
import OneColumnImageCard from "../../examples/OneColumnImageCard.jsx";
import OneColumnTextAccordion from "../../examples/OneColumnTextAccordion";
import OneColumnTextCard from "../../examples/OneColumnTextCard";

const layoutOptions = [
  { value: "option1", label: "Two Column - Image / Text" },
  { value: "option2", label: "Two Column - Image / Card" },
  { value: "option3", label: "Two Column - Text Dense" },
  { value: "option4", label: "Two Column - Accordion / Image" },
  { value: "option5", label: "One Column - Image / Text" },
  { value: "option6", label: "One Column - Image / Card" },
  { value: "option7", label: "One Column - Text Dense" },
  { value: "option8", label: "One Column - Accordion / Image" },
  { value: "option9", label: "One Column - Text / Accordion" },
  { value: "option10", label: "One Column - Text / Card(s)" },
];

const ElementSetPreview = ({
  formData,
  colOneData,
  colTwoData,
  elementObject,
}) => {
  const { selectedOption, handleOptionSelect, showExample, handleShowExample } =
    useExampleSwitch(layoutOptions);

  return (
    <BaseContent fd="column" header="Element Set Preview">
      <div style={{ marginTop: 0, marginBottom: 0 }}>
        <Divider />
      </div>
      <ExampleSwitchMenu
        showExample={showExample}
        handleShowExample={handleShowExample}
        selectedOption={selectedOption}
        handleOptionSelect={handleOptionSelect}
        layoutOptions={layoutOptions}
      />
      {!showExample ? (
        <BaseSection
          // header={showExample ? "Layout Previews" : formData.name || "Card Name"}
          header={formData.name || "Element Set Name"}
          justifyChildren="center"
          pad={0}
          boxShadow={0}
          pb={2}
          collapse
          headerAlign="center"
        >
          <SectionSkeleton
            columnOneHeader={colOneData.header}
            columnTwoHeader={colTwoData.header}
            elementObject={elementObject}
            contentType={colOneData.content.contentType}
          />
        </BaseSection>
      ) : (
        <Flexer j="c" mt={16}>
          {selectedOption === "option1" && <TwoColumnImageText />}
          {selectedOption === "option2" && <TwoColumnImageCard />}
          {selectedOption === "option3" && <TwoColumnTextDense />}
          {selectedOption === "option4" && <TwoColumnAccordionImage />}
          {selectedOption === "option5" && <OneColumnImageText />}
          {selectedOption === "option6" && <OneColumnImageCard />}
          {selectedOption === "option7" && <OneColumnTextDense />}
          {selectedOption === "option8" && <OneColumnAccordionImage />}
          {selectedOption === "option9" && <OneColumnTextAccordion />}
          {selectedOption === "option10" && <OneColumnTextCard />}
        </Flexer>
      )}
    </BaseContent>
  );
};

export default ElementSetPreview;
