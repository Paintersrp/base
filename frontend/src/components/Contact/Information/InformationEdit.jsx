import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import axios from "axios";
import UpdateButton from "../../Elements/Buttons/UpdateButton";
import FormField from "../../Elements/Fields/FormField";
import { baseClasses } from "../../../classes";
import { getCookie } from "../../../Utils";
import BaseEditForm from "../../Elements/Base/EditForm/BaseEditForm";

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

export default function InformationEdit({
  initialData,
  onUpdate,
  handleCancel,
}) {
  const classes = useStyles();
  const { fadeIn } = baseClasses();
  // const [contactData, setContactData] = useState(initialData);
  // const [email, setEmail] = useState(contactData.email);
  // const [phone, setPhone] = useState(contactData.phone);
  // const [address, setAddress] = useState(contactData.address);

  const [formData, setFormData] = useState(initialData);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // let formData = new FormData();
    // formData.append("email", email);
    // formData.append("phone", phone);
    // formData.append("address", address);

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
      setFormData(res.data);
      onUpdate(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <BaseEditForm
        title="Edit Contact Information"
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        formData={formData}
        width="90%"
        excludeKeys={[
          "id",
          "facebook",
          "linkedin",
          "instagram",
          "twitter",
          "monday",
          "tuesday",
          "wednesday",
          "thursday",
          "friday",
          "saturday",
          "sunday",
        ]}
        multilineKeys={[""]}
        handleCancel={handleCancel}
      />
    </>
  );
}
