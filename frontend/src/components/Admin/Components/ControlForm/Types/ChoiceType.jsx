import React from "react";
import {
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  ListItemText,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  select: {
    width: "100%",
    maxHeight: "64px",
    overflow: "auto",
    background: theme.palette.text.light,
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

const ChoiceType = ({ formData, fieldName, handleInputChange, choices }) => {
  const classes = useStyles();
  console.log("tester: ", formData[fieldName]);
  console.log("choices: ", choices);
  return (
    <Grid
      item
      xs={12}
      style={{
        order: 999,
        paddingRight: 8,
        paddingLeft: 8,
      }}
    >
      <FormControl style={{ width: "100%" }}>
        <FormControlLabel
          style={{ fontSize: "0.8rem", width: "100%", margin: 0 }}
          control={
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
              onChange={handleInputChange}
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
                <em>Select Text Alignment</em>
              </MenuItem>
              {Object.entries(choices).map(([key, value]) => (
                <MenuItem key={key} value={value.display}>
                  <span style={{ color: "black" }}>{value.display}</span>
                </MenuItem>
              ))}
            </Select>
          }
        />
      </FormControl>
    </Grid>
  );
};

export default ChoiceType;
