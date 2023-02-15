import React, { useEffect, useState } from "react";
import ContentLayout from "../../Elements/Layout/ContentLayout";
import { Grid, makeStyles } from "@material-ui/core";
import axiosInstance from "../../../lib/Axios/axiosInstance";
import Members from "../Members/Members";
import Contact from "../Contact/Contact";

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

  useEffect(() => {
    const fetchData = async () => {
      axiosInstance
        .get("/about/")
        .then((response) => {
          setMembersData(response.data.team_members);
          setContactData(response.data.contact_information);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, []);

  return (
    <ContentLayout
      title="About Company"
      description="Where the info be yo."
      keywords="news, posts, articles, touch"
      image="https://example.com/image.png"
      url="https://example.com/example-page"
      backgroundColor="white"
    >
      <Grid container justifyContent="center" style={{ display: "flex" }}>
        <div style={{ maxWidth: 1400, width: "100%" }}>
          {membersData ? <Members membersData={membersData} /> : null}
          {contactData ? (
            <Contact color="dark" contactData={contactData} />
          ) : null}
        </div>
      </Grid>
    </ContentLayout>
  );
}

export default ContactPage;
