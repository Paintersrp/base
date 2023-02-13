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
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: theme.palette.background.dark,
      },
      "&:hover fieldset": {
        borderColor: theme.palette.background.dark,
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.background.dark,
      },
    },
    "& .MuiFormLabel-root": {
      color: theme.palette.text.dark,
      fontWeight: "700",
      fontSize: "0.9rem",
    },
    "& input": {
      color: theme.palette.text.dark,
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
              <IconButton onClick={handleAddTag}>
                <AddIcon style={{ color: "black" }} />
              </IconButton>
            ),
          }}
        />
        <div style={{ paddingTop: 10 }}>
          {tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              onDelete={handleDeleteTag(tag)}
              className={classes.chip}
            />
          ))}
        </div>
      </Grid>
    </div>
  );
};

export default TagsInput;
