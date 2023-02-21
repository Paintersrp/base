import { Box, Button, createTheme, TextField } from "@material-ui/core";
import { useState } from "react";
import { commonColors } from "../../../theme";

export default function ThemeSettings({ updateTheme }) {
  const [primaryColor, setPrimaryColor] = useState("#2e3b55");
  const [secondaryColor, setSecondaryColor] = useState("#6b7c9b");

  let updatedPalette;

  const handlePrimaryColorChange = (color) => {
    console.log("handlePrimaryColorChange:", color.target.value);
    setPrimaryColor(color.target.value);
  };

  const handleSecondaryColorChange = (color) => {
    console.log("handleSecondaryColorChange:", color.target.value);
    setSecondaryColor(color.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(primaryColor);

    updatedPalette = {
      primary: {
        main: primaryColor.toString(),

        contrastText: "#fff",
        gold: "#ff8c00",
      },
      secondary: {
        main: secondaryColor.toString(),

        contrastText: "#fff",
      },
    };
    console.log(updatedPalette);

    const updatedTheme = createTheme({
      palette: {
        common: commonColors,
        ...updatedPalette,
      },
    });

    console.log(updatedTheme);

    updateTheme(updatedTheme);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        label="Primary Color"
        defaultValue="#2e3b55"
        onChange={handlePrimaryColorChange}
      />
      <TextField
        label="Secondary Color"
        defaultValue="#6b7c9b"
        onChange={handleSecondaryColorChange}
      />
      <Button variant="contained" color="primary" type="submit">
        Update Theme
      </Button>
    </Box>
  );
}
