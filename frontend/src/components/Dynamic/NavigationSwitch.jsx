import React from "react";
import linkData from "../../navigation/Components/Navigation/linkData";
import Navigation from "../../navigation/Components/Navigation/Navigation";
import AdminNavigation from "../Admin/Navigation/AdminNavigation";

const NavigationSwitch = ({
  component,
  isAdminPath,
  isBuildPath,
  appData,
  setCount,
  count,
}) => {
  switch (component) {
    case "Standard":
      return (
        <>
          {!isAdminPath && !isBuildPath ? (
            <Navigation
              links={linkData(appData.jobs_data)}
              appName={appData.business_name}
              appData={appData}
            />
          ) : !isBuildPath ? (
            <AdminNavigation setCount={setCount} count={count} />
          ) : null}
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
