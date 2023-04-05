import React, { useState } from "react";
import {
  Collapse,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  makeStyles,
  MenuItem,
  Select,
  Tooltip,
  Typography,
} from "@material-ui/core";
import AutoFormDialog from "../AutoFormDialog";
import AddIcon from "@mui/icons-material/Add";
import StyledButton from "../../../../Elements/Buttons/StyledButton";
import { ListSubheader } from "@mui/material";
import "./ChoiceType.css";

const useStyles = makeStyles((theme) => ({
  select: {
    marginTop: 8,
    width: "100%",
    maxHeight: "64px",
    overflow: "auto",
    background: "#F5F5F5",
    color: theme.palette.text.dark,
    "& .MuiSelect-icon": {
      color: theme.palette.text.dark,
    },
    "& .MuiOutlinedInput-input": {
      color: theme.palette.text.dark,
    },
    "& .MuiSelect-select": {},
    "& .MuiSelect-select:focus": {},
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white !important",
      },
    },
    "& .MuiFormLabel-root": {
      color: "red",
      fontWeight: "700",
      fontSize: "0.9rem",
    },
    "& input": {
      color: theme.palette.text.dark,
    },
    "& .MuiMenu-paper": {
      maxHeight: 40,
      overflowY: "auto",
    },
  },
  helpText: {
    margin: theme.spacing(1, 0, 0, 0),
    padding: 0,
    color: theme.palette.text.secondary,
  },
  selectNative: {
    fontFamily: "Roboto",
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    minWidth: "100%",
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.divider}`,
    "&:hover": {
      borderColor: theme.palette.primary.main,
    },
    "&:focus": {
      outline: "none",
      boxShadow: theme.shadows[2],
    },
  },
  optgroup: {
    fontFamily: "Roboto",
    backgroundColor: theme.palette.background.paper,
    fontWeight: theme.typography.fontWeightMedium,
  },
  option: {
    fontFamily: "Roboto",
    paddingLeft: theme.spacing(2),
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  },
  menuPaper: {
    maxHeight: 300,
    overflow: "auto",
  },
}));

const ChoiceType = ({
  formData,
  fieldName,
  verboseName,
  handleInputChange,
  choices,
  xsColumnCount,
  mdColumnCount,
  helpText,
  fieldMetadata,
  handleModalUpdate,
  handleModelNameChange,
}) => {
  console.log("choices", choices, fieldName);
  console.log("fieldName", fieldName);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openMenus, setOpenMenu] = useState({});

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleChange = (event) => {
    const selectedValue = parseInt(event.target.value);
    console.log(selectedValue);
    const selectedChoice = choices.find(
      (choice) => choice.value === selectedValue
    );

    console.log("selectedChoice", selectedChoice);

    handleInputChange(event);
    handleModelNameChange(selectedChoice.model_name);
  };

  const choicesByCategory = {};

  if (fieldName === "content") {
    for (const choice of choices) {
      const category = choice.category || "None";
      if (!choicesByCategory[category]) {
        choicesByCategory[category] = [];
      }
      choicesByCategory[category].push(choice);
    }
  } else {
    for (const choice of choices[0]) {
      const category = choice.category || "None";
      if (!choicesByCategory[category]) {
        choicesByCategory[category] = [];
      }
      choicesByCategory[category].push(choice);
    }
  }

  const sortedCategories = Object.keys(choicesByCategory).sort();

  function toggleCollapsible(event) {
    const optgroup = event.target;
    const options = optgroup.nextElementSibling;
    options.classList.toggle("show");
  }

  return (
    <Grid
      item
      xs={xsColumnCount}
      md={mdColumnCount}
      style={{
        paddingRight: 8,
        paddingLeft: 8,
        width: "100%",
      }}
    >
      <Typography className={classes.helpText}>
        {helpText || verboseName}
      </Typography>
      {fieldName !== "content" && (
        <FormControl style={{ width: "100%" }}>
          <FormControlLabel
            style={{
              fontSize: "0.8rem",
              width: "100%",
              margin: 0,
              color: "black",
            }}
            control={
              <Select
                className={classes.select}
                variant="outlined"
                value={formData[fieldName]}
                onChange={handleChange}
                displayEmpty
                name={fieldName}
                margin="dense"
                style={{ minWidth: "100%", padding: 0 }}
                MenuProps={{
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "left",
                  },
                  transformOrigin: {
                    vertical: "top",
                    horizontal: "left",
                  },
                  getContentAnchorEl: null,
                  classes: {
                    paper: classes.menuPaper,
                  },
                  PaperProps: {
                    style: {
                      maxHeight: 300,
                    },
                  },
                }}
              >
                <MenuItem value="">
                  <em>Select {verboseName}</em>
                </MenuItem>
                {Object.entries(
                  fieldName === "content" ? choices : choices[0]
                ).map(([key, value]) => {
                  if (fieldName === "content" && !value.model_name) {
                    return null;
                  }
                  if (fieldName === "category") {
                    console.log("key", key, "value", value.display);
                  }

                  return (
                    <MenuItem key={key} value={value.value}>
                      <span style={{ color: "black" }}>
                        {fieldName === "content"
                          ? value.model_name
                          : value.display}
                      </span>
                    </MenuItem>
                  );
                })}
              </Select>
            }
          />
        </FormControl>
      )}
      {fieldName === "content" && (
        <>
          <FormControl style={{ width: "100%" }}>
            <FormControlLabel
              style={{
                fontSize: "0.8rem",
                width: "100%",
                margin: 0,
                color: "black",
              }}
              control={
                <div style={{ minWidth: "100%", padding: 0, maxHeight: 300 }}>
                  <Select
                    className="select"
                    variant="outlined"
                    value={formData[fieldName]}
                    onChange={handleChange}
                    native
                    displayEmpty
                    name={fieldName}
                    margin="dense"
                    style={{ minWidth: "100%", padding: 0, maxHeight: 300 }}
                  >
                    <option value="" className="option">
                      Select {verboseName}
                    </option>
                    {sortedCategories.map((category) => (
                      <optgroup
                        key={category}
                        label={category}
                        className="optgroup"
                      >
                        {choicesByCategory[category].map((choice, index) => {
                          if (fieldName === "content" && !choice.model_name) {
                            return null;
                          }

                          return (
                            <option
                              key={index}
                              value={parseInt(choice.value)}
                              className="option"
                            >
                              {fieldName === "content"
                                ? choice.model_name
                                : choice.display}
                            </option>
                          );
                        })}
                      </optgroup>
                    ))}
                  </Select>
                </div>
              }
            />
          </FormControl>

          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-end",
            }}
          >
            <StyledButton
              noHover
              buttonText="Create Data Object"
              onClick={handleOpen}
            />
          </div>
          {formData[fieldName] && (
            <AutoFormDialog
              url={choices.find((item) => item.value === formData[fieldName])}
              open={open}
              handleClose={handleClose}
              formData={formData}
              handleModalUpdate={handleModalUpdate}
            />
          )}
        </>
      )}
    </Grid>
  );
};

export default ChoiceType;
