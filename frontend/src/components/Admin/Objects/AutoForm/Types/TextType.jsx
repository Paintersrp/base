import React from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import FormField from "../../../../Elements/Fields/FormField";
import QuillField from "../../../../Elements/Fields/QuillField";
import Container from "../../../../Elements/Layout/Container/Container";

const useStyles = makeStyles((theme) => ({
  helpText: {
    margin: theme.spacing(1, 0, 0.25, 0),
    padding: 0,
    color: theme.palette.text.secondary,
  },
}));

const TextType = ({
  formData,
  fieldName,
  verboseName,
  handleInputChange,
  handleQuillChange,
  xsColumnCount,
  mdColumnCount,
  markDownMixin,
  helpText,
}) => {
  console.log(markDownMixin);
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
        {markDownMixin === "false" || !markDownMixin ? (
          <Container justify="flex-start">
            <Typography className={classes.helpText}>
              {helpText || "Placeholder Help Text"}
            </Typography>
            <FormField
              id={fieldName}
              label={verboseName}
              onChange={handleInputChange}
              value={formData[fieldName]}
              multiline
            />
          </Container>
        ) : (
          <QuillField
            fieldName={fieldName}
            size="medium"
            value={formData[fieldName]}
            onChange={handleQuillChange}
          />
        )}
      </Grid>
    </>
  );
};

export default TextType;
