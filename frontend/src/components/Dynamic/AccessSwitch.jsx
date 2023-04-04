import React from "react";
import { Navigate, Route } from "react-router-dom";
import DynamicPage from "./DynamicPage";

const AccessSwitch = ({
  access,
  id,
  page,
  filteredPageData,
  handleUpdate,
  auth,
}) => {
  switch (access) {
    case "protected":
      return (
        <Route
          key={id}
          path={`/${page.page_name}`}
          element={
            <DynamicPage
              handleUpdate={handleUpdate}
              page={page.page_name}
              filteredPageData={filteredPageData}
            />
          }
        />
      );
    case "public":
      return (
        <React.Fragment>
          {auth.is_authenticated ? (
            <Route
              key={id}
              path={`/${page.page_name}`}
              element={
                <DynamicPage
                  handleUpdate={handleUpdate}
                  page={page.page_name}
                  filteredPageData={filteredPageData}
                />
              }
            />
          ) : (
            <Navigate
              to={{
                pathname: "/login",
                state: { from: rest.location },
              }}
            />
          )}
        </React.Fragment>
      );
    case "admin":
      return (
        <React.Fragment>
          {auth.is_superuser ? (
            <Route
              key={id}
              path={`/${page.page_name}`}
              element={
                <DynamicPage
                  handleUpdate={handleUpdate}
                  page={page.page_name}
                  filteredPageData={filteredPageData}
                />
              }
            />
          ) : (
            <Navigate
              to={{
                pathname: "/login",
                state: { from: rest.location },
              }}
            />
          )}
        </React.Fragment>
      );
    default:
      return null;
  }
};

export default AccessSwitch;
