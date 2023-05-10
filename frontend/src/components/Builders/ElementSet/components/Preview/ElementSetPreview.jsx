import React from "react";
import { Divider } from "@material-ui/core";

import BaseContent from "../../../../Elements/Base/BaseContent";
import Flexer from "../../../../Elements/Layout/Container/Flexer";

import useExampleSwitch from "../../../Parts/Menus/ExampleSwitch/useExampleSwitch";
import ExampleSwitchMenu from "../../../Parts/Menus/ExampleSwitch/ExampleSwitchMenu";

import SetSkeleton from "../../skeletons/SetSkeleton";

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
import BaseDialog from "../../../../Elements/Base/Dialog/BaseDialog";
import { useDialog } from "../../../../Elements/Base/Dialog/useDialog";
import ContentList from "../ObjectSelectModal/ObjectSelectModal";

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
  elementObjectColOne,
  setElementObjectColOne,
  elementObjectColTwo,
  setElementObjectColTwo,
  elementData,
}) => {
  const { selectedOption, handleOptionSelect, showExample, handleShowExample } =
    useExampleSwitch(layoutOptions);

  const {
    isOpen: isOpenColOne,
    openDialog: openDialogColOne,
    closeDialog: closeDialogColOne,
  } = useDialog();

  const {
    isOpen: isOpenColTwo,
    openDialog: openDialogColTwo,
    closeDialog: closeDialogColTwo,
  } = useDialog();

  const handleElementColOne = (elementObject) => {
    setElementObjectColOne(elementObject);
  };
  const handleElementColTwo = (elementObject) => {
    setElementObjectColTwo(elementObject);
  };

  return (
    <BaseContent
      header=""
      subheader=""
      justifyChildren="center"
      pad={0}
      boxShadow={0}
      pt={2}
      headerAlign="left"
      divider
      headerVar="h5"
    >
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
        <SetSkeleton
          columnOneHeader={colOneData.header}
          columnTwoHeader={colTwoData.header}
          elementObjectColOne={elementObjectColOne}
          elementObjectColTwo={elementObjectColTwo}
          contentType={colOneData.content.contentType}
          openDialogColOne={openDialogColOne}
          openDialogColTwo={openDialogColTwo}
        />
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
      <BaseDialog
        open={isOpenColOne}
        onClose={closeDialogColOne}
        title="Select Content Object"
        content={
          <ContentList
            elementData={elementData}
            handleElement={handleElementColOne}
            elementObject={elementObjectColOne}
          />
        }
        primaryButtonText="Confirm"
      />
      <BaseDialog
        open={isOpenColTwo}
        onClose={closeDialogColTwo}
        title="Select Content Object"
        content={
          <ContentList
            elementData={elementData}
            handleElement={handleElementColTwo}
            elementObject={elementObjectColTwo}
          />
        }
        primaryButtonText="Confirm"
      />
    </BaseContent>
  );
};

export default ElementSetPreview;
