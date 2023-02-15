import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {
  Box,
  Button,
  CardMedia,
  Chip,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import DOMPurify from "dompurify";
import { Link, useNavigate } from "react-router-dom";
import EditButton from "../../../components/Elements/Buttons/EditButton";
import { useSelector } from "react-redux";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import axiosInstance from "../../../lib/Axios/axiosInstance";
import ArticleAuthActions from "./ArticleAuthActions";

const useStyles = makeStyles((theme) => ({
  listItem: {
    marginBottom: 0,
    borderBottom: "1px solid black",
    borderLeft: "1px solid black",
    borderRight: "1px solid black",
    transition: "0.1s",
    [`&:first-of-type`]: {
      borderTop: "1px solid black",
    },
    "&:hover": {
      borderBottom: `3px solid ${theme.palette.secondary.main}`,
    },
  },
  textColor: {
    color: theme.palette.text.dark,
  },
  body: {
    color: theme.palette.text.dark,
    padding: theme.spacing(3, 0),
  },
  author: {
    fontSize: "0.7rem",
    fontFamily: "Poppins",
    fontWeight: 500,
    fontStyle: "italic",
    color: theme.palette.text.dark,
  },
  authorContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "end",
  },
  chip: {
    borderRadius: 14,
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.secondary.contrastText,
    marginRight: 5,
    marginTop: 5,
    fontWeight: 600,
    fontFamily: "Roboto",
  },
  chipContainer: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    flexWrap: "wrap",
    paddingBottom: 5,
  },
  boxContainer: {
    display: "flex",
    width: "100%",
    alignItems: "center",
  },
  media: {
    height: "100%",
  },
  dialog: {
    backgroundColor: "transparent",
  },
  paper: {
    backgroundColor: "white",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0px 0px 10px #00000066",
  },
  detailsContainer: {
    fontFamily: "Poppins",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "white",
    color: "black",
    [theme.breakpoints.down("md")]: {
      width: "50%",
    },
  },
  editContainer: {
    fontFamily: "Poppins",
    alignItems: "center",
    backgroundColor: "white",
    color: "black",
    [theme.breakpoints.down("md")]: {
      width: "50%",
    },
  },
  testboi: {
    backgroundColor: "#white",
    display: "flex",
    padding: 0,
    margin: 0,
    "& .MuiDialogContent-dividers": {
      borderTop: "0px solid white !important",
    },
    "& .MuiDialogContent-root": {
      border: "0px solid black",
    },
  },
  yesButton: {
    fontFamily: "Poppins",
    width: "100%",
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(1),
    backgroundColor: theme.palette.success.main,
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.success.dark,
    },
  },
  noButton: {
    fontFamily: "Poppins",
    width: "100%",
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
    backgroundColor: theme.palette.error.main,
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.error.dark,
    },
  },
}));

const DeleteConfirmationModal = ({
  open,
  handleClose,
  handleConfirmDelete,
  message = "Are you sure you want to delete this?",
}) => {
  const classes = useStyles();

  return (
    <Dialog
      className={classes.flexer}
      classes={{ root: classes.dialog, paper: classes.paper }}
      open={open}
      onClose={handleClose}
    >
      <div className={classes.testboi}>
        <DialogContent dividers={true} className={classes.detailsContainer}>
          <Typography variant="h4" align="center">
            {message}
          </Typography>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <div
              style={{
                width: "15%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Button
                onClick={handleConfirmDelete}
                variant="contained"
                className={classes.yesButton}
              >
                Yes
              </Button>
              <Button
                onClick={handleClose}
                variant="contained"
                className={classes.noButton}
              >
                No
              </Button>
            </div>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default DeleteConfirmationModal;
