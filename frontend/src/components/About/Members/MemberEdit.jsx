import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { CardMedia, TextField, Typography } from "@material-ui/core";
import { getCookie } from "../../../Utils";
import UpdateButton from "../../Elements/Buttons/UpdateButton";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "white",
    color: "black",
  },
  input: {
    width: "100%",
  },
  button: {
    boxShadow: theme.shadows[3],
    backgroundColor: theme.palette.primary.main,
    color: "black",
    "&:hover": {
      transform: "scale(1.01)",
      boxShadow: theme.shadows[14],
      backgroundColor: theme.palette.action.hover,
    },
  },
  field: {
    margin: 2,
    "& .MuiOutlinedInput-root": {
      padding: 0,
      margin: 5,
      fontSize: "0.85rem",
      width: "100%",

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
      margin: 5,
      color: "black",
      fontWeight: "700",
      fontSize: "0.9rem",
    },
    "& input": {
      color: "black",
    },
  },
  multiline: {
    marginTop: 5,
    marginBottom: 5,
    "& .MuiOutlinedInput-inputMultiline": {
      color: "black",
    },
    "& .MuiOutlinedInput-input": {
      color: "black",
      textAlign: "left",
    },
    "& .MuiOutlinedInput-root": {
      padding: 10,
      marginLeft: 5,
      fontSize: "0.85rem",
      width: "100%",
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
      color: "black",
      marginLeft: 5,
      fontWeight: "700",
      fontSize: "0.9rem",
    },
    "& input": {
      color: "black",
    },
  },
  image: {
    width: "50%",
    paddingBottom: "56.25%",
  },
}));

const MemberEdit = ({ member, onUpdate }) => {
  const classes = useStyles();
  const [data, setData] = useState(member);
  const [name, setName] = useState(data.name);
  const [role, setRole] = useState(data.role);
  const [bio, setBio] = useState(data.bio);
  const [linkedIn, setLinkedIn] = useState(data.linkedIn);
  const [github, setGithub] = useState(data.github);
  const [twitter, setTwitter] = useState(data.twitter);
  const [image, setImage] = useState(data.image);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("title", title);
    formData.append("icon", icon);

    const config = {
      headers: {
        Authorization: `JWT ${getCookie("jwt")}`,
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      await axios.patch(
        `http://localhost:8000/api/values/${data.id}/`,
        formData,
        config
      );
    } catch (error) {
      console.log(error);
    }
    try {
      const res = await axios.get(
        `http://localhost:8000/api/values/${data.id}/`
      );
      setData(res.data);
      onUpdate(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.root}>
      <Card className={classes.card} elevation={0}>
        <form onSubmit={handleSubmit}>
          <CardContent style={{ paddingTop: 0, paddingBottom: 0 }}>
            {data.image && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingBottom: 20,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "50%",
                  }}
                >
                  <CardMedia className={classes.image} image={`${image}/`} />
                </div>
              </div>
            )}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: 20,
                marginLeft: 70,
              }}
            >
              <Typography style={{ color: "black" }}>
                <input
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </Typography>
            </div>
            <TextField
              className={classes.field}
              variant="outlined"
              label="Name"
              margin="dense"
              value={name}
              style={{ width: "100%" }}
              onChange={(event) => setTitle(event.target.value)}
            />
            <TextField
              className={classes.field}
              variant="outlined"
              label="Role"
              margin="dense"
              value={role}
              style={{ width: "100%" }}
              onChange={(event) => setTitle(event.target.value)}
            />
            <TextField
              className={classes.multiline}
              variant="outlined"
              label="Bio"
              margin="dense"
              value={bio}
              style={{ width: "100%" }}
              onChange={(event) => setTitle(event.target.value)}
              multiline
              minRows="5"
            />
            <TextField
              className={classes.field}
              variant="outlined"
              label="LinkedIn"
              margin="dense"
              value={linkedIn}
              style={{ width: "100%" }}
              onChange={(event) => setTitle(event.target.value)}
            />
            <TextField
              className={classes.field}
              variant="outlined"
              label="Github"
              margin="dense"
              value={github}
              style={{ width: "100%" }}
              onChange={(event) => setTitle(event.target.value)}
            />
            <TextField
              className={classes.field}
              variant="outlined"
              label="Twitter"
              margin="dense"
              value={twitter}
              style={{ width: "100%" }}
              onChange={(event) => setTitle(event.target.value)}
            />
          </CardContent>
          <UpdateButton />
        </form>
      </Card>
    </div>
  );
};

export default MemberEdit;
