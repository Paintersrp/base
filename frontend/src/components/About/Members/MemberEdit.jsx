import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import axios from "axios";
import { CardMedia, Typography } from "@material-ui/core";
import { getCookie } from "../../../Utils";
import UpdateButton from "../../Elements/Buttons/UpdateButton";
import EditField from "../../Elements/Fields/EditField";

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

  const fields = [
    {
      label: "Name",
      value: name,
      onChange: (event) => setName(event.target.value),
    },
    {
      label: "Role",
      value: role,
      onChange: (event) => setRole(event.target.value),
    },
    {
      label: "Bio",
      value: bio,
      onChange: (event) => setBio(event.target.value),
      multiline: true,
    },
    {
      label: "LinkedIn",
      value: linkedIn,
      onChange: (event) => setLinkedIn(event.target.value),
    },
    {
      label: "Github",
      value: github,
      onChange: (event) => setGithub(event.target.value),
    },
    {
      label: "Twitter",
      value: twitter,
      onChange: (event) => setTwitter(event.target.value),
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("name", name);
    formData.append("role", role);
    formData.append("bio", bio);
    formData.append("linkedIn", linkedIn);
    formData.append("github", github);
    formData.append("twitter", twitter);
    if (image) {
      formData.append("image", image);
    }

    const config = {
      headers: {
        Authorization: `JWT ${getCookie("jwt")}`,
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      await axios.patch(
        `http://localhost:8000/api/members/${data.id}/`,
        formData,
        config
      );
    } catch (error) {
      console.log(error);
    }
    try {
      const res = await axios.get(
        `http://localhost:8000/api/members/${data.id}/`
      );
      setData(res.data);
      onUpdate(res.data);
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
            {fields.map((field) => (
              <EditField
                label={field.label}
                value={field.value}
                onChange={field.onChange}
                multiline={field.multiline}
              />
            ))}
          </CardContent>
          <UpdateButton />
        </form>
      </Card>
    </div>
  );
};

export default MemberEdit;
