import React from "react";
import { Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pageTitle: {
    paddingLeft: theme.spacing(2),
    fontWeight: 600,
  },
  editButton: {
    backgroundColor: theme.palette.background.default,
    borderRadius: 8,
    border: `1px solid ${theme.palette.primary.light}`,
    color: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      border: `1px solid ${theme.palette.primary.main}`,
      color: theme.palette.common.white,
      boxShadow: "none",
    },
  },
  tooltip: {
    fontFamily: "Roboto",
    fontSize: ".8rem",
    fontWeight: 600,
    backgroundColor: theme.palette.primary.main,
    borderRadius: "4px",
    padding: theme.spacing(1),
    color: theme.palette.primary.contrastText,
    minWidth: 65,
    textAlign: "center",
  },
  arrow: {
    color: theme.palette.primary.main,
  },
}));

const SEOEditMenu = ({
  placement = "bottom",
  editClick,
  finalColor = "primary",
}) => {
  const classes = useStyles();

  return (
    <Tooltip
      title="Edit Page SEO"
      classes={{
        tooltip: classes.tooltip,
        arrow: classes.arrow,
      }}
      arrow
      placement={placement}
    >
      <Button
        variant="contained"
        color="primary"
        className={classes.editButton}
        startIcon={<EditIcon style={{ color: finalColor }} />}
        onClick={editClick}
      >
        Edit Page SEO
      </Button>
    </Tooltip>
  );
};

export default SEOEditMenu;
