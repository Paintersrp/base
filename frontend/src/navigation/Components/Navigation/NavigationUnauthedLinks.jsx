import React from "react";
import NavigationLinkItem from "./NavigationLinkItem";

export default function NavigationUnauthedLinks({ toggleDrawer }) {
  return (
    <>
      <NavigationLinkItem
        onClick={toggleDrawer(false)}
        to="/register"
        tooltip="Register Now"
        icon="HowToRegSharpIcon"
        primary="Register"
      />
      <NavigationLinkItem
        onClick={toggleDrawer(false)}
        to="/login"
        tooltip="Login Now"
        icon="LoginSharpIcon"
        primary="Login"
        color="white"
      />
    </>
  );
}
