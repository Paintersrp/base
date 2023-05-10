import * as React from "react";
import Box from "@mui/material/Box";
import BuilderNavDrawer from "./components/BuilderNavDrawer/BuilderNavDrawer";
import BuilderNavTopBar from "./components/BuilderNavTopBar/BuilderNavTopBar";
import BuilderNavBottomBar from "./components/BuilderNavBottomBar/BuilderNavBottomBar";

export default function BuilderNav({
  open,
  setOpen,
  stepOptions,
  controlOptions,
  openSection,
  openNextSection,
  openPreviousSection,
  stepDisabled,
  currentBuilder,
  changeBuilder,
}) {
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <BuilderNavTopBar
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        currentBuilder={currentBuilder}
        changeBuilder={changeBuilder}
      />
      <BuilderNavDrawer
        open={open}
        handleDrawerClose={handleDrawerClose}
        stepOptions={stepOptions}
        controlOptions={controlOptions}
        openSection={openSection}
      />
      <BuilderNavBottomBar
        openNextSection={openNextSection}
        openPreviousSection={openPreviousSection}
        stepDisabled={stepDisabled}
      />
    </Box>
  );
}
