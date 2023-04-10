import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Grid,
} from "@material-ui/core";
import axiosInstance from "../../../lib/Axios/axiosInstance";

const useStyles = makeStyles((theme) => ({
  table: {
    maxWidth: 650,
    margin: "auto",
  },
  container: {
    marginTop: theme.spacing(3),
    backgroundColor: theme.palette.background.light,
    padding: theme.spacing(0, 3, 3, 3),
    borderRadius: theme.spacing(1),
    boxShadow: theme.shadows[2],
    maxWidth: 1000,
    overflow: "auto",
    scrollbarWidth: "none",
    "&::-webkit-scrollbar": {
      display: "none",
    },
    "-ms-overflow-style": "none",
  },
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "50vh",
  },
  tableTitle: {
    margin: theme.spacing(2),
    fontWeight: "bold",
    color: theme.palette.primary.dark,
  },
  tableHeaderCell: {
    backgroundColor: theme.palette.background.light,
    fontWeight: "bold",
    fontSize: 16,
    [theme.breakpoints.down("xs")]: {
      fontSize: 14,
    },
  },
  tableRow: {
    fontSize: 14,
    backgroundColor: theme.palette.background.light,
    [theme.breakpoints.down("xs")]: {
      fontSize: 13,
    },
    // "&:nth-of-type(odd)": {
    //   backgroundColor: theme.palette.primary.light,
    // },
  },
}));

function DataTable() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("table/66/")
      .then((response) => {
        console.log("datattttt", response.data);
        setData(response.data);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  const renderHeader = () => {
    return (
      <TableHead>
        <TableRow>
          <TableCell />
          {data.columns.map((col) => (
            <TableCell
              key={col.id}
              className={classes.tableHeaderCell}
              align="center"
            >
              {col.name}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  const renderRows = () => {
    return (
      <TableBody>
        {data.rows.map((row) => (
          <TableRow key={row.id} className={classes.tableRow}>
            <TableCell
              component="th"
              scope="row"
              className={classes.tableHeaderCell}
            >
              {row.name}
            </TableCell>
            {row.cells.map((cell) => (
              <TableCell key={cell.id} align="center">
                {cell.value}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    );
  };

  if (isLoading) {
    return (
      <div className={classes.loading}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item style={{ width: "100%", maxWidth: 1000 }}>
        <TableContainer component={Paper} className={classes.container}>
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            className={classes.tableTitle}
            align="center"
          >
            {data.name}
          </Typography>
          <Table aria-label="data table" size="small">
            {data && (
              <React.Fragment>
                {renderHeader()}
                {renderRows()}
              </React.Fragment>
            )}
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}

DataTable.propTypes = {
  data: PropTypes.string.isRequired,
};

export default DataTable;
