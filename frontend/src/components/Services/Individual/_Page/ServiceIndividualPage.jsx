import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../../lib/Axios/axiosInstance";
import ServiceAbout from "../ServiceAbout";
import ServiceProcess from "../ServiceProcess/ServiceProcess";
import ServiceHeader from "../ServiceHeader";
import ServiceFeatures from "../ServiceFeatures";
import ServiceContact from "../ServiceContact";
import ServicePrice from "../ServicePrice";
import PageContainer from "../../../Elements/Layout/PageContainer";
import ComparisonTable from "../../Quiz/TablesDisplay/ComparisonTable";
import TablesDisplay from "../../Quiz/TablesDisplay/TablesDisplay";
import { useSelector } from "react-redux";
import FABMenu from "../../../Elements/Buttons/FABAdminMenu";

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

function ServiceIndividualPage({ handleUpdate }) {
  const classes = useStyles();
  const [data, setData] = useState();
  const [fullData, setFullData] = useState();
  const [contentTextData, setContentTextData] = useState();
  const [tableData, setTableData] = useState();
  const [contactData, setContactData] = useState();
  const [socialData, setSocialData] = useState();
  const [processData, setProcessData] = useState();
  const [processImage, setProcessImage] = useState();
  const { id } = useParams();
  const formRef = useRef(null);
  const [editing, setEditing] = useState(false);
  const editmode = useSelector((state) => state.editmode);

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
        setFullData(response.data.ServiceTier);
        const filteredServiceTier = response.data.ServiceTier.filter(
          (service) => service.id === parseInt(id)
        );
        setData(filteredServiceTier[0]);
        setContactData(response.data.ContactInformation);
        setSocialData(response.data.Socials);
        setProcessData(response.data.ProcessTextItem);
        setContentTextData(response.data.ContentTextBlock[0]);
        const filteredProcessImage = response.data.ProcessImageItem.filter(
          (image) => image.servicetier === filteredServiceTier[0].service_title
        );
        setProcessImage(filteredProcessImage[0]);
        setTableData(
          response.data.ServiceTable.find((tb) => tb.name === "Tiers")
        );
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
      <FABMenu
        editing={editing}
        setEditing={setEditing}
        handleUpdate={handleUpdate}
      />
      {data && processData && processImage && (
        <Paper className={classes.paper} elevation={0}>
          <ServiceHeader
            data={data}
            handleApplyNowClick={handleApplyNowClick}
          />
          <ServiceAbout data={data} editMode={editmode.editMode} />
          <ServiceProcess
            setContentTextData={setContentTextData}
            contentTextData={contentTextData}
            processData={processData}
            processImage={processImage}
            editMode={editmode.editMode}
          />
          <ServiceFeatures data={data} editMode={editmode.editMode} />
          <ServicePrice data={data} editMode={editmode.editMode} />
          <ServiceContact
            data={data}
            formRef={formRef}
            contactData={contactData}
            socialData={socialData}
            editMode={editmode.editMode}
          />
          <TablesDisplay
            tableData={tableData}
            heading="Compare Our Services"
            direction="up"
            currentId={id}
            editMode={editmode.editMode}
          />
        </Paper>
      )}
    </PageContainer>
  );
}

export default ServiceIndividualPage;
