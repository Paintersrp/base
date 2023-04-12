import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Divider, Grid, Container } from "@material-ui/core";
import BaseContent from "../../../Elements/Base/BaseContent";
import FormField from "../../../Elements/Fields/FormField";
import AddButton from "../../Parts/Buttons/AddButton";
import ErrorMessage from "../../../Elements/Errors/ErrorMessage";
import ClearButton from "../../Parts/Buttons/ClearButton";

const useStyles = makeStyles((theme) => ({
  subheader: {
    marginBottom: theme.spacing(1.5),
    textAlign: "center",
    color: theme.palette.text.dark,
  },
  helpText: {
    margin: theme.spacing(1, 0, 0.5, 0),
    padding: 0,
    color: theme.palette.text.secondary,
  },
  addActions: {
    display: "flex",
    padding: "0px 4px 8px 4px",
    alignItems: "flex-end",
    justifyContent: "center",
    width: "100%",
  },
}));

const faqFieldNames = [
  { name: "name", label: "FAQ Set Name*", type: "text", md: 8 },
  {
    name: "description",
    label: "FAQ Description*",
    type: "text",
    md: 8,
    multiline: true,
  },
];

const fieldNames = [
  { name: "category", label: "Question Set Category*", type: "text", md: 6 },
  { name: "order", label: "Question Set Order*", type: "text", md: 6 },
  {
    name: "question",
    label: "Question Text*",
    type: "text",
    md: 6,
    multiline: true,
  },
  {
    name: "answer",
    label: "Answer Text*",
    type: "number",
    md: 6,
    multiline: true,
  },
];

const FAQBuilderForm = ({
  formData,
  handleChange,
  handleClear,
  handleClearFAQ,
  handleAddFAQ,
  errors,
  handleClearErrors,
}) => {
  const classes = useStyles();

  return (
    <BaseContent
      header="FAQ Builder"
      subheader="FAQ Settings"
      justifyChildren="center"
    >
      <div style={{ marginTop: 0, marginBottom: 16, width: "100%" }}>
        <Divider />
      </div>

      {faqFieldNames.map((field) => {
        return (
          <Grid
            item
            xs={12}
            md={field.md}
            style={{ paddingRight: 12, width: "100%" }}
          >
            <Container
              justify="flex-start"
              style={{ width: "100%", padding: 0 }}
            >
              <Typography className={classes.helpText}>
                {field.label}
              </Typography>
              <FormField
                required
                multiline={field.multiline}
                id={field.name}
                onChange={handleChange}
                value={formData[field.name]}
                minRows={4}
              />
            </Container>
          </Grid>
        );
      })}
      <div style={{ marginBottom: 0, marginTop: 0, width: "65%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
          }}
        >
          <ClearButton
            clearFunc={handleClearFAQ}
            disabled={!formData.name && !formData.description}
          />
        </div>
      </div>

      <div style={{ marginTop: 32, marginBottom: 0, width: "100%" }}>
        <Typography variant="body2" className={classes.subheader}>
          Question Set Item
        </Typography>
      </div>
      <div style={{ marginTop: 0, marginBottom: 16, width: "100%" }}>
        <Divider />
      </div>
      {fieldNames.map((field) => {
        return (
          <Grid
            item
            xs={12}
            md={field.md}
            style={{ paddingRight: 12, width: "100%" }}
          >
            <Container
              justify="flex-start"
              style={{ width: "100%", padding: 0 }}
            >
              <Typography className={classes.helpText}>
                {field.label}
              </Typography>
              <FormField
                required
                multiline={field.multiline}
                id={field.name}
                onChange={handleChange}
                value={formData[field.name]}
                minRows={4}
              />
            </Container>
          </Grid>
        );
      })}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
        }}
      >
        <ClearButton
          clearFunc={handleClear}
          disabled={
            !formData.question &&
            !formData.answer &&
            !formData.category &&
            !formData.order
          }
        />
      </div>
      <div style={{ marginBottom: 0, marginTop: 16, width: "100%" }}>
        <div className={classes.addActions}>
          <AddButton label="Item to FAQ" addFunc={handleAddFAQ} />
        </div>
      </div>
      {errors && (
        <div style={{ marginBottom: 24 }}>
          <ErrorMessage errors={errors} clearFunc={handleClearErrors} />
        </div>
      )}
    </BaseContent>
  );
};

export default FAQBuilderForm;
