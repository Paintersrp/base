import React, { useEffect, useState } from "react";
import {
  TableContainer,
  Grid,
  Breadcrumbs,
  Typography,
} from "@material-ui/core";
import axiosInstance from "../../../lib/Axios/axiosInstance";
import BaseContent from "../../Elements/Base/BaseContent";
import StyledButton from "../../Elements/Buttons/StyledButton";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { NavigateNext } from "@material-ui/icons";
import PanelTable from "./PanelTable";

const Panel = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const { url, keys, appName, model, metadata } = location.state || {};
  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState([]);
  const [open, setOpen] = useState(false);
  console.log("metaData: ", metadata);

  const handleArticleEdit = (data) => {
    navigate(`/admin/${model.model_name}/control`, {
      state: {
        url: url,
        keys: keys,
        appName: appName,
        metadata: metadata,
        model: model,
        id: data.id,
      },
    });
  };

  const handleEdit = (data) => {
    navigate(`/admin/${model.model_name}/control`, {
      state: {
        url: url,
        keys: keys,
        appName: appName,
        model: model,
        metadata: metadata,
        id: data.id,
        data: data,
      },
    });
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
  const handleMultipleDeleteAction = (selectedIds) => {
    selectedIds.forEach((id) => {
      confirmedDelete(id);
    });
    setSelectedId([]);
  };

  return (
    <BaseContent maxWidth={1200} pt={4} pb={4}>
      <Breadcrumbs
        separator={<NavigateNext fontSize="small" />}
        aria-label="breadcrumb"
      >
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
            metadata: metadata,
            id: selectedId ? selectedId : null,
          }}
          key={appName}
        >
          <StyledButton buttonText="Create" minWidth={0} />
        </Link>
      </Grid>
      <TableContainer>
        {data.length > 0 && (
          <>
            {id === "articles" ? (
              <PanelTable
                open={open}
                keys={keys}
                data={data}
                metadata={metadata}
                handleEdit={handleArticleEdit}
                handleDelete={handleDelete}
                handleConfirmDelete={handleConfirmDelete}
                handleClose={handleClose}
                handleMultipleDeleteAction={handleMultipleDeleteAction}
              />
            ) : (
              <PanelTable
                open={open}
                keys={keys}
                data={data}
                metadata={metadata}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handleConfirmDelete={handleConfirmDelete}
                handleClose={handleClose}
                handleMultipleDeleteAction={handleMultipleDeleteAction}
              />
            )}
          </>
        )}
      </TableContainer>
    </BaseContent>
  );
};

export default Panel;
