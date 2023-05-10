import * as React from "react";
import { AppBar } from "@material-ui/core";
import Flexer from "../../../../../Elements/Layout/Container/Flexer";
import NextPrevButtons from "../../../../Parts/Buttons/NextButton";

export default function BuilderNavBottomBar({
  openNextSection,
  openPreviousSection,
  stepDisabled,
}) {
  return (
    <AppBar
      position="fixed"
      color="primary"
      style={{ top: "auto", bottom: 0, height: 55 }}
    >
      <Flexer j="c" a="c" style={{ height: "100%" }}>
        <NextPrevButtons
          nextFunc={openNextSection}
          prevFunc={openPreviousSection}
          nextDisabled={stepDisabled.nextDisabled}
          prevDisabled={stepDisabled.prevDisabled}
        />
      </Flexer>
    </AppBar>
  );
}
