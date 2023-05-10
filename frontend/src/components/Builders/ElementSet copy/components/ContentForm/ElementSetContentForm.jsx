import React, { useEffect, useState } from "react";
import { Grid, IconButton, MenuItem, Switch } from "@material-ui/core";
import LaunchIcon from "@mui/icons-material/Launch";

import BasicSelect from "../../../../Elements/Fields/BasicSelect";
import ErrorMessage from "../../../../Elements/Errors/ErrorMessage";
import Flexer from "../../../../Elements/Layout/Container/Flexer";
import FormField from "../../../../Elements/Fields/FormField";
import HelpText from "../../../Parts/Text/HelpText";
import SaveButton from "../../../Parts/Buttons/SaveButton";

import {
  getFieldsByType,
  getOptionsByType,
} from "../../utils/elementSetUtilities";
import {
  handleDataChange,
  handleNestedDataChange,
} from "../../../../../utils/dataHandlers/dataHandlers";

import { elementSetBuilderStyles } from "../../elementSetBuilderStyles";
import StyledButton from "../../../../Elements/Buttons/StyledButton";
import ImageInput from "../../../../Elements/Fields/ImageInput";
import { useDialog } from "../../../../Elements/Base/Dialog/useDialog";
import BaseDialog from "../../../../Elements/Base/Dialog/BaseDialog";
import ContentList from "../ObjectSelectModal/ObjectSelectModal";

const ElementSetContentForm = ({
  data,
  setData,
  elementData,
  handleThumbnailImageChange,
  elementObject,
  setElementObject,
}) => {
  const classes = elementSetBuilderStyles();
  const [fields, setFields] = useState([]);
  const [options, setOptions] = useState([]);
  const [existingContent, setExistingContent] = useState(false);
  const [contentErrors, setContentErrors] = useState("");
  const { isOpen, openDialog, closeDialog } = useDialog();

  //   useEffect(() => {
  //     setFields(getFieldsByType("Content", data.content.contentType));
  //   }, [data.content.contentType]);
  useEffect(() => {
    const options = getOptionsByType(elementData, data.content.contentType);

    setOptions(options);
  }, [data.content.contentType]);

  useEffect(() => {
    console.log(elementObject, "elementObject");
  }, [elementObject]);

  const handleContentObject2 = (event) => {
    console.log(event.target.value, "2");
    setElementObject(event.target.value);
  };
  const handleElement = (elementObject) => {
    console.log(elementObject, "1");
    setElementObject(elementObject);
  };

  return (
    <Grid container spacing={0} style={{ marginBottom: 24 }}>
      <Grid item xs={12}>
        <div className={classes.outerContainer}>
          <Grid container className={classes.innerContainer} spacing={2}>
            <Grid item xs={12} md={12} lg={12} xl={12}>
              <HelpText>Content Type*</HelpText>
              <BasicSelect
                name="contentType"
                value={data.content.contentType}
                onChange={(event) =>
                  handleNestedDataChange(event, setData, data, "content")
                }
              >
                <MenuItem value="" disabled>
                  Select Content Type
                </MenuItem>
                <MenuItem value="Text">Text</MenuItem>
                <MenuItem value="Image">Image</MenuItem>
                <MenuItem value="List">List</MenuItem>
                <MenuItem value="Card">Card</MenuItem>
              </BasicSelect>
            </Grid>
            {existingContent && (
              <Grid item xs={12} md={12} lg={12} xl={12}>
                <HelpText>Content Object*</HelpText>
                <BasicSelect
                  name="elementObject"
                  value={elementObject}
                  onChange={handleContentObject2}
                >
                  <MenuItem value="" disabled>
                    Select Content Object
                  </MenuItem>
                  {options.map((option) => {
                    return (
                      <MenuItem value={option.content_object}>
                        {option.name}
                      </MenuItem>
                    );
                  })}
                </BasicSelect>
              </Grid>
            )}
            <Flexer j="c">
              <StyledButton
                buttonText="Create"
                minWidth={0}
                onClick={() => setExistingContent(false)}
                noHover
              />

              <StyledButton
                buttonText="Choose"
                minWidth={0}
                onClick={() => setExistingContent(true)}
                noHover
              />
            </Flexer>
          </Grid>
        </div>
        {contentErrors && (
          <div style={{ marginBottom: 0 }}>
            <ErrorMessage errors={contentErrors} setErrors={setContentErrors} />
          </div>
        )}
        <IconButton onClick={openDialog}>
          <LaunchIcon />
        </IconButton>
        <BaseDialog
          open={isOpen}
          onClose={closeDialog}
          title="Select Content Object"
          content={
            <ContentList
              elementData={elementData}
              handleElement={handleElement}
              elementObject={elementObject}
            />
          }
          primaryButtonText="Confirm"
        />
      </Grid>
    </Grid>
  );
};

export default ElementSetContentForm;
