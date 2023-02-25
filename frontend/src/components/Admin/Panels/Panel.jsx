import React, { useEffect, useState } from "react";
import {
  TableContainer,
  Grid,
  Breadcrumbs,
  Typography,
  Dialog,
} from "@material-ui/core";
import axiosInstance from "../../../lib/Axios/axiosInstance";
import BaseContent from "../../Elements/Base/BaseContent";
import StyledButton from "../../Elements/Buttons/StyledButton";
import { Link, useLocation, useParams } from "react-router-dom";
import { NavigateNext } from "@material-ui/icons";
import ControlForm from "../Components/ControlForm/ControlForm";
import UpdateArticleView from "../../Articles/Update/UpdateArticleView";
import CreateUpdateArticle from "../../Articles/Create/ArticleCreateUpdate";
import PanelTable from "./PanelTable";

const Panel = () => {
  const { id } = useParams();
  const location = useLocation();
  const { url, keys, appName } = location.state || {};
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState(null);
  const [selectedId, setSelectedId] = useState([]);
  const [open, setOpen] = useState(false);
  const [createFormOpen, setCreateFormOpen] = useState(false);
  const [editFormOpen, setEditFormOpen] = useState(false);

  const handleEdit = (data) => {
    setEditData(data);
    setEditFormOpen(true);
  };

  const handleEditFormOpen = () => {
    setEditFormOpen(true);
  };

  const handleEditFormClose = () => {
    setEditFormOpen(false);
  };

  const handleCreateFormOpen = () => {
    setCreateFormOpen(true);
  };

  const handleCreateFormClose = () => {
    setCreateFormOpen(false);
  };

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

  const handleUpdate = () => {
    fetchData();
  };

  useEffect(() => {
    handleUpdate();
  }, []);

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
      <Breadcrumbs
        separator={<NavigateNext fontSize="small" />}
        aria-label="breadcrumb"
      >
        <Link style={{ color: "black" }} to="/admin">
          Admin
        </Link>
        <Link style={{ color: "black" }} to="/admin">
          Dashboard
        </Link>
        <Typography color="textPrimary">{url}</Typography>
      </Breadcrumbs>
      <Grid container justifyContent="flex-end">
        <StyledButton
          buttonText="Create"
          onClick={handleCreateFormOpen}
          minWidth={0}
        />
      </Grid>
      <TableContainer>
        {data.length > 0 && (
          <PanelTable
            open={open}
            keys={keys}
            data={data}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleConfirmDelete={handleConfirmDelete}
            handleClose={handleClose}
          />
        )}
      </TableContainer>
      {id === "articles" ? (
        <CreateUpdateArticle
          open={createFormOpen}
          setOpen={handleCreateFormClose}
        />
      ) : (
        <Dialog
          maxWidth="xl"
          open={createFormOpen}
          onClose={handleCreateFormClose}
        >
          <ControlForm
            endpointUrl={url}
            onClose={handleCreateFormClose}
            handleUpdate={handleUpdate}
          />
        </Dialog>
      )}
      <Dialog maxWidth="xl" open={editFormOpen} onClose={handleEditFormClose}>
        {editData &&
          (id === "articles" ? (
            <UpdateArticleView manualId={editData.id} />
          ) : (
            <ControlForm
              endpointUrl={url}
              data={editData}
              onClose={handleEditFormClose}
              handleUpdate={handleUpdate}
            />
          ))}
      </Dialog>
    </BaseContent>
  );
};

export default Panel;
