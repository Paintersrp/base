import React from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 500,
    backgroundColor: theme.palette.background.light,
    padding: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(2),
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    marginBottom: theme.spacing(2),
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: theme.spacing(2),
  },
}));

const BasePaper = ({ title, subtitle, children, actions, elevation, titleProps, subtitleProps }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root} elevation={elevation}>
      {title && (
        <Typography className={classes.title} variant="h5" {...titleProps}>
          {title}
        </Typography>
      )}
      {subtitle && (
        <Typography className={classes.subtitle} variant="subtitle1" {...subtitleProps}>
          {subtitle}
        </Typography>
      )}
      <div className={classes.content}>{children}</div>
      {actions && <div className={classes.actions}>{actions}</div>}
    </Paper>
  );
};

BasePaper.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.node.isRequired,
  actions: PropTypes.node,
  elevation: PropTypes.number,
  titleProps: PropTypes.object,
  subtitleProps: PropTypes.object,
};

BasePaper.defaultProps = {
  elevation: 1,
  titleProps: {},
  subtitleProps: {},
};

export default BasePaper;
