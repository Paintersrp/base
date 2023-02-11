import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import axios from "axios";
import { getCookie } from "../../../../Utils";
import UpdateButton from "../../../Elements/Buttons/UpdateButton";
import EditField from "../../../Elements/Fields/EditField";

const useStyles = makeStyles(() => ({
  textContainer: {
    display: "flex",
    justifyContent: "center",
  },
  title: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  fieldContainer: {
    width: "85%",
  },
}));

export default function SocialEdit({ initialData, onUpdate }) {
  const classes = useStyles();
  const [contactData, setContactData] = useState(initialData);
  const [facebook, setFacebook] = useState(contactData.facebook);
  const [twitter, setTwitter] = useState(contactData.twitter);
  const [instagram, setInstagram] = useState(contactData.instagram);
  const [linkedIn, setLinkedIn] = useState(contactData.linkedin);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("facebook", facebook);
    formData.append("twitter", twitter);
    formData.append("instagram", instagram);
    formData.append("linkedin", linkedIn);

    const config = {
      headers: {
        Authorization: `JWT ${getCookie("jwt")}`,
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      await axios.patch(`http://localhost:8000/api/contact/`, formData, config);
    } catch (error) {
      console.log(error);
    }
    try {
      const res = await axios.get(`http://localhost:8000/api/contact/`);
      setContactData(res.data);
      onUpdate(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Typography variant="h4" className={classes.title}>
          Edit Social Links
        </Typography>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} className={classes.textContainer}>
            <div className={classes.fieldContainer}>
              <EditField
                label="Facebook"
                value={facebook}
                onChange={(event) => setFacebook(event.target.value)}
              />
              <EditField
                label="Twitter"
                value={twitter}
                onChange={(event) => setTwitter(event.target.value)}
              />
              <EditField
                label="Instagram"
                value={instagram}
                onChange={(event) => setInstagram(event.target.value)}
              />
              <EditField
                label="LinkedIn"
                value={linkedIn}
                onChange={(event) => setLinkedIn(event.target.value)}
              />
            </div>
          </Grid>
        </Grid>
        <UpdateButton />
      </form>
    </>
  );
}
