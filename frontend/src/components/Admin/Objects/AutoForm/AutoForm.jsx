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
import { renderObjectPreview } from "./renderObjectPreview";
import LoadingIndicator from "../../../Elements/Layout/Loading/LoadingIndicator";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
    margin: theme.spacing(0, 0, 1, 0),
    // width: "100%",
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

const AutoForm = ({
  endpointUrl,
  data = {},
  handleUpdate,
  handleModalUpdate,
  variant = "full",
  handleClose,
  refresh,
  setRefresh,
}) => {
  console.log("yup", endpointUrl);
  console.log("yup2", data);
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("xl"));
  const [formData, setFormData] = useState(data);
  const [modelMetadata, setModelMetadata] = useState({});
  const [fieldMetadata, setFieldMetadata] = useState({});
  const [componentPreviewData, setComponentPreviewData] = useState({});
  const [url, setUrl] = useState([]);
  const [keys, setKeys] = useState([]);
  const [appName, setAppName] = useState([]);
  const [model, setModel] = useState([]);
  const [metadata, setMetadata] = useState([]);
  const [newImage, setNewImage] = useState(null);
  const [newImageName, setNewImageName] = useState(null);
  const [selectedModelName, setSelectedModelName] = useState("");
  const [ready, setReady] = useState(false);
  const [previewReady, setPreviewReady] = useState(false);
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
    console.log("DASDDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    axiosInstance.get(`/get_metadata${endpointUrl}`).then((response) => {
      setFieldMetadata(response.data.fields);
      setModelMetadata(response.data);
      console.log(response.data);
    });
  }, []);

  useEffect(() => {
    setReady(false);
    setRefresh(false);
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
  }, [refresh]);

  const handleModelNameChange = (model_name) => {
    setSelectedModelName(model_name);
    handleUpdatePreview(model_name, formData["query_params"]);
  };

  useEffect(() => {
    console.log("test");
    if (modelMetadata.modelName === "ComponentObj") {
      if (selectedModelName) {
        handleUpdatePreview(selectedModelName, formData["query_params"]);
      } else {
        handleUpdatePreview(formData["content"], formData["query_params"]);
      }
    }
  }, [formData["query_params"]]);

  const handleUpdatePreview = (model_name, query_params) => {
    setPreviewReady(false);
    if (model_name !== "None") {
      axiosInstance
        .get("preview-data/", {
          params: {
            model_name: model_name,
            query_params: query_params,
          },
        })

        .then((response) => {
          setComponentPreviewData(response.data.data);
          setSelectedModelName(response.data.model_name);
          setTimeout(() => {
            setPreviewReady(true);
          }, 250);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

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
          : name === "content"
          ? value !== "None Selected"
            ? parseInt(value)
            : "None Selected"
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
    const updatedFormData = { ...formData };
    updatedFormData[fieldName] = newObjects;
    setFormData(updatedFormData);
    console.log("formData", formData);
    console.log("modelMetadata.modelName", modelMetadata.modelName);
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
    if (variant === "modal") {
      handleClose();
    } else if (variant === "full") {
      navigate(`/admin/${model.model_name}/`, {
        state: {
          url: url,
          keys: keys,
          appName: appName,
          model: model,
          metadata: metadata,
        },
      });
    }
  };

  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();
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
        handleUpdate();
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
          maxWidth={isSmallScreen ? "100%" : "100%"}
          minWidth={isSmallScreen ? 370 : 800}
          minHeight={isSmallScreen ? 400 : 600}
          title={`${Object.keys(data).length === 0 ? "Create" : "Update"} ${
            modelMetadata.autoFormLabel || modelMetadata.verboseName
          } Object`}
          body={modelMetadata.longDescription}
          bodyAlign={modelMetadata.preview ? "flex-start" : "center"}
          background="#F5F5F5"
          boxShadow={0}
          infoDump={modelMetadata.info_dump}
          noPadding
        >
          <div style={{ width: "100%" }}>
            <Divider style={{ marginBottom: 32, marginTop: 24 }} />
          </div>
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
              xl={
                modelMetadata.preview &&
                modelMetadata.modelName === "ComponentObj"
                  ? 12
                  : modelMetadata.preview
                  ? 7
                  : 10
              }
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
                      fieldName === "answer_choices" ||
                      fieldName === "author"
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
                      console.log(fieldMetadata, "fieldMetadata");
                      console.log(modelMetadata, "modelMetadata");
                    }

                    console.log("metadata", fieldMetadata[fieldName]);

                    const { verbose_name } = metadata[fieldName]
                      ? metadata[fieldName]
                      : fieldMetadata[fieldName].help_text;

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
                      handleModelNameChange,
                      newImage,
                      newImageName,
                      xs_column_count,
                      md_column_count,
                      justify,
                      markdown,
                      min_rows,
                      help_text,
                      handleModalUpdate
                    );

                    if (inputElement) {
                      return inputElement;
                    }

                    return null;
                  })}
              </Grid>
              {/* <div style={{ width: "100%" }}>
                <Divider style={{ marginBottom: 32, marginTop: 32 }} />
              </div> */}

              <Grid
                container
                justifyContent="center"
                style={{ marginTop: 48, marginBottom: 16 }}
              >
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
                      onClick={
                        variant === "full" ? routeBackToModel : handleClose
                      }
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
                xl={modelMetadata.modelName === "ComponentObj" ? 12 : 5}
                style={{
                  justifyContent: "center",
                  display: "flex",
                  paddingTop: isLargeScreen ? 0 : 16,
                }}
              >
                <Paper
                  elevation={0}
                  style={{
                    width: "100%",
                    background: "",
                    padding: 12,
                    display: "flex",
                    // justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  {!isLargeScreen &&
                    modelMetadata.modelName !== "ComponentObj" && (
                      <div style={{ width: "100%" }}>
                        <Divider style={{ marginBottom: 32 }} />
                      </div>
                    )}
                  {modelMetadata.modelName === "ComponentObj" && (
                    <div style={{ width: "100%" }}>
                      <Divider style={{ marginBottom: 32 }} />
                    </div>
                  )}
                  <Typography
                    variant="h3"
                    align="center"
                    style={{ marginBottom: 16, color: "#222" }}
                  >
                    Component Preview
                  </Typography>

                  {modelMetadata.modelName === "ComponentObj" && previewReady
                    ? renderComponentPreview(
                        selectedModelName,
                        componentPreviewData,
                        newImage
                      )
                    : null}
                  {modelMetadata.modelName !== "ComponentObj"
                    ? renderObjectPreview(
                        modelMetadata.modelName,
                        formData,
                        newImage
                      )
                    : null}
                </Paper>
              </Grid>
            ) : null}
          </Grid>

          <div style={{ width: "100%" }}>
            <Divider style={{ marginBottom: 32, marginTop: 32 }} />
          </div>

          {modelMetadata.pagesAssociated && (
            <>
              <div style={{ width: "100%", marginTop: 0 }}>
                <Typography align="center" variant="h3" color="textSecondary">
                  Associated Pages
                </Typography>
              </div>
              <div className={classes.root}>
                <List dense component="nav" style={{ display: "flex" }}>
                  {Object.entries(modelMetadata.pagesAssociated).map(
                    ([page, url], index) => (
                      <React.Fragment key={page}>
                        <Tooltip
                          title={`View ${page} Page`}
                          placement="bottom"
                          classes={{ tooltip: classes.tooltip }}
                        >
                          <ListItem
                            button
                            component={Link}
                            to={url}
                            className={classes.listItem}
                          >
                            <ListItemIcon>
                              <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary={page} />
                          </ListItem>
                        </Tooltip>
                      </React.Fragment>
                    )
                  )}
                </List>
              </div>
            </>
          )}
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
