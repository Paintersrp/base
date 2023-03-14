import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Checkbox,
  FormControl,
  Input,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import axiosInstance from "../../../../lib/Axios/axiosInstance";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 250,
    maxWidth: 250,
  },
}));

export default function AdminLogReport() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [appLabelFilter, setAppLabelFilter] = useState([]);
  const [modelNameFilter, setModelNameFilter] = useState([]);
  const [actionFlagFilter, setActionFlagFilter] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axiosInstance.get(
        "/recent_admin_actions/?items=all"
      );
      setData(result.data);
    };
    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleAppLabelFilterChange = (event) => {
    setAppLabelFilter(event.target.value);
    setPage(0);
  };

  const handleModelNameFilterChange = (event) => {
    setModelNameFilter(event.target.value);
    setPage(0);
  };

  const handleActionFlagFilterChange = (event) => {
    setActionFlagFilter(event.target.value);
    setPage(0);
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
  const actionFlags = [...new Set(data.map((row) => row.action_flag))];

  return (
    <div style={{ width: "100%" }}>
      <FormControl className={classes.formControl}>
        <InputLabel>Filter by App Label</InputLabel>
        <Select
          multiple
          value={appLabelFilter}
          onChange={handleAppLabelFilterChange}
          input={<Input id="select-multiple-app-label" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={{
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
            transformOrigin: {
              vertical: "top",
              horizontal: "left",
            },
            getContentAnchorEl: null,
          }}
        >
          {appLabels.map((appLabel) => (
            <MenuItem key={appLabel} value={appLabel.toLowerCase()}>
              <Checkbox
                checked={appLabelFilter.includes(appLabel.toLowerCase())}
              />
              <ListItemText primary={appLabel} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel>Filter by Model Name</InputLabel>
        <Select
          MenuProps={{
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
            transformOrigin: {
              vertical: "top",
              horizontal: "left",
            },
            getContentAnchorEl: null,
          }}
          variant="filled"
          multiple
          value={modelNameFilter}
          onChange={handleModelNameFilterChange}
          input={<Input id="select-multiple-model-name" />}
          renderValue={(selected) => selected.join(", ")}
        >
          {modelNames.map((modelName) => (
            <MenuItem key={modelName} value={modelName.toLowerCase()}>
              <Checkbox
                checked={modelNameFilter.includes(modelName.toLowerCase())}
              />
              <ListItemText primary={modelName} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel>Filter by Action Flag</InputLabel>
        <Select
          multiple
          variant="filled"
          value={actionFlagFilter}
          onChange={handleActionFlagFilterChange}
          input={<Input id="select-multiple-action-flag" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={{
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
            transformOrigin: {
              vertical: "top",
              horizontal: "left",
            },
            getContentAnchorEl: null,
          }}
        >
          {actionFlags.map((actionFlag) => (
            <MenuItem key={actionFlag} value={actionFlag.toLowerCase()}>
              <Checkbox
                checked={actionFlagFilter.includes(actionFlag.toLowerCase())}
              />
              <ListItemText primary={actionFlag} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TableContainer>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell align="left">Action Time</TableCell>
              <TableCell align="left">Action Flag</TableCell>
              <TableCell align="left">Content Type</TableCell>
              <TableCell align="left">App Label</TableCell>
              <TableCell align="left">Model Name</TableCell>
              <TableCell align="left">Object ID</TableCell>
              <TableCell align="left">Object Representation</TableCell>
              <TableCell align="left">Change Message</TableCell>
              <TableCell align="left">Object URL</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.id}>
                  <TableCell align="left">
                    {new Date(row.action_time).toLocaleString()}
                  </TableCell>
                  <TableCell align="left">{row.action_flag}</TableCell>
                  <TableCell align="left">{row.content_type}</TableCell>
                  <TableCell align="left">{row.app_label}</TableCell>
                  <TableCell align="left">{row.model_name}</TableCell>
                  <TableCell align="left">{row.object_id}</TableCell>
                  <TableCell align="left">{row.object_repr}</TableCell>
                  <TableCell align="left">{row.change_message}</TableCell>
                  <TableCell align="left">{row.obj_url}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
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
