import React, { useEffect, useState } from "react";
import ContentLayout from "../../Elements/Layout/ContentLayout";
import { Grid, makeStyles } from "@material-ui/core";
import axiosInstance from "../../../lib/Axios/axiosInstance";
import Members from "../Members/Members";
import Contact from "../Contact/Contact";
import Loading from "../../Elements/Layout/Loading";
import JobListing from "../Jobs/Listing/Listing";

const useStyles = makeStyles((theme) => ({
  quizContainer: {
    color: theme.palette.text.dark,
    maxWidth: "100%",
  },
}));

function ContactPage() {
  const classes = useStyles();
  const [membersData, setMembersData] = useState(null);
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      axiosInstance
        .get("/about/")
        .then((response) => {
          setMembersData(response.data.team_members);
          setContactData(response.data.contact_information);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className={classes.loading}>
        <Loading message="Test" />
      </div>
    );
  }

  return (
    <ContentLayout
      title="About Company"
      description="Where the info be yo."
      keywords="news, posts, articles, touch"
      image="https://example.com/image.png"
      url="https://example.com/example-page"
      backgroundColor="white"
    >
      {membersData && contactData ? (
        <Grid container justifyContent="center" style={{ display: "flex" }}>
          <div style={{ maxWidth: 1400, width: "100%" }}>
            <Members membersData={membersData} />
            <JobListing />
            <Contact color="dark" contactData={contactData} />
          </div>
        </Grid>
      ) : null}
    </ContentLayout>
  );
}

export default ContactPage;
