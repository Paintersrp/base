import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import axios from "axios";
import UpdateButton from "../../Elements/Buttons/UpdateButton";
import FormField from "../../Elements/Fields/FormField";
import { getCookie } from "../../../Utils";
import BaseEditForm from "../../Elements/Base/EditForm/BaseEditForm";

const useStyles = makeStyles((theme) => ({
  textContainer: {
    display: "flex",
    justifyContent: "center",
  },
  title: {
    paddingTop: theme.spacing(2),
    paddingBottom: 20,
  },
  fieldContainer: {
    width: "90%",
  },
}));

export default function EditHours({ initialData, onUpdate, handleCancel }) {
  const classes = useStyles();
  const [contactData, setContactData] = useState(initialData);

  const handleChange = (event, day) => {
    setContactData({
      ...contactData,
      [day]: event.target.value,
    });
  };

  const days = [
    { day: "Monday", value: contactData.monday },
    { day: "Tuesday", value: contactData.tuesday },
    { day: "Wednesday", value: contactData.wednesday },
    { day: "Thursday", value: contactData.thursday },
    { day: "Friday", value: contactData.friday },
    { day: "Saturday", value: contactData.saturday },
    { day: "Sunday", value: contactData.sunday },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        Authorization: `JWT ${getCookie("jwt")}`,
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      await axios.patch(
        `http://localhost:8000/api/contact/`,
        contactData,
        config
      );
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
      <BaseEditForm
        title="Edit Business Hours"
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        formData={contactData}
        width="90%"
        excludeKeys={[
          "id",
          "facebook",
          "linkedin",
          "instagram",
          "twitter",
          "email",
          "address",
          "phone",
        ]}
        multilineKeys={[""]}
        handleCancel={handleCancel}
      />
    </>
  );
}
