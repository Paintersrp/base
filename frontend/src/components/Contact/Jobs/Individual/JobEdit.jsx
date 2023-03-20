import React, { useState } from "react";
import axios from "axios";
import { getCookie } from "../../../../Utils";
import BaseEditForm from "../../../Elements/Base/EditForm/BaseEditForm";
import { useDispatch } from "react-redux";

export default function JobEdit({ initialData, setJob, handleCancel }) {
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
          `http://localhost:8000/api/jobposting/${initialData.id}/`,
          contactData,
          config
        )
        .then((res) => {
          setContactData(res.data);
          console.log(res.data);
          //   onUpdate(res.data);
          dispatch({ type: "ALERT_SUCCESS", message: "Data Updated" });
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleManyToManyChange = (fieldName, fieldValue) => {
    if (fieldName === "features" || fieldName === "supported_sites") {
      const newFeatures = formData[fieldName] ? [...formData[fieldName]] : [];
      newFeatures.push({ detail: fieldValue });
      setJob((prevFormData) => ({
        ...prevFormData,
        [fieldName]: newFeatures,
      }));
    } else if (fieldName === "items") {
      setJob((prevFormData) => ({
        ...prevFormData,
        [fieldName]: [...prevFormData[fieldName], fieldValue],
      }));
    } else {
      setJob((prevFormData) => ({
        ...prevFormData,
        [fieldName]: fieldValue,
      }));
    }
  };

  return (
    <>
      <BaseEditForm
        title="Edit Job Details"
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleSwitchChange={handleSwitchChange}
        handleManyToManyChange={handleManyToManyChange}
        formData={contactData}
        setFormData={setContactData}
        width="90%"
        excludeKeys={[
          "id",
          "created_at",
          "requirements",
          "responsibilities",
          "filled",
        ]}
        multilineKeys={["who_we_are", "why_apply", "looking_for"]}
        handleCancel={handleCancel}
        jobMixin
      />
    </>
  );
}
