import React, { useRef } from "react";
import {
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Container,
  ListItemIcon,
  Switch,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ErrorMessage from "../../../Elements/Errors/ErrorMessage";
import AddButton from "../../Parts/Buttons/AddButton";
import BaseContent from "../../../Elements/Base/BaseContent";
import FormField from "../../../Elements/Fields/FormField";
import IconSelectMixin from "../../../Elements/Base/EditForm/IconSelectMixin";
import Icon from "../../../Elements/Icon/Icon";
import { Skeleton } from "@material-ui/lab";
import ImageInput from "../../../Elements/Fields/ImageInput";
import ClearIcon from "@mui/icons-material/Clear";
import Flexer from "../../../Elements/Layout/Container/Flexer";

const useStyles = makeStyles((theme) => ({
  addActions: {
    display: "flex",
    padding: "16px 4px 0px 4px",
    alignItems: "flex-end",
    justifyContent: "center",
    width: "100%",
  },
  helpText: {
    margin: theme.spacing(0, 0, 0.5, 0),
    padding: 0,
    color: theme.palette.text.secondary,
  },
  list: {
    backgroundColor: theme.palette.grey[100],
    padding: theme.spacing(0),
    width: "100%",
  },
  listItemText: {
    "& .MuiTypography-root": {
      fontWeight: theme.typography.fontWeightMedium,
      fontSize: "0.8rem",
    },
    "& .MuiTypography-colorTextSecondary": {
      fontSize: "0.8rem",
    },
  },
  deleteButton: {
    color: theme.palette.error.main,
    "&:hover": {
      backgroundColor: theme.palette.error.main,
      color: theme.palette.common.white,
    },
  },
  defaultIcon: {
    color: theme.palette.primary.main,
    fontSize: "2.5rem",
  },
  thumbnailContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: theme.spacing(2, 2, 2, 0),
    padding: theme.spacing(2, 0, 2, 0),
  },
  listThumbnailImage: {
    width: 100,
    height: 60,
    objectFit: "cover",
    borderRadius: theme.spacing(1),
  },
  listItemSkeleton: {
    border: "1px solid #e0e0e0",
    margin: theme.spacing(2, 0),
  },
}));

const fieldNames = [
  { name: "header", label: "Header Text*", type: "text", md: 6 },
  { name: "subheader", label: "Subheader Text*", type: "text", md: 6 },
  {
    name: "primary",
    label: "Primary Text*",
    type: "text",
    md: 6,
    multiline: true,
  },
  {
    name: "secondary",
    label: "Secondary Text*",
    type: "text",
    md: 6,
    multiline: true,
  },
  { name: "icon", label: "Icon Choice", type: "text", md: 6 },
  { name: "image", label: "Thumbnail Choice", type: "text", md: 12 },
  { name: "shareToggle", label: "Share Button", type: "text", md: 6 },
  { name: "buttonToggle", label: "Link Button", type: "text", md: 6 },
];

const CardBuilderTypeForm = ({
  formData,
  handleChange,
  handleThumbnailImageChange,
  errors,
  setErrors,
}) => {
  const classes = useStyles();
  const fileInputRef = useRef();

  return (
    <Grid item xs={12} md={12} xl={12} style={{ width: "100%" }}>
      <Grid container spacing={2}>
        {fieldNames.map((field) => {
          console.log(field.name, formData.cardType);

          if (formData.cardType === "Tile") {
            if (
              field.name === "image" ||
              field.name === "header" ||
              field.name === "subheader" ||
              field.name === "shareToggle" ||
              field.name === "buttonToggle"
            ) {
              return null;
            }
          }
          if (formData.cardType === "Dense") {
            if (
              field.name === "image" ||
              field.name === "shareToggle" ||
              field.name === "buttonToggle"
            ) {
              return null;
            }
          }

          if (formData.cardType === "Standard") {
            if (field.name === "secondary") {
              return null;
            }
          }

          return (
            <Grid item xs={12} md={field.md} style={{ width: "100%" }}>
              {field.name === "icon" ? (
                <React.Fragment>
                  <Typography className={classes.helpText}>
                    {field.label}
                  </Typography>
                  <IconSelectMixin
                    fieldName={field.name}
                    formData={formData}
                    handleChange={handleChange}
                    background="#F5F5F5"
                    hideHelpText
                  />
                </React.Fragment>
              ) : field.name === "image" ? (
                <div style={{ width: "100%" }}>
                  <ImageInput
                    xs={12}
                    md={9}
                    handleChange={handleThumbnailImageChange}
                    handleClick={() => fileInputRef.current.click()}
                    newImage={null}
                    newImageName={null}
                    type="Thumbnail"
                  />
                </div>
              ) : field.name.includes("Toggle") ? (
                <Flexer fd="column" a="c">
                  <Typography className={classes.helpText}>
                    {field.label}
                  </Typography>
                  <Switch
                    name={field.name}
                    checked={formData[field.name]}
                    onChange={handleChange}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </Flexer>
              ) : (
                <React.Fragment>
                  <Typography className={classes.helpText}>
                    {field.label}
                  </Typography>
                  <FormField
                    required
                    multiline={field.multiline}
                    id={field.name}
                    onChange={handleChange}
                    value={formData[field.name]}
                    minRows={4}
                  />
                </React.Fragment>
              )}
            </Grid>
          );
        })}
      </Grid>
      <div>
        <div className={classes.addActions}>
          {/* <AddButton label="Item to List" addFunc={handleAdd} /> */}
        </div>
      </div>
      {errors && (
        <div>
          <ErrorMessage errors={errors} setErrors={setErrors} />
        </div>
      )}
    </Grid>
  );
};

export default CardBuilderTypeForm;
