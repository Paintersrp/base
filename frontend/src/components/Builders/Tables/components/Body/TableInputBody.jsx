import React, { useState } from "react";
import { TableBody, TableRow, TableCell } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LabelCell from "../../../Parts/Cells/LabelCell";
import ValueCell from "../../../Parts/Cells/ValueCell";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

const useStyles = makeStyles((theme) => ({
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

const TableInputBody = ({
  columns,
  rows,
  setRows,
  cells,
  setCells,
  handleRowNameChange,
  handleCellValueChange,
  removeRow,
}) => {
  const classes = useStyles();

  const [draggedRowIndex, setDraggedRowIndex] = useState(null);

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

      const rowIds = formattedRows.reduce((acc, cur) => {
        if (acc[cur.name]) {
          acc[cur.name].push(cur.id);
        } else {
          acc[cur.name] = [cur.id];
        }
        return acc;
      }, {});

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
            <ValueCell
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
  );
};

export default TableInputBody;
