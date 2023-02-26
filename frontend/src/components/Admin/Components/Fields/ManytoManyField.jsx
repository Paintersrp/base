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
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.text.light,
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

const ManytoManyField = ({ data, fieldName, handleChange }) => {
  console.log("data: ", data);
  const [fields, setFields] = useState(data);
  const [inputValue, setInputValue] = useState("");
  const classes = useStyles();

  const handleAddField = () => {
    if (inputValue) {
      const newField = { fieldName: inputValue };
      const updatedFields = [...fields, newField];
      setFields(updatedFields);
      handleChange(fieldName, updatedFields);
      setInputValue("");
    }
  };

  const handleDeleteTag = (itemToDelete) => () => {
    const updatedFields = fields.filter((item) => item !== itemToDelete);
    handleChange(updatedFields);
    setFields(updatedFields);
  };

  return (
    <div className={classes.root}>
      <Grid style={{ marginTop: 8 }}>
        <TextField
          variant="outlined"
          className={classes.field}
          label={fieldName
            .replace(/_/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase())}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleAdd();
            }
          }}
          InputProps={{
            endAdornment: (
              <IconButton onClick={handleAddField} style={{ marginRight: 8 }}>
                <AddIcon style={{ color: "black" }} />
              </IconButton>
            ),
          }}
        />
        <div>
          {data &&
            data.map((item) => (
              <Chip
                key={item.detail}
                label={item.detail}
                onDelete={handleDeleteTag(item)}
                className={classes.chip}
              />
            ))}
        </div>
      </Grid>
    </div>
  );
};

export default ManytoManyField;
