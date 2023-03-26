import React from "react";
import {
  FormControl,
  FormControlLabel,
  Grid,
  makeStyles,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";

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
  formData,
  fieldName,
  verboseName,
  handleInputChange,
  choices,
  xsColumnCount,
  mdColumnCount,
  helpText,
}) => {
  const classes = useStyles();
  console.log(choices)
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
                <em>Select {verboseName}</em>
              </MenuItem>
              {Object.entries(choices).map(([key, value]) => (
                <MenuItem key={key} value={value.value}>
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
