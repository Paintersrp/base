import React, { useState } from "react";
import { TableHead, TableRow, TableCell } from "@material-ui/core";
import LabelCell from "../../../Parts/Cells/LabelCell";

const TableInputHead = ({
  columns,
  setColumns,
  cells,
  setCells,
  handleColumnNameChange,
  removeColumn,
}) => {
  const [draggedColumnIndex, setDraggedColumnIndex] = useState(null);

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedColumnIndex !== null && draggedColumnIndex !== index) {
      const newColumns = [...columns];
      [newColumns[index], newColumns[draggedColumnIndex]] = [
        newColumns[draggedColumnIndex],
        newColumns[index],
      ];
      setColumns(newColumns);
      setDraggedColumnIndex(index);

      const formattedColumns = newColumns.map((column, index) => ({
        name: `${column.name}_${column.id}`,
        id: index,
      }));

      const columnIds = formattedColumns.reduce((acc, cur) => {
        if (acc[cur.name]) {
          acc[cur.name].push(cur.id);
        } else {
          acc[cur.name] = [cur.id];
        }
        return acc;
      }, {});

      const newCells = cells.map((cell) => {
        const { rowName, columnName, rowId, columnId, value } = cell;
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

      setCells(newCells);
    }
  };

  const handleDrop = (e, index) => {
    if (draggedColumnIndex !== null && draggedColumnIndex !== index) {
      const newColumns = [...columns];
      [newColumns[index], newColumns[draggedColumnIndex]] = [
        newColumns[draggedColumnIndex],
        newColumns[index],
      ];
      setColumns(newColumns);
    }
    setDraggedColumnIndex(null);
  };

  return (
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
            onDrop={(e) => handleDrop(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
          />
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TableInputHead;
