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

function TitleBlockMixin({ handleChange, formData, handleSwitchChange = {} }) {
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
          sm={6}
          style={{ paddingRight: 8, justifyContent: "right", display: "flex" }}
        >
          <FormControlLabel
            style={{ fontSize: "0.8rem", color: "black" }}
            control={
              <Select
                className={classes.select}
                variant="outlined"
                value={formData.alignment}
                onChange={handleChange}
                displayEmpty
                name="alignment"
                margin="dense"
                style={{ minWidth: 100, padding: 0, marginRight: 10 }}
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
                }}
              >
                <MenuItem value="Left">Left</MenuItem>
                <MenuItem value="Center">Center</MenuItem>
                <MenuItem value="Right">Right</MenuItem>
              </Select>
            }
            label="Alignment"
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          style={{ paddingLeft: 8, justifyContent: "left", display: "flex" }}
        >
          <FormControlLabel
            style={{ color: "black" }}
            control={
              <Switch
                checked={formData.show_divider}
                onChange={handleSwitchChange}
                name="show_divider"
                value={formData.show_divider}
              />
            }
            label="Show Divider"
          />
        </Grid>
      </Grid>
    </FormControl>
  );
}

export default TitleBlockMixin;
