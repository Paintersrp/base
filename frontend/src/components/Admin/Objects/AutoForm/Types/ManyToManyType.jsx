import React from "react";
import { Grid } from "@material-ui/core";
import ManyToManyField from "../../../../Elements/Fields/ManyToManyField";

const ManyToManyType = ({
  formData,
  setFormData,
  fieldName,
  verboseName,
  handleManyToManyChange,
  xsColumnCount = 12,
  mdColumnCount = 10,
}) => {
  return (
    <Grid
      item
      xs={xsColumnCount}
      md={mdColumnCount}
      style={{
        order: 999,
        paddingRight: 8,
        paddingLeft: 8,
        width: "100%",
      }}
    >
      <ManyToManyField
        data={formData[fieldName]}
        setFormData={setFormData}
        fieldName={fieldName}
        verboseName={verboseName}
        handleManyToManyChange={handleManyToManyChange}
      />
    </Grid>
  );
};

export default ManyToManyType;
