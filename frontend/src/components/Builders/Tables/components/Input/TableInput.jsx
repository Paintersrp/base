import React from "react";
import { Paper, Typography, Table, TableContainer } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TableInputHead from "../Head/TableInputHead";
import TableInputBody from "../Body/TableInputBody";

const useStyles = makeStyles((theme) => ({
  table: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(4, 2, 4, 2),
    borderRadius: 8,
  },
}));

const TableInput = ({
  tableName,
  columns,
  setColumns,
  rows,
  setRows,
  cells,
  setCells,
  handleColumnNameChange,
  handleRowNameChange,
  handleCellValueChange,
  removeColumn,
  removeRow,
}) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.table}>
      <Typography variant="h3" align="center" style={{ marginBottom: 8 }}>
        {tableName || "Table Name"}
      </Typography>
      <Table size="small">
        <TableInputHead
          columns={columns}
          setColumns={setColumns}
          cells={cells}
          setCells={setCells}
          handleColumnNameChange={handleColumnNameChange}
          removeColumn={removeColumn}
        />
        <TableInputBody
          columns={columns}
          rows={rows}
          setRows={setRows}
          cells={cells}
          setCells={setCells}
          handleRowNameChange={handleRowNameChange}
          handleCellValueChange={handleCellValueChange}
          removeRow={removeRow}
        />
      </Table>
    </TableContainer>
  );
};

export default TableInput;
