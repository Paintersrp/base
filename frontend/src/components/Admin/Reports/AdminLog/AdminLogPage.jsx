import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PageContainer from "../../../Elements/Layout/PageContainer";
import FABMenu from "../../../Elements/Buttons/FABAdminMenu";
import ErrorPage from "../../../Elements/Layout/Errors/ErrorPage";
import AdminLogReport from "./AdminLogReport";
import BaseContent from "../../../Elements/Base/BaseContent";
import { Breadcrumbs, Typography } from "@material-ui/core";
import { Link, useLocation } from "react-router-dom";
import { NavigateNext } from "@material-ui/icons";
import axiosInstance from "../../../../lib/Axios/axiosInstance";
import Loading from "../../../Elements/Layout/Loading/Loading";

const useStyles = makeStyles((theme) => ({
  root: {},
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

const AdminLogPage = ({}) => {
  const classes = useStyles();
  const [editing, setEditing] = useState(false);
  const [data, setData] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  // console.log(location.state, "state");
  // setAppName(location.state.appName);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axiosInstance.get(
        "/recent_admin_actions/?items=all"
      );
      setData(result.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (error) {
    return (
      <ErrorPage
        message={error.message}
        description={error.description}
        instructions={error.instructions}
        thanks={error.thanks}
      />
    );
  }
  if (loading) {
    return <Loading loading={true} message="Gathering Resources" />;
  }

  return (
    <PageContainer
      editing={editing}
      setEditing={setEditing}
      backgroundColor="#F5F5F5"
      page_name="Default"
    >
      <BaseContent maxWidth={1200} pt={4} pb={4}>
        <Typography variant="h3" className={classes.breadCrumbTitle}>
          Admin Log
        </Typography>
        <Breadcrumbs
          separator={<NavigateNext fontSize="small" />}
          aria-label="breadcrumb"
          style={{ display: "flex" }}
        >
          <Link className={classes.activeLink} to="/admin">
            Home
          </Link>
          <Typography color="textPrimary">Admin Log</Typography>
        </Breadcrumbs>
        <AdminLogReport
          data={data}
          startAppFilter={
            location.state.appName ? location.state.appName : null
          }
          startModelFilter={
            location.state.modelName
              ? location.state.modelName.toLowerCase()
              : null
          }
        />
      </BaseContent>
    </PageContainer>
  );
};

export default AdminLogPage;
