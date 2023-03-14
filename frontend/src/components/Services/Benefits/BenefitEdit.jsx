import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import BaseEditForm from "../../Elements/Base/EditForm/BaseEditForm";
import { useDispatch } from "react-redux";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

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

const BenefitEdit = ({ benefit, updateBenefit, handleCancel }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState(benefit);
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
          `http://localhost:8000/api/benefits/${benefit.id}/`,
          formData,
          config
        )
        .then((res) => {
          console.log("benefit", res.data);
          setFormData(res.data);
          updateBenefit(res.data);
          dispatch({ type: "ALERT_SUCCESS", message: "Data Updated" });
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`${classes.root}`}>
      <BaseEditForm
        title="Edit Benefit Item"
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        formData={formData}
        width="100%"
        excludeKeys={["id", "icon"]}
        multilineKeys={["description"]}
        handleCancel={handleCancel}
        iconMixin
      />
    </div>
  );
};

export default BenefitEdit;
