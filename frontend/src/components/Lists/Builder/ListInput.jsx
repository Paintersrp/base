import React from "react";
import {
  Paper,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ListInputBody from "./ListInputBody";
import LabelCell from "../../Tables/Builder/Cells/LabelCell";

const useStyles = makeStyles((theme) => ({
  table: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(4, 2, 4, 2),
    borderRadius: 8,
  },
}));

const aa = ({
  listName,
  rows,
  setRows,
  cells,
  setCells,
  handleRowNameChange,
  handleCellValueChange,
  removeRow,
}) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.table}>
      <Typography variant="h3" align="center" style={{ marginBottom: 8 }}>
        {listName || "List Name"}
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Row Names</TableCell>
            <TableCell>Row Values</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow>
              <LabelCell
                label="Row"
                index={rowIndex}
                data={rows}
                item={row}
                handleNameFunc={handleRowNameChange}
                removeFunc={removeRow}
              />
              <LabelCell
                label="Primary"
                index={rowIndex}
                data={rows}
                item={row}
                handleNameFunc={handleRowNameChange}
                removeFunc={removeRow}
              />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListInput;
