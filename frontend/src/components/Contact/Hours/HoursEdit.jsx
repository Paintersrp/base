import React, { useState } from "react";
import axios from "axios";
import { getCookie } from "../../../Utils";
import BaseEditForm from "../../Elements/Base/EditForm/BaseEditForm";
import { useDispatch } from "react-redux";

export default function EditHours({ initialData, onUpdate, handleCancel }) {
  const [contactData, setContactData] = useState(initialData);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setContactData({
      ...contactData,
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
          contactData,
          config
        )
        .then((res) => {
          setContactData(res.data);
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
