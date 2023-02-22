import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import JobPosting from "../Individual/JobsIndividual";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../../lib/Axios/axiosInstance";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100vw",
    minHeight: "77.5vh",
    justifyContent: "center",
    padding: theme.spacing(3, 2),
  },
}));

const JobIndividualView = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [job, setJob] = useState(null);

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
  }, []);

  return (
    <div className={`${classes.root}`}>{job && <JobPosting job={job} />}</div>
  );
};

export default JobIndividualView;
