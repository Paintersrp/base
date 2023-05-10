import React, { useEffect, useState } from "react";
import PageContainer from "../../Elements/Layout/PageContainer";
import ErrorPage from "../../Elements/Layout/Errors/ErrorPage";
import BaseContent from "../../Elements/Base/BaseContent";
import ElementSetBuilder from "../ElementSet/ElementSetBuilder";
import BuilderNav from "../_Navigation/BuilderDrawer/BuilderNav.jsx";
import {
  generalDrawerControlOptions,
  generalDrawerStepOptions,
} from "../_Navigation/BuilderDrawer/const/drawerOptions";
import Flexer from "../../Elements/Layout/Container/Flexer";
import { initialStepOpenData } from "../ElementSet/const/elementSetConstants";

const BuilderPage = ({}) => {
  const [editing, setEditing] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentBuilder, setCurrentBuilder] = useState("Element Set");
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

  const changeBuilder = (e) => {
    setCurrentBuilder(e.target.value);
    console.log(e.target.value);
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
        stepOptions={generalDrawerStepOptions}
        controlOptions={generalDrawerControlOptions}
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
            <ElementSetBuilder stepOpen={stepOpen} />
          </Flexer>
        </BaseContent>
      </PageContainer>
    </div>
  );
};

export default BuilderPage;
