import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Typography,
  Tooltip,
} from "@material-ui/core";
import DisplaySettingsSharpIcon from "@mui/icons-material/DisplaySettingsSharp";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../../../lib/Axios/axiosInstance";
import { setTheme } from "../../../../lib/Actions/auth";
import { SketchPicker } from "react-color";
import chroma from "chroma-js";

const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    textAlign: "center",
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  root: {
    "& .chrome-picker_hex": {
      display: "none",
    },
  },
  icon: {
    width: 56,
    height: 56,
    backgroundColor: "inherit",
    color: "inherit",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: "inherit",
    },
  },
}));

const ThemeSettings = ({ handleUpdate, classes }) => {
  // const classes = useStyles();
  const [open, setOpen] = useState(false);
  const auth = useSelector((state) => state.auth);
  const [primaryColor, setPrimaryColor] = useState(auth.primary);
  const [secondaryColor, setSecondaryColor] = useState(auth.secondary);
  const [backgroundColor, setBackgroundColor] = useState(auth.background);
  const dispatch = useDispatch();
  const [selectedField, setSelectedField] = useState("primaryColor");
  const [backgroundColorError, setBackgroundColorError] = useState(null);

  useEffect(() => {
    setPrimaryColor(auth.primary);
    setSecondaryColor(auth.secondary);
    setBackgroundColor(auth.background);
  }, [auth]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedField("primaryColor");
  };

  const handlePrimaryColorChange = (color) => {
    setPrimaryColor(color.hex);
  };

  const handleSecondaryColorChange = (color) => {
    setSecondaryColor(color.hex);
  };

  const handleBackgroundColorChange = (color) => {
    setBackgroundColor(color.hex);
  };

  const handlePrimaryColorBlur = (event) => {
    const color = event.target.value;
    try {
      const parsedColor = chroma(color);
      setPrimaryColor(parsedColor.hex());
    } catch (error) {}
  };
  const handleSecondaryColorBlur = (event) => {
    const color = event.target.value;
    try {
      const parsedColor = chroma(color);
      setSecondaryColor(parsedColor.hex());
    } catch (error) {}
  };
  const handleBackgroundColorBlur = (event) => {
    const color = event.target.value;
    try {
      const parsedColor = chroma(color);
      setBackgroundColor(parsedColor.hex());
      setBackgroundColorError(null);
    } catch (error) {
      setBackgroundColorError("Invalid color");
    }
  };

  const handleColorPickerChangeComplete = (color) => {
    switch (selectedField) {
      case "primaryColor":
        setPrimaryColor(color.hex);
        break;
      case "secondaryColor":
        setSecondaryColor(color.hex);
        break;
      case "backgroundColor":
        setBackgroundColor(color.hex);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let isPrimaryColorValid = true;
    let isSecondaryColorValid = true;
    let isBackgroundColorValid = true;
    try {
      chroma(primaryColor);
    } catch (error) {
      isPrimaryColorValid = false;
    }
    try {
      chroma(secondaryColor);
    } catch (error) {
      isSecondaryColorValid = false;
    }
    try {
      chroma(backgroundColor);
    } catch (error) {
      isBackgroundColorValid = false;
    }

    if (
      !isPrimaryColorValid ||
      !isSecondaryColorValid ||
      !isBackgroundColorValid
    ) {
      setBackgroundColorError("Invalid color(s)");
      return;
    }
    axiosInstance
      .post("/auth/settings/", {
        primaryColor,
        secondaryColor,
        backgroundColor,
      })
      .then((response) => {
        dispatch(
          setTheme({
            primary: response.data.primary_color,
            secondary: response.data.secondary_color,
            background: response.data.background_color,
          })
        );
        handleUpdate();
        handleClose();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Tooltip
        title="Theme Settings"
        placement="left"
        classes={{ tooltip: classes.tooltip }}
      >
        <IconButton
          size="medium"
          onClick={handleOpen}
          className={classes.menuItem}
        >
          <DisplaySettingsSharpIcon
            className={classes.icon}
            style={{ fontSize: "1.5rem" }}
          />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>
            <Typography variant="h4" align="center">
              Theme Settings
            </Typography>
            {backgroundColorError && (
              <div className={classes.error}>{backgroundColorError}</div>
            )}
          </DialogTitle>
          <DialogContent>
            <div className={classes.textField}>
              <Grid container spacing={3}>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  {selectedField !== "null" && (
                    <>
                      <SketchPicker
                        disableAlpha
                        color={
                          selectedField === "primaryColor"
                            ? primaryColor
                            : selectedField === "secondaryColor"
                            ? secondaryColor
                            : backgroundColor
                        }
                        onChange={
                          selectedField === "primaryColor"
                            ? handlePrimaryColorChange
                            : selectedField === "secondaryColor"
                            ? handleSecondaryColorChange
                            : handleBackgroundColorChange
                        }
                        onChangeComplete={handleColorPickerChangeComplete}
                      />
                    </>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Grid container>
                    <TextField
                      className={classes.textField}
                      label="Primary Color"
                      variant="outlined"
                      fullWidth
                      value={primaryColor}
                      onClick={() => setSelectedField("primaryColor")}
                      onBlur={handlePrimaryColorBlur}
                      onChange={(event) => setPrimaryColor(event.target.value)}
                    />
                    <TextField
                      className={classes.textField}
                      label="Secondary Color"
                      variant="outlined"
                      fullWidth
                      value={secondaryColor}
                      onClick={() => setSelectedField("secondaryColor")}
                      onChange={(event) =>
                        setSecondaryColor(event.target.value)
                      }
                      onBlur={handleSecondaryColorBlur}
                    />
                    <TextField
                      className={classes.textField}
                      label="Background Color"
                      variant="outlined"
                      fullWidth
                      value={backgroundColor}
                      onClick={() => setSelectedField("backgroundColor")}
                      onChange={(event) =>
                        setBackgroundColor(event.target.value)
                      }
                      onBlur={handleBackgroundColorBlur}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" color="primary">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default ThemeSettings;
