import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Typography,
  makeStyles,
} from "@material-ui/core";
import NotFoundIllustration from "./NotFoundIllustration";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "78vh",
    padding: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  heading: {
    fontWeight: "bold",
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(2),
    textAlign: "center",
  },
  message: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(4),
    textAlign: "center",
  },
  illustration: {
    width: "100%",
    maxWidth: "400px",
    marginBottom: theme.spacing(4),
  },
  button: {
    padding: `${theme.spacing(0.5)}px ${theme.spacing(2)}px`,
    borderRadius: theme.spacing(6),
  },
}));

export const NotFound = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Container maxWidth="sm">
        <NotFoundIllustration className={classes.illustration} />
        <Typography variant="h1" className={classes.heading}>
          404 - Page Not Found
        </Typography>

        <Typography variant="body1" className={classes.message}>
          We're sorry, the page you requested could not be found.
        </Typography>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            size="small"
            component={RouterLink}
            to="/"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Go to Home Page
          </Button>
        </div>
      </Container>
    </Box>
  );
};
