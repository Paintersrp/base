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
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ErrorMessage from "../../Elements/Errors/ErrorMessage";
import AddButton from "../../Tables/Builder/Buttons/AddButton";
import BaseContent from "../../Elements/Base/BaseContent";
import FormField from "../../Elements/Fields/FormField";
import IconSelectMixin from "../../Elements/Base/EditForm/IconSelectMixin";
import Icon from "../../Elements/Icon/Icon";
import { Skeleton } from "@material-ui/lab";
import ImageInput from "../../Elements/Fields/ImageInput";
import ClearIcon from "@mui/icons-material/Clear";

const useStyles = makeStyles((theme) => ({
  addActions: {
    display: "flex",
    padding: "16px 4px 0px 4px",
    alignItems: "flex-end",
    justifyContent: "center",
    width: "100%",
  },
  helpText: {
    margin: theme.spacing(1, 0, 0.5, 0),
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
    fontSize: "2rem",
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
}));

const fieldNames = [
  { name: "primary", label: "Primary Text*", type: "text", md: 6 },
  { name: "secondary", label: "Secondary Text*", type: "text", md: 6 },
  { name: "order", label: "List Item Order*", type: "number", md: 6 },
  { name: "icon", label: "Icon Choice", type: "text", md: 6 },
  { name: "image", label: "Thumbnail Choice", type: "text", md: 6 },
];

const ListBuilderBody = ({
  formData,
  handleChange,
  handleClear,
  handleThumbnailImageChange,
  errors,
  handleAdd,
}) => {
  const classes = useStyles();
  const fileInputRef = useRef();

  return (
    <Grid
      item
      xs={12}
      md={8}
      xl={7}
      style={{ paddingRight: 12, width: "100%" }}
    >
      <Grid container>
        <BaseContent pad={1} maxWidth={500} mb={4}>
          <List dense className={classes.list}>
            <div style={{ paddingTop: 16, width: "100%" }}>
              <Typography variant="h4" align="center">
                List Item Preview
              </Typography>
            </div>

            <ListItem key={99}>
              {formData.listType === "Image" && (
                <div className={classes.thumbnailContainer}>
                  {formData.image ? (
                    <img
                      src={URL.createObjectURL(formData.image)}
                      alt="Thumbnail"
                      className={classes.listThumbnailImage}
                    />
                  ) : (
                    <Skeleton
                      variant="rect"
                      width={75}
                      height={50}
                      animation={null}
                    />
                  )}
                </div>
              )}
              {formData.icon && formData.listType === "Icon" && (
                <ListItemIcon>
                  <Icon icon={formData.icon} className={classes.defaultIcon} />
                </ListItemIcon>
              )}
              <ListItemText
                primary={formData.primary || "..."}
                secondary={formData.secondary || "..."}
                primaryTypographyProps={{
                  className: classes.listItemText,
                }}
                secondaryTypographyProps={{
                  className: classes.listItemText,
                  color: "textSecondary",
                }}
              />
              <Typography
                variant="body1"
                component="span"
                color="textSecondary"
                className={classes.listItemText}
                style={{ marginRight: 8, fontSize: "0.8rem" }}
              >
                {formData.order ? `Order: ${formData.order}` : "No Order"}
              </Typography>
              <ListItemSecondaryAction>
                <IconButton
                  onClick={handleClear}
                  className={classes.deleteButton}
                  size="small"
                >
                  <ClearIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </BaseContent>
        {fieldNames.map((field) => {
          if (field.name === "icon") {
            if (formData.listType !== "Icon") {
              return null;
            }
          }
          if (field.name === "image") {
            if (formData.listType !== "Image") {
              return null;
            }
          }

          return (
            <Grid
              item
              xs={12}
              md={field.md}
              style={{ paddingRight: 12, width: "100%" }}
            >
              <Container
                justify="flex-start"
                style={{ width: "100%", padding: 0 }}
              >
                <Typography className={classes.helpText}>
                  {field.label}
                </Typography>
                {field.name === "icon" ? (
                  <IconSelectMixin
                    fieldName={"icon"}
                    formData={formData}
                    handleChange={handleChange}
                    background="#F5F5F5"
                    hideHelpText
                  />
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
                ) : (
                  <FormField
                    required
                    id={field.name}
                    onChange={handleChange}
                    value={formData[field.name]}
                  />
                )}
              </Container>
            </Grid>
          );
        })}
      </Grid>
      <div style={{ marginBottom: 24 }}>
        <div className={classes.addActions}>
          <AddButton label="Item to List" addFunc={handleAdd} />
        </div>
      </div>
      {errors && (
        <div style={{ marginBottom: 24 }}>
          <ErrorMessage errors={errors} />
        </div>
      )}
    </Grid>
  );
};

export default ListBuilderBody;
