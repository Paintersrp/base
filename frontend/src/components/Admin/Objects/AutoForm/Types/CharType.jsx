import React from "react";
import { Grid } from "@material-ui/core";
import FormField from "../../../../Elements/Fields/FormField";
import IconSelectMixin from "../../../../Elements/Base/EditForm/IconSelectMixin";

const CharType = ({
  formData,
  fieldName,
  verboseName,
  handleInputChange,
  xsColumnCount,
  mdColumnCount,
}) => {
  return (
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
      {fieldName.includes("icon") ? (
        <div style={{ marginTop: 8, width: "100%" }}>
          <IconSelectMixin
            fieldName={fieldName}
            formData={formData}
            handleChange={handleInputChange}
            background="#F5F5F5"
          />
        </div>
      ) : (
        <>
          <FormField
            id={fieldName}
            label={verboseName}
            onChange={handleInputChange}
            value={formData[fieldName]}
          />
        </>
      )}
    </Grid>
  );
};

export default CharType;
