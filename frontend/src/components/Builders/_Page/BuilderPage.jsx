import React, { useEffect, useState } from "react";

import BaseContent from "../../Elements/Base/BaseContent";
import BuilderNav from "../_Navigation/BuilderDrawer/BuilderNav.jsx";
import ElementSetBuilder from "../ElementSet/ElementSetBuilder";
import ErrorPage from "../../Elements/Layout/Errors/ErrorPage";
import Flexer from "../../Elements/Layout/Container/Flexer";
import PageContainer from "../../Elements/Layout/PageContainer";

import { initialStepOpenData } from "../ElementSet/const/elementSetConstants";
import {
  generalControlOptions,
  elementSetStepOptions,
  listStepOptions,
} from "../_Navigation/BuilderDrawer/const/drawerOptions";
import { getBuilderComponent } from "./utils/builderMap";

const BuilderPage = ({}) => {
  const [editing, setEditing] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentBuilder, setCurrentBuilder] = useState("Element Set");
  const [stepOptions, setStepOptions] = useState(elementSetStepOptions);
  const [controlOptions, setControlOptions] = useState(generalControlOptions);
  const [stepOpen, setStepOpen] = useState(initialStepOpenData);
  const [stepDisabled, setStepDisabled] = useState({
    prevDisabled: true,
    nextDisabled: false,
  });
  const [error, setError] = useState(false);
  const [ready, setReady] = useState(true);

  function openSection(sectionName) {
    console.log(sectionName);
    setStepOpen((prevState) => {
      const newState = {};
      Object.keys(prevState).forEach((key) => {
        newState[key] = key === sectionName ? true : false;
      });
      return newState;
    });
  }

  function openNextSection() {
    setStepOpen((prevState) => {
      const openSectionIndex = Object.keys(prevState).findIndex(
        (key) => prevState[key]
      );
      const nextSectionIndex =
        (openSectionIndex + 1) % Object.keys(prevState).length;
      const newState = {};
      Object.keys(prevState).forEach((key, index) => {
        newState[key] = index === nextSectionIndex ? true : false;
      });
      return newState;
    });
  }

  function openPreviousSection() {
    setStepOpen((prevState) => {
      const openSectionIndex = Object.keys(prevState).findIndex(
        (key) => prevState[key]
      );
      const previousSectionIndex =
        (openSectionIndex - 1 + Object.keys(prevState).length) %
        Object.keys(prevState).length;
      const newState = {};
      Object.keys(prevState).forEach((key, index) => {
        newState[key] = index === previousSectionIndex ? true : false;
      });
      return newState;
    });
  }

  useEffect(() => {
    const sections = Object.keys(stepOpen);
    const openSectionIndex = sections.findIndex((key) => stepOpen[key]);
    const newStepDisabled = { ...stepDisabled };
    newStepDisabled.prevDisabled = openSectionIndex === 0;
    newStepDisabled.nextDisabled = openSectionIndex === sections.length - 1;
    setStepDisabled(newStepDisabled);
  }, [stepOpen]);

  useEffect(() => {
    console.log("replace_me");
    setReady(true);
  }, []);

  useEffect(() => {
    if (currentBuilder === "Element Set") {
      setStepOptions(elementSetStepOptions);
      setControlOptions(generalControlOptions);
    } else {
      setStepOptions(listStepOptions);
      setControlOptions(generalControlOptions);
    }
  }, [currentBuilder]);

  const changeBuilder = (newBuilder) => {
    setCurrentBuilder(newBuilder);
    console.log(newBuilder);
  };

  if (error) {
    return (
      <ErrorPage
        message={error.message}
        description={error.description}
        instructions={error.instructions}
        thanks={error.thanks}
      />
    );
  }

  if (!ready) {
    return <Loading loading={true} message="Gathering Resources" />;
  }

  return (
    <div style={{ width: "100%", minHeight: "100vh", background: "#F5F5F5" }}>
      <BuilderNav
        open={open}
        setOpen={setOpen}
        stepOptions={stepOptions}
        controlOptions={controlOptions}
        openSection={openSection}
        openNextSection={openNextSection}
        openPreviousSection={openPreviousSection}
        stepDisabled={stepDisabled}
        currentBuilder={currentBuilder}
        changeBuilder={changeBuilder}
      />
      <PageContainer
        editing={editing}
        setEditing={setEditing}
        backgroundColor="#F5F5F5"
      >
        <BaseContent maxWidth={1400} pt={1} pb={0} pl={7} pad={0} boxShadow={0}>
          <Flexer style={{ height: "100%" }}>
            {getBuilderComponent(currentBuilder, stepOpen)}
          </Flexer>
        </BaseContent>
      </PageContainer>
    </div>
  );
};

export default BuilderPage;
