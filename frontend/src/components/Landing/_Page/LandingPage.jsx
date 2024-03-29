import React, { useEffect, useState } from "react";
import LatestNews from "../News/News";
import NewsletterForm from "../Newsletter/NewsletterForm";
import axiosInstance from "../../../lib/Axios/axiosInstance";
import PageContainer from "../../Elements/Layout/PageContainer";
import IconScroller from "../../Elements/Animations/IconScroller/IconScroller";
import Processes from "../Processes/Processes";
import Pricing from "../Pricing/Pricing";
import Hero from "../Hero/Hero";
import FABMenu from "../../Elements/Buttons/FABAdminMenu";
import { ScrollTopFab } from "../../Elements/Buttons/ScrollToTopFAB";
import { useDispatch, useSelector } from "react-redux";
import ErrorPage from "../../Elements/Layout/Errors/ErrorPage";

function LandingPage({ handleUpdate }) {
  const [error, setError] = useState();
  const [data, setData] = useState({});
  const [heroData, setHeroData] = useState({});
  const [processData, setProcessData] = useState({});
  const [newsData, setNewsData] = useState({});
  const [serviceData, setServiceData] = useState({});
  const [contactData, setContactData] = useState({});
  const [socialsData, setSocialsData] = useState({});
  const [processBlock, setProcessBlock] = useState([]);
  const [newsBlock, setNewsBlock] = useState([]);
  const [editing, setEditing] = useState(false);
  const dispatch = useDispatch();
  const editmode = useSelector((state) => state.editmode);

  useEffect(() => {
    dispatch({ type: "FETCH_DATA_REQUEST" });
    const fetchData = async () => {
      axiosInstance
        .get("/landing/")
        .then((response) => {
          setData(response.data);
          setHeroData(response.data.HeroBlock);
          setProcessData(response.data.Process);
          setProcessBlock(
            response.data.TitleBlock.find((tb) => tb.name === "process")
          );
          setNewsBlock(
            response.data.TitleBlock.find((tb) => tb.name === "news")
          );
          setNewsData(response.data.Articles);
          setContactData(response.data.ContactInformation);
          setSocialsData(response.data.Socials);
          setServiceData(response.data.ServiceTier);
          dispatch({ type: "FETCH_DATA_SUCCESS" });
        })
        .catch((err) => {
          console.log("ERROR: ", err);
          setError(err.error);

          console.log("message", message);
        })
        .then(dispatch({ type: "FETCH_DATA_FAILURE" }));
    };
    fetchData();
  }, []);

  if (error) {
    return (
      <ErrorPage
        message={error.message}
        description={error.description}
        instructions={error.instructions}
        thanks={error.thanks}
      />
    );
  }

  return (
    <PageContainer
      editing={editing}
      setEditing={setEditing}
      backgroundColor="#F5F5F5"
      page_name="Landing"
    >
      <ScrollTopFab />
      <FABMenu
        editing={editing}
        setEditing={setEditing}
        handleUpdate={handleUpdate}
      />
      {Object.keys(data).length > 0 && (
        <>
          <Hero
            data={data.HeroBlock}
            contactData={data.ContactInformation}
            socialData={data.Socials}
            editMode={editmode.editMode}
            form={true}
          />
          <Pricing serviceData={serviceData} />
          <Processes
            processData={processData}
            blockData={data.TitleBlock.find((tb) => tb.name === "process")}
          />
          <LatestNews articlesData={newsData} blockData={newsBlock} />
          <NewsletterForm editMode={editmode.editMode} />
          <IconScroller />
        </>
      )}
    </PageContainer>
  );
}

export default LandingPage;
