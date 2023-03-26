import React from "react";
import { FormControlLabel, Grid, Switch, Typography } from "@material-ui/core";

const BooleanType = ({
  formData,
  fieldName,
  verboseName,
  handleInputChange,
  xsColumnCount,
  mdColumnCount,
  justifyContent,
}) => {
  return (
    <Grid
      item
      xs={xsColumnCount}
      md={mdColumnCount}
      style={{
        display: "flex",
        justifyContent: justifyContent,
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
        label={<Typography color="textSecondary">{verboseName}</Typography>}
      />
    </Grid>
  );
};

export default BooleanType;
