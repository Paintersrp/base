import React, { useState, useEffect } from "react";
import {
  Select,
  MenuItem,
  Button,
  makeStyles,
  FormControl,
  InputLabel,
  Typography,
  ListSubheader,
  Grid,
  Divider,
} from "@material-ui/core";
import axiosInstance from "../../../../../../lib/Axios/axiosInstance";
import JSONFieldTable from "./JSONFieldTable";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
    justifyContent: "flex-start",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  fieldContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
  },
  addButton: {
    marginLeft: theme.spacing(1),
    maxHeight: 30,
    marginBottom: 6,
  },
  formControl: {
    minWidth: 300,
    overflow: "hidden",
  },
  select: {
    marginTop: 8,
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
    "& .MuiSelect-select": {},
    "& .MuiSelect-select:focus": {},
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
  helpText: {
    margin: theme.spacing(1, 0, 0, 0),
    padding: 0,
    color: theme.palette.text.secondary,
  },
}));

const JSONType = ({
  formData,
  fieldName,
  handleComponentsChange,
  xsColumnCount,
  mdColumnCount,
}) => {
  const classes = useStyles();
  const [field, setField] = useState();
  const [fieldValue, setFieldValue] = useState();
  const [filterOptions, setFilterOptions] = useState([]);
  const [filterChoices, setFilterChoices] = useState([]);
  const [filterChoiceData, setFilterChoiceData] = useState([]);
  const [queryParamValues, setQueryParamValues] = useState(
    formData[fieldName] ? Object.values(formData[fieldName]) : []
  );
  const [canAddQueryParam, setCanAddQueryParam] = useState(false);
  const [hasRendered, setHasRendered] = useState(false);

  const handleFieldChange = (event) => {
    const { value } = event.target;
    setField(value);
  };
  const handleValueChange = (event) => {
    const { value } = event.target;
    setFieldValue(value);
  };

  useEffect(() => {
    if (hasRendered) {
      setQueryParamValues([]);
    } else {
      setHasRendered(true);
    }
  }, [formData["content"]]);

  useEffect(() => {
    if (formData["content"] !== "None Selected") {
      axiosInstance
        .get(`get_contenttype_info/${formData["content"]}/`)
        .then((response) => {
          setFilterOptions(response.data.filter_options);
          setFilterChoiceData(response.data.filter_choices);
          setFilterChoices(
            response.data.filter_choices[response.data.filter_options[0]]
          );
          setField(response.data.filter_options[0]);

          setFieldValue(
            response.data.filter_choices[response.data.filter_options[0]][0]
              .display_name
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setFilterOptions([]);
      setFilterChoiceData([]);
      setFilterChoices([]);
      setField("");
      setFieldValue("");
    }
  }, [formData["content"]]);

  useEffect(() => {
    if (filterChoiceData && field) {
      setFilterChoices(filterChoiceData[field]);
      setFieldValue(filterChoiceData[field][0].display_name);
    }
  }, [field]);

  useEffect(() => {
    handleComponentsChange(fieldName, queryParamValues);
  }, [queryParamValues]);

  useEffect(() => {
    setCanAddQueryParam(fieldValue && fieldValue.length > 0);
  }, [fieldValue, field]);

  const handleAddQueryParam = (event) => {
    event.preventDefault();
    if (fieldValue) {
      setQueryParamValues((prevQueryParamValues) => [
        ...prevQueryParamValues,
        { [field]: fieldValue },
      ]);
      setField(filterOptions[0]);
      setFieldValue(filterChoiceData[filterOptions[0]][0].display_name);
    }
  };

  const handleRemoveQueryParam = (index) => {
    setQueryParamValues((prevQueryParamValues) => {
      const newQueryParamValues = [...prevQueryParamValues];
      newQueryParamValues.splice(index, 1);
      return newQueryParamValues;
    });
  };

  return (
    // <div className={classes.root}>
    <Grid
      item
      xs={xsColumnCount}
      md={mdColumnCount}
      style={{
        paddingRight: 8,
        paddingLeft: 8,
        width: "100%",
      }}
    >
      <div>
        {filterOptions &&
        filterChoiceData &&
        filterChoices &&
        field &&
        fieldValue ? (
          <>
            <Typography
              variant="h3"
              style={{
                color: "#222",
                textAlign: "center",
                width: "100%",
                marginTop: 32,
              }}
            >
              Select Data Filters
            </Typography>
            <div className={classes.fieldContainer}>
              <FormControl
                className={classes.formControl}
                style={{ marginRight: 8 }}
              >
                {/* <InputLabel shrink>Filter Category</InputLabel> */}
                <Typography className={classes.helpText}>
                  Content Filter Type
                </Typography>
                <Select
                  variant="outlined"
                  margin="dense"
                  style={{ minWidth: "100%", padding: 0 }}
                  value={field}
                  onChange={handleFieldChange}
                  className={classes.select}
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
                  {/* <ListSubheader>Category 1</ListSubheader> */}
                  {filterOptions.map((fieldName) => (
                    <MenuItem key={fieldName} value={fieldName}>
                      {fieldName === "set_name"
                        ? "Set Name"
                        : fieldName.charAt(0).toUpperCase() +
                          fieldName.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <Typography color="textSecondary">Filter Value</Typography>
                <Select
                  variant="outlined"
                  style={{ padding: "0px !important" }}
                  margin="dense"
                  value={fieldValue}
                  onChange={handleValueChange}
                  className={classes.select}
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
                  {filterChoices.map((value, i) => {
                    return (
                      <MenuItem key={i} value={value.display_name}>
                        {value.display_name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

              <Button
                onClick={handleAddQueryParam}
                disabled={!canAddQueryParam}
                variant="contained"
                color="primary"
                className={classes.addButton}
                size="small"
              >
                Add
              </Button>
            </div>

            <JSONFieldTable
              queryParamValues={queryParamValues}
              handleRemoveQueryParam={handleRemoveQueryParam}
            />
          </>
        ) : (
          <Typography
            variant="h3"
            style={{
              color: "#222",
              textAlign: "center",
              width: "100%",
              marginTop: 32,
            }}
          >
            No Data Model Selected
          </Typography>
        )}
      </div>
    </Grid>
  );
};

export default JSONType;
