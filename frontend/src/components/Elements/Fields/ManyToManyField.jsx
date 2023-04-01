import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  useTheme,
  TextField,
  Chip,
  Grid,
  IconButton,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import axiosInstance from "../../../lib/Axios/axiosInstance";
import DualList from "./DualList";
import choiceSource from "../../Admin/Objects/AutoForm/choiceSource";

const useStyles = makeStyles((theme) => ({
  chip: {
    margin: theme.spacing(0.5),
    border: "2px solid black",
    color: theme.palette.text.dark,
    background: "#F5F5F5",
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  field: {
    marginBottom: theme.spacing(1.5),
    width: "100%",
    "& .MuiOutlinedInput-root": {
      fontFamily: "Roboto",
      padding: 0,
      fontSize: "0.9rem",
      fontWeight: "400",
      width: "100%",
      letterSpacing: 0.25,

      "& fieldset": {
        borderColor: "black",
      },
      "&:hover fieldset": {
        borderColor: theme.palette.secondary.main,
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.primary.light,
      },
    },
    "& .MuiFormLabel-root": {
      fontFamily: "Roboto",
      color: theme.palette.text.secondary,
      fontWeight: "500",
      fontSize: "0.95rem",
    },
    "& input": {
      color: theme.palette.text.secondary,
    },
  },
  helpText: {
    margin: theme.spacing(1, 0, 0.5, 0),
    padding: 0,
    color: theme.palette.text.secondary,
  },
  select: {
    width: "100%",
    maxHeight: "64px",
    overflow: "auto",
    background: "#F5F5F5",
    color: theme.palette.text.dark,
    "& .MuiSelect-icon": {
      color: theme.palette.text.dark,
    },
    "& .MuiOutlinedInput-input": {
      color: theme.palette.text.dark,
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "1px solid #222 !important",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white !important",
      },
    },
    "& .MuiFormLabel-root": {
      color: "red",
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

const ManyToManyField = ({
  data = {},
  fieldName,
  verboseName,
  handleManyToManyChange,
  handleComponentsChange,
  setFormData,
  formData,
  variant = "outlined",
  helpText = false,
}) => {
  console.log("mtmformData", formData);
  const classes = useStyles();
  const [choices, setChoices] = useState([]);
  const [items, setItems] = useState(data);
  const [newFeature, setNewFeature] = useState("");
  const theme = useTheme();

  const handleDeleteManyToMany = (fieldName, feature) => () => {
    if (fieldName === "components") {
      setFormData((prevFormData) => {
        const newFeatures = prevFormData[fieldName].filter(
          (prevFeature) => prevFeature.name !== feature.name
        );
        setItems(newFeatures);
        return {
          ...prevFormData,
          [fieldName]: newFeatures,
        };
      });
    } else {
      setFormData((prevFormData) => {
        const newFeatures = prevFormData[fieldName].filter(
          (prevFeature) => prevFeature.detail !== feature.detail
        );
        setItems(newFeatures);
        return {
          ...prevFormData,
          [fieldName]: newFeatures,
        };
      });
    }
  };

  const handleAddFeature = () => {
    if (newFeature) {
      if (fieldName === "components") {
        setItems((prevFeatures) => {
          if (Array.isArray(prevFeatures)) {
            return [...prevFeatures, { name: newFeature }];
          } else {
            return [{ name: newFeature }];
          }
        });
      } else {
        setItems((prevFeatures) => {
          if (Array.isArray(prevFeatures)) {
            return [...prevFeatures, { detail: newFeature }];
          } else {
            return [{ detail: newFeature }];
          }
        });
      }
      handleManyToManyChange(fieldName, newFeature);
      setNewFeature("");
    }
  };

  const handleFeatureInputChange = (event) => {
    setNewFeature(event.target.value);
  };

  useEffect(() => {
    const source = choiceSource(fieldName);

    axiosInstance.get(`/${source}/`).then((response) => {
      setChoices(response.data);
      console.log("YEAH:", response.data);
    });
  }, []);

  const [selectedOptions, setSelectedOptions] = useState(
    data && data.length ? data.map((item) => item) : []
  );

  const handleChange = (event) => {
    const { value } = event.target;
    setSelectedOptions(value);

    const formattedData = selectedOptions.map((option) => {
      return { name: option };
    });

    handleComponentsChange(fieldName, formattedData);
  };

  useEffect(() => {
    if (selectedOptions) {
      const formattedData = selectedOptions.map((option) => {
        return { name: option };
      });
      handleComponentsChange(fieldName, formattedData);
    }
  }, [selectedOptions]);

  return (
    <div style={{ width: "100%" }}>
      {choices && selectedOptions && (
        <React.Fragment>
          <DualList
            fieldName={fieldName}
            selectedOptions={selectedOptions}
            choices={choices}
            handleComponentsChange={handleComponentsChange}
          />

          {/*<div> <TextField
              style={{ marginTop: helpText ? 0 : 8 }}
              className={classes.field}
              variant={variant}
              label={helpText ? null : `Add ${verboseName}`}
              value={newFeature}
              onChange={handleFeatureInputChange}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  handleAddFeature();
                }
              }}
              margin="dense"
              fullWidth
              InputProps={{
                endAdornment: (
                  <IconButton size="small" onClick={handleAddFeature}>
                    <AddIcon style={{ color: "black" }} />
                  </IconButton>
                ),
              }}
            />
          </div>
          <Grid container>
            {items.length > 0 &&
              fieldName !== "components" &&
              items.map((feature, index) => {
                return (
                  <Chip
                    key={index}
                    label={
                      fieldName === "components" ? feature.name : feature.detail
                    }
                    onDelete={handleDeleteManyToMany(fieldName, feature)}
                    className={classes.chip}
                    style={{
                      borderColor:
                        index % 4 === 0
                          ? theme.palette.primary.dark
                          : index % 4 === 1
                          ? theme.palette.secondary.dark
                          : index % 4 === 2
                          ? theme.palette.primary.light
                          : theme.palette.secondary.main,
                    }}
                  />
                );
              })}
          </Grid> */}
        </React.Fragment>
      )}
    </div>
  );
};

export default ManyToManyField;
