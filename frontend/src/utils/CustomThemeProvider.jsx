import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import axios from "axios";
import baseTheme from "../theme";
import axiosInstance from "../lib/Axios/axiosInstance";
import { setTheme } from "../lib/Actions/auth";
import { useDispatch, useSelector } from "react-redux";

const CustomThemeProvider = (props) => {
  const auth = useSelector((state) => state.auth);
  const [themeSettings, setThemeSettings] = useState({
    primary_color: auth.primary,
    secondary_color: auth.secondary,
    background_color: auth.background,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch the current theme settings from the API endpoint
    axiosInstance
      .get("/auth/settings/")
      .then((response) => {
        setThemeSettings(response.data);
        console.log("test:", response.data);
        dispatch(
          setTheme({
            primary: response.data.primary_color,
            secondary: response.data.secondary_color,
            background: response.data.background_color,
          })
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Create the Material UI theme based on the retrieved theme settings
  const theme = createTheme({
    ...baseTheme,
    palette: {
      primary: {
        main: themeSettings?.primary_color || baseTheme.palette.primary.main,
      },
      secondary: {
        main:
          themeSettings?.secondary_color || baseTheme.palette.secondary.main,
      },
      background: {
        default:
          themeSettings?.background_color ||
          baseTheme.palette.background.default,
      },
    },
  });

  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
};

export default CustomThemeProvider;
