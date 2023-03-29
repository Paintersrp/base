import React, { useEffect, useState } from "react";
import PageContainer from "../../Elements/Layout/PageContainer";
import { Grid, makeStyles } from "@material-ui/core";
import Quiz from "../Quiz/Quiz/Quiz";
import FABMenu from "../../Elements/Buttons/FABAdminMenu";
import { useDispatch, useSelector } from "react-redux";
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
  const [ready, setReady] = useState(false);
  const [error, setError] = useState();
  const [quizData, setQuizData] = useState([]);
  const [data, setData] = useState([]);
  const [servicesTable, setServicesTable] = useState([]);
  const [competitorsTable, setCompetitorsTable] = useState([]);
  const [editing, setEditing] = useState(false);
  const editmode = useSelector((state) => state.editmode);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_DATA_REQUEST" });
    const fetchData = async () => {
      axiosInstance
        .get("/services/")
        .then((response) => {
          setData(response.data);
          setServicesTable(
            response.data.ServiceTable.find((tb) => tb.name === "Tiers")
          );
          setCompetitorsTable(
            response.data.ServiceTable.find((tb) => tb.name === "Competitors")
          );
          // setServices(response.data.ServiceTier);

          console.log();
          setQuizData(
            response.data.Questionnaire.find((tb) => tb.slug === "service-quiz")
          );
          setReady(true);
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

  if (!ready) {
    return null;
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
        serviceData={data.ServiceTier}
        servicesTableData={servicesTable}
        competitorsTableData={competitorsTable}
        benefitsData={data.Benefits}
        blockData={data.TitleBlock[0]}
        quizData={quizData}
        editMode={editmode.editMode}
      />
    </PageContainer>
  );
}

export default ServicesPage;
