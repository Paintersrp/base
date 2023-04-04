import React, { useState } from "react";
import { useTheme } from "@material-ui/core/styles";
import NavigationDrawer from "./NavigationDrawer";
import { Slide, useMediaQuery, useScrollTrigger } from "@material-ui/core";
import NavigationBase from "../NavigationBase";
import AppbarContent from "./AppbarContent";

export default function Navigation({ links, appName, appData }) {
  console.log("appData", appData);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(open);
  };

  return (
    <NavigationBase
      open={open}
      toggleDrawer={toggleDrawer}
      toolBarContent={
        <AppbarContent
          open={open}
          isSmallScreen={isSmallScreen}
          toggleDrawer={toggleDrawer}
          appName={appName}
        />
      }
      drawerContent={
        <NavigationDrawer
          links={links}
          toggleDrawer={toggleDrawer}
          appData={appData}
        />
      }
    />
  );
}
