import React, { useState } from "react";
import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
    padding: 0,
    margin: 0,
    marginBottom: theme.spacing(2),
  },
  chip: {
    borderRadius: 14,
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.secondary.contrastText,
    marginRight: 5,
    marginTop: 5,
    fontWeight: 600,
    fontFamily: "Roboto",
  },
  field: {
    marginBottom: theme.spacing(1.5),
    width: "100%",
    "& .MuiOutlinedInput-root": {
      fontFamily: "Roboto",
      padding: 0,
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
      color: "black",
      fontWeight: "500",
      fontSize: "0.95rem",
    },
    "& input": {
      color: "black",
    },
  },
}));

const TagsInput = ({ tags, setTags, label = "Add Tag" }) => {
  const [inputValue, setInputValue] = useState("");
  const classes = useStyles();

  const handleAddTag = () => {
    if (inputValue) {
      setTags([...tags, inputValue]);
      setInputValue("");
    }
    const newFeatures = formData["tags"] ? [...formData["tags"]] : [];
    newFeatures.push({ name: inputValue });
    setFormData((prevFormData) => ({
      ...prevFormData,
      [tags]: newFeatures,
    }));
  };

  const handleDeleteTag = (tagToDelete) => () => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  return (
    <div className={classes.root}>
      <Grid>
        <TextField
          variant="outlined"
          className={classes.field}
          label={label}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleAddTag();
            }
          }}
          InputProps={{
            endAdornment: (
              <IconButton onClick={handleAddTag} style={{ marginRight: 8 }}>
                <AddIcon style={{ color: "black" }} />
              </IconButton>
            ),
          }}
        />
        <div>
          {tags.map((tag) => (
            <Chip
              key={tag.id}
              label={tag.name}
              onDelete={handleDeleteTag(tag.name)}
              className={classes.chip}
            />
          ))}
        </div>
      </Grid>
    </div>
  );
};

export default TagsInput;
