import React, { useState } from "react";
import {
  Divider,
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
import FormField from "../../../../Elements/Fields/FormField";

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
}));

const ChoiceType = ({
  fieldType,
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
  console.log("choices", choices, fieldName, fieldType);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Any");
  const [manualEntry, setManualEntry] = useState(false);
  const toggleManualEntry = () => setManualEntry(!manualEntry);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    const selectedChoice = choices.find(
      (choice) => choice.value === selectedValue
    );

    console.log("selectedValue", selectedValue);
    console.log("selectedChoice", selectedChoice || "None");
    console.log(formData[fieldName]);

    handleInputChange(event);
    handleModelNameChange(selectedChoice ? selectedChoice.model_name : "None");
  };

  const categories = [
    "Any",
    ...choices.reduce((acc, choice) => {
      if (!acc.includes(choice.category)) {
        acc.push(choice.category);
      }
      return acc;
    }, []),
  ];
  console.log(formData[fieldName], "formData");
  const selected =
    fieldName === "seo_data"
      ? choices[0].find((item) => item.value === formData[fieldName]).display
      : formData[fieldName];

  console.log("select", selected);

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
      {fieldName === "content" ? (
        <React.Fragment>
          <Typography
            variant="h3"
            style={{
              color: "#222",
              textAlign: "center",
              width: "100%",
              marginTop: 32,
            }}
          >
            Select Data Model
          </Typography>
          <Typography className={classes.helpText}>Type</Typography>
          <Select
            className={classes.select}
            variant="outlined"
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
            displayEmpty
            margin="dense"
            style={{ minWidth: "100%", padding: 0 }}
          >
            {categories.map((category, index) => (
              <MenuItem key={index} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
          <Typography className={classes.helpText}>
            {helpText || verboseName}
          </Typography>
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
                  <MenuItem value={"None Selected"}>
                    <em>Select {verboseName}</em>
                  </MenuItem>
                  {Object.entries(
                    fieldName === "content" ? choices : choices[0]
                  )
                    .filter(([key, value]) => {
                      if (fieldName === "content" && !value.model_name) {
                        return false;
                      }
                      if (selectedCategory === "Any") {
                        return true;
                      }
                      return value.category === selectedCategory;
                    })
                    .map(([key, value]) => (
                      <MenuItem key={key} value={value.value}>
                        {fieldName === "content"
                          ? value.model_name
                          : value.display}
                      </MenuItem>
                    ))}
                </Select>
              }
            />
          </FormControl>

          <>
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
            {formData[fieldName] && formData[fieldName] !== "None Selected" && (
              <AutoFormDialog
                url={choices.find((item) => item.value === formData[fieldName])}
                open={open}
                handleClose={handleClose}
                formData={formData}
                handleModalUpdate={handleModalUpdate}
              />
            )}
          </>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography className={classes.helpText}>
            {helpText || verboseName}
          </Typography>
          <FormControl style={{ width: "100%" }}>
            <FormControlLabel
              style={{
                fontSize: "0.8rem",
                width: "100%",
                margin: 0,
                color: "black",
              }}
              control={
                <React.Fragment>
                  {manualEntry ? (
                    <FormField
                      id={fieldName}
                      onChange={handleChange}
                      value={formData[fieldName]}
                      variant={"outlined"}
                    />
                  ) : (
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
                  )}
                </React.Fragment>
              }
            />
          </FormControl>
          {fieldType === "PrimaryKeyRelatedField" &&
            fieldName !== "seo_data" &&
            fieldName !== "content_type" && (
              <Grid
                container
                style={{
                  alignItems: "center",
                  justifyContent: "flex-end",
                  paddingTop: 4,
                }}
              >
                <StyledButton
                  noHover
                  borderRadius={40}
                  minWidth={0}
                  buttonText={!manualEntry ? "Create" : "Select"}
                  onClick={toggleManualEntry}
                />
              </Grid>
            )}
        </React.Fragment>
      )}
    </Grid>
  );
};

export default ChoiceType;
