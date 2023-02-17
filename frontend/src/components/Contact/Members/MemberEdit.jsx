import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import axios from "axios";
import { Grid, InputAdornment, TextField, Typography } from "@material-ui/core";
import { getCookie } from "../../../Utils";
import UpdateButton from "../../Elements/Buttons/UpdateButton";
import FormField from "../../Elements/Fields/FormField";
import { baseClasses } from "../../../classes";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import StyledButton from "../../Elements/Buttons/StyledButton";
import ImageInput from "./ImageInput";
import ImageEdit from "./ImageEdit";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "white",
    color: "black",
  },
  image: {
    width: "50%",
    paddingBottom: "56.25%",
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    paddingBottom: 20,
  },
  imageBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  input: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
    marginLeft: 70,
    display: "none",
  },
  imageHeader: {
    marginBottom: 16,
    paddingBottom: 4,
    borderBottom: "1px solid black",
    textAlign: "center",
  },
  imagePadding: {
    paddingLeft: 4,
    paddingRight: 4,
  },
  field: {
    margin: 2,
    width: "100%",
    "& .MuiOutlinedInput-root": {
      fontFamily: "Roboto",
      padding: 0,
      margin: 0,
      fontSize: "0.9rem",
      fontWeight: "400",
      width: "100%",
      letterSpacing: 0.25,
      alignItems: "center",

      "& fieldset": {
        borderColor: "black",
        alignItems: "center",
      },
      "&:hover fieldset": {
        borderColor: "black",
      },
      "&.Mui-focused fieldset": {
        borderColor: "black",
      },
    },
    "& .MuiFormLabel-root": {
      alignItems: "center",
      fontFamily: "Roboto",
      color: "black",
      fontWeight: "500",
      fontSize: "0.8rem",
      letterSpacing: 0.5,
    },
    "& input": {
      color: "black",
    },
  },
}));

const MemberEdit = ({ member, onUpdate }) => {
  const classes = useStyles();
  const { fadeIn } = baseClasses();
  const [newImage, setNewImage] = useState(null);
  const [newImageName, setNewImageName] = useState(null);
  const [formData, setFormData] = useState(member);

  const handleChange = (event) => {
    if (event.target.name === "image") {
      setFormData({
        ...formData,
        [event.target.name]: event.target.files[0],
      });
      setNewImage(URL.createObjectURL(event.target.files[0]));
      setNewImageName(event.target.files[0].name);
    } else {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.image) {
      formData.image = member.image;
    }

    const config = {
      headers: {
        Authorization: `JWT ${getCookie("jwt")}`,
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      const res = await axios.patch(
        `http://localhost:8000/api/members/${formData.id}/`,
        formData,
        config
      );
    } catch (error) {
      console.log(error);
    }
    try {
      const res = await axios.get(
        `http://localhost:8000/api/members/${formData.id}/`
      );
      console.log(res.data);
      onUpdate(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    document.getElementById("file-input").click();
  };

  return (
    <div className={`${classes.root} ${fadeIn}`}>
      <Card className={classes.card} elevation={0}>
        <form onSubmit={handleSubmit}>
          <CardContent style={{ paddingTop: 0, paddingBottom: 0 }}>
            <Grid container flex justifyContent="center">
              {formData.image && (
                <ImageEdit header="Current Image" image={`${member.image}/`} />
              )}
              {newImage ? (
                <ImageEdit header="New Image" image={`${newImage}`} />
              ) : null}
            </Grid>
            <ImageInput
              handleChange={handleChange}
              handleClick={handleClick}
              newImage={newImage}
              newImageName={newImageName}
            />
            {Object.keys(formData).map((key) => {
              if (key !== "image" && key !== "errors" && key !== "id") {
                return (
                  <FormField
                    key={key}
                    id={key}
                    label={key.charAt(0).toUpperCase() + key.slice(1)}
                    value={formData[key]}
                    onChange={handleChange}
                    multiline={key === "bio"}
                  />
                );
              }
            })}
          </CardContent>
          <UpdateButton />
        </form>
      </Card>
    </div>
  );
};

export default MemberEdit;
