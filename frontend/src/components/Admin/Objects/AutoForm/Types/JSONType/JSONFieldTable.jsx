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
  Typography,
} from "@material-ui/core";
import { Delete as DeleteIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  table: {
    marginTop: theme.spacing(4.5),
    padding: theme.spacing(1, 2, 2, 2),
    maxWidth: "100%",
  },
  helpText: {
    margin: theme.spacing(1, 0, 1, 0),
    padding: 0,
    color: "#222",
  },
}));

const JSONFieldTable = ({ queryParamValues, handleRemoveQueryParam }) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.table}>
      <Typography
        variant="h4"
        className={classes.helpText}
        style={{ textAlign: "center" }}
      >
        Current Filters
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell
              style={{
                width: "10%",
                marginLeft: 4,
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
