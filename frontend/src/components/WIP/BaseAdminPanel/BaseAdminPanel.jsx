import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Grid,
} from "@material-ui/core";
import { Edit as EditIcon, Delete as DeleteIcon } from "@material-ui/icons";
import axiosInstance from "../../../lib/Axios/axiosInstance";
import DeleteConfirmationModal from "../../Elements/Modals/DeleteConfirmationModal";
import BaseContent from "../../Elements/Base/BaseContent";
import StyledButton from "../../Elements/Buttons/StyledButton";
import { useLocation, useParams } from "react-router-dom";
import ContentLayout from "../../Elements/Layout/ContentLayout";

const BaseAdminPanel = ({
  endpoint = "/jobposting/",
  confirmMessage = "Are you sure you want to delete this?",
}) => {
  const { id } = useParams();
  const location = useLocation();
  console.log("state: ", location.state);
  const { url, keys } = location.state || {};
  console.log("url: ", url);
  console.log("keys: ", keys);

  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (url && keys) {
        axiosInstance
          .get(url)
          .then((response) => {
            setData(response.data);
            console.log("admin-panel", response.data);
          })
          .catch((err) => {
            setError(err);
          });
      }
    };
    fetchData();
  }, [url, keys]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleConfirmDelete = () => {
    confirmedDelete(selectedId);
    handleClose();
  };

  const handleDelete = (id) => {
    handleOpen();
    setSelectedId(id);
  };

  const confirmedDelete = (itemId) => {
    const deleteEndpoint = `${url}${itemId}/`;

    axiosInstance
      .delete(deleteEndpoint)
      .then(() => {
        setData((prevData) =>
          prevData.filter((dataItem) => dataItem.id !== itemId)
        );
      })
      .catch((err) => {
        setError(err);
      });
  };

  return (
    <BaseContent maxWidth={1000} pt={4} pb={4}>
      <Grid container justifyContent="flex-end">
        <StyledButton buttonText="Create" minWidth={0} />
      </Grid>
      <TableContainer>
        {data.length > 0 && (
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
                    <TableCell key={key}>{item[key]}</TableCell>
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
              message={confirmMessage}
            />
          </Table>
        )}
      </TableContainer>
    </BaseContent>
  );
};

BaseAdminPanel.propTypes = {
  endpoint: PropTypes.string.isRequired,
  keys: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default BaseAdminPanel;
