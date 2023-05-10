import React, { useRef, useState } from "react";
import {
  AppBar,
  Grid,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";

import BasicSelect from "../../../../Elements/Fields/BasicSelect";
import ErrorMessage from "../../../../Elements/Errors/ErrorMessage";
import Flexer from "../../../../Elements/Layout/Container/Flexer";
import FormField from "../../../../Elements/Fields/FormField";
import HelpText from "../../../Parts/Text/HelpText";
import SaveButton from "../../../Parts/Buttons/SaveButton";

import { handleDataChange } from "../../../../../utils/dataHandlers/dataHandlers";
import { elementSetBuilderStyles } from "../../elementSetBuilderStyles";
import { initialDetailsData } from "../../const/elementSetConstants";
import FieldInfoBox from "../../../_Page/FieldInfoBox";
import NextPrevButtons from "../../../Parts/Buttons/NextButton";

const ElementSetDetailForm = ({ saveDetails }) => {
  const classes = elementSetBuilderStyles();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [detailsErrors, setDetailsErrors] = useState("");
  const [detailsData, setDetailsData] = useState(initialDetailsData);
  const [focusedField, setFocusedField] = useState("name");

  const nameFieldRef = useRef(null);
  const widthFieldRef = useRef(null);
  const columnsFieldRef = useRef(null);
  const descriptionFieldRef = useRef(null);

  const handleFieldFocus = (fieldName) => {
    setFocusedField(fieldName);
    saveDetails(detailsData);
    console.log(fieldName);
  };

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
    <React.Fragment>
      <Grid
        container
        spacing={0}
        style={{
          marginBottom: 24,
          height: "100%",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <Grid item xs={12} sm={6}>
          <Flexer
            style={{ height: "100%", paddingRight: isSmallScreen ? 0 : 16 }}
          >
            <FieldInfoBox focusedField={focusedField} />
          </Flexer>
        </Grid>
        <Grid item xs={12} sm={6} style={{ paddingLeft: 16 }}>
          <div className={classes.tableActions}>
            <Grid container className={classes.saveActions} spacing={2}>
              <Grid item xs={12} md={12} lg={12} xl={12}>
                <HelpText>Set Name*</HelpText>
                <FormField
                  placeholder="Enter Name"
                  variant="standard"
                  required
                  fullWidth
                  id="name"
                  value={detailsData.name}
                  onChange={(event) =>
                    handleDataChange(event, setDetailsData, detailsData)
                  }
                  onFocus={() => handleFieldFocus("name")}
                  inputRef={nameFieldRef}
                />
              </Grid>
              <Grid item xs={12} md={12} lg={12} xl={12}>
                <HelpText>Set Width*</HelpText>
                <BasicSelect
                  variant="standard"
                  name="setWidth"
                  value={detailsData.setWidth}
                  onChange={(event) =>
                    handleDataChange(event, setDetailsData, detailsData)
                  }
                  onFocus={() => handleFieldFocus("width")}
                  inputRef={widthFieldRef}
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
                  variant="standard"
                  name="setColumns"
                  value={detailsData.setColumns}
                  onChange={(event) =>
                    handleDataChange(event, setDetailsData, detailsData)
                  }
                  onFocus={() => handleFieldFocus("columns")}
                  inputRef={columnsFieldRef}
                >
                  <MenuItem value="" disabled>
                    Select Columns
                  </MenuItem>
                  <MenuItem value="1">1</MenuItem>
                  <MenuItem value="2">2</MenuItem>
                </BasicSelect>
              </Grid>
              <Grid item xs={12} md={12} lg={12} xl={12}>
                <HelpText>Set Description</HelpText>
                <FormField
                  placeholder="Enter Description"
                  variant="standard"
                  required
                  multiline
                  minRows={4}
                  id="description"
                  value={detailsData.description}
                  onChange={(event) =>
                    handleDataChange(event, setDetailsData, detailsData)
                  }
                  onFocus={() => handleFieldFocus("description")}
                  inputRef={descriptionFieldRef}
                />
              </Grid>
            </Grid>
          </div>

          {detailsErrors && (
            <div style={{ marginBottom: 0 }}>
              <ErrorMessage
                errors={detailsErrors}
                setErrors={setDetailsErrors}
              />
            </div>
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default ElementSetDetailForm;
