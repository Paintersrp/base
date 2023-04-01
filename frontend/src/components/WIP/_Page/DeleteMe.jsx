import React, { useState, useEffect } from "react";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  table: {
    marginTop: theme.spacing(3),
    maxWidth: 300,
  },
}));

const modelFields = ["name", "content", "query_params", "order"];

const ComponentObjQueryParamsForm = ({ onSubmit }) => {
  const classes = useStyles();
  const [field, setField] = useState("");
  const [queryParamValue, setQueryParamValue] = useState({});
  const [queryParamValues, setQueryParamValues] = useState([]);
  const [canAddQueryParam, setCanAddQueryParam] = useState(false);

  const handleFieldChange = (event) => {
    const { value } = event.target;
    setField(value);
  };

  const handleQueryParamValueChange = (event) => {
    const { name, value } = event.target;
    setQueryParamValue((prevQueryParamValue) => ({
      ...prevQueryParamValue,
      [name]: value,
    }));
  };

  useEffect(() => {
    setCanAddQueryParam(
      queryParamValue[field] && queryParamValue[field].length > 0
    );
  }, [queryParamValue, field]);

  const handleAddQueryParam = (event) => {
    event.preventDefault();
    if (queryParamValue[field]) {
      setQueryParamValues((prevQueryParamValues) => [
        ...prevQueryParamValues,
        { [field]: queryParamValue[field].split(",") },
      ]);
      setQueryParamValue((prevQueryParamValue) => ({
        ...prevQueryParamValue,
        [field]: "",
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(queryParamValues);
  };

  useEffect(() => {
    if (modelFields && modelFields.length > 0) {
      setField(modelFields[0]);
    }
  }, [modelFields]);

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <Select value={field} onChange={handleFieldChange}>
        {modelFields.map((fieldName) => (
          <MenuItem key={fieldName} value={fieldName}>
            {fieldName}
          </MenuItem>
        ))}
      </Select>
      <TextField
        name={field}
        label={field}
        value={queryParamValue[field] || ""}
        onChange={handleQueryParamValueChange}
      />
      <Button
        onClick={handleAddQueryParam}
        disabled={!canAddQueryParam}
        variant="contained"
        color="primary"
      >
        Add
      </Button>
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
      <TableContainer component={Paper} className={classes.table}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Field</TableCell>
              <TableCell>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {queryParamValues.map((queryParamValue, index) => (
              <TableRow key={index}>
                <TableCell>{Object.keys(queryParamValue)[0]}</TableCell>
                <TableCell>
                  {queryParamValue[Object.keys(queryParamValue)[0]].join(",")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </form>
  );
};

export default ComponentObjQueryParamsForm;
