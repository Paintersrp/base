import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Checkbox,
  TableSortLabel,
  makeStyles,
  Tooltip,
} from "@material-ui/core";
import { Edit as EditIcon, Delete as DeleteIcon } from "@material-ui/icons";
import DeleteConfirmationModal from "../../../Elements/Modals/DeleteConfirmationModal";
import useTablePagination from "../../../../hooks/useTablePagination";
import { Pagination } from "../../../Elements/Fields/Pagination";
import ControlPanel from "./ControlPanel/ControlPanel";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import BarChartIcon from "@mui/icons-material/BarChart";

const useStyles = makeStyles((theme) => ({
  tableCell: {
    padding: "6px 16px",
    fontSize: "0.875rem",
  },
  headerCell: {
    fontSize: "0.875rem",
    padding: "6px 16px",
    fontWeight: "bold",
  },
  editIcon: {
    color: theme.palette.success.light,
  },
  tooltip: {
    backgroundColor: theme.palette.text.secondary,
    color: "#ffffff",
    fontSize: "12px",
  },
}));

const PanelTable = ({
  open,
  keys,
  data,
  metadata,
  model,
  handleEdit,
  handleDelete,
  handleClose,
  handleConfirmDelete,
  handleMultipleDeleteAction,
  updateMultipleItems,
  handleView,
  type,
}) => {
  console.log(model);
  const classes = useStyles();
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedAction, setSelectedAction] = useState("Test");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } =
    useTablePagination();
  const [searchTerm, setSearchTerm] = useState("");
  const [isReadFilter, setIsReadFilter] = useState(null);
  const [isArchivedFilter, setIsArchivedFilter] = useState(null);
  const [statusFilter, setStatusFilter] = useState(null);
  const [filteredData, setFilteredData] = useState(data);

  function filterReadData(data) {
    if (isReadFilter === null) {
      return data;
    }
    return data.filter((item) => item.is_read === isReadFilter);
  }

  function filterArchivedData(data) {
    if (isArchivedFilter === null) {
      return data;
    }
    return data.filter((item) => item.is_archived === isArchivedFilter);
  }
  function filterStatusData(data) {
    if (statusFilter === null) {
      return data;
    }
    return data.filter((item) => item.status === statusFilter);
  }

  const handleFilterData = () => {
    const result = filterReadData(filterArchivedData(filterStatusData(data)));
    setFilteredData(result);
  };

  useEffect(() => {
    if (type === "new") {
      setIsReadFilter(false);
      setIsArchivedFilter(false);
    }
  }, []);

  useEffect(() => {
    handleFilterData();
  }, [data, isReadFilter, isArchivedFilter, statusFilter]);

  const handleClearFilters = () => {
    setIsReadFilter(null);
    setIsArchivedFilter(null);
    setStatusFilter(null);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  const handleSelectItem = (item) => {
    const itemIndex = selectedItems.findIndex(
      (selectedItem) => selectedItem.id === item.id
    );
    if (itemIndex === -1) {
      setSelectedItems([...selectedItems, item]);
    } else {
      const newSelectedItems = [...selectedItems];
      newSelectedItems.splice(itemIndex, 1);
      setSelectedItems(newSelectedItems);
    }
  };

  const handleActionSelect = (event) => {
    setSelectedAction(event.target.value);
  };

  const handleMultipleDelete = () => {
    const selectedIds = selectedItems.map((item) => item.id);
    handleMultipleDeleteAction(selectedIds);
    setSelectedItems([]);
    setSelectedAction("");
  };

  const handleMultipleItemActions = (field, booleanValue) => {
    const selectedIds = selectedItems.map((item) => item.id);
    updateMultipleItems(selectedIds, [field], booleanValue);
    setSelectedItems([]);
    setSelectedAction("");
  };

  const handleCustomPageChange = (newPage) => {
    handleChangePage(null, newPage);
  };

  const handleCustomRowsPerPageChange = (newRowsPerPage) => {
    handleChangeRowsPerPage({ target: { value: newRowsPerPage } });
  };

  const handleSort = (column) => {
    {
      const isAsc = orderBy === column && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(column);
      filteredData.sort((a, b) => {
        if (a[column] < b[column]) {
          return isAsc ? -1 : 1;
        }
        if (a[column] > b[column]) {
          return isAsc ? 1 : -1;
        }
        return 0;
      });
    }
  };

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function descendingComparator(a, b, orderBy) {
    const aValue = Number(a[orderBy]);
    const bValue = Number(b[orderBy]);
    if (bValue < aValue) {
      return -1;
    }
    if (bValue > aValue) {
      return 1;
    }
    return 0;
  }

  return (
    <>
      <ControlPanel
        modelName={model.model_name}
        keys={keys}
        isReadFilter={isReadFilter}
        setIsReadFilter={setIsReadFilter}
        isArchivedFilter={isArchivedFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        setIsArchivedFilter={setIsArchivedFilter}
        handleClearFilters={handleClearFilters}
        selectedAction={selectedAction}
        handleActionSelect={handleActionSelect}
        selectedItems={selectedItems}
        handleMultipleDelete={handleMultipleDelete}
        handleMultipleItemActions={handleMultipleItemActions}
        handleClearSearch={handleClearSearch}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell style={{ width: "5%" }}>
              <Checkbox
                indeterminate={
                  selectedItems.length > 0 && selectedItems.length < data.length
                }
                checked={selectedItems.length === data.length}
                onChange={(event) => {
                  if (event.target.checked) {
                    setSelectedItems(filteredData);
                  } else {
                    setSelectedItems([]);
                  }
                }}
              />
            </TableCell>
            {keys.map((key) => (
              <>
                <TableCell className={classes.headerCell} key={key}>
                  <TableSortLabel
                    active={orderBy === key}
                    direction={orderBy === key ? order : "asc"}
                    onClick={() => handleSort(key)}
                  >
                    {metadata[key].verbose_name === "image"
                      ? "Thumbnail"
                      : metadata[key].verbose_name}
                  </TableSortLabel>
                </TableCell>
                {metadata[key].verbose_name === "Tag Name" && (
                  <TableCell className={classes.headerCell} key="count">
                    Times Used
                  </TableCell>
                )}
              </>
            ))}

            {model.model_name === "questionnaire" ? (
              <TableCell
                className={classes.headerCell}
                style={{ textAlign: "center" }}
              >
                View
              </TableCell>
            ) : null}
            <TableCell
              className={classes.headerCell}
              style={{ textAlign: "center" }}
            >
              {model.model_name === "messages" ||
              model.model_name === "application"
                ? "Read"
                : "Edit"}
            </TableCell>
            <TableCell
              className={classes.headerCell}
              style={{ textAlign: "center" }}
            >
              Delete
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stableSort(filteredData, getComparator(order, orderBy))
            .filter((item) => {
              console.log(item["image"]);
              if (item === "author") {
                console.log(item);
              }
              const values = Object.values(item)
                .filter((val) => val !== null)
                .map((val) =>
                  typeof val === "string" ? val.toLowerCase() : val
                );
              return values.some((val) =>
                val.toString().toLowerCase().includes(searchTerm.toLowerCase())
              );
            })
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((item) => (
              <TableRow key={item.id}>
                <TableCell
                  style={{ width: "5%" }}
                  className={classes.tableCell}
                >
                  <Checkbox
                    checked={
                      selectedItems.findIndex(
                        (selectedItem) => selectedItem.id === item.id
                      ) !== -1
                    }
                    onChange={() => handleSelectItem(item)}
                  />
                </TableCell>
                {keys.map((key) => (
                  <React.Fragment key={key}>
                    {metadata[key].type === "ImageField" ? (
                      <TableCell className={classes.tableCell}>
                        <img
                          src={item[key]}
                          alt="Thumbnail"
                          style={{ width: 100, height: 75 }}
                        />
                      </TableCell>
                    ) : (
                      <TableCell className={classes.tableCell}>
                        {metadata[key].type === "DateTimeField" ? (
                          new Date(item[key]).toLocaleString()
                        ) : typeof item[key] === "boolean" ? (
                          item[key] ? (
                            "true"
                          ) : (
                            "false"
                          )
                        ) : key === "token" ? (
                          "..." + item[key].substring(80, 120) + "..."
                        ) : key.includes("color") ? (
                          <div
                            style={{
                              width: "20px",
                              height: "20px",
                              backgroundColor: item[key],
                              borderRadius: "50%",
                              border: "1px solid grey",
                            }}
                          />
                        ) : key === "author" ? (
                          item["author_details"].username
                        ) : (
                          item[key]
                        )}
                      </TableCell>
                    )}
                    {metadata[key].verbose_name === "Tag Name" && (
                      <TableCell key="count" className={classes.tableCell}>
                        {model["count"]
                          ? model["count"].values[item[key]]
                          : metadata["tag_counts"].values[item[key]]}
                      </TableCell>
                    )}
                  </React.Fragment>
                ))}

                {model.model_name === "questionnaire" ? (
                  <TableCell
                    style={{ width: "5%" }}
                    className={classes.tableCell}
                  >
                    <IconButton size="small" onClick={() => handleView(item)}>
                      <BarChartIcon color="info" />
                    </IconButton>
                  </TableCell>
                ) : null}

                <TableCell
                  style={{ width: "5%" }}
                  className={classes.tableCell}
                >
                  <Tooltip
                    title={
                      model.model_name === "messages" ||
                      model.model_name === "application"
                        ? `Read`
                        : "Edit"
                    }
                    placement="bottom"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <IconButton size="small" onClick={() => handleEdit(item)}>
                      {model.model_name === "messages" ||
                      model.model_name === "application" ? (
                        <MarkEmailReadIcon className={classes.editIcon} />
                      ) : (
                        <EditIcon className={classes.editIcon} />
                      )}
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell
                  style={{ width: "5%" }}
                  className={classes.tableCell}
                >
                  <Tooltip
                    title={"Delete"}
                    placement="bottom"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <IconButton size="small" onClick={() => handleDelete(item)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
        <DeleteConfirmationModal
          open={open}
          handleClose={handleClose}
          handleConfirmDelete={handleConfirmDelete}
          message={"Are you sure you want to delete this?"}
        />
      </Table>
      <Pagination
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleCustomPageChange}
        onRowsPerPageChange={handleCustomRowsPerPageChange}
        rowOptions={[5, 10, 25, 50]}
      />
    </>
  );
};

export default PanelTable;
