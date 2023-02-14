import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import EditField from "../../Fields/EditField";
import UpdateButton from "../../Buttons/UpdateButton";
import { getCookie } from "../../../../utils";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
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

const HeroBlockEdit = ({ heroblock, updateHeroBlock }) => {
  const classes = useStyles();
  const [title, setTitle] = useState(heroblock.title);
  const [heading, setHeading] = useState(heroblock.heading);
  const [text, setText] = useState(heroblock.text);
  const [buttonText, setButtonText] = useState(heroblock.buttonText);

  const handleSubmit = async (e) => {
    console.log("test");
    e.preventDefault();
    let formData = new FormData();
    formData.append("title", title);
    formData.append("heading", heading);
    formData.append("text", text);
    formData.append("buttonText", buttonText);

    const config = {
      headers: {
        Authorization: `JWT ${getCookie("jwt")}`,
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      const res = await axios.patch(
        `http://localhost:8000/api/heroblock/`,
        formData,
        config
      );
      console.log(res.data);
      setTitle(res.data.title);
      setHeading(res.data.heading);
      setText(res.data.text);
      setButtonText(res.data.buttonText);
      updateHeroBlock(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={classes.fadeIn}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: "85%" }}>
          <EditField
            label="Title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <EditField
            label="Heading"
            value={heading}
            onChange={(event) => setHeading(event.target.value)}
          />
          <EditField
            label="Text"
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
          <EditField
            label="Button Text"
            value={buttonText}
            onChange={(event) => setButtonText(event.target.value)}
          />
          <UpdateButton />
        </div>
      </div>
    </form>
  );
};

export default HeroBlockEdit;
