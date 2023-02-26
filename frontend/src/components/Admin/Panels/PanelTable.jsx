import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
} from "@material-ui/core";
import { Edit as EditIcon, Delete as DeleteIcon } from "@material-ui/icons";
import DeleteConfirmationModal from "../../Elements/Modals/DeleteConfirmationModal";
import { Link } from "react-router-dom";

const PanelTable = ({
  modelName,
  open,
  keys,
  data,
  handleEdit,
  handleDelete,
  handleClose,
  handleConfirmDelete,
}) => {
  console.log(modelName);
  return (
    <Table>
      <TableHead>
        <TableRow>
          {keys.map((key) => (
            <TableCell key={key}>{key}</TableCell>
          ))}
          <TableCell>Edit</TableCell>
          <TableCell>Delete</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
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
            <TableCell style={{ width: "10%" }}>
              <IconButton onClick={() => handleEdit(item)}>
                <EditIcon />
              </IconButton>
            </TableCell>
            <TableCell style={{ width: "10%" }}>
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
  );
};

export default PanelTable;
