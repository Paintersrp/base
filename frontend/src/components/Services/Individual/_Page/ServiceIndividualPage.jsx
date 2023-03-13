import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { useLocation, useParams } from "react-router-dom";
import axiosInstance from "../../../../lib/Axios/axiosInstance";
import ServiceAbout from "../ServiceAbout";
import ServiceProcess from "../ServiceProcess";
import ServiceHeader from "../ServiceHeader";
import ServiceFeatures from "../ServiceFeatures";
import ServiceContact from "../ServiceContact";
import ServicePrice from "../ServicePrice";
import PageContainer from "../../../Elements/Layout/PageContainer";
import ComparisonTable from "../../Quiz/TablesDisplay/ComparisonTable";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4),
    margin: "auto",
    maxWidth: 1400,
    backgroundColor: theme.palette.background.light,

    borderRadius: "8px",
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(1),
    },
  },
}));

function ServiceIndividualPage() {
  const classes = useStyles();
  const [data, setData] = useState();
  const [fullData, setFullData] = useState();
  const [tableData, setTableData] = useState();
  const [contactData, setContactData] = useState();
  const [processData, setProcessData] = useState();
  const [processImage, setProcessImage] = useState();
  const { id } = useParams();
  const formRef = useRef(null);

  const handleApplyNowClick = () => {
    formRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    axiosInstance
      .get(`/services/`)
      .then((response) => {
        setFullData(response.data.service_tier);
        const filteredServiceTier = response.data.service_tier.filter(
          (service) => service.id === parseInt(id)
        );
        setData(filteredServiceTier[0]);
        setContactData(response.data.contact_information);
        setProcessData(response.data.process_text);
        const filteredProcessImage = response.data.process_image.filter(
          (image) => image.servicetier === filteredServiceTier[0].service_title
        );
        setProcessImage(filteredProcessImage[0].image);
        setTableData(response.data.service_table_full);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <PageContainer
      title="About Company"
      description="Where the info be yo."
      keywords="news, posts, articles, touch"
      image="https://example.com/image.png"
      url="https://example.com/example-page"
      backgroundColor="#F5F5F5"
    >
      {data && processData && processImage && (
        <Paper className={classes.paper} elevation={0}>
          <ServiceHeader
            data={data}
            handleApplyNowClick={handleApplyNowClick}
          />
          <ServiceAbout data={data} />
          <ServiceProcess
            processData={processData}
            processImage={processImage}
          />
          <ServiceFeatures data={data} />
          <ServicePrice data={data} />
          <ServiceContact
            data={data}
            formRef={formRef}
            contactData={contactData}
          />
          <ComparisonTable currentId={id} tableData={tableData} />
        </Paper>
      )}
    </PageContainer>
  );
}

export default ServiceIndividualPage;
