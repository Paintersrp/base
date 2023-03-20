import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {
  FormControl,
  FormControlLabel,
  MenuItem,
  Select,
  Switch,
} from "@material-ui/core";
import ManyToManyField from "../../Fields/ManyToManyField";

const useStyles = makeStyles((theme) => ({
  select: {
    background: theme.palette.background.light,
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
      color: theme.palette.text.dark,
      fontWeight: "700",
      fontSize: "0.9rem",
    },
    "& input": {
      color: theme.palette.text.dark,
    },
  },
}));

function JobMixin({
  handleChange,
  formData,
  handleSwitchChange = {},
  handleManyToManyChange = {},
  setFormData,
}) {
  const classes = useStyles();

  return (
    <FormControl style={{ width: "100%" }}>
      <Grid
        container
        spacing={0}
        style={{ paddingTop: 16, display: "flex", justifyContent: "center" }}
      >
        <Grid
          item
          xs={12}
          sm={12}
          style={{ paddingLeft: 8, justifyContent: "left", display: "flex" }}
        >
          <FormControlLabel
            style={{ color: "black" }}
            control={
              <Switch
                checked={formData.filled}
                onChange={handleSwitchChange}
                name="filled"
                value={formData.filled}
              />
            }
            label={`Position Filled?`}
          />
        </Grid>
        <ManyToManyField
          data={formData.requirements}
          fieldName="requirements"
          verboseName="Requirements"
          handleManyToManyChange={handleManyToManyChange}
          setFormData={setFormData}
        />
      </Grid>
    </FormControl>
  );
}

export default JobMixin;
