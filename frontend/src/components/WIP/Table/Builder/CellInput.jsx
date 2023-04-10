import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LabelCell from "./LabelCell";
import Cell from "./Cell";
import { DragHandle } from "@material-ui/icons";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

const useStyles = makeStyles((theme) => ({
  table: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(4, 2, 4, 2),
    borderRadius: 8,
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

  dragHandle: {
    cursor: "move",
    width: 50,
    padding: 0,
  },
  dragInner: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: theme.palette.info.main,
  },
}));

const CellInput = ({
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

  const [draggedRowIndex, setDraggedRowIndex] = useState(null);
  const [draggedColumnIndex, setDraggedColumnIndex] = useState(null);

  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (rowIndex) => {
    setDraggedRowIndex(rowIndex);
    setIsDragging(true);
  };

  const handleDragOver = (e, rowIndex) => {
    e.preventDefault();
    const newDraggedRowIndex =
      rowIndex !== draggedRowIndex ? rowIndex : draggedRowIndex;
    setDraggedRowIndex(newDraggedRowIndex);

    if (rowIndex !== draggedRowIndex) {
      const newOrderedRows = [...rows];
      const [draggedRow] = newOrderedRows.splice(draggedRowIndex, 1);
      newOrderedRows.splice(rowIndex, 0, draggedRow);
      setRows(newOrderedRows);
      setDraggedRowIndex(rowIndex);

      const formattedRows = newOrderedRows.map((row, index) => ({
        name: `${row.name}_${row.id}`,
        id: index,
      }));

      console.log(formattedRows, "formatted");

      const rowIds = formattedRows.reduce((acc, cur) => {
        if (acc[cur.name]) {
          acc[cur.name].push(cur.id);
        } else {
          acc[cur.name] = [cur.id];
        }
        return acc;
      }, {});

      console.log("rowIds", rowIds);

      const newCells = cells.map((cell) => {
        const { rowName, columnName, rowId, columnId, value } = cell;

        console.log("Name", rowName.name, ", ID", rowName.id, ", Value", value);

        const newRowIndex = rowIds[`${rowName.name}_${rowName.id}`][0];

        return {
          rowName,
          columnName,
          rowId: newRowIndex,
          columnId,
          value,
        };
      });

      console.log("newCells", newCells);

      setCells(newCells);
    }
  };

  return (
    <TableContainer component={Paper} className={classes.table}>
      <Typography variant="h3" align="center" style={{ marginBottom: 8 }}>
        {tableName || "Table Name"}
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Row Names</TableCell>

            {columns.map((column, index) => (
              <LabelCell
                key={`column-${index}`}
                label="Column"
                index={index}
                data={columns}
                item={column}
                handleNameFunc={handleColumnNameChange}
                removeFunc={removeColumn}
                drag
                draggedColumnIndex={draggedColumnIndex}
                onDragStart={() => setDraggedColumnIndex(index)}
                onDragEnd={() => setDraggedColumnIndex(null)}
                onDrop={() => {
                  if (
                    draggedColumnIndex !== null &&
                    draggedColumnIndex !== index
                  ) {
                    const newColumns = [...columns];
                    [newColumns[index], newColumns[draggedColumnIndex]] = [
                      newColumns[draggedColumnIndex],
                      newColumns[index],
                    ];
                    setColumns(newColumns);
                  }
                  setDraggedColumnIndex(null);
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  if (
                    draggedColumnIndex !== null &&
                    draggedColumnIndex !== index
                  ) {
                    const newColumns = [...columns];
                    [newColumns[index], newColumns[draggedColumnIndex]] = [
                      newColumns[draggedColumnIndex],
                      newColumns[index],
                    ];
                    setColumns(newColumns);
                    setDraggedColumnIndex(index);

                    const formattedColumns = newColumns.map(
                      (column, index) => ({
                        name: `${column.name}_${column.id}`,
                        id: index,
                      })
                    );

                    const columnIds = formattedColumns.reduce((acc, cur) => {
                      if (acc[cur.name]) {
                        acc[cur.name].push(cur.id);
                      } else {
                        acc[cur.name] = [cur.id];
                      }
                      return acc;
                    }, {});

                    console.log("column drag test ids", columnIds);

                    const newCells = cells.map((cell) => {
                      const { rowName, columnName, rowId, columnId, value } =
                        cell;
                      const newColumnIndex =
                        columnIds[`${columnName.name}_${columnName.id}`][0];
                      return {
                        rowName,
                        columnName,
                        rowId,
                        columnId: newColumnIndex,
                        value,
                      };
                    });

                    console.log("column drag test cells", newCells);

                    setCells(newCells);
                  }
                }}
              />
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow
              key={`row-${rowIndex}`}
              onDragOver={(e) => handleDragOver(e, rowIndex)}
              onDragStart={() => setDraggedRowIndex(rowIndex)}
              onDragEnd={() => setDraggedRowIndex(null)}
              style={{
                opacity: rowIndex === draggedRowIndex ? 0.4 : 1,
              }}
            >
              <TableCell draggable className={classes.dragHandle}>
                <div className={classes.dragInner}>
                  <DragIndicatorIcon />
                </div>
              </TableCell>
              <LabelCell
                label="Row"
                index={rowIndex}
                data={rows}
                item={row}
                handleNameFunc={handleRowNameChange}
                removeFunc={removeRow}
              />

              {columns.map((column, columnIndex) => (
                <Cell
                  cells={cells}
                  rowIndex={rowIndex}
                  rowName={row}
                  columnIndex={columnIndex}
                  columnName={column}
                  handleCellValueChange={handleCellValueChange}
                />
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CellInput;
