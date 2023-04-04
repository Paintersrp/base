import React from "react";
import Footer from "../../navigation/Components/Footer/Footer";

const FooterSwitch = ({ component, isAdminPath, appData }) => {
  switch (component) {
    case "Standard":
      return (
        <>
          {!isAdminPath ? (
            <Footer socialData={appData.contact_set_data.socials} />
          ) : (
            <Footer socialData={appData.contact_set_data.socials} />
          )}
        </>
      );
    case "Minimal":
      return (
        <>
          {!isAdminPath ? (
            <Footer socialData={appData.contact_set_data.socials} />
          ) : (
            <Footer socialData={appData.contact_set_data.socials} />
          )}
        </>
      );
    default:
      return <div>Unknown component type: {component}</div>;
  }
};

export default FooterSwitch;
