import React from "react";
import { Divider } from "@material-ui/core";

import BaseContent from "../../../../Elements/Base/BaseContent";
import Text from "../../../../Elements/Layout/Text/Text";
import BaseSection from "../../../../Elements/Base/BaseSection";

import ElementSetHeaderForm from "../HeaderForm/ElementSetHeaderForm";

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
  label,
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
        mt={2}
        mb={!headerOpen ? 2 : 4}
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
        mb={!contentOpen ? 2 : 4}
        headerAlign="left"
        manualOpen={contentOpen}
        setManualOpen={setContentOpen}
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
        header="Column One Layout"
        justifyChildren="center"
        divider
        collapse
        pad={0}
        boxShadow={0}
        mt={0}
        mb={!contentOpen ? 2 : 4}
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
