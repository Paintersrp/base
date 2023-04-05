import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Divider,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  makeStyles,
  Tooltip,
} from "@material-ui/core";
import axiosInstance from "../../../../lib/Axios/axiosInstance";
import BaseForm from "../../../Elements/Base/BaseForm";
import getByType from "./getByType";
import { Link, useLocation, useNavigate } from "react-router-dom";
import StyledButton from "../../../Elements/Buttons/StyledButton";
import Loading from "../../../Elements/Layout/Loading/Loading";
import { useDispatch } from "react-redux";
import { renderComponentPreview } from "./renderComponentPreview";
import {
  Home as HomeIcon,
  Info as InfoIcon,
  ContactMail as ContactMailIcon,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
    margin: theme.spacing(3, 0, 1, 0),
    width: "100%",
  },
  listItem: {
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(1),
    color: theme.palette.text.secondary,
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.text.secondary}`,
    transition: "background-color 0.2s",
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  tooltip: {
    backgroundColor: theme.palette.text.secondary,
    color: "#ffffff",
    fontSize: "12px",
  },
}));

const AutoFormModal = ({
  endpointUrl,
  data = {},
  handleModalUpdate,
  variant = "full",
  handleClose,
}) => {
  console.log("yup", endpointUrl);
  const classes = useStyles();
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
      console.log(response.data);
    });
  }, []);

  const handleImageChange = (event) => {
    formData.image = event.target.files[0];
    setNewImage(URL.createObjectURL(event.target.files[0]));
    setNewImageName(event.target.files[0].name);
  };

  const handleInputChange = (e) => {
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

  const handleComponentsChange = (fieldName, newObjects) => {
    formData[fieldName] = newObjects;
    console.log("formData", formData);
  };

  const handleManyToManyChange = (fieldName, fieldValue) => {
    console.log(fieldName);
    if (
      fieldName === "features" ||
      fieldName === "supported_sites" ||
      fieldName === "responsibilities" ||
      fieldName === "requirements"
    ) {
      const newFeatures = formData[fieldName] ? [...formData[fieldName]] : [];
      newFeatures.push({ detail: fieldValue });
      setFormData((prevFormData) => ({
        ...prevFormData,
        [fieldName]: newFeatures,
      }));
    } else if (fieldName === "components") {
      const newFeatures = formData[fieldName] ? [...formData[fieldName]] : [];
      newFeatures.push({ name: fieldValue });
      setFormData((prevFormData) => ({
        ...prevFormData,
        [fieldName]: newFeatures,
      }));
      console.log("newf", newFeatures);
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
    handleClose();
  };

  const handleSubmiter = async (e) => {
    console.log(formData);
    e.preventDefault();
    e.stopPropagation();
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const formDataWithoutId = {};
    for (const [key, value] of Object.entries(formData)) {
      if (key !== "id") {
        formDataWithoutId[key] = value;
      }
    }

    if (Object.keys(data).length === 0) {
      try {
        const response = await axiosInstance.post(
          endpointUrl,
          formDataWithoutId,
          config
        );

        routeBackToModel();
        handleModalUpdate();
        dispatch({
          type: "ALERT_SUCCESS",
          message: `${model.verbose_name} Object - Created ${model.verbose_name}`,
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const response = await axiosInstance.patch(
          `${endpointUrl}${data.id}/`,
          formDataWithoutId,
          config
        );

        routeBackToModel();
        handleModalUpdate();
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
          modal
          handleSubmit={handleSubmiter}
          maxWidth={isSmallScreen ? 370 : 800}
          minWidth={isSmallScreen ? 370 : 800}
          //   minHeight={isSmallScreen ? 400 : 600}
          title={`${Object.keys(data).length === 0 ? "Create" : "Update"} ${
            modelMetadata.autoFormLabel || modelMetadata.verboseName
          } Object`}
          body={modelMetadata.longDescription}
          bodyAlign="start"
          background="#F5F5F5"
          boxShadow={2}
          infoDump={modelMetadata.info_dump}
        >
          <Grid
            container
            justifyContent={modelMetadata.preview ? "flex-start" : "center"}
          >
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={modelMetadata.preview ? 7 : 10}
            >
              <Grid container justifyContent="flex-start">
                {fieldMetadata &&
                  metadata &&
                  Object.keys(fieldMetadata).map((fieldName) => {
                    if (
                      fieldName === "id" ||
                      fieldName === "created_at" ||
                      fieldName === "updated_at" ||
                      fieldName === "blacklisted_at" ||
                      fieldName === "last_login" ||
                      fieldName === "date_joined" ||
                      fieldName === "subscribed_on" ||
                      fieldName === "password" ||
                      fieldName === "salt" ||
                      fieldName === "question_sets" ||
                      fieldName === "questions" ||
                      fieldName === "answer_choices"
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
                      help_text,
                      min_rows,
                    } = fieldMetadata[fieldName];
                    if (fieldName === "content") {
                      console.log(fieldMetadata[fieldName]);
                    }

                    console.log("metadata", fieldMetadata[fieldName]);

                    const { verbose_name } = metadata[fieldName]
                      ? metadata[fieldName]
                      : fieldMetadata[fieldName].help_text ||
                        fieldMetadata[fieldName];

                    const inputElement = getByType(
                      fieldMetadata,
                      fieldName,
                      modelMetadata,
                      verbose_name,
                      type,
                      handleInputChange,
                      choices,
                      formData,
                      setFormData,
                      handleManyToManyChange,
                      handleImageChange,
                      handleQuillChange,
                      handleComponentsChange,
                      newImage,
                      newImageName,
                      xs_column_count,
                      md_column_count,
                      justify,
                      markdown,
                      min_rows,
                      help_text
                    );

                    if (inputElement) {
                      return inputElement;
                    }

                    return null;
                  })}
              </Grid>
              <Grid container justifyContent="center" style={{ marginTop: 16 }}>
                <Tooltip
                  title={`${
                    Object.keys(data).length === 0 ? "Create" : "Update"
                  } Object`}
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <div>
                    <StyledButton
                      buttonText={
                        Object.keys(data).length === 0 ? "Create" : "Update"
                      }
                      minWidth={80}
                      color="primary"
                      type="submit"
                    />
                  </div>
                </Tooltip>
                <Tooltip
                  title={`Cancel Creation`}
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <div>
                    <StyledButton
                      buttonText={"Cancel"}
                      color="primary"
                      onClick={handleClose}
                      minWidth={80}
                    />
                  </div>
                </Tooltip>
              </Grid>
            </Grid>
            {modelMetadata.preview ? (
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={5}
                style={{
                  justifyContent: "center",
                  display: "flex",
                  paddingTop: 16,
                }}
              >
                <Paper
                  elevation={0}
                  style={{
                    width: "100%",
                    background: "",
                    padding: 24,
                    display: "flex",
                    // justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
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
                </Paper>
              </Grid>
            ) : null}
          </Grid>
        </BaseForm>
      ) : (
        <Loading loading={true} />
      )}
    </>
  );
};

AutoFormModal.propTypes = {
  endpointUrl: PropTypes.string.isRequired, // API Endpoint Route
  data: PropTypes.object, // Optional Data Object for Editing
  onClose: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
};

export default AutoFormModal;
