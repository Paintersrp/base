import React, { useState } from "react";
import axios from "axios";
import { getCookie } from "../../../../Utils";
import BaseEditForm from "../../../Elements/Base/EditForm/BaseEditForm";
import { useDispatch } from "react-redux";

export default function JobEdit({
  initialData,
  setJob,
  handleCancel,
  updateJobData,
}) {
  console.log(initialData.requirements);
  const [contactData, setContactData] = useState(initialData);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setContactData({
      ...contactData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSwitchChange = (event) => {
    setContactData({
      ...contactData,
      [event.target.name]: event.target.checked,
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
          `http://localhost:8000/api/jobposting/${contactData.id}/`,
          contactData,
          config
        )
        .then((res) => {
          setContactData(res.data);
          console.log(res.data);
          updateJobData(res.data);
          dispatch({ type: "ALERT_SUCCESS", message: "Data Updated" });
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <BaseEditForm
        title="Edit Job Details"
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        formData={contactData}
        width="100%"
        excludeKeys={[
          "id",
          "created_at",
          "requirements",
          "responsibilities",
          "filled",
        ]}
        multilineKeys={["who_we_are", "looking_for", "why_apply"]}
        handleCancel={handleCancel}
      />
    </>
  );
}
