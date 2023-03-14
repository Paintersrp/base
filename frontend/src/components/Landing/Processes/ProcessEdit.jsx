import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import BaseEditForm from "../../Elements/Base/EditForm/BaseEditForm";
import { getCookie } from "../../../Utils";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    justifyContent: "center",
  },
  card: {
    backgroundColor: theme.palette.background.light,
    color: theme.palette.text.dark,
    width: "100%",
    boxShadow: theme.shadows[0],
  },
  input: {
    width: "100%",
  },
  button: {
    minWidth: 140,
    boxShadow: theme.shadows[3],
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&:hover": {
      transform: "scale(1.01)",
      boxShadow: theme.shadows[14],
      backgroundColor: theme.palette.action.hover,
    },
  },
  field: {
    "& .MuiOutlinedInput-root": {
      padding: 0,
      margin: 5,
      fontSize: "0.8rem",
      width: "100%",

      "& fieldset": {
        borderColor: theme.palette.text.dark,
      },
      "&:hover fieldset": {
        borderColor: theme.palette.text.dark,
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.text.dark,
      },
    },
    "& .MuiFormLabel-root": {
      margin: 5,
      color: theme.palette.text.dark,
      fontWeight: "600",
      fontSize: "0.85rem",
    },
    "& input": {
      color: theme.palette.text.dark,
    },
  },
  multiline: {
    marginTop: 5,
    marginBottom: 5,
    "& .MuiOutlinedInput-inputMultiline": {
      color: theme.palette.text.dark,
    },
    "& .MuiOutlinedInput-input": {
      color: theme.palette.text.dark,
      textAlign: "left",
    },
    "& .MuiOutlinedInput-root": {
      padding: 10,
      marginLeft: 5,
      fontSize: "0.8rem",
      width: "100%",
      "& fieldset": {
        borderColor: theme.palette.text.dark,
      },
      "&:hover fieldset": {
        borderColor: theme.palette.text.dark,
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.text.dark,
      },
    },
    "& .MuiFormLabel-root": {
      color: theme.palette.text.dark,
      marginLeft: 5,
      fontWeight: "700",
      fontSize: "0.8rem",
    },
    "& input": {
      color: theme.palette.text.dark,
    },
  },
  fadeIn: {
    opacity: 0,
    animation: `$fadeIn 0.5s ease-in-out forwards`,
  },
  "@keyframes fadeIn": {
    from: {
      opacity: 0,
      transform: "translateY(-30px)",
    },
    to: {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
}));

const ProcessEdit = ({ process, updateProcess, handleCancel }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(process);

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
        `http://localhost:8000/api/process/${process.id}/`,
        formData,
        config
      );
      setFormData(res.data);
      updateProcess(res.data);
      dispatch({ type: "ALERT_SUCCESS", message: "Data Updated" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`${classes.root}`}>
      <BaseEditForm
        title="Edit Process Item"
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        formData={formData}
        width="90%"
        excludeKeys={["id", "icon"]}
        multilineKeys={["description"]}
        handleCancel={handleCancel}
        iconMixin
      />
    </div>
  );
};

export default ProcessEdit;
