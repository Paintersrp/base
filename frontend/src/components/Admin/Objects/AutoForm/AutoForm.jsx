import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Divider,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import axiosInstance from "../../../../lib/Axios/axiosInstance";
import BaseForm from "../../../Elements/Base/BaseForm";
import getByType from "./getByType";
import { useLocation, useNavigate } from "react-router-dom";
import StyledButton from "../../../Elements/Buttons/StyledButton";
import Loading from "../../../Elements/Layout/Loading/Loading";
import { useDispatch } from "react-redux";
import { renderComponentPreview } from "./renderComponentPreview";

const AutoForm = ({ endpointUrl, data = {}, handleUpdate }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const [formData, setFormData] = useState(data);
  const [modelMetadata, setModelMetadata] = useState({});
  const [fieldMetadata, setFieldMetadata] = useState({});
  const [url, setUrl] = useState([]);
  const [keys, setKeys] = useState([]);
  const [appName, setAppName] = useState([]);
  const [model, setModel] = useState([]);
  const [metadata, setMetadata] = useState([]);
  const [newImage, setNewImage] = useState(null);
  const [newImageName, setNewImageName] = useState(null);
  const [ready, setReady] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setReady(false);
    if (!location.state) {
      axiosInstance
        .get(`/get_models${endpointUrl}`)
        .then((response) => {
          console.log(response.data);
          setUrl(response.data.url);
          setAppName(response.data.app_name);
          setKeys(response.data.keys);
          setMetadata(response.data.metadata);
          setModel(response.data);
          setReady(true);
        })
        .catch((error) => console.log(error));
    } else {
      setUrl(location.state.url);
      setAppName(location.state.appName);
      setKeys(location.state.keys);
      setMetadata(location.state.metadata);
      setModel(location.state.model);
      setReady(true);
    }
  }, []);

  useEffect(() => {
    axiosInstance.get(`/get_metadata${endpointUrl}`).then((response) => {
      setFieldMetadata(response.data.fields);
      setModelMetadata(response.data);
    });
  }, []);

  const handleImageChange = (event) => {
    formData.image = event.target.files[0];
    setNewImage(URL.createObjectURL(event.target.files[0]));
    setNewImageName(event.target.files[0].name);
  };

  const handleInputChange = (e) => {
    console.log(e.target.type);
    console.log(formData);
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]:
        type === "checkbox"
          ? checked
          : type === "file"
          ? e.target.files[0]
          : value,
    }));
  };

  const handleQuillChange = (fieldName, fieldValue) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: fieldValue,
    }));
  };

  const handleManyToManyChange = (fieldName, fieldValue) => {
    if (fieldName === "features" || fieldName === "supported_sites") {
      const newFeatures = formData[fieldName] ? [...formData[fieldName]] : [];
      newFeatures.push({ detail: fieldValue });
      setFormData((prevFormData) => ({
        ...prevFormData,
        [fieldName]: newFeatures,
      }));
    } else if (fieldName === "items") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [fieldName]: [...prevFormData[fieldName], fieldValue],
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [fieldName]: fieldValue,
      }));
    }
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

    console.log("DATA SENT: ", formData);

    const formDataWithoutId = {};
    for (const [key, value] of Object.entries(formData)) {
      if (key !== "id") {
        formDataWithoutId[key] = value;
      }
    }

    if (Object.keys(data).length === 0) {
      console.log("if'd");
      try {
        const response = await axiosInstance.post(
          endpointUrl,
          formDataWithoutId,
          config
        );
        routeBackToModel();
        handleUpdate();
        dispatch({ type: "ALERT_SUCCESS", message: "Object Created" });
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("else'd");
      console.log("else'd id: ", data);
      try {
        const response = await axiosInstance.patch(
          `${endpointUrl}${data.id}/`,
          formDataWithoutId,
          config
        );

        routeBackToModel();
        handleUpdate();
        dispatch({ type: "ALERT_SUCCESS", message: "Object Updated" });
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      {ready ? (
        <BaseForm
          handleSubmit={handleSubmit}
          maxWidth={800}
          minWidth={800}
          minHeight={isSmallScreen ? 400 : 600}
          title={modelMetadata.verboseName}
          background="#F5F5F5"
          boxShadow={2}
        >
          <Grid container justifyContent="center">
            {fieldMetadata &&
              metadata &&
              Object.keys(fieldMetadata).map((fieldName) => {
                if (
                  fieldName === "id" ||
                  fieldName === "created_at" ||
                  fieldName === "updated_at" ||
                  fieldName === "last_login" ||
                  fieldName === "date_joined" ||
                  fieldName === "subscribed_on" ||
                  fieldName === "password" ||
                  fieldName === "salt"
                ) {
                  return null;
                }

                const {
                  type,
                  choices,
                  xs_column_count,
                  md_column_count,
                  justify,
                  markdown,
                } = fieldMetadata[fieldName];

                if (fieldName === "features") {
                  console.log(fieldMetadata[fieldName]);
                }

                const { verbose_name } = metadata[fieldName];

                const inputElement = getByType(
                  fieldName,
                  verbose_name,
                  type,
                  handleInputChange,
                  choices,
                  formData,
                  setFormData,
                  handleManyToManyChange,
                  handleImageChange,
                  handleQuillChange,
                  newImage,
                  newImageName,
                  xs_column_count,
                  md_column_count,
                  justify,
                  markdown
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

          <Grid
            item
            xs={12}
            style={{
              justifyContent: "center",
              display: "flex",
              paddingTop: 16,
            }}
          >
            <Paper
              style={{
                width: "100%",
                background: "rgba(0,0,0,0.1)",
                padding: 24,
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {modelMetadata.modelName !== "Feature" &&
              modelMetadata.modelName !== "SupportedSites" ? (
                <>
                  <Typography
                    variant="h3"
                    align="center"
                    color="textSecondary"
                    style={{ marginBottom: 16 }}
                  >
                    Component Preview
                  </Typography>
                  <Divider style={{ marginBottom: 16 }} />
                  {renderComponentPreview(modelMetadata, formData, newImage)}
                </>
              ) : (
                <Typography variant="h3" align="center" color="textSecondary">
                  No Component Attached to Model
                </Typography>
              )}
            </Paper>
          </Grid>
        </BaseForm>
      ) : (
        <Loading loading={true} />
      )}
    </>
  );
};

AutoForm.propTypes = {
  endpointUrl: PropTypes.string.isRequired, // API Endpoint Route
  data: PropTypes.object, // Optional Data Object for Editing
  onClose: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
};

export default AutoForm;
