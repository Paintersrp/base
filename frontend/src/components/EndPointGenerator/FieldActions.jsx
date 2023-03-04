import React from "react";
import {
  Button,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import BaseContent from "../Elements/Base/BaseContent.jsx";

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
    maxWidth: "100%",
    display: "flex",
    flexWrap: "wrap",
    overflowX: "auto",
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
    background: theme.palette.text.light,
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

const FieldActions = ({
  handleAddField,
  modelName,
  setModelName,
  verboseName,
  setVerboseName,
}) => {
  const classes = useStyles();

  return (
    <>
      <Grid item xs={12}>
        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            justifyContent: "center",

            marginBottom: 24,
          }}
        >
          <Button onClick={handleAddField} variant="contained" color="primary">
            Add Field
          </Button>
        </Grid>
      </Grid>

      <BaseContent maxWidth={800}>
        <Grid
          container
          justifyContent="center"
          style={{
            marginTop: 16,
            flexDirection: "row",
            width: "100%",
          }}
        >
          <Grid
            item
            xs={6}
            style={{
              display: "flex",
              justifyContent: "center",
              paddingRight: 8,
            }}
          >
            <TextField
              margin="dense"
              variant="outlined"
              id="model-name"
              label="Model Name"
              value={modelName}
              onChange={(event) => setModelName(event.target.value)}
              className={classes.field}
            />
          </Grid>
          <Grid
            item
            xs={6}
            style={{
              display: "flex",
              justifyContent: "center",
              paddingLeft: 8,
            }}
          >
            <TextField
              margin="dense"
              variant="outlined"
              id="model-name"
              label="Verbose Name"
              value={verboseName}
              onChange={(event) => setVerboseName(event.target.value)}
              className={classes.field}
              style={{ width: "100%" }}
            />
          </Grid>
        </Grid>
        <Grid
          xs={12}
          style={{
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ minWidth: 200 }}
          >
            Generate Endpoint
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Typography
            variant="h3"
            align="center"
            style={{ color: "black", marginTop: 16 }}
          >
            Generated Results
          </Typography>
          <div id="code-display" className={classes.codeDisplay}></div>
        </Grid>
      </BaseContent>
    </>
  );
};

export default FieldActions;
