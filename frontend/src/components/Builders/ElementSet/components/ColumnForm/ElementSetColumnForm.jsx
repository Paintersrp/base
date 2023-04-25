import React from "react";
import { Divider } from "@material-ui/core";

import BaseContent from "../../../../Elements/Base/BaseContent";
import BaseSection from "../../../../Elements/Base/BaseSection";
import Text from "../../../../Elements/Layout/Text/Text";

import ElementSetHeaderForm from "../HeaderForm/ElementSetHeaderForm";
import ElementSetContentForm from "../ContentForm/ElementSetContentForm";

const ElementSetColumnForm = ({
  headerOpen,
  setHeaderOpen,
  contentOpen,
  setContentOpen,
  layoutOpen,
  setLayoutOpen,
  headerData,
  setHeaderData,
  handleSaveDetails,
  elementData,
  label,
  handleThumbnailImageChange,
  elementObject,
  setElementObject,
}) => {
  return (
    <BaseContent
      header={label || "Column"}
      subheader=""
      justifyChildren="center"
      pad={0}
      boxShadow={0}
      pt={2}
      collapse
      headerAlign="left"
      divider
      headerVar="h5"
    >
      <BaseSection
        header="Column One Header"
        justifyChildren="center"
        divider
        collapse
        pad={0}
        boxShadow={0}
        mt={1}
        mb={1}
        headerAlign="left"
        manualOpen={headerOpen}
        setManualOpen={setHeaderOpen}
      >
        <ElementSetHeaderForm
          data={headerData}
          setData={setHeaderData}
          saveDetails={handleSaveDetails}
        />
        <div style={{ width: "100%" }}>
          <Divider />
        </div>
      </BaseSection>
      <BaseSection
        header="Column One Content"
        justifyChildren="center"
        divider
        collapse
        pad={0}
        boxShadow={0}
        mt={0}
        mb={1}
        headerAlign="left"
        manualOpen={contentOpen}
        setManualOpen={setContentOpen}
      >
        <ElementSetContentForm
          data={headerData}
          setData={setHeaderData}
          elementData={elementData}
          handleThumbnailImageChange={handleThumbnailImageChange}
          elementObject={elementObject}
          setElementObject={setElementObject}
        />
        <div style={{ width: "100%" }}>
          <Divider />
        </div>
      </BaseSection>
      <BaseSection
        header="Column One Layout"
        justifyChildren="center"
        divider
        collapse
        pad={0}
        boxShadow={0}
        mt={0}
        mb={1}
        headerAlign="left"
        manualOpen={layoutOpen}
        setManualOpen={setLayoutOpen}
      >
        <Text t="h4" a="c" mt={16}>
          WIP
        </Text>
      </BaseSection>
    </BaseContent>
  );
};

export default ElementSetColumnForm;
