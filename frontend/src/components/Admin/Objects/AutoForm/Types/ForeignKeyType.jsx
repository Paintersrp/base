import React, { useEffect, useState } from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import axiosInstance from "../../../../../lib/Axios/axiosInstance";
import SelectField from "../../../../Elements/Fields/SelectField";

const useStyles = makeStyles((theme) => ({
  helpText: {
    margin: theme.spacing(1, 0, 0.25, 0),
    padding: 0,
    color: theme.palette.text.secondary,
  },
}));

const ForeignKeyType = ({
  formData,
  fieldName,
  verboseName,
  handleInputChange,
  xsColumnCount,
  mdColumnCount,
  helpText,
}) => {
  const [data, setData] = useState();
  const classes = useStyles();

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
    } else if (fieldName === "user") {
      axiosInstance.get(`/user/`).then((response) => {
        setData(response.data);
        console.log("YEAH:", response.data);
      });
    } else if (fieldName === "labels") {
      axiosInstance.get(`/servicetablelabels/`).then((response) => {
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
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        {data && (
          <>
            <Typography className={classes.helpText}>
              {helpText || verboseName}
            </Typography>
            <SelectField
              formData={formData}
              fieldName={fieldName}
              verboseName={verboseName}
              handleInputChange={handleInputChange}
              choices={data}
            />
          </>
        )}
      </div>
    </Grid>
  );
};

export default ForeignKeyType;
