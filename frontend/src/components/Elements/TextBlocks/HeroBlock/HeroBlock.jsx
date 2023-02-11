import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, Grid, Typography, withStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

const CustomButton = withStyles({
  label: {
    fontWeight: "700 !important",
    fontFamily: "Poppins !important",
    fontSize: "0.85rem !important",
  },
})(Button);

const useStyles = makeStyles((theme) => ({
  title: {
    fontFamily: "Poppins",
    fontWeight: 700,
    textTransform: "uppercase",
    marginBottom: theme.spacing(1),
    fontSize: "1.25rem",
    color: theme.palette.secondary.main,
  },
  heading: {
    fontFamily: "Poppins",
    color: theme.palette.text.dark,
    marginBottom: theme.spacing(0),
    fontSize: "2rem",
    [theme.breakpoints.down("md")]: {
      fontSize: "1.5rem",
    },
  },
  text: {
    fontFamily: "Poppins",
    fontSize: "1rem",
    color: theme.palette.grey[600],
    paddingBottom: 40,
    paddingTop: 10,
    [theme.breakpoints.down("md")]: {
      fontSize: "1rem",
    },
  },
  gridItemLeft: {
    fontFamily: "Poppins",
    [theme.breakpoints.up("md")]: {
      textAlign: "center",
    },
  },
  btnCta: {
    minWidth: 140,
    boxShadow: theme.shadows[3],
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.light,
    "&:hover": {
      transform: "scale(1.02)",
      boxShadow: theme.shadows[7],
      backgroundColor: theme.palette.action.hover,
    },
  },
  btnContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
  },
}));

const HeroBlock = ({
  title,
  heading,
  text,
  btnText,
  btnLink,
  showButton = true,
}) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} md={12} className={classes.gridItemLeft}>
      <Box className={classes.title}>{title}</Box>
      <Typography
        variant="h1"
        className={classes.heading}
        dangerouslySetInnerHTML={{ __html: heading }}
      />
      <Box className={classes.text}>{text}</Box>
      {showButton && (
        <div className={classes.btnContainer}>
          <CustomButton
            component={Link}
            to={btnLink}
            variant="contained"
            className={classes.btnCta}
          >
            {btnText}
          </CustomButton>
        </div>
      )}
    </Grid>
  );
};

export default HeroBlock;
