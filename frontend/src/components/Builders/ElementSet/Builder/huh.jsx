import React, { useRef, useState } from "react";
import { Grid, Switch } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ErrorMessage from "../../../Elements/Errors/ErrorMessage";
import AddButton from "../../Parts/Buttons/AddButton";
import FormField from "../../../Elements/Fields/FormField";
import ImageInput from "../../../Elements/Fields/ImageInput";
import Flexer from "../../../Elements/Layout/Container/Flexer";
import HelpText from "../../Parts/Text/HelpText";

const useStyles = makeStyles((theme) => ({
  addActions: {
    display: "flex",
    padding: "16px 4px 0px 4px",
    alignItems: "flex-end",
    justifyContent: "center",
    width: "100%",
  },
}));

const ElementSetItemForm = ({
  formData,
  handleChange,
  handleThumbnailImageChange,
  errors,
  setErrors,
}) => {
  const classes = useStyles();
  const fileInputRef = useRef();
  const [fields, setFields] = useState("");
  const [detailsErrors, setDetailsErrors] = useState("");
  const [itemDetailsData, setItemDetailsData] = useState({
    elementType: "Standard",
    elementSubType: "Standard",
    name: "",
    description: "",
  });

  useEffect(() => {
    setFields(
      getFieldsByType(
        itemDetailsData.elementType,
        itemDetailsData.elementSubType
      )
    );
  }, [itemDetailsData.elementType, itemDetailsData.elementSubType]);

  return (
    <Grid item xs={12} md={12} xl={12} style={{ width: "100%" }}>
      <Grid container spacing={2}>
        {fieldNames.map((field) => {
          console.log(field.name, formData.cardType);

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
      <div>
        <div className={classes.addActions}>
          <AddButton label="Item to List" addFunc={handleAdd} />
        </div>
      </div>
      {errors && (
        <div>
          <ErrorMessage errors={errors} setErrors={setErrors} />
        </div>
      )}
    </Grid>
  );
};

export default ElementSetItemForm;
