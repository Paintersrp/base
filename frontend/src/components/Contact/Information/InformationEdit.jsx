import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import axios from "axios";
import UpdateButton from "../../Elements/Buttons/UpdateButton";
import FormField from "../../Elements/Fields/FormField";
import { baseClasses } from "../../../classes";
import { getCookie } from "../../../Utils";

const useStyles = makeStyles((theme) => ({
  textContainer: {
    display: "flex",
    justifyContent: "center",
  },
  title: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  fieldContainer: {
    width: "90%",
  },
}));

export default function InformationEdit({ initialData, onUpdate }) {
  const classes = useStyles();
  const { fadeIn } = baseClasses();
  const [contactData, setContactData] = useState(initialData);
  const [email, setEmail] = useState(contactData.email);
  const [phone, setPhone] = useState(contactData.phone);
  const [address, setAddress] = useState(contactData.address);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);

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
      <form onSubmit={handleSubmit} className={fadeIn}>
        <Typography variant="h3" className={classes.title}>
          Edit Contact Information
        </Typography>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} className={classes.textContainer}>
            <div className={classes.fieldContainer}>
              <FormField
                key="email"
                label="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <FormField
                label="Phone"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
              <FormField
                label="Address"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
              />
            </div>
          </Grid>
        </Grid>
        <UpdateButton />
      </form>
    </>
  );
}
