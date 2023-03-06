import React from "react";
import {
  Button,
  Checkbox,
  FormControl,
  Grid,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import BaseForm from "../Elements/Base/BaseForm.jsx";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    maxWidth: 1200,
    margin: "auto",
    marginTop: theme.spacing(4),
  },

  removeButton: {
    backgroundColor: theme.palette.error.main,
    color: "#fff",
    "&:hover": {
      backgroundColor: theme.palette.error.dark,
    },
  },
  codeDisplay: {
    backgroundColor: theme.palette.grey[200],
    padding: theme.spacing(2),
    marginTop: theme.spacing(4),
    borderRadius: 4,
  },
  field: {
    width: "100%",
    marginBottom: theme.spacing(1.5),
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
  select: {
    width: "100%",
    background: "#F5F5F5",
    marginBottom: theme.spacing(1),
    "& .MuiFormLabel-root": {
      color: theme.palette.text.light,
      fontWeight: "700",
      fontSize: "0.9rem",
    },
    "& fieldset": {
      borderColor: "black",
    },
    "&:hover fieldset": {
      borderColor: "black",
    },
    "&.Mui-focused fieldset": {
      borderColor: "black",
    },

    "& .MuiMenu-paper": {
      maxHeight: 40,
      overflowY: "auto",
    },
  },
  formTitle: {
    fontWeight: "bold",
    marginBottom: theme.spacing(1.5),
    textAlign: "center",
    color: theme.palette.text.dark,
  },
}));

const FieldForm = ({
  field,
  fields,
  index,
  handleChange,
  handleRemoveField,
  checkedKeys,
  handleKeys,
}) => {
  const classes = useStyles();

  return (
    <BaseForm
      title={`Field #${index + 1}`}
      maxWidth={800}
      minWidth={800}
      boxShadow={1}
      key={index}
      background="#F5F5F5"
    >
      <Grid container spacing={0} alignItems="center">
        <Grid item xs={12} md={12} style={{ width: "100%" }}>
          <FormControl fullWidth>
            <Select
              className={classes.select}
              variant="outlined"
              margin="dense"
              displayEmpty
              labelId={`field-type-label-${index}`}
              id={`field-type-${index}`}
              value={field.type}
              name="type"
              onChange={(event) => handleChange(index, event)}
              fullWidth
              MenuProps={{
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "left",
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "left",
                },
                getContentAnchorEl: null,
                classes: {
                  paper: classes.menuPaper,
                },
                PaperProps: {
                  style: {
                    maxHeight: 500,
                  },
                },
              }}
            >
              <MenuItem value="">Select a field type</MenuItem>
              <MenuItem value="BooleanField">BooleanField</MenuItem>
              <MenuItem value="CharField">CharField</MenuItem>
              <MenuItem value="DateTimeField">DateTimeField</MenuItem>
              <MenuItem value="EmailField">EmailField</MenuItem>
              <MenuItem value="FileField">FileField</MenuItem>
              <MenuItem value="FloatField">FloatField</MenuItem>
              <MenuItem value="ImageField">ImageField</MenuItem>
              <MenuItem value="IntegerField">IntegerField</MenuItem>
              <MenuItem value="ManyToManyField">ManyToManyField</MenuItem>
              <MenuItem value="TextField">TextField</MenuItem>
              <MenuItem value="URLField">URLField</MenuItem>
            </Select>
            <Grid container>
              {Object.keys(field).map((key) => {
                if (key !== "type" && key !== "value") {
                  return (
                    <Grid
                      item
                      xs={6}
                      key={key}
                      style={{
                        paddingLeft:
                          key === "verbose_name" ||
                          key === "xs_column_count" ||
                          key === "auto_now_add"
                            ? 8
                            : 0,
                        paddingRight:
                          key === "name" ||
                          key === "md_column_count" ||
                          key === "max_length"
                            ? 8
                            : 0,
                      }}
                    >
                      <TextField
                        key={`${key}-${index}`}
                        margin="dense"
                        variant="outlined"
                        id={`field-${key}-${index}`}
                        label={`${key}`}
                        name={key}
                        value={fields[index][key]}
                        onChange={(event) => handleChange(index, event)}
                        fullWidth
                        className={classes.field}
                      />
                    </Grid>
                  );
                }
                return null;
              })}
            </Grid>
          </FormControl>
        </Grid>

        <Grid
          item
          xs={12}
          md={12}
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid
            item
            xs={12}
            md={12}
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "row",
              alignItems: "center",
              marginTop: 16,
            }}
          >
            Add to Field Keys?
            <Checkbox
              checked={checkedKeys.includes(field.name)}
              onChange={(event) => handleKeys(event, field.name)}
              name={`checkbox-${field.name}`}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: 16,
            }}
          >
            <Button
              onClick={() => handleRemoveField(index)}
              className={classes.removeButton}
            >
              Remove
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </BaseForm>
  );
};

export default FieldForm;
