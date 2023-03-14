import React, { useState } from "react";
import axios from "axios";
import { getCookie } from "../../../Utils";
import BaseEditForm from "../../Elements/Base/EditForm/BaseEditForm";
import { useDispatch } from "react-redux";

export default function InformationEdit({
  initialData,
  onUpdate,
  handleCancel,
}) {
  const [formData, setFormData] = useState(initialData);
  const dispatch = useDispatch();

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
      await axios
        .patch(
          `http://localhost:8000/api/contactinformation/1/`,
          formData,
          config
        )
        .then((res) => {
          setFormData(res.data);
          onUpdate(res.data);
          dispatch({ type: "ALERT_SUCCESS", message: "Data Updated" });
        });
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
