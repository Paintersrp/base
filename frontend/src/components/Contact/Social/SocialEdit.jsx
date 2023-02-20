import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import axios from "axios";
import { getCookie } from "../../../Utils";
import UpdateButton from "../../Elements/Buttons/UpdateButton";
import FormField from "../../Elements/Fields/FormField";
import { baseClasses } from "../../../classes";
import BaseEditForm from "../../Elements/Base/EditForm/BaseEditForm";

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
    width: "50%",
  },
}));

export default function SocialEdit({ initialData, onUpdate, handleCancel }) {
  const classes = useStyles();
  const { fadeIn } = baseClasses();

  const [formData, setFormData] = useState(initialData);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    <BaseEditForm
      title="Edit Socials"
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      formData={formData}
      width="35%"
      excludeKeys={[
        "id",
        "email",
        "phone",
        "address",
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
  );
}
