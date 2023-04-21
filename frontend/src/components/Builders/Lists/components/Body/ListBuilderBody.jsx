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
import { Skeleton } from "@material-ui/lab";
import ClearIcon from "@mui/icons-material/Clear";

import AddButton from "../../../Parts/Buttons/AddButton";
import BaseContent from "../../../../Elements/Base/BaseContent";
import ErrorMessage from "../../../../Elements/Errors/ErrorMessage";
import FormField from "../../../../Elements/Fields/FormField";
import IconSelectMixin from "../../../../Elements/Base/EditForm/IconSelectMixin";
import Icon from "../../../../Elements/Icon/Icon";
import ImageInput from "../../../../Elements/Fields/ImageInput";

import { listBodyStyles } from "./listBodyStyles";
import { listBodyFieldNames } from "../../const/listContants";

const ListBuilderBody = ({
  formData,
  handleChange,
  handleClear,
  handleThumbnailImageChange,
  errors,
  handleAdd,
}) => {
  const classes = listBodyStyles();
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
        <BaseContent pad={1} maxWidth={500} mb={0} boxShadow={0}>
          <List dense className={classes.list}>
            <div style={{ paddingTop: 16, width: "100%" }}>
              <Typography variant="h4" align="center">
                List Item Preview
              </Typography>
            </div>

            <ListItem key={99} className={classes.listItemSkeleton}>
              {formData.listType === "Image" && (
                <div className={classes.thumbnailContainer}>
                  {formData.image ? (
                    <img
                      src={URL.createObjectURL(formData.image)}
                      alt="Thumbnail"
                      className={classes.listThumbnailImage}
                    />
                  ) : (
                    <Skeleton variant="rect" width={100} height={60} />
                  )}
                </div>
              )}
              {formData.listType === "Icon" && (
                <React.Fragment>
                  {formData.icon ? (
                    <ListItemIcon>
                      <Icon
                        icon={formData.icon}
                        className={classes.defaultIcon}
                      />
                    </ListItemIcon>
                  ) : (
                    <Skeleton
                      variant="square"
                      width={35}
                      height={35}
                      style={{ marginRight: 18, marginLeft: 2 }}
                    />
                  )}
                </React.Fragment>
              )}

              <ListItemText
                primary={
                  formData.primary || (
                    <Skeleton
                      variant="text"
                      width={150}
                      height={20}
                      style={{ marginBottom: "0px" }}
                    />
                  )
                }
                secondary={
                  formData.secondary || (
                    <Skeleton variant="text" width={120} height={20} />
                  )
                }
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
        {listBodyFieldNames.map((field) => {
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
