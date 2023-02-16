import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  CardActions,
  makeStyles,
  Typography,
  Dialog,
  DialogContent,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import FormField from "../../Elements/Fields/FormField";

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    maxWidth: 360,
    [theme.breakpoints.up("sm")]: {
      maxWidth: "none",
    },
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
  },
  closedText: {
    fontFamily: "Poppins",
    color: "red",
    fontWeight: "600",
  },
  flexer: {
    display: "flex",
    justifyContent: "center",
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

const FAQEdit = ({ onUpdate }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [editFaqs, setEditFaqs] = useState([]);
  const [selectedId, setSelectedId] = useState([]);
  const [editing, setEditing] = useState(false);
  const [currentFaq, setCurrentFaq] = useState({
    id: null,
    category: "",
    question: "",
    answer: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:8000/api/faqs/");
      setEditFaqs(response.data);
    };
    fetchData();
  }, []);

  const handleEdit = (faq) => {
    setEditing(true);
    setCurrentFaq({
      id: faq.id,
      category: faq.category_name,
      question: faq.question,
      answer: faq.answer,
    });
  };

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
    await axios.delete(`http://localhost:8000/api/faqs/${id}/`);
    setEditFaqs(editFaqs.filter((faq) => faq.id !== id));
    onUpdate(editFaqs);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await axios.put(
      `http://localhost:8000/api/faqs/${currentFaq.id}/`,
      currentFaq
    );
    setEditing(false);
    setEditFaqs(
      editFaqs.map((faq) =>
        faq.id === currentFaq.id ? { ...faq, ...currentFaq } : { ...faq }
      )
    );
    onUpdate(editFaqs);
  };

  const handleChange = (e) => {
    setCurrentFaq({ ...currentFaq, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Dialog
        className={classes.flexer}
        classes={{ root: classes.dialog, paper: classes.paper }}
        open={editing}
        onClose={handleClose}
      >
        <div className={classes.testboi}>
          <DialogContent dividers={true} className={classes.editContainer}>
            <Typography variant="h3" style={{ textAlign: "center" }}>
              FAQ Edit
            </Typography>
            <form
              onSubmit={handleUpdate}
              style={{
                marginTop: 20,
                height: 250,
                width: 400,
              }}
            >
              <FormField
                label="Question"
                value={currentFaq.question}
                onChange={handleChange}
              />
              <FormField
                label="Answer"
                value={currentFaq.answer}
                onChange={handleChange}
                multiline
              />
              <CardActions
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Button
                  variant="outlined"
                  type="submit"
                  style={{
                    width: 50,
                    color: "black",
                    borderColor: "grey",
                    height: 25,
                    fontSize: "0.75rem",
                  }}
                >
                  Update
                </Button>
                <Button
                  variant="outlined"
                  style={{
                    width: 50,
                    color: "black",
                    borderColor: "grey",
                    height: 25,
                    fontSize: "0.75rem",
                  }}
                  onClick={() => setEditing(!editing)}
                >
                  {editing ? "Cancel" : "Edit"}
                </Button>
              </CardActions>
            </form>
          </DialogContent>
        </div>
      </Dialog>
      <div style={{ maxWidth: "360" }}>
        <TableContainer
          component={Paper}
          style={{ marginTop: 20, display: "flex", maxWidth: "360" }}
        >
          <Table style={{ maxWidth: "360" }}>
            <TableHead>
              <TableRow>
                <TableCell>Question</TableCell>
                <TableCell>Answer</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {editFaqs.map((faq, index) => (
                <TableRow key={index}>
                  <TableCell>{faq.question}</TableCell>
                  <TableCell>{faq.answer}</TableCell>
                  <TableCell>{faq.category_name}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(faq)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(faq.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Dialog
          className={classes.flexer}
          classes={{ root: classes.dialog, paper: classes.paper }}
          open={open}
          onClose={handleClose}
        >
          <div className={classes.testboi}>
            <DialogContent dividers={true} className={classes.detailsContainer}>
              <Typography variant="h3">
                Are you sure you want to delete this FAQ?
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
                    flexDirection: "column",
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
      </div>
    </>
  );
};

export default FAQEdit;
