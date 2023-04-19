import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Grid, ListItemText } from "@material-ui/core";
import ClearButton from "../../Builders/Parts/Buttons/ClearButton";
import {
  handleClearErrors,
  handleClearNestedErrors,
} from "../../../utils/errorHandlers/errorHandlers";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    marginTop: 6,
    marginBottom: 6,
    display: "flex",
    justifyContent: "center",
  },
  listItemText: {
    wordBreak: "break-all",
  },
  errorItems: {
    padding: theme.spacing(1, 1),
  },
}));

const ErrorMessage = ({ errors, setErrors, clearFunc, nestedName = null }) => {
  const classes = useStyles();

  if (errors.length === 0) {
    return null;
  }

  return (
    <Grid container className={classes.root}>
      {errors.map((error, index) => (
        <Grid item key={index} className={classes.errorItems}>
          <Alert
            severity="error"
            action={
              // <ClearButton
              //   clearFunc={
              //     nestedName
              //       ? () => clearFunc(nestedName, index)
              //       : () => clearFunc(index)
              //   }
              //   skipConfirm
              // />
              <ClearButton
                clearFunc={
                  nestedName
                    ? () =>
                        handleClearNestedErrors(index, setErrors, nestedName)
                    : () => handleClearErrors(index, errors, setErrors)
                }
                skipConfirm
              />
            }
          >
            <AlertTitle>Error {index + 1}</AlertTitle>
            <ListItemText
              primary={error}
              primaryTypographyProps={{
                variant: "body2",
                className: classes.listItemText,
              }}
            />
          </Alert>
        </Grid>
      ))}
    </Grid>
  );
};

ErrorMessage.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ErrorMessage;
