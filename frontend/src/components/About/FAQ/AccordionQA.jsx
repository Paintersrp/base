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
} from "@material-ui/core";
import { MdExpandMore } from "react-icons/Md";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import QuestionAnswerEdit from "./QuestionAnswerEdit";
import axios from "axios";

import DeleteConfirmationModal from "../../Elements/Modals/DeleteConfirmationModal";
import EditDeleteButtonMenu from "../../Elements/Buttons/EditDeleteButtonMenu";
import axiosInstance from "../../../lib/Axios/axiosInstance";

const useStyles = makeStyles((theme) => ({
  question: {
    display: "flex",
    alignItems: "center",
  },
  heading: {
    fontSize: "1.2rem",
    fontWeight: 700,
    fontFamily: "Roboto",
    color: "black",
  },
  details: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.light,
    color: "black",
    fontFamily: "Roboto",
    textAlign: "left",
  },
  summary: {
    backgroundColor: theme.palette.background.light,
    fontFamily: "Roboto",
    color: "black",
  },
  detailsContainer: {
    fontFamily: "Roboto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: theme.palette.background.light,
    color: "black",
    [theme.breakpoints.down("md")]: {
      width: "50%",
    },
  },
  editContainer: {
    fontFamily: "Roboto",
    alignItems: "center",
    backgroundColor: theme.palette.background.light,
    color: "black",
    [theme.breakpoints.down("md")]: {
      width: "50%",
    },
  },
  questionContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  yesButton: {
    fontFamily: "Roboto",
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
    fontFamily: "Roboto",
    width: "100%",
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
    backgroundColor: theme.palette.error.dark,
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.error.main,
    },
  },
}));

const AccordionQA = ({
  faq,
  onUpdate,
  editing,
  setEditing,
  handleCancel,
  edit = true,
  editMode = false,
}) => {
  const auth = useSelector((state) => state.auth);
  const classes = useStyles();
  const [expanded, setExpanded] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState([]);
  const dispatch = useDispatch();

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

  const handleUpdate = (handleUpdate) => {
    onUpdate(handleUpdate);
    setEditing(false);
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
    await axiosInstance.delete(`http://localhost:8000/api/faq/${id}/`);
    dispatch({
      type: "ALERT_SUCCESS",
      message: `FAQ Object Deleted`,
    });
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
            <div className={classes.questionContainer}>
              <div className={classes.question}>
                <Typography className={classes.heading}>
                  {faq.question}
                </Typography>
              </div>
              {editMode && edit ? (
                <>
                  <EditDeleteButtonMenu
                    editClick={() => setEditing(!editing)}
                    deleteClick={() => handleDelete(faq.id)}
                    text={`FAQ`}
                    obj={faq.id}
                  />
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
          <QuestionAnswerEdit
            onUpdate={handleUpdate}
            QA={faq}
            onEdit={setEditing}
            handleCancel={handleCancel}
          />
        </>
      )}
      <DeleteConfirmationModal
        open={open}
        handleClose={handleClose}
        handleConfirmDelete={handleConfirmDelete}
        message="Are you sure you want to delete this FAQ?"
      />
    </Grid>
  );
};

export default AccordionQA;
