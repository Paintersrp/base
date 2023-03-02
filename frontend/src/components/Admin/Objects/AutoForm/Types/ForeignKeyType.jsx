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

  useEffect(() => {
    const fetchData = async () => {
      axiosInstance.get(`/${fieldName}/`).then((response) => {
        setData(response.data);
      });
    };
    fetchData();
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
        order: 1000,
      }}
    >
      <>
        <SelectField
          formData={formData}
          fieldName={fieldName}
          handleInputChange={handleInputChange}
          choices={data}
        />
      </>
    </Grid>
  );
};

export default ForeignKeyType;
