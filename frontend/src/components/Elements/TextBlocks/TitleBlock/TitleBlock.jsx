import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Divider, Container, Fade } from "@material-ui/core";
import { FadeIntoViewPort } from "../../Animations/IntoView/FadeIntoViewPort/FadeIntoViewPort";

TitleBlock.defaultProps = {
  alignment: "left",
  showDivider: false,
};

const getAlignClass = (alignment) => {
  switch (alignment) {
    case "Left":
      return "Left";
    case "Right":
      return "Right";
    case "Center":
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
  console.log(alignment, "alignment");
  const alignClass = getAlignClass(alignment);

  return (
    <>
      <Container maxWidth="false">
        {subtitle && (
          <FadeIntoViewPort onScreenPercentage={0.1} animationDuration={1}>
            <Typography
              variant="subtitle1"
              color="secondary"
              className={[classes.subtitle, classes[`align${alignClass}`]].join(
                " "
              )}
            >
              {subtitle}
            </Typography>
          </FadeIntoViewPort>
        )}

        {title && (
          <FadeIntoViewPort onScreenPercentage={0.1} animationDuration={1.5}>
            <Typography
              variant="h2"
              component="h1"
              className={[classes.title, classes[`align${alignClass}`]].join(
                " "
              )}
            >
              {title}
            </Typography>
          </FadeIntoViewPort>
        )}
      </Container>

      {description && (
        <Container maxWidth="sm">
          <FadeIntoViewPort onScreenPercentage={0.1} animationDuration={2}>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
              className={[classes[`align${alignClass}`]].join(" ")}
            >
              {description}
            </Typography>
          </FadeIntoViewPort>
        </Container>
      )}

      {children}

      {showDivider && (
        <div style={{ width: "90%" }}>
          <Divider className={classes.divider} />
        </div>
      )}
    </>
  );
}

export default TitleBlock;
