import React from "react";
import { Grid } from "@material-ui/core";
import FormField from "../../../../Elements/Fields/FormField";
import QuillField from "../../../../Elements/Fields/QuillField";

const TextType = ({
  formData,
  fieldName,
  verboseName,
  handleInputChange,
  handleQuillChange,
  xsColumnCount,
  mdColumnCount,
  markDownMixin,
}) => {
  console.log(markDownMixin);
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
        }}
      >
        {markDownMixin === "false" || !markDownMixin ? (
          <FormField
            id={fieldName}
            label={verboseName}
            onChange={handleInputChange}
            value={formData[fieldName]}
            multiline
          />
        ) : (
          <QuillField
            fieldName={fieldName}
            size="medium"
            value={formData[fieldName]}
            onChange={handleQuillChange}
          />
        )}
      </Grid>
    </>
  );
};

export default TextType;
