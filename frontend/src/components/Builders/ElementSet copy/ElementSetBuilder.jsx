import React, { useEffect, useState } from "react";
import { Grid, useTheme, useMediaQuery, Divider } from "@material-ui/core";

import BaseBuilder from "../Parts/Layout/BaseBuilder";
import BaseContent from "../../Elements/Base/BaseContent";
import BaseSection from "../../Elements/Base/BaseSection";
import ErrorMessage from "../../Elements/Errors/ErrorMessage";

import ElementSetDetailForm from "./components/DetailForm/ElementSetDetailForm";
import ElementSetColumns from "./components/Columns/ElementSetColumns";
import ElementSetPreview from "./components/Preview/ElementSetPreview";

import axiosInstance from "../../../lib/Axios/axiosInstance";
import {
  initialColumnData,
  initialFormData,
  initialOpenData,
} from "./const/elementSetConstants";

const ElementSetBuilder = () => {
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [detailsSaved, setDetailsSaved] = useState(false);
  const [open, setOpen] = useState(initialOpenData);
  const [apiErrors, setApiErrors] = useState("");
  const [elementObject, setElementObject] = useState(null);

  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [colOneData, setColOneData] = useState(initialColumnData);
  const [colTwoData, setColTwoData] = useState(initialColumnData);
  const [formData, setFormData] = useState(initialFormData);
  const [elementData, setElementData] = useState([]);

  //Retrieve all Elements in Database
  useEffect(() => {
    axiosInstance
      .get("/element/")
      .then((response) => {
        setElementData(response.data);
        console.log(response.data, "elements");
      })
      .catch((error) => console.log(error));
  }, []);

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
        <Grid container justifyContent="center">
          <Grid
            item
            xs={12}
            md={9}
            lg={9}
            xl={9}
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
                pb={0}
                mb={0.25}
                headerVar="h5"
              >
                <BaseSection
                  header="Element Set Settings"
                  justifyChildren="center"
                  divider
                  pad={0}
                  boxShadow={0}
                  pb={0}
                  pt={0}
                  mb={1}
                  mt={1}
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
                  colOneData={colOneData}
                  setColOneData={setColOneData}
                  colTwoData={colTwoData}
                  setColTwoData={setColTwoData}
                  handleSaveDetails={handleSaveDetails}
                  elementData={elementData}
                  handleThumbnailImageChange={handleThumbnailImageChange}
                  elementObject={elementObject}
                  setElementObject={setElementObject}
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
              colOneData={colOneData}
              colTwoData={colTwoData}
              elementObject={elementObject}
            />
          </Grid>
        </Grid>
      </form>
    </BaseBuilder>
  );
};

export default ElementSetBuilder;
