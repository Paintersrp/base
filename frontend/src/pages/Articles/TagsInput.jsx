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
    margin: theme.spacing(0.5),
  },
  field: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "#e0e0e0",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#e0e0e0",
      },
    },
    "& .MuiFormLabel-root": {
      color: "white",
      fontWeight: "700",
      fontSize: "0.9rem",
    },
    "& input": {
      color: "white",
    },
  },
}));

const TagsInput = ({ tags, setTags }) => {
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
          label="Add Item"
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
                <AddIcon style={{ color: "white" }} />
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
