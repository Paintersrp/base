import * as React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import SEOHeader from "../Head/SEOHeader";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "99vw",
    minHeight: "80vh",
    backgroundColor: "#242424",
    color: "white",
  },
  title: {
    color: "white",
    marginTop: theme.spacing(4),
    textAlign: "center",
  },
  content: {
    padding: theme.spacing(4, 2, 6, 2),
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(4, 6, 6, 6),
    },
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(4, 8, 6, 8),
    },
  },
}));

const ContentLayout = ({
  children,
  title,
  description = "",
  keywords = "",
  image = "",
  url = "",
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
      <div className={classes.root}>
        <Container>
          <Typography variant="h1" className={classes.title}>
            {title}
          </Typography>
        </Container>
        <div className={classes.content}>{children}</div>
      </div>
    </>
  );
};

ContentLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  keywords: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string,
};

export default ContentLayout;
