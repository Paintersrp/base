import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  TextField,
  Button,
  CardActions,
} from "@material-ui/core";
import axios from "axios";
import { getCookie } from "../../../../Utils";
import UpdateButton from "../../../Elements/Buttons/UpdateButton";
import EditField from "../../../Elements/Fields/EditField";

const useStyles = makeStyles((theme) => ({
  textContainer: {
    display: "flex",
    flexDirection: "column",
  },
  closedText: {
    fontFamily: "Poppins",
    color: "red",
    fontWeight: "600",
  },
  field: {
    margin: 2,
    "& .MuiOutlinedInput-root": {
      padding: 0,
      margin: 5,
      fontSize: "0.85rem",
      width: "100%",

      "& fieldset": {
        borderColor: "black",
      },
      "&:hover fieldset": {
        borderColor: "black",
      },
      "&.Mui-focused fieldset": {
        borderColor: "black",
      },
    },
    "& .MuiFormLabel-root": {
      margin: 5,
      color: "black",
      fontWeight: "700",
      fontSize: "0.9rem",
    },
    "& input": {
      color: "black",
    },
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
    console.log(contactData);
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
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Typography variant="h5" style={{ paddingTop: 40, paddingBottom: 20 }}>
          Edit Social Links
        </Typography>
        <Grid
          container
          spacing={0}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Grid item xs={12} sm={12} className={classes.textContainer}>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
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
