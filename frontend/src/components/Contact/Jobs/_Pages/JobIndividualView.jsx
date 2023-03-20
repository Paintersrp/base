import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import JobPosting from "../Individual/JobsIndividual";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../../lib/Axios/axiosInstance";
import FABMenu from "../../../Elements/Buttons/FABAdminMenu";
import PageContainer from "../../../Elements/Layout/PageContainer";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100vw",
    minHeight: "77.5vh",
    justifyContent: "center",
    padding: theme.spacing(3, 2),
    backgroundColor: theme.palette.background.light,
  },
}));

const JobIndividualView = ({ handleUpdate }) => {
  const classes = useStyles();
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    axiosInstance
      .get(`/jobposting/${id}/`)
      .then((response) => {
        console.log("job", response.data);
        setJob(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <PageContainer
      editing={editing}
      setEditing={setEditing}
      backgroundColor="#F5F5F5"
      page_name="Default"
    >
      <div style={{ maxWidth: "100%" }}>
        <FABMenu
          editing={editing}
          setEditing={setEditing}
          handleUpdate={handleUpdate}
        />
        {job && <JobPosting job={job} setJob={setJob} />}
      </div>
    </PageContainer>
  );
};

export default JobIndividualView;
