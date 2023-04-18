import React from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  IconButton,
  makeStyles,
  MenuItem,
  Select,
  Tooltip,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  previewButton: {
    color: theme.palette.info.light,
    "&:hover": {
      backgroundColor: theme.palette.info.light,
      color: theme.palette.common.white,
    },
  },
  select: {
    width: "50%",
    maxHeight: "60px",
    overflow: "auto",
    background: "#F5F5F5",
    color: theme.palette.text.dark,
    "& .MuiSelect-icon": {
      color: theme.palette.text.dark,
    },
    "& .MuiOutlinedInput-input": {
      color: theme.palette.text.dark,
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "1px solid #222 !important",
    },
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
    margin: theme.spacing(1, 0, 0.5, 0),
    padding: 0,
    color: theme.palette.text.secondary,
  },
  tooltip: {
    backgroundColor: theme.palette.text.secondary,
    color: "#ffffff",
    fontSize: "12px",
  },
}));

export default function ExampleSwitchMenu({
  showExample,
  handleShowExample,
  selectedOption,
  handleOptionSelect,
  layoutOptions,
}) {
  const classes = useStyles();

  return (
    <React.Fragment>
      {showExample ? (
        <div
          style={{
            width: "100%",
            justifyContent: "space-between",
            display: "flex",
            marginTop: 8,
            marginBottom: 16,
          }}
        >
          <div style={{ width: "100%" }}>
            <Typography className={classes.helpText}>Layout</Typography>
            <Select
              margin="dense"
              onChange={handleOptionSelect}
              value={selectedOption}
              displayEmpty
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
              {layoutOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div>
            <Tooltip
              title="Hide Example"
              placement="bottom"
              classes={{ tooltip: classes.tooltip }}
            >
              <IconButton
                onClick={() => handleShowExample()}
                className={classes.previewButton}
                size="small"
              >
                <VisibilityOffIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            justifyContent: "flex-end",
            display: "flex",
            marginTop: 8,
          }}
        >
          <Tooltip
            title="Show Example"
            placement="bottom"
            classes={{ tooltip: classes.tooltip }}
          >
            <IconButton
              onClick={() => handleShowExample()}
              className={classes.previewButton}
              size="small"
            >
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
        </div>
      )}
    </React.Fragment>
  );
}
