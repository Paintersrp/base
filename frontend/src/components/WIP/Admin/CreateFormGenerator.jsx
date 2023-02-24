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
  MenuItem,
  ListItemIcon,
  ListItemText,
  Select,
  makeStyles,
} from "@material-ui/core";
import axiosInstance from "../../../lib/Axios/axiosInstance";
import BaseForm from "../../Elements/Base/BaseForm";
import FormField from "../../Elements/Fields/FormField";
import ManytoManyField from "./ManytoManyField";
import axios from "axios";
import ImageEditMixin from "../../Elements/Base/EditForm/ImageEditMxin";
import IconSelectMixin from "../../Elements/Base/EditForm/IconSelectMixin";

const useStyles = makeStyles((theme) => ({
  select: {
    width: "100%",
    maxHeight: "64px",
    overflow: "auto",
    background: theme.palette.text.light,
    color: theme.palette.text.dark,
    "& .MuiSelect-icon": {
      color: theme.palette.text.dark,
    },
    "& .MuiOutlinedInput-input": {
      color: theme.palette.text.dark,
    },
    "& .MuiSelect-select": {},
    "& .MuiSelect-select:focus": {},
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white !important",
      },
    },
    "& .MuiFormLabel-root": {
      color: theme.palette.text.dark,
      fontWeight: "700",
      fontSize: "0.9rem",
    },
    "& input": {
      color: theme.palette.text.dark,
    },
    "& .MuiMenu-paper": {
      maxHeight: 40,
      overflowY: "auto",
    },
  },
}));

const CreateFormGenerator = ({
  endpointUrl,
  data = {},
  onClose,
  handleUpdate,
}) => {
  const [formData, setFormData] = useState(data);
  const [fieldMetadata, setFieldMetadata] = useState({});
  const [newImage, setNewImage] = useState(null);
  const [newImageName, setNewImageName] = useState(null);
  const classes = useStyles();

  const handleImageChange = (event) => {
    formData.image = event.target.files[0];
    setNewImage(URL.createObjectURL(event.target.files[0]));
    setNewImageName(event.target.files[0].name);
  };

  useEffect(() => {
    const fetchData = async () => {
      axiosInstance.get(`/get_metadata${endpointUrl}`).then((response) => {
        setFieldMetadata(response.data);
      });
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    console.log(type);
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
    console.log("DATA SENT: ", formData);
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
        const response = await axios.patch(
          `http://localhost:8000/api${endpointUrl}${data.id}/`,
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

  const getInputElementByType = (
    fieldName,
    fieldType,
    handleInputChange,
    choices
  ) => {
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
                value={formData[fieldName]}
                control={
                  <Switch
                    name={fieldName}
                    onChange={handleInputChange}
                    checked={data ? formData[fieldName] : ""}
                  />
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
      case "StringRelatedField":
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
                {fieldName === "icon" ? (
                  <IconSelectMixin
                    formData={formData}
                    handleChange={handleInputChange}
                  />
                ) : (
                  <>
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
                      value={formData[fieldName]}
                    />
                  </>
                )}
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
                value={formData[fieldName]}
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
      case "ImageField":
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
            <ImageEditMixin
              formData={formData}
              handleChange={handleImageChange}
              newImage={newImage}
              newImageName={newImageName}
            />
          </Grid>
        );
      case "ChoiceField":
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
            <FormControlLabel
              style={{ fontSize: "0.8rem", width: "100%", margin: 0 }}
              control={
                <Select
                  className={classes.select}
                  variant="outlined"
                  value={formData[fieldName]}
                  onChange={handleInputChange}
                  displayEmpty
                  name={fieldName}
                  margin="dense"
                  style={{ minWidth: "100%", padding: 0 }}
                  MenuProps={{
                    anchorOrigin: {
                      vertical: "bottom",
                      horizontal: "left",
                    },
                    transformOrigin: {
                      vertical: "top",
                      horizontal: "left",
                    },
                    getContentAnchorEl: null,
                    classes: {
                      paper: classes.menuPaper,
                    },
                    PaperProps: {
                      style: {
                        maxHeight: 300,
                      },
                    },
                  }}
                >
                  <MenuItem value="">
                    <em>Select an icon</em>
                  </MenuItem>
                  {Object.entries(choices).map(([key, value]) => (
                    <MenuItem key={key} value={value}>
                      <ListItemText primary={value} />
                    </MenuItem>
                  ))}
                </Select>
              }
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
          const { type, choices } = fieldMetadata[fieldName];
          const inputElement = getInputElementByType(
            fieldName,
            type,
            handleInputChange,
            choices
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

CreateFormGenerator.propTypes = {
  endpointUrl: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CreateFormGenerator;
