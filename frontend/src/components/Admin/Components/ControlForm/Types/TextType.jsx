import React from "react";
import { Grid } from "@material-ui/core";
import FormField from "../../../../Elements/Fields/FormField";

const TextType = ({
  formData,
  fieldName,
  verboseName,
  handleInputChange,
  xsColumnCount,
  mdColumnCount,
}) => {
  return (
    <>
      <Grid
        item
        xs={xsColumnCount}
        md={mdColumnCount}
        style={{
          display: "flex",
          justifyContent: "center",
          paddingRight: 8,
          paddingLeft: 8,
          order: 100,
        }}
      >
        <FormField
          id={fieldName}
          label={verboseName}
          onChange={handleInputChange}
          value={formData[fieldName]}
          multiline
        />
      </Grid>
    </>
  );
};

export default TextType;
