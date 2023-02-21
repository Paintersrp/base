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
import EditButton from "../../../Elements/Buttons/EditButton";
import { useSelector } from "react-redux";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import axiosInstance from "../../../../lib/Axios/axiosInstance";
import ArticleAuthActions from "../../Articles/List/Actions/ArticleAuthActions";
import DeleteConfirmationModal from "../../Articles/List/Actions/DeleteConfirmationModal";

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
    backgroundColor: theme.palette.error.main,
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.error.dark,
    },
  },
}));

const ArticleListItem = ({ article, onUpdate }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState([]);
  const [editing, setEditing] = useState(false);
  const { auth } = useSelector((state) => state);
  const html = DOMPurify.sanitize(article.content);
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const headings = doc.querySelectorAll("h1, h2, h3, h4, h5, h6");

  headings.forEach((heading) => {
    heading.outerHTML = "";
  });

  const modifiedHtml = doc.body.innerHTML;
  const text = parser.parseFromString(modifiedHtml, "text/html").body
    .textContent;
  const truncatedText = text.substr(0, 250) + "...";

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (id) => {
    handleOpen();
    setSelectedId(id);
  };

  const handleConfirmDelete = () => {
    confirmedDelete(selectedId);
    handleClose();
  };

  const confirmedDelete = async (id) => {
    await axios.delete(`http://localhost:8000/api/articles/${id}/`);
    axiosInstance
      .get("/articles/")
      .then((response) => {
        onUpdate(response.data);
      })
      .catch((err) => {
        setError(err);
      });
  };

  return (
    <div className={classes.listItem}>
      <Link to={`/articles/${article.id}`}>
        <Grid container flex spacing={0}>
          <Grid item xs={2}>
            <CardMedia
              component="img"
              alt="The house from the offer."
              src={`${article.image}`}
              className={classes.media}
            />
          </Grid>
          <Grid item xs={10}>
            <ListItem key={article.id}>
              <ListItemText
                primary={
                  <>
                    <Typography variant="h3" className={classes.textColor}>
                      {article.title}
                    </Typography>
                  </>
                }
                secondary={
                  <>
                    <Typography variant="body2" className={classes.body}>
                      {truncatedText}
                    </Typography>
                    <div className={classes.boxContainer}>
                      <div className={classes.chipContainer}>
                        {article.tags.map((tag) => (
                          <Chip
                            key={tag.name}
                            label={tag.name}
                            className={classes.chip}
                          />
                        ))}
                      </div>
                      <div className={classes.authorContainer}>
                        <Typography className={classes.author}>
                          By: {article.author}
                        </Typography>
                      </div>
                    </div>
                  </>
                }
              />
            </ListItem>
          </Grid>
        </Grid>
        {auth.is_superuser ? (
          <ArticleAuthActions
            article={article}
            handleDelete={handleDelete}
            navigate={navigate}
          />
        ) : null}
      </Link>

      <DeleteConfirmationModal
        open={open}
        handleClose={handleClose}
        handleConfirmDelete={handleConfirmDelete}
        message="Are you sure you want to delete this Article?"
      />
    </div>
  );
};

export default ArticleListItem;
