import React from "react";
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import { Delete as DeleteIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  table: {
    marginTop: theme.spacing(3),
    maxWidth: "100%",
  },
}));

const JSONFieldTable = ({ queryParamValues, handleRemoveQueryParam }) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.table}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell
              style={{
                padding: 0,
              }}
            ></TableCell>
            <TableCell>Field</TableCell>
            <TableCell>Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(queryParamValues).map(([k, v], index) => {
            const [field, value] = Object.entries(v)[0];

            return (
              <TableRow key={index}>
                <TableCell
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    maxWidth: 48,
                    padding: 0,
                    marginLeft: 4,
                  }}
                >
                  <Tooltip
                    title={"Delete"}
                    placement="bottom"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => handleRemoveQueryParam(index)}
                    >
                      <DeleteIcon color="error" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </TableCell>
                <TableCell>{value}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default JSONFieldTable;
