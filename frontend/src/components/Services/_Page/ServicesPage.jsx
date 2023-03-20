import React, { useEffect, useState } from "react";
import PageContainer from "../../Elements/Layout/PageContainer";
import { Grid, makeStyles } from "@material-ui/core";
import Quiz from "../Quiz/Quiz/Quiz";
import FABMenu from "../../Elements/Buttons/FABAdminMenu";
import { useDispatch } from "react-redux";
import axiosInstance from "../../../lib/Axios/axiosInstance";
import ErrorPage from "../../Elements/Layout/Errors/ErrorPage";

const useStyles = makeStyles((theme) => ({
  quizContainer: {
    color: theme.palette.text.dark,
    maxWidth: "100%",
  },
}));

function ServicesPage({ handleUpdate }) {
  const classes = useStyles();
  const [error, setError] = useState();
  const [quizData, setQuizData] = useState([]);
  const [data, setData] = useState([]);
  const [servicesTable, setServicesTable] = useState([]);
  const [competitorsTable, setCompetitorsTable] = useState([]);
  const [metadata, setMetaData] = useState({});
  const [services, setServices] = useState(false);
  const [benefitsBlock, setBenefitsBlock] = useState([]);
  const [editing, setEditing] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_DATA_REQUEST" });
    const fetchData = async () => {
      axiosInstance
        .get("/services/")
        .then((response) => {
          setData(response.data);
          setServicesTable(response.data.service_table_services);
          setCompetitorsTable(response.data.service_table_competitors);
          setServices(response.data.service_tier);
          setBenefitsBlock(response.data.title_block_benefits);
          setMetaData(response.data.metadata);
        })
        .then(dispatch({ type: "FETCH_DATA_SUCCESS" }))
        .catch((err) => {
          setError(err.error);
        })
        .then(dispatch({ type: "FETCH_DATA_FAILURE" }));
      axiosInstance
        .get("/questionnaire/2/")
        .then((response) => {
          setQuizData(response.data);
          console.log("questionnaire: ", response.data);
        })
        .then(dispatch({ type: "FETCH_DATA_SUCCESS" }))
        .catch((err) => {
          setError(err.error);
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
      page_name="Services"
    >
      <FABMenu
        editing={editing}
        setEditing={setEditing}
        handleUpdate={handleUpdate}
      />

      <Quiz
        services={services}
        setServices={setServices}
        servicesTableData={servicesTable}
        competitorsTableData={competitorsTable}
        benefitsData={data.benefits}
        benefitsBlock={benefitsBlock}
        setBenefitsBlock={setBenefitsBlock}
        quizData={quizData}
      />
    </PageContainer>
  );
}

export default ServicesPage;
