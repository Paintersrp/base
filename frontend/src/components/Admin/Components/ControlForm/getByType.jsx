import React from "react";
import {
  TextField,
  FormControlLabel,
  Grid,
  Typography,
  Switch,
  MenuItem,
  ListItemText,
  Select,
} from "@material-ui/core";
import FormField from "../../../Elements/Fields/FormField";
import ManytoManyField from "../Fields/ManytoManyField";
import ImageEditMixin from "../../../Elements/Base/EditForm/ImageEditMxin";
import IconSelectMixin from "../../../Elements/Base/EditForm/IconSelectMixin";
import ChoiceType from "./Types/ChoiceType";

const getByType = (
  fieldName,
  fieldType,
  handleInputChange,
  choices,
  formData,
  handleManyToManyChange,
  handleImageChange,
  newImage,
  newImageName
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
                  checked={formData ? formData[fieldName] : ""}
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
            data={formData ? formData[fieldName] : []}
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
        <>
          <ChoiceType
            formData={formData}
            fieldName={fieldName}
            handleInputChange={handleInputChange}
            choices={choices}
          />
          {/* <Grid
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
                  // className={classes.select}
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
                      // paper: classes.menuPaper,
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
                    <MenuItem key={key} value={value.display}>
                      <ListItemText primary={value.display} />
                    </MenuItem>
                  ))}
                </Select>
              }
            />
          </Grid> */}
        </>
      );
    default:
      return null;
  }
};

export default getByType;
