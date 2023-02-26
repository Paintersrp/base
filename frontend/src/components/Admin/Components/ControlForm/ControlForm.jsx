import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Grid } from "@material-ui/core";
import axiosInstance from "../../../../lib/Axios/axiosInstance";
import BaseForm from "../../../Elements/Base/BaseForm";
import getByType from "./getByType";

const ControlForm = ({ endpointUrl, data = {}, onClose, handleUpdate }) => {
  const [formData, setFormData] = useState(data);
  const [modelMetadata, setModelMetadata] = useState({});
  const [fieldMetadata, setFieldMetadata] = useState({});
  const [newImage, setNewImage] = useState(null);
  const [newImageName, setNewImageName] = useState(null);

  const handleImageChange = (event) => {
    formData.image = event.target.files[0];
    setNewImage(URL.createObjectURL(event.target.files[0]));
    setNewImageName(event.target.files[0].name);
  };

  useEffect(() => {
    const fetchData = async () => {
      axiosInstance.get(`/get_metadata${endpointUrl}`).then((response) => {
        console.log("meta: ", response.data);
        setFieldMetadata(response.data.fields);
        setModelMetadata(response.data);
      });
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    console.log("111", e.target);
    const { name, value, type, checked } = e.target;
    console.log("handleInputChange: ", name, value, type, checked);
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
        onClose();
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
        onClose();
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
      <Grid container>
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
            const { type, choices } = fieldMetadata[fieldName];
            const inputElement = getByType(
              fieldName,
              type,
              handleInputChange,
              choices,
              formData,
              handleManyToManyChange,
              handleImageChange,
              newImage,
              newImageName
            );

            if (inputElement) {
              return inputElement;
            }

            return null;
          })}
      </Grid>
      <Grid container justifyContent="center" style={{ marginTop: 16 }}>
        <Button variant="contained" color="primary" type="submit">
          {Object.keys(data).length === 0 ? "Create" : "Update"}
        </Button>
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
