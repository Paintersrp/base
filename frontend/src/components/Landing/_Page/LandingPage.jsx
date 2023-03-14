import React from "react";
import { useState } from "react";
import { useEffect } from "react";
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
import { useDispatch } from "react-redux";
import ErrorPage from "../../Elements/Layout/Errors/ErrorPage";

function LandingPage({ handleUpdate }) {
  const [error, setError] = useState();
  const [data, setData] = useState({});
  const [metadata, setMetaData] = useState({});
  const [heroData, setHeroData] = useState({});
  const [processBlock, setProcessBlock] = useState([]);
  const [newsBlock, setNewsBlock] = useState([]);
  const [editing, setEditing] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_DATA_REQUEST" });
    const fetchData = async () => {
      axiosInstance
        .get("/landing/")
        .then((response) => {
          setData(response.data);
          setHeroData(response.data.hero_block);
          setProcessBlock(response.data.title_block_process);
          setNewsBlock(response.data.title_block_news);
          setMetaData(response.data.metadata);
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
            heroData={heroData}
            setHeroData={setHeroData}
            contactData={data.contact_information}
            form={true}
          />
          <Pricing serviceData={data.service_tiers} />
          <Processes
            processData={data.processes}
            block={processBlock}
            setBlock={setProcessBlock}
          />
          <LatestNews
            articlesData={data.articles}
            block={newsBlock}
            setBlock={setNewsBlock}
          />
          <NewsletterForm />
          <IconScroller />
        </>
      )}
    </PageContainer>
  );
}

export default LandingPage;
