import React, { useState } from "react";
import axios from "axios";
import { getCookie } from "../../../Utils";
import BaseEditForm from "../../Elements/Base/EditForm/BaseEditForm";
import { useDispatch } from "react-redux";

const QuestionAnswerEdit = ({ QA, onUpdate, onEdit, handleCancel }) => {
  const [formData, setFormData] = useState(QA);
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
      await axios.patch(
        `http://localhost:8000/api/faq/${formData.id}/`,
        formData,
        config
      );
      onUpdate();
      onEdit(false);
      dispatch({ type: "ALERT_SUCCESS", message: "Data Updated" });
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
      width="75%"
      excludeKeys={["errors", "id"]}
      multilineKeys={["answer"]}
      handleCancel={handleCancel}
    />
  );
};

export default QuestionAnswerEdit;
