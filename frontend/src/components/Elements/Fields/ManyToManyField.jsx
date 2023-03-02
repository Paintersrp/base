import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme, TextField, Chip, Grid, IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  chip: {
    margin: theme.spacing(0.5),
    border: "2px solid black",
    color: theme.palette.text.dark,
    background: "#F5F5F5",
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
}));

const ManyToManyField = ({
  data = {},
  fieldName,
  verboseName,
  handleManyToManyChange,
  setFormData,
}) => {
  const classes = useStyles();
  const [items, setItems] = useState(data);
  const [newFeature, setNewFeature] = useState("");
  const theme = useTheme();

  const handleDeleteManyToMany = (fieldName, feature) => () => {
    setFormData((prevFormData) => {
      const newFeatures = prevFormData[fieldName].filter(
        (prevFeature) => prevFeature.detail !== feature.detail
      );
      setItems(newFeatures);
      return {
        ...prevFormData,
        [fieldName]: newFeatures,
      };
    });
  };

  const handleAddFeature = () => {
    if (newFeature) {
      setItems((prevFeatures) => {
        if (Array.isArray(prevFeatures)) {
          return [...prevFeatures, { detail: newFeature }];
        } else {
          return [{ detail: newFeature }];
        }
      });
      handleManyToManyChange(fieldName, newFeature);
      setNewFeature("");
    }
  };

  const handleFeatureInputChange = (event) => {
    setNewFeature(event.target.value);
  };

  return (
    <div style={{ width: "100%" }}>
      <div>
        <TextField
          variant="outlined"
          label={`Add ${verboseName}`}
          value={newFeature}
          onChange={handleFeatureInputChange}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              handleAddFeature();
            }
          }}
          margin="dense"
          fullWidth
          InputProps={{
            endAdornment: (
              <IconButton size="small" onClick={handleAddFeature}>
                <AddIcon style={{ color: "black" }} />
              </IconButton>
            ),
          }}
        />
      </div>
      <Grid container>
        {items.length > 0 &&
          items.map((feature, index) => (
            <Chip
              key={index}
              label={feature.detail}
              onDelete={handleDeleteManyToMany(fieldName, feature)}
              className={classes.chip}
              style={{
                borderColor:
                  index % 4 === 0
                    ? theme.palette.primary.dark
                    : index % 4 === 1
                    ? theme.palette.secondary.dark
                    : index % 4 === 2
                    ? theme.palette.primary.light
                    : theme.palette.secondary.main,
              }}
            />
          ))}
      </Grid>
    </div>
  );
};

export default ManyToManyField;
