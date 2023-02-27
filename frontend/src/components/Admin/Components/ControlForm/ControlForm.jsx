import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Grid } from "@material-ui/core";
import axiosInstance from "../../../../lib/Axios/axiosInstance";
import BaseForm from "../../../Elements/Base/BaseForm";
import getByType from "./getByType";
import { useLocation, useNavigate } from "react-router-dom";
import StyledButton from "../../../Elements/Buttons/StyledButton";

const ControlForm = ({ endpointUrl, data = {}, handleUpdate }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(data);
  const [modelMetadata, setModelMetadata] = useState({});
  const [fieldMetadata, setFieldMetadata] = useState({});
  const [newImage, setNewImage] = useState(null);
  const [newImageName, setNewImageName] = useState(null);
  const location = useLocation();
  const { url, keys, appName, model, metadata } = location.state || {};

  const handleImageChange = (event) => {
    formData.image = event.target.files[0];
    setNewImage(URL.createObjectURL(event.target.files[0]));
    setNewImageName(event.target.files[0].name);
  };

  useEffect(() => {
    const fetchData = async () => {
      axiosInstance.get(`/get_metadata${endpointUrl}`).then((response) => {
        setFieldMetadata(response.data.fields);
        setModelMetadata(response.data);
        console.log(response.data);
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
  };

  const routeBackToModel = () => {
    navigate(`/admin/${model.model_name}/`, {
      state: {
        url: url,
        keys: keys,
        appName: appName,
        model: model,
        metadata: metadata,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    if (Object.keys(data).length === 0) {
      try {
        const response = await axiosInstance.post(
          endpointUrl,
          formData,
          config
        );
        routeBackToModel();
        handleUpdate();
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const response = await axiosInstance.patch(
          `${endpointUrl}${data.id}/`,
          formData,
          config
        );
        routeBackToModel();
        handleUpdate();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <BaseForm
      handleSubmit={handleSubmit}
      maxWidth={800}
      title={modelMetadata.verboseName}
      background="#F5F5F5"
    >
      <Grid container justifyContent="center">
        {fieldMetadata &&
          Object.keys(fieldMetadata).map((fieldName) => {
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
            const { type, choices, xs_column_count, md_column_count } =
              fieldMetadata[fieldName];

            const inputElement = getByType(
              fieldName,
              type,
              handleInputChange,
              choices,
              formData,
              handleManyToManyChange,
              handleImageChange,
              newImage,
              newImageName,
              xs_column_count,
              md_column_count
            );

            if (inputElement) {
              return inputElement;
            }

            return null;
          })}
      </Grid>
      <Grid container justifyContent="center" style={{ marginTop: 16 }}>
        <StyledButton
          buttonText={Object.keys(data).length === 0 ? "Create" : "Update"}
          minWidth={80}
          color="primary"
          type="submit"
        >
          {Object.keys(data).length === 0 ? "Create" : "Update"}
        </StyledButton>
        <StyledButton
          buttonText={"Cancel"}
          color="primary"
          onClick={routeBackToModel}
          minWidth={80}
        />
      </Grid>
    </BaseForm>
  );
};

ControlForm.propTypes = {
  endpointUrl: PropTypes.string.isRequired, // API Endpoint Route
  data: PropTypes.object, // Optional Data Object for Editing
  onClose: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
};

export default ControlForm;
