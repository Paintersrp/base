import React, { useState } from "react";
import { useTheme } from "@material-ui/core/styles";
import NavigationDrawer from "./NavigationDrawer";
import { Slide, useMediaQuery, useScrollTrigger } from "@material-ui/core";
import NavigationBase from "../NavigationBase";
import AppbarContent from "./AppbarContent";

export default function Navigation({ links, appName }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(false);

  // function HideOnScroll(props) {
  //   const { children, window } = props;
  //   const trigger = useScrollTrigger({
  //     target: window ? window() : undefined,
  //     disableHysteresis: true,
  //     threshold: 500,
  //   });

  //   return (
  //     <Slide
  //       appear={false}
  //       direction="down"
  //       in={!trigger}
  //       style={{
  //         transform: trigger ? "translateY(-100%)" : "translateY(0)",
  //         transition: "transform 20000ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  //       }}
  //       transitionDuration={20000}
  //       TransitionProps={{ timeout: { enter: 20000, exit: 20000 } }}
  //     >
  //       {children}
  //     </Slide>
  //   );
  // }

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
        <NavigationDrawer links={links} toggleDrawer={toggleDrawer} />
      }
    />
  );
}
