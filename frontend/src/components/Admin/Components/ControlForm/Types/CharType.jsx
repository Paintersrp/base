import React from "react";
import { Grid, Typography } from "@material-ui/core";
import FormField from "../../../../Elements/Fields/FormField";
import IconSelectMixin from "../../../../Elements/Base/EditForm/IconSelectMixin";

const CharType = ({
  formData,
  fieldName,
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
        order: 50,
      }}
    >
      {fieldName === "icon" ? (
        <div style={{ marginTop: 8, width: "100%" }}>
          <IconSelectMixin
            formData={formData}
            handleChange={handleInputChange}
            background="#F5F5F5"
          />
        </div>
      ) : (
        <>
          <FormField
            id={fieldName}
            label={fieldName
              .replace(/_/g, " ")
              .replace(/\b\w/g, (l) => l.toUpperCase())}
            onChange={handleInputChange}
            value={formData[fieldName]}
          />
        </>
      )}
    </Grid>
  );
};

export default CharType;
