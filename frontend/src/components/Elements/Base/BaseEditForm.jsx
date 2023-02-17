import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormField from "../Fields/FormField";
import UpdateButton from "../Buttons/UpdateButton";

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    backgroundColor: "#FFFFFF",
    padding: theme.spacing(3),
    borderRadius: 10,
    boxShadow: theme.shadows[1],
    margin: "0 auto",
  },
  formTitle: {
    fontWeight: "bold",
    marginBottom: theme.spacing(1.5),
    textAlign: "center",
    color: theme.palette.text.dark,
  },
  formSubtitle: {
    marginBottom: theme.spacing(1.5),
    textAlign: "center",
    fontSize: "0.85rem",
    color: theme.palette.text.dark,
  },
  formField: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "black",
      },
      "&:hover fieldset": {
        borderColor: "black",
      },
      "&.Mui-focused fieldset": {
        borderColor: "black",
      },
    },
    "& .MuiFormLabel-root": {
      color: "black",
      fontWeight: "500",
      fontSize: "0.9rem",
    },
    "& input": {
      color: "black",
    },
  },
  formButton: {
    marginTop: theme.spacing(1),
    fontWeight: "bold",
    borderRadius: 50,
  },
  fadeIn: {
    opacity: 0,
    animation: `$fadeIn 0.5s ease-in-out forwards`,
  },
  "@keyframes fadeIn": {
    from: {
      opacity: 0,
      transform: "translateY(-30px)",
    },
    to: {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
}));

function BaseEditForm({
  title,
  handleSubmit,
  handleChange,
  formData,
  width = "100%",
  excludeKeys = [],
  multilineKeys = [],
}) {
  const classes = useStyles();

  return (
    <Grid item xs={12} className={classes.fadeIn}>
      <div className={classes.form} style={{ width: width }}>
        {title ? (
          <Typography variant="h4" className={classes.formTitle}>
            {title}
          </Typography>
        ) : null}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={0}>
            {Object.keys(formData).map((key) => {
              if (!excludeKeys.includes(key)) {
                return (
                  <FormField
                    key={key}
                    id={key}
                    label={key.charAt(0).toUpperCase() + key.slice(1)}
                    value={formData[key]}
                    onChange={handleChange}
                    multiline={multilineKeys.includes(key)}
                  />
                );
              }
            })}
          </Grid>
          <UpdateButton />
        </form>
      </div>
    </Grid>
  );
}

BaseEditForm.propTypes = {
  title: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  width: PropTypes.string,
  excludeKeys: PropTypes.arrayOf(PropTypes.string),
  multilineKeys: PropTypes.arrayOf(PropTypes.string),
};

BaseEditForm.defaultProps = {
  width: "100%",
  excludeKeys: [],
  multilineKeys: [],
};

export default BaseEditForm;
