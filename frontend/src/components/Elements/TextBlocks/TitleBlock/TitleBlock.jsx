import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Divider } from "@material-ui/core";

TitleBlock.defaultProps = {
  alignment: "left",
  showDivider: false,
};

const getAlignClass = (alignment) => {
  switch (alignment) {
    case "left":
      return "Left";
    case "right":
      return "Right";
    case "center":
      return "Center";
    default:
      return "Left";
  }
};

const useStyles = makeStyles((theme) => ({
  description: {
    marginBottom: theme.spacing(2),
    fontSize: "0.95rem",
    fontWeight: 400,
    fontFamily: "Roboto",
    letterSpacing: 0.25,
    color: theme.palette.text.dark,
  },
  title: {
    fontFamily: "Poppins",
    textAlign: "center",
    color: theme.palette.text.dark,
    fontWeight: 700,
    fontSize: "2.1rem",
    border: 0,
    marginBottom: theme.spacing(1),
  },
  subtitle: {
    fontSize: "0.85rem",
    fontWeight: 700,
    fontFamily: "Poppins",
    textAlign: "center",
    color: theme.palette.secondary.main,
    marginBottom: theme.spacing(0.5),
  },
  divider: {
    backgroundColor: theme.palette.primary.main,
  },
  alignLeft: {
    textAlign: "left",
  },
  alignRight: {
    textAlign: "right",
  },
  alignCenter: {
    textAlign: "center",
  },
}));

function TitleBlock({
  subtitle,
  title,
  description,
  alignment,
  children,
  showDivider = true,
}) {
  const classes = useStyles();
  const alignClass = getAlignClass(alignment);

  return (
    <>
      {subtitle && (
        <Typography
          variant="subtitle1"
          color="secondary"
          className={[classes.subtitle, classes[`align${alignClass}`]].join(
            " "
          )}
        >
          {subtitle}
        </Typography>
      )}

      {title && (
        <Typography
          variant="h2"
          component="h1"
          className={[classes.title, classes[`align${alignClass}`]].join(" ")}
        >
          {title}
        </Typography>
      )}

      {description && (
        <Typography
          variant="body1"
          color="textPrimary"
          className={[classes.description, classes[`align${alignment}`]].join(
            " "
          )}
        >
          {description}
        </Typography>
      )}

      {children}

      {showDivider && <Divider className={classes.divider} />}
    </>
  );
}

export default TitleBlock;
