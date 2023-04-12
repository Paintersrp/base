import React, { useEffect, useState } from "react";
import { TextField, TableCell } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  customField: {
    width: "100%",
    minWidth: 120,
    backgroundColor: "#f7fafc",
    "& .MuiFilledInput-root": {},
    "& .MuiFilledInput-input": {
      color: "#1a202c",
      fontWeight: 600,
    },
    "& .MuiFilledInput-underline:before": {
      borderBottomColor: "#e2e8f0",
    },
    "& .MuiFilledInput-underline:after": {
      borderBottomColor: "#4a5568",
    },
    "& .MuiFormLabel-root": {
      color: "#1a202c",
      fontWeight: 600,
    },
    "& .Mui-focused .MuiFormLabel-root": {
      color: "#4a5568",
    },
    "& .MuiFormHelperText-root": {
      color: "#4a5568",
      fontWeight: 500,
    },
  },
  tableCell: {
    maxWidth: 250,
    minWidth: 250,
    paddingRight: 8,
    paddingLeft: 0,
  },
}));

const ValueCell = ({
  cells,
  rowIndex,
  rowName,
  columnIndex,
  columnName,
  handleCellValueChange,
}) => {
  const classes = useStyles();
  const [data, setData] = useState(cells);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    setRefresh(true);
    setData(cells);
    setRefresh(false);
  }, [cells]);

  return (
    <TableCell
      key={`cell-${rowIndex}-${columnIndex}`}
      className={classes.tableCell}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <div style={{ width: 28, height: 24 }}></div>
        {!refresh && (
          <TextField
            required
            className={classes.customField}
            variant="filled"
            label={`Cell (${columnIndex + 1} - ${rowIndex + 1})`}
            fullWidth
            value={
              data.find(
                (cell) =>
                  cell.columnName.name === columnName.name &&
                  cell.rowName.name === rowName.name &&
                  cell.columnId === columnIndex &&
                  cell.rowId === rowIndex
              )?.value || ""
            }
            onChange={(event) =>
              handleCellValueChange(
                event,
                columnIndex,
                rowIndex,
                columnName,
                rowName
              )
            }
          />
        )}
      </div>
    </TableCell>
  );
};

export default ValueCell;
