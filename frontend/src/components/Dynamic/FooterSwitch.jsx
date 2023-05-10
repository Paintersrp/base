import React from "react";
import Footer from "../../navigation/Components/Footer/Footer";

const FooterSwitch = ({ component, isAdminPath, isBuildPath, appData }) => {
  switch (component) {
    case "Standard":
      return (
        <>
          {!isAdminPath && !isBuildPath ? (
            <Footer socialData={appData.contact_set_data.socials} />
          ) : !isBuildPath ? (
            <Footer socialData={appData.contact_set_data.socials} />
          ) : null}
        </>
      );
    case "Minimal":
      return (
        <>
          {!isAdminPath && !isBuildPath ? (
            <Footer socialData={appData.contact_set_data.socials} />
          ) : !isBuildPath ? (
            <Footer socialData={appData.contact_set_data.socials} />
          ) : null}
        </>
      );
    default:
      return <div>Unknown component type: {component}</div>;
  }
};

export default FooterSwitch;
