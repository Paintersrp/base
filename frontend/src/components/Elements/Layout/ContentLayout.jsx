import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Container } from "@material-ui/core";
import SEOHeader from "../Head/SEOHeader";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    minHeight: "80vh",
    color: "white",
  },
  header: {
    color: "white",
    marginTop: theme.spacing(4),
    textAlign: "center",
  },
  content: {
    minHeight: 700,
    width: "100vw",
  },
}));

const ContentLayout = ({
  children,
  title,
  header,
  description = "",
  keywords = "",
  image = "",
  url = "",
  backgroundColor = "#FFFFFF",
}) => {
  const classes = useStyles();

  return (
    <>
      <SEOHeader
        title={title}
        description={description}
        keywords={keywords}
        image={image}
        url={url}
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
        <div className={classes.content}>{children}</div>
      </div>
    </>
  );
};

ContentLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  header: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string,
};

export default ContentLayout;
