import React from "react";
import linkData from "../../navigation/Components/Navigation/linkData";
import Navigation from "../../navigation/Components/Navigation/Navigation";
import Values from "../About/Values/Values";
import AdminNavigation from "../Admin/Navigation/AdminNavigation";

const NavigationSwitch = ({
  component,
  isAdminPath,
  appData,
  setCount,
  count,
}) => {
  switch (component) {
    case "Standard":
      return (
        <>
          {!isAdminPath ? (
            <Navigation
              links={linkData(appData.jobs_data)}
              appName={appData.business_name}
              appData={appData}
            />
          ) : (
            <AdminNavigation setCount={setCount} count={count} />
          )}
        </>
      );
    case "DrawerOnly":
      return (
        <>
          {!isAdminPath ? (
            <Navigation
              links={linkData(appData.jobs_data)}
              appName={appData.business_name}
              appData={appData}
            />
          ) : (
            <AdminNavigation setCount={setCount} count={count} />
          )}
        </>
      );
    case "TopBarOnly":
      return (
        <>
          {!isAdminPath ? (
            <Navigation
              links={linkData(appData.jobs_data)}
              appName={appData.business_name}
              appData={appData}
            />
          ) : (
            <AdminNavigation setCount={setCount} count={count} />
          )}
        </>
      );

    default:
      return <div>Unknown component type: {component}</div>;
  }
};

export default NavigationSwitch;
