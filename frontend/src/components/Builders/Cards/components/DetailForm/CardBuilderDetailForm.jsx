import React from "react";
import { Grid, MenuItem } from "@material-ui/core";
import ErrorMessage from "../../../../Elements/Errors/ErrorMessage";
import HelpText from "../../../Parts/Text/HelpText";
import FormField from "../../../../Elements/Fields/FormField";
import BasicSelect from "../../../../Elements/Fields/BasicSelect";
import { cardBuilderStyles } from "../../cardBuilderStyles";

const CardBuilderDetailForm = ({
  formData,
  handleChange,
  errors,
  setErrors,
}) => {
  const classes = cardBuilderStyles();

  return (
    <Grid container spacing={0} style={{ marginBottom: 24 }}>
      <Grid item xs={12}>
        <div className={classes.tableActions}>
          <Grid container className={classes.saveActions} spacing={2}>
            <Grid item xs={12} md={6} lg={6} xl={5}>
              <HelpText>Card Name*</HelpText>
              <FormField
                required
                fullWidth
                id="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6} xl={5}>
              <HelpText>Card Type*</HelpText>
              <BasicSelect
                name="cardType"
                value={formData.cardType}
                onChange={handleChange}
              >
                <MenuItem value="" disabled>
                  <em>Select Type</em>
                </MenuItem>
                <MenuItem value="Tile">Tile</MenuItem>
                <MenuItem value="Standard">Standard</MenuItem>
                <MenuItem value="Dense">Dense</MenuItem>
                {/* <MenuItem value="Large">Large</MenuItem> */}
              </BasicSelect>
            </Grid>

            <Grid item xs={12} md={10} lg={10} xl={10}>
              <HelpText>Card Description</HelpText>
              <FormField
                required
                multiline
                minRows={3}
                id="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </div>{" "}
        {errors && (
          <div style={{ marginBottom: 0 }}>
            <ErrorMessage errors={errors} setErrors={setErrors} />
          </div>
        )}
      </Grid>
    </Grid>
  );
};

export default CardBuilderDetailForm;
