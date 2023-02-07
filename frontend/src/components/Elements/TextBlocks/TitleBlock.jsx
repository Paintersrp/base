import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Divider } from "@material-ui/core";

TitleBlock.defaultProps = {
  alignment: "Left",
  showDivider: true,
};

const getAlignClass = (alignment) => {
  switch (alignment) {
    case "Left":
      return "alignLeft";
    case "Right":
      return "alignRight";
    case "Center":
      return "alignCenter";
    default:
      return "alignLeft";
  }
};

const useStyles = makeStyles((theme) => ({
  description: {
    marginBottom: theme.spacing(2),
    fontSize: "0.95rem",
    fontWeight: 400,
    fontFamily: "Roboto",
    letterSpacing: 0.25,
    color: "white",
  },
  title: {
    fontFamily: "Poppins",
    textAlign: "center",
    color: "white",
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
    color: "gold",
    marginBottom: theme.spacing(0.5),
  },
  divider: {
    backgroundColor: "white",
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
          className={[classes.subtitle, classes[`align${alignment}`]].join(" ")}
        >
          {subtitle}
        </Typography>
      )}

      {title && (
        <Typography
          variant="h2"
          className={[classes.title, classes[`align${alignment}`]].join(" ")}
        >
          {title}
        </Typography>
      )}

      {description && (
        <Typography
          variant="body1"
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
