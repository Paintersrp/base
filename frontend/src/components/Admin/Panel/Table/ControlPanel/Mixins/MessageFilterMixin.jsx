import React from "react";
import { Box, Button, Grid, makeStyles, Tooltip } from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { CheckCircleOutline, RadioButtonUnchecked } from "@material-ui/icons";
import StyledButton from "../../../../../Elements/Buttons/StyledButton";

const useStyles = makeStyles((theme) => ({
  filterButton: {
    minWidth: 130,
    borderRadius: "20px",
    color: "#4A4A4A",
    border: "1px solid #E0E0E0",
    background: "#F5F5F5",
    "&:hover": {
      background: "#E0E0E0",
    },
    "&$active": {
      background: "#0A66C2",
      color: "#FFFFFF",
      "&:hover": {
        background: "#0B5EA6",
      },
    },
  },
  active: {},
  resetButton: {
    borderRadius: "20px",
    boxShadow: "none",
    color: "#FFFFFF",
    background: theme.palette.primary.main,
    "&:hover": {
      background: "#0B5EA6",
    },
  },
  toggleButtonGroup: {
    display: "flex",
    flexDirection: "row",
    marginRight: theme.spacing(1),
  },
  toggleButtonLabel: {
    fontSize: "0.75rem",
    fontWeight: "bold",
    marginLeft: theme.spacing(1),
  },
  checked: {
    color: theme.palette.success.main,
  },
  unchecked: {
    color: theme.palette.error.main,
  },
  tooltip: {
    backgroundColor: theme.palette.text.secondary,
    color: "#ffffff",
    fontSize: "12px",
  },
}));

const MessageFilterMixin = ({
  isReadFilter,
  setIsReadFilter,
  isArchivedFilter,
  setIsArchivedFilter,
  handleClearFilters,
}) => {
  const classes = useStyles();

  const handleReadFilterChange = (event, value) => {
    setIsReadFilter(
      value === "read" ? true : value === "unread" ? false : null
    );
  };

  const handleArchivedFilterChange = (event, value) => {
    setIsArchivedFilter(
      value === "archived" ? true : value === "unarchived" ? false : null
    );
  };

  return (
    <Grid
      container
      style={{ display: "flex", flexDirection: "row", marginTop: 8 }}
      spacing={0}
    >
      <ToggleButtonGroup
        value={
          isReadFilter === true
            ? "read"
            : isReadFilter === false
            ? "unread"
            : null
        }
        exclusive
        size="small"
        onChange={handleReadFilterChange}
        className={classes.toggleButtonGroup}
      >
        <Tooltip
          title={`Show Read Only`}
          placement="bottom"
          classes={{ tooltip: classes.tooltip }}
        >
          <ToggleButton
            value="read"
            className={classes.filterButton}
            classes={{ selected: classes.active }}
          >
            {isReadFilter === true ? (
              <CheckCircleOutline className={classes.checked} />
            ) : (
              <RadioButtonUnchecked className={classes.unchecked} />
            )}
            <span className={classes.toggleButtonLabel}>Read</span>
          </ToggleButton>
        </Tooltip>
        <Tooltip
          title={`Show Unread Only`}
          placement="bottom"
          classes={{ tooltip: classes.tooltip }}
        >
          <ToggleButton
            value="unread"
            className={classes.filterButton}
            classes={{ selected: classes.active }}
          >
            {isReadFilter === false ? (
              <CheckCircleOutline className={classes.checked} />
            ) : (
              <RadioButtonUnchecked className={classes.unchecked} />
            )}
            <span className={classes.toggleButtonLabel}>Unread</span>
          </ToggleButton>
        </Tooltip>
      </ToggleButtonGroup>
      <ToggleButtonGroup
        size="small"
        value={
          isArchivedFilter === true
            ? "archived"
            : isArchivedFilter === false
            ? "unarchived"
            : null
        }
        exclusive
        onChange={handleArchivedFilterChange}
        className={classes.toggleButtonGroup}
      >
        <Tooltip
          title={`Show Archived Only`}
          placement="bottom"
          classes={{ tooltip: classes.tooltip }}
        >
          <ToggleButton
            value="archived"
            className={classes.filterButton}
            classes={{ selected: classes.active }}
          >
            {isArchivedFilter === true ? (
              <CheckCircleOutline className={classes.checked} />
            ) : (
              <RadioButtonUnchecked className={classes.unchecked} />
            )}
            <span className={classes.toggleButtonLabel}>Archived</span>
          </ToggleButton>
        </Tooltip>
        <Tooltip
          title={`Show Unarchived Only`}
          placement="bottom"
          classes={{ tooltip: classes.tooltip }}
        >
          <ToggleButton
            value="unarchived"
            className={classes.filterButton}
            classes={{ selected: classes.active }}
          >
            {isArchivedFilter === false ? (
              <CheckCircleOutline className={classes.checked} />
            ) : (
              <RadioButtonUnchecked className={classes.unchecked} />
            )}
            <span className={classes.toggleButtonLabel}>Unarchived</span>
          </ToggleButton>
        </Tooltip>
      </ToggleButtonGroup>

      <Tooltip
        title={`Reset Filters`}
        placement="bottom"
        classes={{ tooltip: classes.tooltip }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <StyledButton
            buttonText={"Reset"}
            minWidth={0}
            size="small"
            variant="contained"
            onClick={handleClearFilters}
            disabled={isArchivedFilter === null && isReadFilter === null}
          />
        </div>
      </Tooltip>
    </Grid>
  );
};

export default MessageFilterMixin;
