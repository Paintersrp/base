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
    [theme.breakpoints.down("sm")]: {},
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

    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      borderLeft: "1px solid #E0E0E0",
    },
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

const ApplicationFilterMixin = ({
  statusFilter,
  setStatusFilter,
  handleClearFilters,
}) => {
  const classes = useStyles();

  const handleStatusFilterChange = (event, value) => {
    setStatusFilter(value);
    console.log(value);
  };

  return (
    <Grid
      container
      style={{ display: "flex", flexDirection: "row", marginTop: 8 }}
      spacing={0}
    >
      <ToggleButtonGroup
        value={statusFilter}
        exclusive
        size="small"
        onChange={handleStatusFilterChange}
        className={classes.toggleButtonGroup}
      >
        <Tooltip
          title={`Show Pending Only`}
          placement="bottom"
          classes={{ tooltip: classes.tooltip }}
        >
          <ToggleButton
            value="Pending"
            className={classes.filterButton}
            classes={{ selected: classes.active }}
          >
            {statusFilter === "Pending" ? (
              <CheckCircleOutline className={classes.checked} />
            ) : (
              <RadioButtonUnchecked className={classes.unchecked} />
            )}
            <span className={classes.toggleButtonLabel}>Pending</span>
          </ToggleButton>
        </Tooltip>
        <Tooltip
          title={`Show Accepted Only`}
          placement="bottom"
          classes={{ tooltip: classes.tooltip }}
        >
          <ToggleButton
            value="Accepted"
            className={classes.filterButton}
            classes={{ selected: classes.active }}
          >
            {statusFilter === "Accepted" ? (
              <CheckCircleOutline className={classes.checked} />
            ) : (
              <RadioButtonUnchecked className={classes.unchecked} />
            )}
            <span className={classes.toggleButtonLabel}>Accepted</span>
          </ToggleButton>
        </Tooltip>
        <Tooltip
          title={`Show Rejected Only`}
          placement="bottom"
          classes={{ tooltip: classes.tooltip }}
        >
          <ToggleButton
            value="Rejected"
            className={classes.filterButton}
            classes={{ selected: classes.active }}
          >
            {statusFilter === "Rejected" ? (
              <CheckCircleOutline className={classes.checked} />
            ) : (
              <RadioButtonUnchecked className={classes.unchecked} />
            )}
            <span className={classes.toggleButtonLabel}>Rejected</span>
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
            disabled={statusFilter === null}
          />
        </div>
      </Tooltip>
    </Grid>
  );
};

export default ApplicationFilterMixin;
