import React, { useState } from "react";
import { makeStyles, Paper, Grid, Divider } from "@material-ui/core";
import BaseContent from "../../../Elements/Base/BaseContent";
import axiosInstance from "../../../../lib/Axios/axiosInstance";
import CardBuilderDetailForm from "./CardBuilderDetailForm";
import { handleDataChange } from "../../../../utils/dataHandlers/dataHandlers";
import Text from "../../../Elements/Layout/Text/Text";
import SaveButton from "../../Parts/Buttons/SaveButton";
import CardBuilderTypeForm from "./CardBuilderTypeForm";
import Flexer from "../../../Elements/Layout/Container/Flexer";
import ErrorMessage from "../../../Elements/Errors/ErrorMessage";
import CardBuilderPreview from "./CardBuilderPreview";
import {
  validateCardDetails,
  validateDenseCard,
  validateStandardCard,
  validateTileCard,
} from "./CardBuilderValidation";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    width: "100%",
  },
  formContainer: {
    padding: theme.spacing(3),
  },
  buttonContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginTop: 16,
  },
}));

const CardBuilder = () => {
  const classes = useStyles();
  const [detailsErrors, setDetailsErrors] = useState("");
  const [contentErrors, setContentErrors] = useState("");
  const [apiErrors, setApiErrors] = useState("");
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [cardFormData, setCardFormData] = useState({
    cardType: "Standard",
    name: "",
    description: "",
    icon: "",
    image: "",
    header: "",
    subheader: "",
    primary: "",
    secondary: "",
    order: "",
    shareToggle: false,
    buttonToggle: false,
  });

  const handleThumbnailImageChange = (event) => {
    const file = event.target.files[0];
    setThumbnailImage(file);
    setCardFormData({
      ...cardFormData,
      image: file,
    });
    console.log("cur", {
      ...cardFormData,
      image: file,
    });
  };

  const handleSave = async (event) => {
    let contentErrors;
    if (cardFormData.cardType === "Standard") {
      contentErrors = validateStandardCard(cardFormData);
    } else if (cardFormData.cardType === "Tile") {
      contentErrors = validateTileCard(cardFormData);
    } else if (cardFormData.cardType === "Dense") {
      contentErrors = validateDenseCard(cardFormData);
    }

    setContentErrors(contentErrors);
    if (contentErrors.length > 0) {
      return;
    }

    let detailsErrors = validateCardDetails(cardFormData);
    setDetailsErrors(detailsErrors);
    if (detailsErrors.length > 0) {
      return;
    }

    // try {
    //   const response = await axiosInstance
    //     .post("/builderurlhere/", listFormData)
    //     .then((response) => {
    //       console.log(response.data);
    //       setList(response.data);
    //       //   setErrors("");
    //       //   setFaqItems([]);
    //       //   setFormData(initialState);
    //     });
    // } catch (error) {
    //   console.log(error.response.data);
    //   //   setApiErrors(error.response.data);
    // }
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.formContainer} elevation={3}>
        <Text t="h1" a="c" mb={32}>
          Card Builder
        </Text>
        <form onSubmit={handleSave}>
          <Grid container>
            <Grid item xs={12} md={6} style={{ padding: "0px 16px 16px 16px" }}>
              <BaseContent
                header="Create Card"
                subheader="Card Settings"
                justifyChildren="center"
              >
                <div style={{ width: "100%" }}>
                  <Divider />
                </div>
                <CardBuilderDetailForm
                  formData={cardFormData}
                  handleChange={(event) =>
                    handleDataChange(event, setCardFormData, cardFormData)
                  }
                  errors={detailsErrors}
                  setErrors={setDetailsErrors}
                />
                <Text t="body2" a="c" mb={12} mt={8}>
                  Card Content
                </Text>
                <div style={{ marginBottom: 16, width: "100%" }}>
                  <Divider />
                </div>

                <CardBuilderTypeForm
                  formData={cardFormData}
                  handleChange={(event) =>
                    handleDataChange(event, setCardFormData, cardFormData)
                  }
                  handleThumbnailImageChange={handleThumbnailImageChange}
                  errors={contentErrors}
                  setErrors={setContentErrors}
                />
                <Flexer mt={0} j="c">
                  <SaveButton label="Card" submitFunc={handleSave} />
                </Flexer>
                {apiErrors && (
                  <div style={{ marginTop: 12, marginBottom: 0 }}>
                    <ErrorMessage errors={apiErrors} setErrors={setApiErrors} />
                  </div>
                )}
              </BaseContent>
            </Grid>

            <Grid item xs={12} md={6} style={{ padding: "0px 16px 16px 16px" }}>
              <CardBuilderPreview formData={cardFormData} />
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
};

export default CardBuilder;
