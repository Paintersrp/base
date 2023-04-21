import React, { useState } from "react";
import { Grid, useTheme, useMediaQuery, Divider } from "@material-ui/core";

import axiosInstance from "../../../lib/Axios/axiosInstance";
import BaseContent from "../../Elements/Base/BaseContent";
import BaseSection from "../../Elements/Base/BaseSection";
import ErrorMessage from "../../Elements/Errors/ErrorMessage";
import ElementSetDetailForm from "./components/DetailForm/ElementSetDetailForm";

import {
  initialFormData,
  initialHeaderData,
  initialOpenData,
} from "./const/elementSetConstants";
import ElementSetColumns from "./components/Columns/ElementSetColumns";
import ElementSetPreview from "./components/Preview/ElementSetPreview";
import BaseBuilder from "../Parts/Layout/BaseBuilder";

const ElementSetBuilder = () => {
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [detailsSaved, setDetailsSaved] = useState(false);
  const [open, setOpen] = useState(initialOpenData);
  const [apiErrors, setApiErrors] = useState("");

  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [colOneHeaderData, setColOneHeaderData] = useState(initialHeaderData);
  const [colTwoHeaderData, setColTwoHeaderData] = useState(initialHeaderData);
  const [formData, setFormData] = useState(initialFormData);

  const handleThumbnailImageChange = (event) => {
    const file = event.target.files[0];
    setThumbnailImage(file);
    setFormData({
      ...formData,
      image: file,
    });
  };

  const handleSaveDetails = (detailsData) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      setType: detailsData.setType,
      setWidth: detailsData.setWidth,
      setColumns: detailsData.setColumns,
      name: detailsData.name,
      description: detailsData.description,
    }));
    setOpen((prevState) => ({
      ...prevState,
      header: {
        ...prevState.header,
        colOne: !prevState.header.colOne,
      },
      details: !open.details,
    }));
    setDetailsSaved(true);

    // let contentErrors;
    // if (cardFormData.cardType === "Standard") {
    //   contentErrors = validateStandardCard(cardFormData);
    // } else if (cardFormData.cardType === "Tile") {
    //   contentErrors = validateTileCard(cardFormData);
    // } else if (cardFormData.cardType === "Dense") {
    //   contentErrors = validateDenseCard(cardFormData);
    // }
    // setContentErrors(contentErrors);
    // if (contentErrors.length > 0) {
    //   return;
    // }
    // let detailsErrors = validateCardDetails(cardFormData);
    // setDetailsErrors(detailsErrors);
    // if (detailsErrors.length > 0) {
    //   return;
    // }
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
    <BaseBuilder header="Element Set Builder" headerGutter>
      <form onSubmit={handleSaveDetails} style={{}}>
        <Grid container>
          <Grid
            item
            xs={12}
            md={12}
            lg={4}
            xl={3}
            style={{
              padding: "0px 16px 16px 16px",
              order: isMediumScreen ? 1 : 0,
            }}
          >
            <BaseContent
              header="Builder"
              subheader=""
              justifyChildren="center"
              headerAlign="center"
            >
              <BaseContent
                header="Set Details"
                subheader=""
                justifyChildren="center"
                headerAlign="left"
                collapse
                pad={0}
                boxShadow={0}
                divider
                pt={2}
                headerVar="h5"
              >
                <BaseSection
                  header="Element Set Settings"
                  justifyChildren="center"
                  divider
                  pad={0}
                  boxShadow={0}
                  pb={2}
                  pt={2}
                  collapse
                  headerAlign="left"
                  manualOpen={open.details}
                  setManualOpen={() =>
                    setOpen((prevState) => ({
                      ...prevState,
                      details: !open.details,
                    }))
                  }
                >
                  <ElementSetDetailForm saveDetails={handleSaveDetails} />
                  <div style={{ width: "100%" }}>
                    <Divider />
                  </div>
                </BaseSection>
              </BaseContent>
              {detailsSaved && (
                <ElementSetColumns
                  open={open}
                  setOpen={setOpen}
                  colOneHeaderData={colOneHeaderData}
                  setColOneHeaderData={setColOneHeaderData}
                  colTwoHeaderData={colTwoHeaderData}
                  setColTwoHeaderData={setColTwoHeaderData}
                  handleSaveDetails={handleSaveDetails}
                  columns={2}
                />
              )}

              {apiErrors && (
                <div style={{ marginTop: 12, marginBottom: 0 }}>
                  <ErrorMessage errors={apiErrors} setErrors={setApiErrors} />
                </div>
              )}
            </BaseContent>
          </Grid>

          <Grid
            item
            xs={12}
            md={12}
            lg={8}
            xl={9}
            style={{
              padding: "0px 16px 16px 16px",
              order: isMediumScreen ? 0 : 1,
            }}
          >
            <ElementSetPreview
              formData={formData}
              colOneHeaderData={colOneHeaderData}
              colTwoHeaderData={colTwoHeaderData}
            />
          </Grid>
        </Grid>
      </form>
    </BaseBuilder>
  );
};

export default ElementSetBuilder;
