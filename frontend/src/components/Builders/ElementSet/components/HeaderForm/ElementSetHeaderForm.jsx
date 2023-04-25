import React, { useEffect, useState } from "react";
import { Grid, MenuItem, Switch } from "@material-ui/core";

import BasicSelect from "../../../../Elements/Fields/BasicSelect";
import ErrorMessage from "../../../../Elements/Errors/ErrorMessage";
import Flexer from "../../../../Elements/Layout/Container/Flexer";
import FormField from "../../../../Elements/Fields/FormField";
import HelpText from "../../../Parts/Text/HelpText";
import SaveButton from "../../../Parts/Buttons/SaveButton";

import { getFieldsByType } from "../../utils/elementSetUtilities";
import {
  handleDataChange,
  handleNestedDataChange,
} from "../../../../../utils/dataHandlers/dataHandlers";
import { elementSetBuilderStyles } from "../../elementSetBuilderStyles";

const ElementSetHeaderForm = ({ data, setData, saveHeader }) => {
  const classes = elementSetBuilderStyles();
  const [fields, setFields] = useState([]);
  const [headerErrors, setHeaderErrors] = useState("");

  useEffect(() => {
    setFields(getFieldsByType("Header", data.header.headerType));
  }, [data.header.headerType]);

  const handleSave = () => {
    let errors = [];
    setHeaderErrors(errors);
    if (errors.length > 0) {
      return;
    }

    // Reeval
    saveHeader(data.header);
  };

  return (
    <Grid container spacing={0} style={{ marginBottom: 24 }}>
      <Grid item xs={12}>
        <div className={classes.outerContainer}>
          <Grid container className={classes.innerContainer} spacing={2}>
            <Grid item xs={12} md={12} lg={12} xl={12}>
              <HelpText>Header Type*</HelpText>
              <BasicSelect
                name="headerType"
                value={data.header.headerType}
                onChange={(event) =>
                  handleNestedDataChange(event, setData, data, "header")
                }
              >
                <MenuItem value="" disabled>
                  Select Header Type
                </MenuItem>
                <MenuItem value="h1">Page (H1)</MenuItem>
                <MenuItem value="h2">Page (H2)</MenuItem>
                <MenuItem value="h3">Content (H3)</MenuItem>
                <MenuItem value="h4">Content (H4)</MenuItem>
                <MenuItem value="h5">Section (H5)</MenuItem>
                <MenuItem value="h6">Section (H6)</MenuItem>
              </BasicSelect>
            </Grid>
            <Grid item xs={12} md={12} lg={12} xl={12}>
              <HelpText>Text Alignment*</HelpText>
              <BasicSelect
                name="alignment"
                value={data.header.alignment}
                onChange={(event) =>
                  handleNestedDataChange(event, setData, data, "header")
                }
              >
                <MenuItem value="" disabled>
                  Select Text Alignment
                </MenuItem>
                <MenuItem value="l">Left</MenuItem>
                <MenuItem value="c">Center</MenuItem>
                <MenuItem value="r">Right</MenuItem>
              </BasicSelect>
            </Grid>
            {fields.map((field) => {
              return (
                <Grid item xs={12} md={field.md} style={{ width: "100%" }}>
                  {field.name === "image" ? (
                    <div style={{ width: "100%" }}>
                      <ImageInput
                        xs={12}
                        md={9}
                        handleChange={handleThumbnailImageChange}
                        handleClick={() => fileInputRef.current.click()}
                        newImage={null}
                        newImageName={null}
                        type="Thumbnail"
                      />
                    </div>
                  ) : field.name.includes("Divider") ? (
                    <Flexer fd="row" a="c" j="c">
                      <HelpText a="r" mt={4} mr={8}>
                        {field.label}
                      </HelpText>

                      <Switch
                        name={field.name}
                        checked={data.header[field.name]}
                        onChange={(event) =>
                          handleNestedDataChange(event, setData, data, "header")
                        }
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </Flexer>
                  ) : (
                    <React.Fragment>
                      {field.name === "subtitle" &&
                      !data.header["subtitleToggle"] ? null : field.name ===
                          "tagline" && !data.header["taglineToggle"] ? null : (
                        <React.Fragment>
                          <HelpText>{field.label}</HelpText>
                          <FormField
                            required
                            multiline={field.multiline}
                            id={field.name}
                            onChange={(event) =>
                              handleNestedDataChange(
                                event,
                                setData,
                                data,
                                "header"
                              )
                            }
                            value={data.header[field.name]}
                            minRows={4}
                          />
                        </React.Fragment>
                      )}

                      {field.name === "subtitle" || field.name === "tagline" ? (
                        <Flexer fd="row" a="c" j="c">
                          <HelpText a="r" mt={4} mr={4}>
                            {field.name === "subtitle"
                              ? "Subtitle Toggle"
                              : "Tagline Toggle"}
                          </HelpText>
                          <Switch
                            name={
                              field.name === "subtitle"
                                ? "subtitleToggle"
                                : "taglineToggle"
                            }
                            checked={
                              field.name === "subtitle"
                                ? data.header["subtitleToggle"]
                                : data.header["taglineToggle"]
                            }
                            onChange={(event) =>
                              handleNestedDataChange(
                                event,
                                setData,
                                data,
                                "header"
                              )
                            }
                            inputProps={{ "aria-label": "controlled" }}
                          />
                        </Flexer>
                      ) : null}
                    </React.Fragment>
                  )}
                </Grid>
              );
            })}
          </Grid>
        </div>
        <Flexer mt={32} j="c">
          <SaveButton label="" submitFunc={handleSave} />
        </Flexer>
        {headerErrors && (
          <div style={{ marginBottom: 0 }}>
            <ErrorMessage errors={headerErrors} setErrors={setHeaderErrors} />
          </div>
        )}
      </Grid>
    </Grid>
  );
};

export default ElementSetHeaderForm;
