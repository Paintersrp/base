import React, { useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  makeStyles,
  FormControlLabel,
  Typography,
  Grid,
} from "@material-ui/core";
import StyledButton from "../../Elements/Buttons/StyledButton";
import DeleteConfirmationModal from "../../Elements/Modals/DeleteConfirmationModal";

const useStyles = makeStyles((theme) => ({
  select: {
    width: "100%",
    height: "100%",
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

const ActionSelection = ({
  selectedAction,
  handleActionSelect,
  selectedItems,
  handleMultipleDelete,
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
    const selectedIds = selectedItems.map((item) => item.id);
    handleMultipleDelete(selectedIds);
  };

  const handleDelete = () => {
    handleOpen();
  };

  const handlePerformAction = () => {
    if (selectedAction === "delete-selected") {
      handleDelete();
    }
  };

  return (
    <>
      <Grid item xs={3}>
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
                  maxHeight: 300,
                },
              },
            }}
            value={selectedAction}
            onChange={handleActionSelect}
          >
            <MenuItem value="delete-selected">Delete Selected</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid
        item
        xs={2}
        style={{ alignItems: "center", display: "flex", marginLeft: 8 }}
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
      </Grid>
      <DeleteConfirmationModal
        open={open}
        handleClose={handleClose}
        handleConfirmDelete={handleConfirmDelete}
        message={"Are you sure you want to delete these items?"}
      />
    </>
  );
};

export default ActionSelection;
