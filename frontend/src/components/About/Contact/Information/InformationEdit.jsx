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

export default function InformationEdit({ initialData, onUpdate }) {
  const classes = useStyles();
  const [contactData, setContactData] = useState(initialData);
  const [email, setEmail] = useState(contactData.email);
  const [phone, setPhone] = useState(contactData.phone);
  const [address, setAddress] = useState(contactData.address);

  const handleChange = (event, day) => {
    setContactData({
      ...contactData,
      [day]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    console.log(contactData);
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
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Typography variant="h5" style={{ paddingTop: 40, paddingBottom: 20 }}>
          Edit Contact Information
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
                label="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <EditField
                label="Phone"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
              <EditField
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
