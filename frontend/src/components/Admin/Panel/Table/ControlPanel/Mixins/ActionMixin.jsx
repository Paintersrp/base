import React, { useState } from "react";
import { FormControl, Select, MenuItem, makeStyles } from "@material-ui/core";
import StyledButton from "../../../../../Elements/Buttons/StyledButton";
import DeleteConfirmationModal from "../../../../../Elements/Modals/DeleteConfirmationModal";
import Container from "../../../../../Elements/Layout/Container/Container";
import Item from "../../../../../Elements/Layout/Item/Item";

const useStyles = makeStyles((theme) => ({
  select: {
    width: "100%",
    marginTop: 4,
    height: "40px",
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
}));

const ActionMixin = ({
  keys,
  selectedAction,
  handleActionSelect,
  selectedItems,
  handleMultipleDelete,
  handleMultipleItemActions,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleConfirmDelete = () => {
    handleClose();
    const selectedIds = selectedItems.map((item) => item);
    handleMultipleDelete(selectedIds);
  };

  const handleMultipleActions = (field, booleanValue) => {
    handleMultipleItemActions(field, booleanValue);
  };

  const handleDelete = () => {
    handleOpen();
  };

  const handlePerformAction = () => {
    if (selectedAction === "delete-selected") {
      handleDelete();
    }
    if (selectedAction === "update-read-true") {
      handleMultipleActions("is_read", true);
    }
    if (selectedAction === "update-read-false") {
      handleMultipleActions("is_read", false);
    }
    if (selectedAction === "update-archived-true") {
      handleMultipleActions("is_archived", true);
    }
    if (selectedAction === "update-archived-false") {
      handleMultipleActions("is_archived", false);
    }
  };

  return (
    <Item xs={12} sm={6}>
      <Container justify="flex-start">
        <Item xs={9} md={6}>
          <FormControl style={{ width: "100%", height: "100%" }}>
            <Select
              className={classes.select}
              variant="outlined"
              displayEmpty
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
                    marginTop: 4,
                    maxHeight: 300,
                  },
                },
              }}
              value={selectedAction}
              onChange={handleActionSelect}
            >
              <MenuItem value="delete-selected">Delete Selected</MenuItem>
              {keys.includes("is_read") && [
                <MenuItem key="update-read-true" value="update-read-true">
                  Set Selected - Read
                </MenuItem>,
                <MenuItem key="update-read-false" value="update-read-false">
                  Set Selected - Unread
                </MenuItem>,
              ]}
              {keys.includes("is_archived") && [
                <MenuItem
                  key="update-archived-true"
                  value="update-archived-true"
                >
                  Set Selected - Archived
                </MenuItem>,
                <MenuItem
                  key="update-archived-false"
                  value="update-archived-false"
                >
                  Set Selected - Unarchived
                </MenuItem>,
              ]}
            </Select>
          </FormControl>
        </Item>
        <Item
          xs={2}
          style={{
            alignItems: "center",
            display: "flex",
            height: "100%",
          }}
        >
          {selectedAction.length > 0 && selectedItems.length > 0 ? (
            <StyledButton
              noHover
              buttonText="GO"
              variant="contained"
              color="primary"
              minWidth={50}
              onClick={handlePerformAction}
              borderRadius={2}
            />
          ) : (
            <StyledButton
              noHover
              buttonText="GO"
              variant="contained"
              color="primary"
              onClick={handlePerformAction}
              minWidth={50}
              borderRadius={2}
              disabled
            />
          )}
        </Item>
        <DeleteConfirmationModal
          open={open}
          handleClose={handleClose}
          handleConfirmDelete={handleConfirmDelete}
          message={"Are you sure you want to delete these items?"}
        />
      </Container>
    </Item>
  );
};

export default ActionMixin;
