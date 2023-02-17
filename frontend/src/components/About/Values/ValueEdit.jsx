import React, { useState } from "react";
import axios from "axios";
import { getCookie } from "../../../Utils";
import BaseEditForm from "../../Elements/Base/BaseEditForm";

const ValueEdit = ({ value, onUpdate }) => {
  const [formData, setFormData] = useState(value);

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
      const res = await axios.patch(
        `http://localhost:8000/api/values/${formData.id}/`,
        formData,
        config
      );
      onUpdate(res.data);
      setData(formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BaseEditForm
      title="Edit"
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      formData={formData}
      width="80%"
      excludeKeys={["id"]}
    />
  );
};

export default ValueEdit;
