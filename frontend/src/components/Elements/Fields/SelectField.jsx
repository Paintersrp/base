import React, { useState } from "react";
import {
  FormControl,
  Grid,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core";
import StyledButton from "../Buttons/StyledButton";
import FormField from "./FormField";

const useStyles = makeStyles((theme) => ({
  select: {
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
}));

const SelectField = ({
  formData,
  fieldName,
  verboseName,
  handleInputChange,
  choices,
}) => {
  const classes = useStyles();
  const [manualEntry, setManualEntry] = useState(false);
  const toggleManualEntry = () => setManualEntry(!manualEntry);

  const handleChange = (event) => {
    if (event.target.value === "create") {
      setManualEntry(true);
    } else {
      setManualEntry(false);
      handleInputChange(event);
    }
  };

  return (
    <FormControl style={{ width: "100%", marginTop: !manualEntry ? 8 : 0 }}>
      <>
        {manualEntry ? (
          <FormField
            id={fieldName}
            label="Create Category"
            onChange={handleInputChange}
            value={formData[fieldName]}
          />
        ) : (
          <Select
            className={classes.select}
            variant="outlined"
            value={
              formData[fieldName]
                ? formData[fieldName]
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())
                : ""
            }
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
            {choices &&
              Object.entries(choices).map(([key, value]) => (
                <MenuItem
                  key={key}
                  value={
                    fieldName === "servicetier" ||
                    fieldName.includes("service_tier")
                      ? value.service_title
                      : fieldName === "job"
                      ? value.position
                      : value.name
                  }
                >
                  <span style={{ color: "black" }}>
                    {fieldName === "servicetier" ||
                    fieldName.includes("service_tier")
                      ? value.service_title
                      : fieldName === "job"
                      ? value.position
                      : value.name}
                  </span>
                </MenuItem>
              ))}
          </Select>
        )}
      </>
      <Grid
        container
        style={{
          alignItems: "center",
          justifyContent: "flex-end",
          paddingTop: 4,
        }}
      >
        {!fieldName.includes("service_tier") && fieldName !== "job" ? (
          <StyledButton
            noHover
            borderRadius={40}
            minWidth={140}
            buttonText={!manualEntry ? "Create Category" : "Select Category"}
            onClick={toggleManualEntry}
          />
        ) : null}
      </Grid>
    </FormControl>
  );
};

export default SelectField;
