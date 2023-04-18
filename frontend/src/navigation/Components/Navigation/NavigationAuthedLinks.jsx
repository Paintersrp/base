import React from "react";
import NavigationLinkItem from "./NavigationLinkItem";

export default function NavigationAuthedLinks({ toggleDrawer, handleLogout }) {
  return (
    <React.Fragment>
      <NavigationLinkItem
        onClick={toggleDrawer(false)}
        to="/profile"
        tooltip="Update Profile"
        icon="AccountBoxSharpIcon"
        primary="Profile WIP"
      />
      <NavigationLinkItem
        onClick={() => {
          toggleDrawer(false);
          handleLogout();
        }}
        to="/"
        tooltip="Logout Now"
        icon="ExitToAppSharpIcon"
        primary="Logout"
        color="white"
      />
    </React.Fragment>
  );
}
