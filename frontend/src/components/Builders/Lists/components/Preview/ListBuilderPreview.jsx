import React, { useState } from "react";
import {
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  ListItemIcon,
} from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import BaseContent from "../../../../Elements/Base/BaseContent";
import Icon from "../../../../Elements/Icon/Icon";
import { Skeleton } from "@material-ui/lab";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import ClearButton from "../../../Parts/Buttons/ClearButton";
import { listPreviewStyles } from "./listPreviewStyles";

const ListBuilderPreview = ({
  formData,
  listItems,
  setListItems,
  handleDelete,
  handleEdit,
  handleClearItems,
}) => {
  const classes = listPreviewStyles();
  const [draggedItemIndex, setDraggedItemIndex] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggedItemIndex(index);
  };

  const handleDragOver = (e, newIndex) => {
    e.preventDefault();

    const newDraggedRowIndex =
      newIndex !== draggedItemIndex ? newIndex : draggedItemIndex;
    setDraggedItemIndex(newDraggedRowIndex);

    if (newIndex !== draggedItemIndex) {
      const newListItems = [...listItems];
      const [draggedItem] = newListItems.splice(draggedItemIndex, 1);
      newListItems.splice(newIndex, 0, draggedItem);
      setListItems(
        newListItems.map((item, index) => ({
          ...item,
          order: index + 1,
        }))
      );
      setDraggedItemIndex(newIndex);
    }
  };

  const handleDragEnd = () => {
    setDraggedItemIndex(null);
  };

  return (
    <Grid
      item
      xs={12}
      md={4}
      xl={5}
      style={{
        paddingRight: 12,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <BaseContent pad={1}>
        <List dense className={classes.list}>
          <div
            style={{
              paddingTop: 16,
              width: "100%",
              paddingBottom: listItems.length > 0 ? 0 : 16,
            }}
          >
            <Typography variant="h3" align="center">
              List Preview
            </Typography>
            <Typography variant="h5" align="center" style={{ marginTop: 16 }}>
              {formData.listName || "List Name"}
            </Typography>
          </div>
          {listItems.length > 0 ? (
            <React.Fragment>
              {listItems.map((item, index) => (
                <React.Fragment>
                  <ListItem
                    className={classes.listItem}
                    key={index}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragEnd={handleDragEnd}
                    style={{
                      opacity: index === draggedItemIndex ? 0.4 : 1,
                      paddingLeft: 0,
                    }}
                  >
                    <div
                      draggable
                      onDragStart={(e) => handleDragStart(e, index)}
                      onDragOver={(e) => handleDragOver(e, index)}
                      onDragEnd={handleDragEnd}
                      className={classes.dragInner}
                    >
                      <DragIndicatorIcon />
                    </div>
                    {formData.listType === "Image" && (
                      <div className={classes.thumbnailContainer}>
                        {item.image ? (
                          <img
                            src={URL.createObjectURL(item.image)}
                            alt="Thumbnail"
                            className={classes.listThumbnailImage}
                          />
                        ) : (
                          <Skeleton
                            variant="rect"
                            width={100}
                            height={60}
                            animation={null}
                          />
                        )}
                      </div>
                    )}
                    {item.icon && formData.listType === "Icon" && (
                      <ListItemIcon>
                        <Icon
                          icon={item.icon}
                          className={classes.defaultIcon}
                        />
                      </ListItemIcon>
                    )}
                    <ListItemText
                      primary={item.primary}
                      secondary={item.secondary}
                      primaryTypographyProps={{
                        className: classes.listItemText,
                      }}
                      secondaryTypographyProps={{
                        className: classes.listItemText,
                        color: "textSecondary",
                      }}
                    />

                    <ListItemSecondaryAction>
                      <Typography
                        variant="body1"
                        component="span"
                        color="textSecondary"
                        className={classes.listItemText}
                        style={{ marginRight: 8, fontSize: "0.8rem" }}
                      >
                        Order: {item.order || "No Order"}
                      </Typography>
                      <IconButton
                        onClick={() => handleDelete(index)}
                        className={classes.deleteButton}
                        size="small"
                      >
                        <Delete />
                      </IconButton>
                      <IconButton
                        onClick={() => handleEdit(index)}
                        className={classes.editButton}
                        size="small"
                      >
                        <Edit />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                </React.Fragment>
              ))}
            </React.Fragment>
          ) : (
            <ListItem className={classes.listItemSkeleton}>
              <div className={classes.dragInnerSkeleton}>
                <DragIndicatorIcon />
              </div>
              {formData.listType === "Icon" && (
                <Skeleton
                  variant="square"
                  width={35}
                  height={35}
                  style={{ marginRight: 8 }}
                />
              )}
              {formData.listType === "Image" && (
                <Skeleton
                  variant="rect"
                  width={100}
                  height={60}
                  style={{ marginRight: 8 }}
                />
              )}
              <ListItemText
                primary={
                  <Skeleton
                    variant="text"
                    width={150}
                    height={20}
                    style={{ marginBottom: "0px" }}
                  />
                }
                secondary={<Skeleton variant="text" width={120} height={20} />}
              />
            </ListItem>
          )}
        </List>
        {listItems.length > 0 && (
          <div className={classes.addActions}>
            <ClearButton label="List" clearFunc={handleClearItems} />
          </div>
        )}
      </BaseContent>
    </Grid>
  );
};

export default ListBuilderPreview;
