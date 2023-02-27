import React from "react";
import { FormControlLabel, Grid, Switch } from "@material-ui/core";

const BooleanType = ({ formData, fieldName, handleInputChange }) => {
  return (
    <Grid
      item
      xs={12}
      style={{
        display: "flex",
        justifyContent: "left",
        order: 2000,
        paddingRight: 8,
        paddingLeft: 8,
      }}
    >
      <FormControlLabel
        style={{
          minWidth: 150,
        }}
        key={fieldName}
        value={formData[fieldName]}
        control={
          <Switch
            name={fieldName}
            onChange={handleInputChange}
            checked={formData ? formData[fieldName] : ""}
          />
        }
        label={fieldName
          .replace(/_/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase())}
      />
    </Grid>
  );
};

export default BooleanType;
