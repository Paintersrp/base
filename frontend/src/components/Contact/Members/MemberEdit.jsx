import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import axios from "axios";
import { Grid, InputAdornment, TextField } from "@material-ui/core";
import { getCookie } from "../../../Utils";
import UpdateButton from "../../Elements/Buttons/UpdateButton";
import FormField from "../../Elements/Fields/FormField";
import { baseClasses } from "../../../classes";
import ImageEdit from "./ImageEdit";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import StyledButton from "../../Elements/Buttons/StyledButton";

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
      margin: 5,
      fontSize: "0.9rem",
      fontWeight: "400",
      width: "100%",
      letterSpacing: 0.25,

      "& fieldset": {
        borderColor: "black",
      },
      "&:hover fieldset": {
        borderColor: "black",
      },
      "&.Mui-focused fieldset": {
        borderColor: "black",
      },
    },
    "& .MuiFormLabel-root": {
      fontFamily: "Roboto",
      margin: 4,
      color: "black",
      fontWeight: "450",
      fontSize: "1rem",
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
  const [formData, setFormData] = useState({
    id: member.id,
    name: member.name,
    role: member.role,
    bio: member.bio,
    linkedIn: member.linkedIn,
    github: member.github,
    twitter: member.twitter,
    image: member.image,
    errors: {},
  });

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

    const config = {
      headers: {
        Authorization: `JWT ${getCookie("jwt")}`,
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      await axios.patch(
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
            <div className="">
              <div>
                <input
                  accept="image/*"
                  className={classes.input}
                  id="file-input"
                  name="image"
                  type="file"
                  onChange={handleChange}
                />
                <TextField
                  margin="dense"
                  className={classes.field}
                  id="file-textfield"
                  label={!newImage ? "Upload Image" : newImageName}
                  variant="outlined"
                  disabled
                  InputProps={{
                    endAdornment: !newImage ? (
                      <InputAdornment position="end">
                        <StyledButton
                          buttonText="Upload"
                          onClick={handleClick}
                          startIcon={<CloudUploadIcon />}
                        />
                      </InputAdornment>
                    ) : (
                      <InputAdornment position="end">
                        <StyledButton
                          buttonText="Change"
                          onClick={handleClick}
                          startIcon={<CloudUploadIcon />}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
            </div>
            {Object.keys(formData).map((key) => {
              if (key !== "image" && key !== "errors") {
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
