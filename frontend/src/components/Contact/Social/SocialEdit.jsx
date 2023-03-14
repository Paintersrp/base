import React, { useState } from "react";
import axios from "axios";
import { getCookie } from "../../../Utils";
import BaseEditForm from "../../Elements/Base/EditForm/BaseEditForm";
import { useDispatch } from "react-redux";

export default function SocialEdit({ initialData, onUpdate, handleCancel }) {
  const dispatch = useDispatch();
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
      await axios.patch(
        `http://localhost:8000/api/contactinformation/1/`,
        formData,
        config
      );
      dispatch({ type: "ALERT_SUCCESS", message: "Data Updated" });
    } catch (error) {
      console.log(error);
    }
    try {
      const res = await axios.get(
        `http://localhost:8000/api/contactinformation/1/`
      );
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
      width="75%"
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
