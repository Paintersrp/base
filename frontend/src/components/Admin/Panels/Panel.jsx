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
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { NavigateNext } from "@material-ui/icons";
import ControlForm from "../Components/ControlForm/ControlForm";
import UpdateArticleView from "../../Articles/Update/UpdateArticleView";
import CreateUpdateArticle from "../../Articles/Create/ArticleCreateUpdate";
import PanelTable from "./PanelTable";

const Panel = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const { url, keys, appName, model } = location.state || {};
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState(null);
  const [selectedId, setSelectedId] = useState([]);
  const [open, setOpen] = useState(false);
  const [createFormOpen, setCreateFormOpen] = useState(false);
  const [editFormOpen, setEditFormOpen] = useState(false);

  const handleArticleEdit = (data) => {
    navigate(`/admin/${model.model_name}/control`, {
      state: {
        url: url,
        keys: keys,
        appName: appName,
        model: model,
        id: data.id,
      },
    });
    setEditData(data);
  };

  const handleEdit = (data) => {
    navigate(`/admin/${model.model_name}/control`, {
      state: {
        url: url,
        keys: keys,
        appName: appName,
        model: model,
        id: data.id,
        data: data,
      },
    });
    setEditData(data);
    // setEditFormOpen(true);
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
    <BaseContent maxWidth={1200} pt={4} pb={4}>
      <Breadcrumbs
        separator={<NavigateNext fontSize="small" />}
        aria-label="breadcrumb"
      >
        {/* <Link style={{ color: "black" }} to="/admin">
          Admin
        </Link> */}
        <Link style={{ color: "black" }} to="/admin">
          Admin Dashboard
        </Link>
        <Typography color="textPrimary">{model.verbose_name}</Typography>
      </Breadcrumbs>
      <Grid container justifyContent="flex-end">
        <Link
          to={`/admin/${model.model_name}/control`}
          state={{
            url: url,
            keys: keys,
            appName: appName,
            model: model,
            id: selectedId ? selectedId : null,
          }}
          key={appName}
        >
          <StyledButton
            buttonText="Create"
            // onClick={handleCreateFormOpen}
            minWidth={0}
          />
        </Link>
      </Grid>
      <TableContainer>
        {data.length > 0 && (
          <>
            {id === "articles" ? (
              <PanelTable
                modelName={model.verbose_name}
                open={open}
                keys={keys}
                data={data}
                handleEdit={handleArticleEdit}
                handleDelete={handleDelete}
                handleConfirmDelete={handleConfirmDelete}
                handleClose={handleClose}
              />
            ) : (
              <PanelTable
                modelName={model.verbose_name}
                open={open}
                keys={keys}
                data={data}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handleConfirmDelete={handleConfirmDelete}
                handleClose={handleClose}
              />
            )}
          </>
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
