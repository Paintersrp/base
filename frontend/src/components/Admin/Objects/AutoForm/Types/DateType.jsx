import React from "react";
import { Grid, Typography } from "@material-ui/core";
import FormField from "../../../../Elements/Fields/FormField";

const DateType = ({
  formData,
  fieldName,
  verboseName,
  handleInputChange,
  xsColumnCount,
  mdColumnCount,
}) => {
  console.log("DateType");
  return (
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
        label={verboseName}
        onChange={handleInputChange}
        value={new Date(formData[fieldName]).toLocaleString()}
      />
    </Grid>
  );
};

export default DateType;
