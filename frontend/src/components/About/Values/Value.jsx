import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import Avatar from "@material-ui/core/Avatar";
import { useSelector } from "react-redux";
import ValueEdit from "./ValueEdit";
import EditButton from "../../Elements/Buttons/EditButton";
import Icon from "../../Elements/Icon/Icon";
import EditDeleteButtonMenu from "../../Elements/Buttons/EditDeleteButtonMenu";
import { Grid } from "@material-ui/core";
import DeleteConfirmationModal from "../../Elements/Modals/DeleteConfirmationModal";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  subtitle: {
    color: "black",
    marginLeft: 15,
    minWidth: 250,
    fontWeight: 500,
    fontFamily: "Poppins",
    fontSize: "0.9rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.background.light,
  },
  fadeIn: {
    opacity: 0,
    animation: `$fadeIn 0.5s ease-in-out forwards`,
  },
  "@keyframes fadeIn": {
    from: {
      opacity: 0,
      transform: "translateY(-30px)",
    },
    to: {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
}));

export default function Value({ value }) {
  const classes = useStyles();
  const [valueData, setValueData] = useState(value);
  const [editing, setEditing] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState([]);
  const auth = useSelector((state) => state.auth);

  const updateValue = (updateValue) => {
    setValueData(updateValue);
    setEditing(false);
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
    await axios.delete(`http://localhost:8000/api/value/${id}/`);
    onUpdate();
  };

  return (
    <React.Fragment>
      {!editing ? (
        <ListItem className={classes.fadeIn}>
          <Avatar className={classes.avatar}>
            <Icon icon={valueData.icon} />
          </Avatar>
          <Typography className={classes.subtitle}>
            <Grid container justifyContent="space-between" alignItems="center">
              {valueData.title}
              {!editing && auth.is_superuser ? (
                <>
                  <EditDeleteButtonMenu
                    hideDelete
                    editClick={() => setEditing(!editing)}
                    deleteClick={() => handleDelete(value.id)}
                    position="center"
                    placement="bottom"
                  />
                </>
              ) : null}
            </Grid>
          </Typography>
        </ListItem>
      ) : (
        <ValueEdit
          value={valueData}
          onUpdate={updateValue}
          handleCancel={() => setEditing(!editing)}
          editState={editing}
        />
      )}
      <DeleteConfirmationModal
        open={open}
        handleClose={handleClose}
        handleConfirmDelete={handleConfirmDelete}
        message="Are you sure you want to delete this?"
      />
    </React.Fragment>
  );
}
