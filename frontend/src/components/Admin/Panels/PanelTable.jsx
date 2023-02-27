import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Checkbox,
  Grid,
  Typography,
  TablePagination,
} from "@material-ui/core";
import { Edit as EditIcon, Delete as DeleteIcon } from "@material-ui/icons";
import DeleteConfirmationModal from "../../Elements/Modals/DeleteConfirmationModal";
import ActionSelection from "./ActionSelection";
import useTablePagination from "../../../hooks/useTablePagination";
import { Pagination } from "./Pagination";

const PanelTable = ({
  open,
  keys,
  data,
  metadata,
  handleEdit,
  handleDelete,
  handleClose,
  handleConfirmDelete,
  handleMultipleDeleteAction,
}) => {
  console.log("METADATA: ", metadata);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedAction, setSelectedAction] = useState("");
  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } =
    useTablePagination();

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

  const handleCustomPageChange = (newPage) => {
    handleChangePage(null, newPage);
  };

  const handleCustomRowsPerPageChange = (newRowsPerPage) => {
    handleChangeRowsPerPage({ target: { value: newRowsPerPage } });
  };

  return (
    <>
      <Typography
        style={{
          marginBottom: 2,
          marginLeft: 4,
          fontSize: "0.9rem",
          color: "black",
        }}
      >
        Select an Action:
      </Typography>
      <Grid container>
        <ActionSelection
          selectedAction={selectedAction}
          handleActionSelect={handleActionSelect}
          selectedItems={selectedItems}
          handleMultipleDelete={handleMultipleDelete}
        />
      </Grid>
      <Table>
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
                    setSelectedItems(data);
                  } else {
                    setSelectedItems([]);
                  }
                }}
              />
            </TableCell>
            {keys.map((key) => (
              <TableCell key={key}>{metadata[key].verbose_name}</TableCell>
            ))}
            <TableCell>Edit</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((item) => (
              <TableRow key={item.id}>
                <TableCell style={{ width: "5%" }}>
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
                  <TableCell key={key}>
                    {key === "created_at"
                      ? new Date(item[key]).toLocaleString()
                      : typeof item[key] === "boolean"
                      ? item[key]
                        ? "true"
                        : "false"
                      : item[key]}
                  </TableCell>
                ))}
                <TableCell style={{ width: "5%" }}>
                  <IconButton onClick={() => handleEdit(item)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell style={{ width: "5%" }}>
                  <IconButton onClick={() => handleDelete(item.id)}>
                    <DeleteIcon />
                  </IconButton>
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
        count={data.length}
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
