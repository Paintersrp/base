import React, { useState } from "react";
import { Grid, MenuItem } from "@material-ui/core";

import BasicSelect from "../../../../Elements/Fields/BasicSelect";
import ErrorMessage from "../../../../Elements/Errors/ErrorMessage";
import Flexer from "../../../../Elements/Layout/Container/Flexer";
import FormField from "../../../../Elements/Fields/FormField";
import HelpText from "../../../Parts/Text/HelpText";
import SaveButton from "../../../Parts/Buttons/SaveButton";

import { handleDataChange } from "../../../../../utils/dataHandlers/dataHandlers";
import { elementSetBuilderStyles } from "../../elementSetBuilderStyles";
import { initialDetailsData } from "../../const/elementSetConstants";

const ElementSetDetailForm = ({ saveDetails }) => {
  const classes = elementSetBuilderStyles();
  const [detailsErrors, setDetailsErrors] = useState("");
  const [detailsData, setDetailsData] = useState(initialDetailsData);

  const handleSave = () => {
    let errors = [];

    if (detailsData.name === "") {
      errors.push("Element Set Name is required");
    }
    setDetailsErrors(errors);
    if (errors.length > 0) {
      return;
    }
    saveDetails(detailsData);
  };

  return (
    <Grid container spacing={0} style={{ marginBottom: 24 }}>
      <Grid item xs={12}>
        <div className={classes.tableActions}>
          <Grid container className={classes.saveActions} spacing={2}>
            <Grid item xs={12} md={12} lg={12} xl={12}>
              <HelpText>Set Name*</HelpText>
              <FormField
                required
                fullWidth
                id="name"
                value={detailsData.name}
                onChange={(event) =>
                  handleDataChange(event, setDetailsData, detailsData)
                }
              />
            </Grid>
            <Grid item xs={12} md={12} lg={12} xl={12}>
              <HelpText>Set Description</HelpText>
              <FormField
                required
                multiline
                minRows={3}
                id="description"
                value={detailsData.description}
                onChange={(event) =>
                  handleDataChange(event, setDetailsData, detailsData)
                }
              />
            </Grid>
            <Grid item xs={12} md={12} lg={12} xl={12}>
              <HelpText>Set Width*</HelpText>
              <BasicSelect
                name="setWidth"
                value={detailsData.setWidth}
                onChange={(event) =>
                  handleDataChange(event, setDetailsData, detailsData)
                }
              >
                <MenuItem value="" disabled>
                  Select Width
                </MenuItem>
                <MenuItem value="Full Page">Full Page</MenuItem>
                <MenuItem value="Half Page">Half Page</MenuItem>
              </BasicSelect>
            </Grid>
            <Grid item xs={12} md={12} lg={12} xl={12}>
              <HelpText>Set Columns*</HelpText>
              <BasicSelect
                name="setColumns"
                value={detailsData.setColumns}
                onChange={(event) =>
                  handleDataChange(event, setDetailsData, detailsData)
                }
              >
                <MenuItem value="" disabled>
                  Select Columns
                </MenuItem>
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
              </BasicSelect>
            </Grid>
          </Grid>
        </div>
        <Flexer mt={32} j="c">
          <SaveButton label="" submitFunc={handleSave} />
        </Flexer>
        {detailsErrors && (
          <div style={{ marginBottom: 0 }}>
            <ErrorMessage errors={detailsErrors} setErrors={setDetailsErrors} />
          </div>
        )}
      </Grid>
    </Grid>
  );
};

export default ElementSetDetailForm;
