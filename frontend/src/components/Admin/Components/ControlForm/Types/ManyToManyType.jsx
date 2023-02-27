import React from "react";
import { Grid, Typography } from "@material-ui/core";
import ManytoManyField from "../Fields/ManytoManyField";

const ManyToManyType = ({ formData, fieldName, handleManyToManyChange }) => {
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
      {/* <Typography variant="h4" style={{ marginLeft: 4, marginTop: 8 }}>
        {fieldName.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
      </Typography> */}
      <ManytoManyField
        data={formData ? formData[fieldName] : []}
        fieldName={fieldName}
        handleChange={handleManyToManyChange}
      />
    </Grid>
  );
};

export default ManyToManyType;
