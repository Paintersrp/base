import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Collapse,
  Avatar,
} from "@material-ui/core";
import ShareIcon from "@material-ui/icons/Share";
import Flexer from "../../../Elements/Layout/Container/Flexer";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    minWidth: 345,
    boxShadow: "0 8px 16px 0 rgba(0, 0, 0, 0.2)",
    borderRadius: "10px",
  },
  header: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    textAlign: "center",
    padding: theme.spacing(2),
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 200,
  },
  hr: {
    width: "100%",
    borderBottom: "1px solid #d9d9d9",
    margin: theme.spacing(2, 0),
  },
  list: {
    width: "100%",
    textAlign: "left",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
  avatar: {
    margin: theme.spacing(2, 0),
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default function DenseCard() {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  return (
    <Card className={classes.root}>
      <CardHeader
        title="My Title"
        className={classes.header}
        onClick={() => setOpen(!open)}
      />
      <Collapse in={open}>
        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            color="textPrimary"
            component="p"
            align="center"
          >
            This is an example of a more advanced text-only card.
          </Typography>
          <hr className={classes.hr} />
          <Typography
            variant="body1"
            color="textPrimary"
            component="p"
            align="center"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac
            tortor augue. Etiam id justo et urna ultricies sollicitudin eu non
            velit.
          </Typography>
          <Flexer j="c">
            <Avatar className={classes.avatar}>
              <ShareIcon />
            </Avatar>
          </Flexer>
          <Typography
            variant="body1"
            color="textPrimary"
            component="p"
            align="center"
          >
            Pellentesque tempor enim eget augue lacinia aliquet. Fusce iaculis
            erat ut augue malesuada fermentum. Praesent sed erat massa.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
