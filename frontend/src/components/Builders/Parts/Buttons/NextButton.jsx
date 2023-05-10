import React from "react";
import { IconButton, makeStyles, Tooltip } from "@material-ui/core";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const useStyles = makeStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.text.secondary,
    color: "#ffffff",
    fontSize: "12px",
  },
  button: {
    color: "#42a5f5",
    marginLeft: 4,
    "&:hover": {
      backgroundColor: "#42a5f5",
      color: theme.palette.background.default,
    },
    "&:disabled": {
      color: "rgba(255, 255, 255, 0.25)",
    },
  },
}));

export default function NextPrevButtons({
  prevFunc,
  nextFunc,
  prevDisabled = false,
  nextDisabled = false,
}) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Tooltip
        title="Previous"
        placement="top"
        classes={{ tooltip: classes.tooltip }}
      >
        <IconButton
          className={classes.button}
          size="medium"
          onClick={prevFunc}
          disabled={prevDisabled}
          style={{ marginRight: 4 }}
        >
          <ArrowBackIosNewIcon style={{ fontSize: "1.25rem" }} />
        </IconButton>
      </Tooltip>
      <Tooltip
        title="Next"
        placement="top"
        classes={{ tooltip: classes.tooltip }}
      >
        <IconButton
          className={classes.button}
          size="medium"
          onClick={nextFunc}
          disabled={nextDisabled}
          style={{ marginLeft: 4 }}
        >
          <ArrowForwardIosIcon style={{ fontSize: "1.25rem" }} />
        </IconButton>
      </Tooltip>
    </React.Fragment>
  );
}
