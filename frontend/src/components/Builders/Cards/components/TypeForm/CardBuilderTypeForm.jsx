import React, { useRef } from "react";
import { Grid, Switch } from "@material-ui/core";
import ErrorMessage from "../../../../Elements/Errors/ErrorMessage";
import FormField from "../../../../Elements/Fields/FormField";
import IconSelectMixin from "../../../../Elements/Base/EditForm/IconSelectMixin";
import ImageInput from "../../../../Elements/Fields/ImageInput";
import Flexer from "../../../../Elements/Layout/Container/Flexer";
import HelpText from "../../../Parts/Text/HelpText";
import { fieldNames } from "../../const/cardConstants";

const CardBuilderTypeForm = ({
  formData,
  handleChange,
  handleThumbnailImageChange,
  errors,
  setErrors,
}) => {
  const fileInputRef = useRef();

  return (
    <Grid item xs={12} md={12} xl={12} style={{ width: "100%" }}>
      <Grid container spacing={2}>
        {fieldNames.map((field) => {
          if (formData.cardType === "Tile") {
            if (
              field.name === "image" ||
              field.name === "header" ||
              field.name === "subheader" ||
              field.name === "shareToggle" ||
              field.name === "buttonToggle"
            ) {
              return null;
            }
          }
          if (formData.cardType === "Dense") {
            if (
              field.name === "image" ||
              field.name === "shareToggle" ||
              field.name === "buttonToggle"
            ) {
              return null;
            }
          }

          if (formData.cardType === "Standard") {
            if (field.name === "secondary") {
              return null;
            }
          }

          return (
            <Grid item xs={12} md={field.md} style={{ width: "100%" }}>
              {field.name === "icon" ? (
                <React.Fragment>
                  <HelpText>{field.label}</HelpText>
                  <IconSelectMixin
                    fieldName={field.name}
                    formData={formData}
                    handleChange={handleChange}
                    background="#F5F5F5"
                    hideHelpText
                  />
                </React.Fragment>
              ) : field.name === "image" ? (
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
              ) : field.name.includes("Toggle") ? (
                <Flexer fd="column" a="c">
                  <HelpText>{field.label}</HelpText>
                  <Switch
                    name={field.name}
                    checked={formData[field.name]}
                    onChange={handleChange}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </Flexer>
              ) : (
                <React.Fragment>
                  <HelpText>{field.label}</HelpText>
                  <FormField
                    required
                    multiline={field.multiline}
                    id={field.name}
                    onChange={handleChange}
                    value={formData[field.name]}
                    minRows={4}
                  />
                </React.Fragment>
              )}
            </Grid>
          );
        })}
      </Grid>
      {errors && (
        <div>
          <ErrorMessage errors={errors} setErrors={setErrors} />
        </div>
      )}
    </Grid>
  );
};

export default CardBuilderTypeForm;
