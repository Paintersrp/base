import React, { useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Collapse,
} from "@material-ui/core";
import {
  AddCircleOutline,
  Delete,
  ExpandLess,
  ExpandMore,
  Save,
} from "@material-ui/icons";

import axiosInstance from "../../lib/Axios/axiosInstance";
import FormField from "../Elements/Fields/FormField";
import { makeStyles } from "@material-ui/core/styles";
import StyledButton from "../Elements/Buttons/StyledButton";
import TableControl from "./TableControl";
import CellInput from "./CellInput";
import ErrorMessage from "../Elements/Errors/ErrorMessage";
import ErrorMessageSnackbar from "../Elements/Errors/ErrorMessageSnackbar";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  formContainer: {
    padding: theme.spacing(3),
  },
  columnContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(1),
  },
  columnName: {
    flexGrow: 1,
  },
  columnActions: {
    display: "flex",
    alignItems: "center",
  },
  rowActions: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    marginTop: theme.spacing(2),
  },
  table: {
    marginTop: theme.spacing(3),
  },
}));

const TableForm = () => {
  const classes = useStyles();
  const [errors, setErrors] = useState("");
  const [tableName, setTableName] = useState("");
  const [columns, setColumns] = useState([""]);
  const [showColumns, setShowColumns] = useState(false);
  const [rows, setRows] = useState([""]);
  const [cells, setCells] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const tableData = {
      name: tableName,
      columns: columns.map((columnName, columnIndex) => {
        const columnData = {
          name: columnName,
          rows: rows.map((rowName, rowIndex) => {
            const rowCells = cells.filter(
              (cell) => cell.columnId === columnIndex && cell.rowId === rowIndex
            );
            const rowCellValues = rowCells.map((cell) => ({
              value: cell.value,
            }));
            return {
              name: rowName,
              cells: rowCellValues,
            };
          }),
        };
        return columnData;
      }),
    };

    try {
      const response = await axiosInstance
        .post("/table-builder/", tableData)
        .then((response) => {
          setErrors([]);
        });
    } catch (error) {
      console.log("error");
      console.log(error.response.data);
      setErrors(error.response.data);
    }
  };

  const handleColumnNameChange = (event, index) => {
    const newColumns = [...columns];
    newColumns[index] = event.target.value;
    setColumns(newColumns);
  };

  const handleRowNameChange = (event, index) => {
    const newRows = [...rows];
    newRows[index] = event.target.value;
    setRows(newRows);
  };

  const handleCellValueChange = (event, columnId, rowId) => {
    const newCells = [...cells];
    const cellIndex = newCells.findIndex(
      (cell) => cell.columnId === columnId && cell.rowId === rowId
    );
    if (cellIndex === -1) {
      newCells.push({ columnId, rowId, value: event.target.value });
    } else {
      newCells[cellIndex].value = event.target.value;
    }
    setCells(newCells);
  };

  const addColumn = () => {
    setColumns([...columns, ""]);
  };

  const removeColumn = (index) => {
    const newColumns = [...columns];
    newColumns.splice(index, 1);
    setColumns(newColumns);

    const newCells = cells.filter((cell) => cell.columnId !== index);
    setCells(newCells);
  };

  const addRow = () => {
    setRows([...rows, ""]);
  };

  const removeRow = (index) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);

    const newCells = cells.filter((cell) => cell.rowId !== index);
    setCells(newCells);
  };

  const handleCloseError = () => {
    setErrors([]);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.formContainer} elevation={3}>
        <Typography variant="h1" align="center">
          Create a Table
        </Typography>
        <form onSubmit={handleSubmit}>
          <CellInput
            tableName={tableName}
            columns={columns}
            rows={rows}
            cells={cells}
            handleCellValueChange={handleCellValueChange}
            handleColumnNameChange={handleColumnNameChange}
            handleRowNameChange={handleRowNameChange}
            removeColumn={removeColumn}
            removeRow={removeRow}
          />
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {errors && <ErrorMessage errors={errors} />}

              <div className={classes.rowActions}>
                <div style={{ width: 300, marginRight: 24 }}>
                  <TextField
                    // required
                    label="Table Name"
                    fullWidth
                    value={tableName}
                    onChange={(event) => setTableName(event.target.value)}
                  />
                </div>
                <StyledButton
                  maxWidth={130}
                  minWidth={130}
                  maxHeight={25}
                  margin={0}
                  size="small"
                  color="primary"
                  startIcon={<Save />}
                  type="submit"
                  buttonText={"Save Table"}
                />
              </div>
            </Grid>
            <Grid item xs={6}>
              <TableControl
                nameFunc={handleColumnNameChange}
                removeFunc={removeColumn}
                data={columns}
                addFunc={addColumn}
                verbose="Column"
                plural="Columns"
              />
            </Grid>
            <Grid item xs={6}>
              <TableControl
                nameFunc={handleRowNameChange}
                removeFunc={removeRow}
                addFunc={addRow}
                data={rows}
                verbose="Row"
                plural="Rows"
              />
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
};

export default TableForm;
