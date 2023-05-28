import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import SEOHeader from "../Head/SEOHeader";
import Container from "./Container/Container";
import { useSelector } from "react-redux";
import BaseDialog from "../Base/Dialog/BaseDialog";
import SEOEdit from "./SEOEdit";
import axiosInstance from "../../../lib/Axios/axiosInstance";
import Loading from "./Loading/Loading";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    minHeight: "80vh",
    color: "#222",
  },
  header: {
    color: "#222",
    marginTop: theme.spacing(4),
    textAlign: "center",
  },
  content: {
    minHeight: 700,
    width: "100%",
    background: "inherit",
  },
  seoEdit: {
    position: "absolute",
    right: 10,
    marginTop: 10,
  },
}));

const PageContainer = ({
  children,
  header,
  editing,
  setEditing,
  seoEdit = true,
  page_name = "Default",
  backgroundColor = "#F5F5F5",
}) => {
  const classes = useStyles();
  const auth = useSelector((state) => state.auth);
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      axiosInstance
        .get(`/header/${page_name}/`)
        .then((response) => {
          console.log(response.data);
          setData(response.data);
        })
        .catch((err) => {
          setError(err);
        });
    };
    fetchData();
  }, []);

  const updateSeo = (updateSeo) => {
    setData(updateSeo);
    setEditing(false);
  };

  return (
    <>
      {data ? (
        <>
          <SEOHeader
            title={data.title}
            description={data.description}
            keywords={data.keywords}
            image={data.image}
            url={data.url}
          />
          <div
            className={classes.root}
            style={{ backgroundColor: backgroundColor }}
          >
            {header ? (
              <Container>
                <Typography variant="h1" className={classes.header}>
                  {header}
                </Typography>
              </Container>
            ) : null}
            {seoEdit && (
              <>
                {data ? (
                  <BaseDialog
                    open={editing}
                    onClose={() => setEditing(!editing)}
                    title={`Edit ${page_name} Page SEO`}
                  >
                    <SEOEdit
                      data={data}
                      onUpdate={updateSeo}
                      handleCancel={() => setEditing(!editing)}
                    />
                  </BaseDialog>
                ) : null}
              </>
            )}
            <div className={classes.content}>{children}</div>
          </div>
        </>
      ) : (
        <Loading loading={true} />
      )}
    </>
  );
};

PageContainer.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  header: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string,
};

export default PageContainer;
