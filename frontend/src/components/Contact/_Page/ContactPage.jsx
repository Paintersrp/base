import React, { useEffect, useState } from "react";
import PageContainer from "../../Elements/Layout/PageContainer";
import { Grid, makeStyles } from "@material-ui/core";
import axiosInstance from "../../../lib/Axios/axiosInstance";
import Members from "../Members/Members";
import Contact from "../Contact/Contact";
import Loading from "../../Elements/Layout/Loading/Loading";
import JobListing from "../Jobs/Listing/Listing";
import FABMenu from "../../Elements/Buttons/FABAdminMenu";
import { useDispatch, useSelector } from "react-redux";
import ErrorPage from "../../Elements/Layout/Errors/ErrorPage";

const useStyles = makeStyles((theme) => ({
  quizContainer: {
    color: theme.palette.text.dark,
    maxWidth: "100%",
  },
}));

function ContactPage({ handleUpdate }) {
  const classes = useStyles();
  const [error, setError] = useState(false);
  const [editing, setEditing] = useState(false);
  const [metadata, setMetaData] = useState({});
  const [membersData, setMembersData] = useState(null);
  const [contactData, setContactData] = useState(null);
  const [socialData, setSocialData] = useState(null);
  const [hoursData, setHoursData] = useState(null);
  const [jobsData, setJobsData] = useState(null);
  const dispatch = useDispatch();
  const editmode = useSelector((state) => state.editmode);

  useEffect(() => {
    dispatch({ type: "FETCH_DATA_REQUEST" });
    const fetchData = async () => {
      axiosInstance
        .get("/appinfo/")
        .then((response) => {
          setMembersData(response.data.TeamMember);
          setContactData(response.data.ContactInformation);
          setSocialData(response.data.Socials);
          setHoursData(response.data.Hours);
          setJobsData(response.data.JobPosting);
        })
        .then(dispatch({ type: "FETCH_DATA_SUCCESS" }))
        .catch((err) => {
          setError(err.error);
          console.log(err.error);
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
      page_name="Contact"
    >
      <FABMenu
        editing={editing}
        setEditing={setEditing}
        handleUpdate={handleUpdate}
      />
      {membersData && contactData && jobsData ? (
        <Grid container justifyContent="center" style={{ display: "flex" }}>
          <div style={{ maxWidth: 1400, width: "100%" }}>
            <Members membersData={membersData} editMode={editmode.editMode} />
            <JobListing jobsData={jobsData} editMode={editmode.editMode} />
            <Contact
              color="dark"
              contactData={contactData}
              hoursData={hoursData}
              socialData={socialData}
              editMode={editmode.editMode}
            />
          </div>
        </Grid>
      ) : null}
    </PageContainer>
  );
}

export default ContactPage;
