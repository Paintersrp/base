import React from "react";
import { Container, Grid, makeStyles, Typography } from "@material-ui/core";
import FormField from "../../../../Elements/Fields/FormField";

const useStyles = makeStyles((theme) => ({
  helpText: {
    margin: theme.spacing(1, 0, 0.5, 0),
    padding: 0,
    color: theme.palette.text.secondary,
  },
}));

const FieldType = ({
  formData,
  fieldName,
  verboseName,
  handleInputChange,
  xsColumnCount,
  mdColumnCount,
  helpText,
}) => {
  const classes = useStyles();
  return (
    <>
      <Grid
        item
        xs={xsColumnCount}
        md={mdColumnCount}
        style={{
          display: "flex",
          justifyContent: "center",
          paddingRight: 8,
          paddingLeft: 8,
        }}
      >
        <div
          style={{ display: "flex", width: "100%", flexDirection: "column" }}
        >
          <Typography className={classes.helpText}>
            {helpText || verboseName}
          </Typography>
          <FormField
            id={fieldName}
            // label={verboseName}
            onChange={handleInputChange}
            value={formData[fieldName]}
          />
        </div>
      </Grid>
    </>
  );
};

export default FieldType;
