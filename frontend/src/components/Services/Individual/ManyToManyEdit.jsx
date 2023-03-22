import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { getCookie } from "../../../Utils";
import { useDispatch } from "react-redux";
import ManyToManyField from "../../Elements/Fields/ManyToManyField";
import UpdateCancelButtonMenu from "../../Elements/Buttons/UpdateCancelButtonMenu";
import BaseContent from "../../Elements/Base/BaseContent";

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

const ManyToManyEdit = ({
  data,
  updateData,
  handleCancel,
  title = "Edit Process Text Item",
  endpoint = "processtextitem",
  id,
  fieldName,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(data);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleManyToManyChange = (fieldName, fieldValue) => {
    if (
      fieldName === "features" ||
      fieldName === "supported_sites" ||
      fieldName === "requirements" ||
      fieldName === "responsibilities"
    ) {
      const newFeatures = formData[fieldName] ? [...formData[fieldName]] : [];
      newFeatures.push({ detail: fieldValue });
      setFormData((prevFormData) => ({
        ...prevFormData,
        [fieldName]: newFeatures,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [fieldName]: fieldValue,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("formData", formData);

    const config = {
      headers: {
        Authorization: `JWT ${getCookie("jwt")}`,
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      const res = await axios.patch(
        `http://localhost:8000/api/${endpoint}/${id}/`,
        formData,
        config
      );
      setFormData(res.data);
      updateData(res.data);
      dispatch({ type: "ALERT_SUCCESS", message: "Data Updated" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`${classes.root}`}>
      <BaseContent header={title} pad={2} maxWidth={"90%"}>
        {formData && (
          <form onSubmit={handleSubmit}>
            <ManyToManyField
              data={
                fieldName === "features"
                  ? formData.features
                  : fieldName === "supported_sites"
                  ? formData.supported_sites
                  : fieldName === "requirements"
                  ? formData.requirements
                  : fieldName === "responsibilities"
                  ? formData.responsibilities
                  : null
              }
              setFormData={setFormData}
              fieldName={fieldName}
              verboseName={
                fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
              }
              handleManyToManyChange={handleManyToManyChange}
            />
            <UpdateCancelButtonMenu
              handleCancel={handleCancel}
              position="center"
              placement="bottom"
            />
          </form>
        )}
      </BaseContent>
    </div>
  );
};

export default ManyToManyEdit;
