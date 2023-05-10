import React, { useEffect, useState } from "react";
import {
  Grid,
  useTheme,
  useMediaQuery,
  Divider,
  CardMedia,
} from "@material-ui/core";

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
import WIPPage from "../../Elements/Layout/WIPPage";
import { NotFound } from "../../Outer/404/Components/NotFound";

const ElementSetBuilder = ({ stepOpen }) => {
  console.log(stepOpen);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [detailsSaved, setDetailsSaved] = useState(false);
  const [open, setOpen] = useState(initialOpenData);
  const [apiErrors, setApiErrors] = useState("");
  const [elementObjectColOne, setElementObjectColOne] = useState(null);
  const [elementObjectColTwo, setElementObjectColTwo] = useState(null);

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
    <BaseBuilder header="" pad={0} boxShadow={0}>
      <form onSubmit={handleSaveDetails} style={{}}>
        <Grid container justifyContent="center">
          <Grid
            item
            xs={12}
            md={12}
            lg={12}
            xl={12}
            style={{
              padding: isSmallScreen ? "0px" : "0px 16px 16px 16px",
              order: isMediumScreen ? 1 : 0,
            }}
          >
            <BaseContent
              header=""
              subheader=""
              justifyChildren="center"
              headerAlign="center"
              boxShadow={0}
              pad={isSmallScreen ? 1 : 3}
            >
              {stepOpen.Details && (
                <BaseContent
                  header=""
                  subheader=""
                  justifyChildren="center"
                  headerAlign="left"
                  pad={0}
                  boxShadow={0}
                  divider
                  pt={2}
                  pb={0}
                  mb={0.25}
                  headerVar="h5"
                >
                  <ElementSetDetailForm saveDetails={handleSaveDetails} />
                </BaseContent>
              )}
              {stepOpen.Content && (
                <Grid
                  item
                  xs={12}
                  md={12}
                  lg={12}
                  xl={12}
                  style={{
                    order: isMediumScreen ? 0 : 1,
                  }}
                >
                  <ElementSetPreview
                    formData={formData}
                    colOneData={colOneData}
                    colTwoData={colTwoData}
                    elementObjectColOne={elementObjectColOne}
                    setElementObjectColOne={setElementObjectColOne}
                    elementObjectColTwo={elementObjectColTwo}
                    setElementObjectColTwo={setElementObjectColTwo}
                    elementData={elementData}
                  />
                </Grid>
              )}
              {stepOpen.Layout && (
                <Grid
                  item
                  xs={12}
                  md={12}
                  lg={12}
                  xl={12}
                  style={{
                    order: isMediumScreen ? 0 : 1,
                  }}
                >
                  <NotFound />
                </Grid>
              )}
              {stepOpen.Finalize && (
                <Grid
                  item
                  xs={12}
                  md={12}
                  lg={12}
                  xl={12}
                  style={{
                    order: isMediumScreen ? 0 : 1,
                  }}
                >
                  <NotFound />
                  <NotFound />
                  <NotFound />
                  <NotFound />
                  <NotFound />
                </Grid>
              )}

              {apiErrors && (
                <div style={{ marginTop: 12, marginBottom: 0 }}>
                  <ErrorMessage errors={apiErrors} setErrors={setApiErrors} />
                </div>
              )}
            </BaseContent>
          </Grid>
        </Grid>
      </form>
    </BaseBuilder>
  );
};

export default ElementSetBuilder;
