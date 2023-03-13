import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import CallToActionIcon from "@mui/icons-material/CallToAction";
import StyledButton from "../../Buttons/StyledButton";
import { FaPhone, FaVoicemail } from "react-icons/fa";

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: "Poppins",
    [theme.breakpoints.up("md")]: {
      textAlign: "center",
    },
  },
  title: {
    fontFamily: "Poppins",
    fontWeight: 700,
    textTransform: "uppercase",
    marginBottom: theme.spacing(1),
    fontSize: "1.25rem",
    color: theme.palette.secondary.main,
  },
  btnContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  subheadline: {
    fontSize: "0.95rem",
    color: theme.palette.text.light,
    marginBottom: theme.spacing(3),
    textAlign: "center",
    [theme.breakpoints.down("xs")]: {
      marginBottom: theme.spacing(1.5),
    },
  },
  description: {
    maxWidth: 500,
    color: theme.palette.grey[500],
    marginBottom: theme.spacing(2),
    textAlign: "center",
  },
}));

const HeroBlock = ({ title, heading, text, btnText, showButton = true }) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} md={12} className={`${classes.root}`}>
      <Box className={classes.title}>{title}</Box>
      <Typography
        variant="h1"
        className={classes.subheadline}
        dangerouslySetInnerHTML={{ __html: heading }}
      />
      <Box className={classes.description}>{text}</Box>
      {showButton && (
        <div className={classes.btnContainer}>
          <Link to="/services">
            <StyledButton
              startIcon={<CallToActionIcon />}
              buttonText={btnText}
            />
          </Link>
        </div>
      )}
    </Grid>
  );
};

export default HeroBlock;
