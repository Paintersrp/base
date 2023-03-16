import React from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import FormField from "../../../../Elements/Fields/FormField";
import IconSelectMixin from "../../../../Elements/Base/EditForm/IconSelectMixin";
import Container from "../../../../Elements/Layout/Container/Container";

const useStyles = makeStyles((theme) => ({
  helpText: {
    margin: theme.spacing(1, 0, 0, 0),
    padding: 0,
    color: theme.palette.text.secondary,
  },
}));

const CharType = ({
  formData,
  fieldName,
  verboseName,
  handleInputChange,
  xsColumnCount,
  mdColumnCount,
  helpText,
  modelMetadata,
}) => {
  const classes = useStyles();
  return (
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
      {fieldName.includes("icon") ? (
        <div style={{ marginTop: 8, width: "100%" }}>
          <IconSelectMixin
            fieldName={fieldName}
            formData={formData}
            handleChange={handleInputChange}
            background="#F5F5F5"
          />
        </div>
      ) : (
        <Container justify="flex-start">
          <Typography className={classes.helpText}>
            {helpText ? helpText : "\u00A0"}
          </Typography>
          <FormField
            id={fieldName}
            label={verboseName}
            onChange={handleInputChange}
            value={formData[fieldName]}
            // helperText={helpText}
            classes={{ helperText: classes.helperText }}
          />
        </Container>
      )}
    </Grid>
  );
};

export default CharType;
