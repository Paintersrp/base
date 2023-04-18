import React from "react";
import NavigationLinkItem from "./NavigationLinkItem";

export default function NavigationAdminLinks({ toggleDrawer }) {
  return (
    <NavigationLinkItem
      onClick={toggleDrawer(false)}
      to="/admin"
      tooltip="Open Admin Dashboard"
      icon="AdminPanelSettingsSharpIcon"
      primary="Admin"
    />
  );
}
