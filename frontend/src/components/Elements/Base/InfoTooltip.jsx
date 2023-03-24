import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Tooltip } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";

const useStyles = makeStyles((theme) => ({
  iconButton: {
    "&:hover": {
      backgroundColor: theme.palette.info.main,
    },
    "& .MuiIconButton-label": {
      transition: "color 0.3s",
      color: theme.palette.info.main,
    },
    "&:hover .MuiIconButton-label": {
      color: theme.palette.common.white,
    },
    borderRadius: "50%",
    padding: 0,
    height: theme.spacing(4),
    width: theme.spacing(4),
  },
  tooltip: {
    color: theme.palette.text.secondary,
    fontSize: 14,
    maxWidth: 225,
    padding: theme.spacing(1, 0.5, 1, 0.5),
    textAlign: "left",
    whiteSpace: "pre-line",
    lineHeight: 1.5,
  },
  tooltipRoot: {
    marginTop: 6,
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.spacing(1),
    boxShadow: theme.shadows[2],
  },
}));

const InfoTooltip = ({ text, placement = "bottom" }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <Tooltip
        open={open}
        title={
          <div className={classes.tooltip}>
            {text.split("\n").map((item, key) => (
              <React.Fragment key={key}>
                {item}
                <br />
              </React.Fragment>
            ))}
          </div>
        }
        classes={{
          tooltip: classes.tooltipRoot,
        }}
        placement={placement}
      >
        <IconButton className={classes.iconButton} onClick={handleToggle}>
          <InfoIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default InfoTooltip;
