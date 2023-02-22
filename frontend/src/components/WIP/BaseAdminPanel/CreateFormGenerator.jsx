import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Grid,
  Typography,
  Switch,
} from "@material-ui/core";
import axiosInstance from "../../../lib/Axios/axiosInstance";
import BaseForm from "../../Elements/Base/BaseForm";
import FormField from "../../Elements/Fields/FormField";
import ManytoManyField from "./ManytoManyField";

const BaseCreateView = ({ endpointUrl }) => {
  const [formData, setFormData] = useState({});
  const [fieldMetadata, setFieldMetadata] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      axiosInstance.get(`/get_metadata${endpointUrl}`).then((response) => {
        setFieldMetadata(response.data);
        console.log("meta", response.data);
      });
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleManyToManyChange = (fieldName, fieldValue) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: fieldValue,
    }));
    console.log("??", formData);
  };

  const handleSubmit = async (e) => {
    const fetchData = async () => {
      axiosInstance.get(`/get_metadata${endpointUrl}`).then((response) => {
        setFieldMetadata(response.data);
        console.log("meta", response.data);
      });
    };

    fetchData();
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const response = await axiosInstance.post(endpointUrl, formData, config);
      setFormData({});
      setFieldMetadata({});
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  const getInputElementByType = (fieldName, fieldType, handleInputChange) => {
    switch (fieldType) {
      case "BooleanField":
        return (
          <>
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                justifyContent: "left",
                order: 2000,
                paddingRight: 8,
                paddingLeft: 8,
              }}
            >
              <FormControlLabel
                style={{
                  minWidth: 150,
                }}
                key={fieldName}
                control={
                  <Switch name={fieldName} onChange={handleInputChange} />
                }
                label={fieldName
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase())}
              />
            </Grid>
          </>
        );
      case "CharField":
      case "EmailField":
        return (
          <>
            <Grid
              item
              xs={6}
              style={{
                display: "flex",
                justifyContent: "center",
                paddingRight: 8,
                paddingLeft: 8,
              }}
            >
              <Grid container>
                <Typography
                  variant="h4"
                  style={{ marginLeft: 4, marginTop: 8 }}
                >
                  {fieldName
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                </Typography>
                <FormField
                  id={fieldName}
                  label={fieldName
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
          </>
        );
      case "TextField":
        return (
          <>
            <Grid
              item
              xs={12}
              style={{
                paddingRight: 8,
                paddingLeft: 8,
              }}
            >
              <Typography variant="h4" style={{ marginLeft: 4, marginTop: 8 }}>
                {fieldName
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase())}
              </Typography>
            </Grid>
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
                label={fieldName
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase())}
                onChange={handleInputChange}
                multiline
              />
            </Grid>
          </>
        );
      case "IntegerField":
      case "PositiveIntegerField":
      case "PositiveSmallIntegerField":
      case "SmallIntegerField":
      case "BigIntegerField":
      case "DecimalField":
      case "FloatField":
        return (
          <>
            <Typography variant="h4" style={{ marginLeft: 4, marginTop: 8 }}>
              {fieldName
                .replace(/_/g, " ")
                .replace(/\b\w/g, (l) => l.toUpperCase())}
            </Typography>
            <TextField
              key={fieldName}
              name={fieldName}
              label={fieldName
                .replace(/_/g, " ")
                .replace(/\b\w/g, (l) => l.toUpperCase())}
              onChange={handleInputChange}
            />
          </>
        );
      case "DateTimeField":
        return (
          <>
            <Typography variant="h4" style={{ marginLeft: 4, marginTop: 8 }}>
              {fieldName
                .replace(/_/g, " ")
                .replace(/\b\w/g, (l) => l.toUpperCase())}
            </Typography>
            <FormField
              id={fieldName}
              label={fieldName
                .replace(/_/g, " ")
                .replace(/\b\w/g, (l) => l.toUpperCase())}
              onChange={handleInputChange}
            />
          </>
        );
      case "ListSerializer":
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
            <Typography variant="h4" style={{ marginLeft: 4, marginTop: 8 }}>
              {fieldName
                .replace(/_/g, " ")
                .replace(/\b\w/g, (l) => l.toUpperCase())}
            </Typography>
            <ManytoManyField
              fieldName={fieldName}
              handleChange={handleManyToManyChange}
            />
          </Grid>
        );
      default:
        return null;
    }
  };

  return (
    <BaseForm
      handleSubmit={handleSubmit}
      maxWidth={800}
      title={fieldMetadata.modelName}
    >
      <Grid container>
        {Object.keys(fieldMetadata).map((fieldName) => {
          if (
            fieldName === "id" ||
            fieldName === "created_at" ||
            fieldName === "updated_at" ||
            fieldName === "last_login" ||
            fieldName === "date_joined" ||
            fieldName === "password"
          ) {
            return null;
          }
          const { type } = fieldMetadata[fieldName];
          const inputElement = getInputElementByType(
            fieldName,
            type,
            handleInputChange
          );

          if (inputElement) {
            return inputElement;
          }

          return null;
        })}
      </Grid>
      <Grid container justifyContent="center" style={{ marginTop: 16 }}>
        <Button variant="contained" color="primary" type="submit">
          Create
        </Button>
      </Grid>
    </BaseForm>
  );
};

BaseCreateView.propTypes = {
  endpointUrl: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default BaseCreateView;
