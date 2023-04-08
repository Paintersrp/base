import React, { useState } from "react";
import {
  TextField,
  Grid,
  Button,
  Typography,
  makeStyles,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import axiosInstance from "../../lib/Axios/axiosInstance";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  formContainer: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundColor: "#F5F5F5",
  },
  buttonContainer: {
    margin: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const TableForm = () => {
  const classes = useStyles();
  const [tableName, setTableName] = useState("");
  const [columns, setColumns] = useState([""]);
  const [rows, setRows] = useState([""]);
  const [cells, setCells] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const config = {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // };
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
              column_name: columnName,
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
      const response = await axiosInstance.post(
        "/table-builder/",
        tableData
        // config
      );
    } catch (error) {
      console.error(error);
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

  const addRow = () => {
    setRows([...rows, ""]);
  };

  return (
    <div className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Create a Table
      </Typography>
      <Paper className={classes.formContainer} elevation={3}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Table Name"
                value={tableName}
                onChange={(event) => setTableName(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Columns
              </Typography>
              {columns.map((columnName, index) => (
                <TextField
                  key={`column-${index}`}
                  required
                  fullWidth
                  label={`Column ${index + 1} Name`}
                  value={columnName}
                  onChange={(event) => handleColumnNameChange(event, index)}
                />
              ))}
              <Button
                variant="contained"
                color="primary"
                onClick={addColumn}
                startIcon={<AddIcon />}
              >
                Add Column
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Rows
            </Typography>
            {rows.map((rowName, index) => (
              <TextField
                key={`row-${index}`}
                required
                fullWidth
                label={`Row ${index + 1} Name`}
                value={rowName}
                onChange={(event) => handleRowNameChange(event, index)}
              />
            ))}
            <Button
              variant="contained"
              color="primary"
              onClick={addRow}
              startIcon={<AddIcon />}
            >
              Add Row
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Cells
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell />
                    {columns.map((column, index) => (
                      <TableCell key={`header-${index}`} align="center">
                        {column}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, rowIndex) => (
                    <TableRow key={`row-${rowIndex}`}>
                      <TableCell component="th" scope="row">
                        {row}
                      </TableCell>
                      {columns.map((column, columnIndex) => (
                        <TableCell key={`cell-${rowIndex}-${columnIndex}`}>
                          <TextField
                            fullWidth
                            value={
                              cells.find(
                                (cell) =>
                                  cell.columnId === columnIndex &&
                                  cell.rowId === rowIndex
                              )?.value || ""
                            }
                            onChange={(event) =>
                              handleCellValueChange(
                                event,
                                columnIndex,
                                rowIndex
                              )
                            }
                          />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              startIcon={<SaveIcon />}
            >
              Save Table
            </Button>
          </Grid>
        </form>
      </Paper>
    </div>
  );
};

export default TableForm;
