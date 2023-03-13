import React from "react";
import { Button, Grid, makeStyles } from "@material-ui/core";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SkipNextIcon from "@mui/icons-material/SkipNext";

const useStyles = makeStyles((theme) => ({
  buttonOne: {
    minWidth: 140,
    margin: theme.spacing(1),
    boxShadow: theme.shadows[3],
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderRadius: 50,
    transition: "0.3s",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: theme.shadows[7],
      backgroundColor: theme.palette.primary.dark,
    },
  },
  buttonTwo: {
    minWidth: 140,
    margin: theme.spacing(1),
    boxShadow: theme.shadows[3],
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderRadius: 50,
    transition: "0.3s",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: theme.shadows[7],
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

const NavigationButtons = ({
  onClickBtnOne,
  onClickBtnTwo,
  onClickBtnThree,
  disabledBtnOne = false,
  disabledBtnTwo = false,
  textBtnOne = "Previous",
  textBtnTwo = "Next",
  textBtnThree = "Skip Quiz",
}) => {
  const classes = useStyles();

  return (
    <>
      <Grid container flex justifyContent="center">
        <Button
          size="small"
          variant="contained"
          color="primary"
          startIcon={<ArrowBackIosNewIcon />}
          onClick={onClickBtnOne}
          disabled={disabledBtnOne}
          className={classes.buttonOne}
        >
          {textBtnOne}
        </Button>
        <Button
          size="small"
          variant="contained"
          color="primary"
          startIcon={<ArrowForwardIosIcon />}
          onClick={onClickBtnTwo}
          disabled={disabledBtnTwo}
          className={classes.buttonTwo}
        >
          {textBtnTwo}
        </Button>
      </Grid>
      <Grid container flex justifyContent="center">
        <Button
          size="small"
          variant="contained"
          color="primary"
          startIcon={<SkipNextIcon />}
          onClick={onClickBtnThree}
          className={classes.buttonOne}
        >
          {textBtnThree}
        </Button>
      </Grid>
    </>
  );
};

export default NavigationButtons;
