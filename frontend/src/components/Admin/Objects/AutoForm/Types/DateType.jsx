import React from "react";
import { Grid, Typography } from "@material-ui/core";
import FormField from "../../../../Elements/Fields/FormField";

const DateType = ({ fieldName, handleInputChange }) => {
  console.log("DateType");
  return (
    <>
      <Grid
        item
        xs={12}
        style={{
          paddingRight: 8,
          paddingLeft: 8,
        }}
      >
        <Typography variant="h4" style={{ marginLeft: 4, marginTop: 8 }}>
          {fieldName
            .replace(/_/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase())}
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        style={{
          display: "flex",
          justifyContent: "center",
          paddingRight: 8,
          paddingLeft: 8,
        }}
      >
        <FormField
          id={fieldName}
          label={fieldName
            .replace(/_/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase())}
          onChange={handleInputChange}
        />
      </Grid>
    </>
  );
};

export default DateType;
