import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import baseTheme from "./theme";
import withAuth from "./lib/Auth/withAuth/withAuth";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "./lib/Axios/axiosInstance";
import { setTheme } from "./lib/Actions/auth";
import chroma from "chroma-js";
import Loading from "./components/Elements/Layout/Loading/Loading";
import SiteRoutes from "./navigation/Routes/SiteRoutes";
import ScrollToTop from "./utils/ScrollToTop";

function App() {
  const auth = useSelector((state) => state.auth);
  const [themeSettings, setThemeSettings] = useState({
    primary_color: auth.primary,
    secondary_color: auth.secondary,
    background_color: auth.background,
  });
  const dispatch = useDispatch();
  const [theme, setThemeUpdate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleUpdate = () => {
    axiosInstance
      .get("/auth/settings/")
      .then((response) => {
        setThemeSettings(response.data);
        dispatch(
          setTheme({
            primary: response.data.primary_color,
            secondary: response.data.secondary_color,
            background: response.data.background_color,
          })
        );
        const primaryColor =
          response.data.primary_color || baseTheme.palette.primary.main;
        const primaryColorLight = chroma(primaryColor).brighten(2).hex();
        const primaryColorDark = chroma(primaryColor).darken(1).hex();

        const secondaryColor =
          response.data.secondary_color || baseTheme.palette.primary.main;
        const secondaryColorLight = chroma(secondaryColor).brighten(2).hex();
        const secondaryColorDark = chroma(secondaryColor).darken(1).hex();

        setThemeUpdate(
          createTheme({
            ...baseTheme,
            palette: {
              primary: {
                main: primaryColor || baseTheme.palette.primary.main,
                light: primaryColorLight || baseTheme.palette.primary.light,
                dark: primaryColorDark || baseTheme.palette.primary.dark,
              },
              secondary: {
                main: secondaryColor || baseTheme.palette.secondary.main,
                light: secondaryColorLight || baseTheme.palette.secondary.light,
                dark: secondaryColorDark || baseTheme.palette.secondary.dark,
              },
              background: {
                default:
                  response.data.background_color ||
                  baseTheme.palette.background.default,
                light:
                  response.data.background_color ||
                  baseTheme.palette.background.light,
              },
              text: {
                dark: "black",
                light: "white",
              },
            },
          })
        );

        dispatch({ type: "FETCH_DATA_SUCCESS" });
        dispatch({ type: "ALERT_SUCCESS", message: "Login Successful" });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <ThemeProvider theme={theme ? theme : baseTheme}>
      <CssBaseline />

      <Router>
        <ScrollToTop />
        <SiteRoutes handleUpdate={handleUpdate} />
      </Router>
    </ThemeProvider>
  );
}

export default withAuth(App);
