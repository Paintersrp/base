import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import axiosInstance from "../../../../../lib/Axios/axiosInstance";
import SelectField from "../../../../Elements/Fields/SelectField";

const ForeignKeyType = ({
  formData,
  fieldName,
  verboseName,
  handleInputChange,
  xsColumnCount,
  mdColumnCount,
}) => {
  const [data, setData] = useState();
  console.log("WHERE WE GOIN: ", fieldName);

  useEffect(() => {
    if (fieldName.includes("service_tier")) {
      axiosInstance.get(`/servicetier/`).then((response) => {
        setData(response.data);
        console.log("YEAH:", response.data);
      });
    } else if (fieldName === "job") {
      axiosInstance.get(`/jobposting/`).then((response) => {
        setData(response.data);
        console.log("YEAH:", response.data);
      });
    } else {
      axiosInstance.get(`/${fieldName}/`).then((response) => {
        setData(response.data);
        console.log("YEAH:", response.data);
      });
    }
  }, []);

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
        width: "100%",
      }}
    >
      <>
        {data && (
          <SelectField
            formData={formData}
            fieldName={fieldName}
            verboseName={verboseName}
            handleInputChange={handleInputChange}
            choices={data}
          />
        )}
      </>
    </Grid>
  );
};

export default ForeignKeyType;
