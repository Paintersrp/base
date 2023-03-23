import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableSortLabel,
  TableRow,
  IconButton,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import FilterToolbar from "./FilterToolbar";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 250,
    maxWidth: 250,
  },
  link: {
    color: "#007bff",
  },
  tooltip: {
    backgroundColor: theme.palette.text.secondary,
    color: "#ffffff",
    fontSize: "14px",
  },
}));

export default function AdminLogReport({
  data,
  startAppFilter,
  startModelFilter,
}) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [appLabelFilter, setAppLabelFilter] = useState([]);
  const [modelNameFilter, setModelNameFilter] = useState([]);
  const [actionFlagFilter, setActionFlagFilter] = useState([]);
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");

  useEffect(() => {
    if (startAppFilter) {
      console.log(startAppFilter);
      setAppLabelFilter([...appLabelFilter, startAppFilter]);
    } else if (startModelFilter) {
      setModelNameFilter([...modelNameFilter, startModelFilter]);
    }
  }, [startAppFilter, startModelFilter]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleAppLabelFilterChange = (event) => {
    const filterValue = event.target.value.toLowerCase();
    const isFilterSelected = appLabelFilter.includes(filterValue);

    if (!filterValue) {
      setAppLabelFilter([]);
    } else if (isFilterSelected) {
      setAppLabelFilter(
        appLabelFilter.filter((filter) => filter !== filterValue)
      );
    } else {
      setAppLabelFilter([...appLabelFilter, filterValue]);
    }
    setPage(0);
  };

  const handleModelNameFilterChange = (event) => {
    const filterValue = event.target.value.toLowerCase();
    console.log(filterValue);
    const isFilterSelected = modelNameFilter.includes(filterValue);

    if (!filterValue) {
      setModelNameFilter([]);
    } else if (isFilterSelected) {
      setModelNameFilter(
        modelNameFilter.filter((filter) => filter !== filterValue)
      );
    } else {
      setModelNameFilter([...modelNameFilter, filterValue]);
    }
    setPage(0);
  };

  const handleActionFlagFilterChange = (event) => {
    const filterValue = event.target.value.toLowerCase();
    const isFilterSelected = actionFlagFilter.includes(filterValue);

    if (!filterValue) {
      setActionFlagFilter([]);
    } else if (isFilterSelected) {
      setActionFlagFilter(
        actionFlagFilter.filter((filter) => filter !== filterValue)
      );
    } else {
      setActionFlagFilter([...actionFlagFilter, filterValue]);
    }
    setPage(0);
  };

  const handleResetFilter = () => {
    setActionFlagFilter([]);
    setModelNameFilter([]);
    setAppLabelFilter([]);
    setPage(0);
  };

  const handleResetSort = () => {
    setOrderBy("");
    setOrder("asc");
  };

  const handleSortRequest = (property) => {
    const isAscending = orderBy === property && order === "asc";
    setOrderBy(property);
    setOrder(isAscending ? "desc" : "asc");
  };

  const filteredData = data.filter(
    (row) =>
      (appLabelFilter.length === 0 ||
        appLabelFilter.includes(row.app_label.toLowerCase())) &&
      (modelNameFilter.length === 0 ||
        modelNameFilter.includes(row.model_name.toLowerCase())) &&
      (actionFlagFilter.length === 0 ||
        actionFlagFilter.includes(row.action_flag.toLowerCase()))
  );

  const appLabels = [...new Set(data.map((row) => row.app_label))];
  const modelNames = [...new Set(data.map((row) => row.model_name))];
  console.log("modelNames", modelNames);
  const actionFlags = [...new Set(data.map((row) => row.action_flag))];

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const sortedData = stableSort(filteredData, getComparator(order, orderBy));

  return (
    <div style={{ width: "100%" }}>
      <div style={{ marginBottom: 16 }}>
        <FilterToolbar
          appLabels={appLabels}
          modelNames={modelNames}
          actionFlags={actionFlags}
          appLabelFilter={appLabelFilter}
          modelNameFilter={modelNameFilter}
          actionFlagFilter={actionFlagFilter}
          handleAppLabelFilterChange={handleAppLabelFilterChange}
          handleModelNameFilterChange={handleModelNameFilterChange}
          handleActionFlagFilterChange={handleActionFlagFilterChange}
          handleResetFilter={handleResetFilter}
          handleResetSort={handleResetSort}
          orderBy={orderBy}
        />
      </div>

      <TableContainer>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              <TableCell align="left">
                <TableSortLabel
                  active={orderBy === "user"}
                  direction={order}
                  onClick={() => handleSortRequest("user")}
                >
                  User
                </TableSortLabel>
              </TableCell>
              <TableCell align="left">
                <TableSortLabel
                  active={orderBy === "action_time"}
                  direction={order}
                  onClick={() => handleSortRequest("action_time")}
                >
                  Action Time
                </TableSortLabel>
              </TableCell>
              <TableCell align="left">
                <TableSortLabel
                  active={orderBy === "action_flag"}
                  direction={order}
                  onClick={() => handleSortRequest("action_flag")}
                >
                  Action Flag
                </TableSortLabel>
              </TableCell>

              <TableCell align="left">
                <TableSortLabel
                  active={orderBy === "app_label"}
                  direction={order}
                  onClick={() => handleSortRequest("app_label")}
                >
                  App Label
                </TableSortLabel>
              </TableCell>
              <TableCell align="left">
                <TableSortLabel
                  active={orderBy === "model_name"}
                  direction={order}
                  onClick={() => handleSortRequest("model_name")}
                >
                  Model Name
                </TableSortLabel>
              </TableCell>

              <TableCell align="left">
                <TableSortLabel
                  active={orderBy === "change_message"}
                  direction={order}
                  onClick={() => handleSortRequest("change_message")}
                >
                  Change Message
                </TableSortLabel>
              </TableCell>
              <TableCell align="left">
                <TableSortLabel
                  active={orderBy === "object_url"}
                  direction={order}
                  onClick={() => handleSortRequest("object_url")}
                >
                  Object URL
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.id}>
                  <TableCell align="left">{row.user}</TableCell>
                  <TableCell align="left">
                    {new Date(row.action_time).toLocaleString()}
                  </TableCell>
                  <TableCell align="left">{row.action_flag}</TableCell>
                  <TableCell align="left">{row.app_label}</TableCell>
                  <TableCell align="left">{row.model_name}</TableCell>
                  <TableCell align="left">{row.change_message}</TableCell>
                  <TableCell align="left">
                    {row.obj_url === "Not Applicable" ||
                    row.obj_url === "Object not found" ||
                    row.obj_url === "Failed" ? (
                      <>{row.obj_url}</>
                    ) : (
                      <Link className={classes.link} to={`${row.obj_url}`}>
                        {row.obj_url}
                      </Link>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[20, 50, 100]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowOptions={[5, 10, 25, 50]}
      />
    </div>
  );
}
