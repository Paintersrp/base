import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
  DialogContent,
  Button,
  Dialog,
  Tooltip,
} from "@material-ui/core";
import { MdExpandMore } from "react-icons/Md";
import { makeStyles } from "@material-ui/core/styles";
import EditButton from "../../Elements/Buttons/EditButton";
import { useSelector } from "react-redux";
import QAEdit from "./QAEdit";
import DeleteButton from "../../Elements/Buttons/DeleteButton";
import axios from "axios";
import { IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  question: {
    display: "flex",
    alignItems: "center",
  },
  heading: {
    fontSize: "1.2rem",
    fontWeight: 700,
    fontFamily: "Poppins",
    color: "black",
  },
  details: {
    padding: theme.spacing(2),
    backgroundColor: "white",
    color: "black",
    fontFamily: "Poppins",
    textAlign: "left",
  },
  summary: {
    backgroundColor: "white",
    fontFamily: "Poppins",
    color: "black",
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
    backgroundColor: theme.palette.success.dark,
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.success.main,
    },
  },
  noButton: {
    fontFamily: "Poppins",
    width: "100%",
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
    backgroundColor: theme.palette.error.dark,
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.error.main,
    },
  },
  tooltip: {
    fontFamily: "Roboto",
    fontSize: ".9rem",
    fontWeight: 600,
    backgroundColor: theme.palette.primary.main,
    borderRadius: "4px",
    color: theme.palette.primary.contrastText,
    minWidth: 65,
    textAlign: "center",
  },
  arrow: {
    color: theme.palette.primary.main,
  },
}));

const AccordionQA = ({ faq, onUpdate }) => {
  const auth = useSelector((state) => state.auth);
  const [editing, setEditing] = useState(false);
  const classes = useStyles();
  const [expanded, setExpanded] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState([]);

  const handleChange = (panel) => (event, isExpanded) => {
    if (isExpanded) {
      setExpanded([...expanded, panel]);
    } else {
      setExpanded(expanded.filter((p) => p !== panel));
    }
  };

  const transitionProps = {
    timeout: {
      enter: 400,
      exit: 400,
    },
    mountOnEnter: true,
    unmountOnExit: true,
    addEndListener: (node, done) => {
      node.addEventListener("transitionend", done, false);
    },
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
    onUpdate();
  };

  return (
    <Grid>
      {!editing ? (
        <Accordion
          expanded={expanded.includes(faq.id)}
          onChange={handleChange(faq.id)}
          disableGutters="true"
          TransitionProps={transitionProps}
        >
          <AccordionSummary
            expandIcon={<MdExpandMore color="black" />}
            aria-controls={`${faq.id}-content`}
            id={`${faq.id}-header`}
            className={classes.summary}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <div className={classes.question}>
                <Typography className={classes.heading}>
                  {faq.question}
                </Typography>
              </div>
              {auth.is_superuser ? (
                <>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Tooltip
                      title="Edit"
                      classes={{
                        tooltip: classes.tooltip,
                        arrow: classes.arrow,
                      }}
                      arrow
                      placement="top"
                    >
                      <IconButton
                        size="small"
                        color="primary"
                        style={{ marginRight: 5, marginBottom: 5 }}
                        onClick={() => setEditing(!editing)}
                        classes={{ label: classes.label }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip
                      title="Delete"
                      classes={{
                        tooltip: classes.tooltip,
                        arrow: classes.arrow,
                      }}
                      arrow
                      placement="top"
                    >
                      <IconButton
                        style={{ marginRight: 5, marginBottom: 5 }}
                        size="small"
                        color="primary"
                        label="edit"
                        aria-label="Edit"
                        onClick={() => handleDelete(faq.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                </>
              ) : null}
            </div>
          </AccordionSummary>
          <AccordionDetails className={classes.details}>
            <Typography>{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ) : (
        <>
          <QAEdit onUpdate={onUpdate} QA={faq} onEdit={setEditing} />
          {auth.is_superuser ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <EditButton
                onClick={() => setEditing(!editing)}
                editState={editing}
                mt={0}
                mb={15}
                mr={5}
              />
              <DeleteButton
                onClick={() => handleDelete(faq.id)}
                editState={editing}
                mt={0}
                mb={15}
                ml={5}
              />
            </div>
          ) : null}
        </>
      )}
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
    </Grid>
  );
};

export default AccordionQA;
