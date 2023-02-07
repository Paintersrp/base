import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import axiosInstance from "../../../../lib/Axios/axiosInstance";

const HeroBlockEdit = ({ heroblock, updateHeroBlock }) => {
  const [title, setTitle] = useState(heroblock.title);
  const [heading, setHeading] = useState(heroblock.heading);
  const [text, setText] = useState(heroblock.text);
  const [buttonText, setButtonText] = useState(heroblock.buttonText);

  const handleSave = async () => {
    const updatedHeroBlock = { title, heading, text, buttonText };
    try {
      axiosInstance.patch("/heroblock/", updatedHeroBlock).then((response) => {
        console.log(response.data.btn_text);
        setTitle(response.data.title);
        setHeading(response.data.heading);
        setText(response.data.text);
        setButtonText(response.data.buttonText);
      });
      updateHeroBlock(updatedHeroBlock);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <TextField
        label="Title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <TextField
        label="Heading"
        value={heading}
        onChange={(event) => setHeading(event.target.value)}
      />
      <TextField
        label="Text"
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <TextField
        label="Button Text"
        value={buttonText}
        onChange={(event) => setButtonText(event.target.value)}
      />
      <div>
        <Button onClick={handleSave}>Save</Button>
      </div>
    </div>
  );
};

export default HeroBlockEdit;
