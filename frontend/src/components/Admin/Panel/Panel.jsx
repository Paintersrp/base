import React, { useEffect, useState } from "react";
import {
  TableContainer,
  Grid,
  Breadcrumbs,
  Typography,
  makeStyles,
} from "@material-ui/core";
import axiosInstance from "../../../lib/Axios/axiosInstance";
import BaseContent from "../../Elements/Base/BaseContent";
import StyledButton from "../../Elements/Buttons/StyledButton";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { NavigateNext } from "@material-ui/icons";
import PanelTable from "./PanelTable";
import Loading from "../../Elements/Layout/Loading";

const useStyles = makeStyles((theme) => ({
  activeLink: {
    color: "#007bff",
    height: "100%",
  },
  breadCrumbTitle: {
    textAlign: "center",
    color: "black",
    borderRight: "1px solid #666666",
    marginRight: 16,
    paddingRight: 16,
    fontWeight: 600,
    fontFamily: "Poppins",
  },
}));

const Panel = ({ apiData }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState([]);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [model, setModel] = useState(null);
  const [appName, setAppName] = useState(null);
  const [keys, setKeys] = useState(null);
  const [url, setUrl] = useState(null);
  const [metadata, setMetadata] = useState(null);

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
          setReady(true);
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
    setReady(false);
    if (!apiData) {
      setUrl(location.state.url);
      setAppName(location.state.appName);
      setKeys(location.state.keys);
      setMetadata(location.state.metadata);
      setModel(location.state.model);
    } else {
      console.log(apiData.url);
      setUrl(apiData.url);
      setAppName(apiData.app_name);
      setKeys(apiData.keys);
      setMetadata(apiData.metadata);
      setModel(apiData);
    }
    handleUpdate();
  }, [url]);

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
    <>
      {ready && model ? (
        <BaseContent maxWidth={1200} pt={4} pb={4}>
          <Typography variant="h3" className={classes.breadCrumbTitle}>
            {model.verbose_name}
          </Typography>
          <Breadcrumbs
            separator={<NavigateNext fontSize="small" />}
            aria-label="breadcrumb"
            style={{ display: "flex" }}
          >
            <Link className={classes.activeLink} to="/admin">
              Home
            </Link>
            <Typography color="textPrimary">{model.verbose_name}</Typography>
          </Breadcrumbs>
          <Grid container justifyContent="center">
            <Grid
              item
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "flex-end",
              }}
            >
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
          </Grid>
          <TableContainer>
            {data && (
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
      ) : (
        <Loading loading={true} />
      )}
    </>
  );
};

export default Panel;
