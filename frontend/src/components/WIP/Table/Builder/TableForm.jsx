import React, { useState } from "react";
import { Grid, Paper, Typography, TextField } from "@material-ui/core";
import { Save } from "@material-ui/icons";

import axiosInstance from "../../../../lib/Axios/axiosInstance";
import { makeStyles } from "@material-ui/core/styles";
import StyledButton from "../../../Elements/Buttons/StyledButton";
import TableControl from "./TableControl";
import CellInput from "./CellInput";
import ErrorMessage from "../../../Elements/Errors/ErrorMessage";
import { AddCircleOutline } from "@material-ui/icons";
import AddButton from "./AddButton";
import SaveButton from "./SaveButton";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  formContainer: {
    padding: theme.spacing(3),
  },
  tableActions: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    marginTop: theme.spacing(2),
  },
  addActions: {
    display: "flex",
    padding: "16px 4px 0px 4px",
    alignItems: "flex-end",
  },
  saveActions: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
  },
}));

const TableForm = () => {
  const classes = useStyles();
  const [errors, setErrors] = useState("");
  const [tableName, setTableName] = useState("");
  const [columns, setColumns] = useState([{ name: "", id: 0 }]);
  const [rows, setRows] = useState([{ name: "", id: 0 }]);
  const [deletedColumns, setDeleteColumns] = useState([]);
  const [deletedRows, setDeletedRows] = useState([]);
  const [deletedCells, setDeletedCells] = useState([]);
  const [cells, setCells] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const tableData = {
      name: tableName,
      columns: columns.map((columnName, columnIndex) => {
        const columnData = {
          name: columnName.name,
          rows: rows.map((rowName, rowIndex) => {
            const rowCells = cells.filter(
              (cell) => cell.columnId === columnIndex && cell.rowId === rowIndex
            );
            const rowCellValues = rowCells.map((cell) => ({
              value: cell.value,
            }));
            return {
              name: rowName.name,
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
    newColumns[index].name = event.target.value;
    setColumns(newColumns);

    setCells(
      cells.map((cell) => {
        if (cell.columnId === index) {
          return {
            ...cell,
            columnName: { name: event.target.value, id: index },
          };
        }
        return cell;
      })
    );
    console.log(cells);
  };

  const handleRowNameChange = (event, index) => {
    const newRows = [...rows];
    newRows[index].name = event.target.value;
    setRows(newRows);

    setCells(
      cells.map((cell) => {
        if (cell.rowId === index) {
          return { ...cell, rowName: { name: event.target.value, id: index } };
        }
        return cell;
      })
    );
  };

  const handleCellValueChange = (
    event,
    columnId,
    rowId,
    columnName,
    rowName
  ) => {
    const newCells = [...cells];
    console.log(newCells);
    const cellIndex = newCells.findIndex(
      (cell) => cell.columnId === columnId && cell.rowId === rowId
    );
    console.log(cellIndex, "cellIndex");
    if (cellIndex === -1) {
      newCells.push({
        columnId,
        rowId,
        columnName: columnName,
        rowName: rowName,
        value: event.target.value,
      });
    } else {
      console.log(cellIndex, newCells[cellIndex].value, "new");
      newCells[cellIndex].value = event.target.value;
    }
    setCells(newCells);
    console.log(newCells);
  };

  const addColumn = () => {
    setColumns([...columns, { name: "", id: columns.length }]);
  };

  const removeColumn = (index, data) => {
    const newColumns = [...columns];
    const deletedColumn = newColumns.splice(index, 1)[0];
    setColumns(newColumns);

    const newCells = cells.filter((cell) => cell.columnName !== data);
    const deletedCells = cells.filter((cell) => cell.columnName === data);

    console.log(deletedCells);
    console.log(newCells);

    const updatedCells = newCells.map((cell) => {
      if (cell.columnId > index) {
        return { ...cell, columnId: cell.columnId - 1 };
      }
      return cell;
    });

    setCells(updatedCells);
    setDeleteColumns([
      ...deletedColumns,
      { row: deletedColumn, cells: deletedCells },
    ]);
  };

  const addRow = () => {
    setRows([...rows, { name: "", id: rows.length }]);
    console.log(rows);
  };

  const removeRow = (index, data) => {
    const newRows = [...rows];
    const deletedRow = newRows.splice(index, 1)[0];

    const updatedRows = newRows.map((row) => {
      if (row.id > index) {
        return { ...row, id: row.id - 1 };
      }
      return row;
    });

    setRows(updatedRows);
    console.log("remove - newRows", newRows);
    console.log("remove - data", data);

    const newCells = cells.filter((cell) => cell.rowName.name !== data.name);
    const deletedCells = cells.filter(
      (cell) => cell.rowName.name === data.name
    );

    console.log(deletedCells);
    console.log(newCells);

    const updatedCells = newCells.map((cell) => {
      if (cell.rowId > index) {
        return { ...cell, rowId: cell.rowId - 1 };
      }
      return cell;
    });

    setCells(updatedCells);
    setDeletedRows([...deletedRows, { row: deletedRow, cells: deletedCells }]);
  };

  const recoverRow = (index) => {
    console.log(index);
    const { row: deletedRow, cells: deletedCells } = deletedRows[index];

    console.log(deletedRow, "deletedRow");
    console.log(deletedCells, "deletedCells");

    const newRows = [...rows];
    newRows.splice(deletedRow.id, 0, deletedRow);

    console.log("added deletedRow", newRows);

    const updatedRows = newRows.map((row, i) => {
      return { ...row, id: i };
    });

    console.log("updated rows", updatedRows);

    setRows(updatedRows);

    const updatedCells = deletedCells.map((cell) => {
      return { ...cell, rowId: updatedRows.length - 1 };
    });

    console.log(updatedCells, "updatedCells");
    console.log(updatedRows.length, "length");

    const updatedOldCells = cells.map((cell) => {
      if (cell.rowId >= deletedRow.id) {
        return { ...cell, rowId: cell.rowId + 1 };
      }
      return cell;
    });

    const newCells = [...deletedCells, ...updatedOldCells];
    console.log("newCells2", newCells);
    setCells(newCells);

    setDeletedRows(deletedRows.filter((_, i) => i !== index));
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.formContainer} elevation={3}>
        <Typography variant="h1" align="center">
          Create a Table
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <div className={classes.tableActions}>
              <div className={classes.saveActions}>
                <div style={{ width: 300, marginRight: 24 }}>
                  <TextField
                    required
                    fullWidth
                    label="Table Name"
                    value={tableName}
                    onChange={(event) => setTableName(event.target.value)}
                  />
                </div>
                <div>
                  <SaveButton label="Table" submitFunc={handleSubmit} />
                </div>
              </div>
              <div>
                <div className={classes.addActions}>
                  <AddButton label="Column" addFunc={addColumn} />
                  <AddButton label="Row" addFunc={addRow} />
                </div>
              </div>
            </div>
            {errors && <ErrorMessage errors={errors} />}
          </Grid>
        </Grid>
        <form onSubmit={handleSubmit}>
          <CellInput
            tableName={tableName}
            columns={columns}
            setColumns={setColumns}
            rows={rows}
            setRows={setRows}
            cells={cells}
            setCells={setCells}
            handleCellValueChange={handleCellValueChange}
            handleColumnNameChange={handleColumnNameChange}
            handleRowNameChange={handleRowNameChange}
            removeColumn={removeColumn}
            removeRow={removeRow}
          />
        </form>
        {/* <Grid container style={{ marginTop: 24 }}>
          <Grid item xs={6}>
            <TableControl
              dataHistory={deletedColumns}
              plural="Columns"
              recoverFunc={recoverRow}
              justify="flex-end"
            />
          </Grid>
          <Grid item xs={6}>
            <TableControl
              dataHistory={deletedRows}
              plural="Rows"
              recoverFunc={recoverRow}
              justify="flex-start"
            />
          </Grid>
        </Grid> */}
      </Paper>
    </div>
  );
};

export default TableForm;
