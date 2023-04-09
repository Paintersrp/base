import React from "react";
import {
  Paper,
  Typography,
  TextField,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  InputAdornment,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";

import { makeStyles } from "@material-ui/core/styles";
import FormField from "../Elements/Fields/FormField";

const useStyles = makeStyles((theme) => ({
  table: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(4, 2, 4, 2),
    borderRadius: 8,
    // "&::-webkit-scrollbar": {
    //   width: "10px",
    // },
    // "&::-webkit-scrollbar-thumb": {
    //   background: "#ccc",
    //   borderRadius: theme.spacing(0.5),
    // },
    // "&::-moz-scrollbar": {
    //   width: 10,
    //   height: 10,
    //   background: "#ccc",
    //   borderRadius: theme.spacing(0.5),
    // },
    // "&::-moz-scrollbar-thumb": {
    //   background: "#ccc",
    //   borderRadius: theme.spacing(0.5),
    // },
    // scrollbarWidth: "thin",
    // scrollbarColor: "#ccc transparent",
  },
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
}));

const CellInput = ({
  tableName,
  columns,
  rows,
  cells,
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
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            {columns.map((column, index) => (
              <TableCell
                key={index}
                align="center"
                style={{
                  maxWidth: 250,
                  minWidth: 250,
                  paddingRight: 8,
                  paddingLeft: 8,
                }}
              >
                <div key={index} style={{ width: "100%", display: "flex" }}>
                  <TextField
                    className={classes.customField}
                    variant="filled"
                    // required
                    label={`Column ${index + 1}`}
                    value={column}
                    onChange={(event) => handleColumnNameChange(event, index)}
                    InputProps={{
                      endAdornment: columns.length > 1 && (
                        <InputAdornment position="end">
                          <IconButton
                            size="small"
                            onClick={() => removeColumn(index)}
                          >
                            <Delete />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              <TableCell
                style={{
                  minWidth: 250,
                  paddingRight: 8,
                  paddingLeft: 8,
                  width: 250,
                }}
              >
                <div key={rowIndex} style={{ width: "100%", display: "flex" }}>
                  <TextField
                    className={classes.customField}
                    variant="filled"
                    // required
                    label={`Row ${rowIndex + 1}`}
                    value={row}
                    onChange={(event) => handleRowNameChange(event, rowIndex)}
                    InputProps={{
                      endAdornment: rows.length > 1 && (
                        <InputAdornment position="end">
                          <IconButton
                            size="small"
                            onClick={() => removeRow(rowIndex)}
                          >
                            <Delete />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
              </TableCell>
              {columns.map((column, columnIndex) => (
                <TableCell
                  key={`cell-${rowIndex}-${columnIndex}`}
                  style={{
                    maxWidth: 250,
                    minWidth: 250,
                    paddingRight: 8,
                    paddingLeft: 8,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-end",
                    }}
                  >
                    <TextField
                      //   required
                      className={classes.customField}
                      variant="filled"
                      label={`Cell (${columnIndex + 1} - ${rowIndex + 1})`}
                      fullWidth
                      value={
                        cells.find(
                          (cell) =>
                            cell.columnId === columnIndex &&
                            cell.rowId === rowIndex
                        )?.value || ""
                      }
                      onChange={(event) =>
                        handleCellValueChange(event, columnIndex, rowIndex)
                      }
                    />
                  </div>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CellInput;
