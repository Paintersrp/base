import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import Avatar from "@material-ui/core/Avatar";
import { useSelector } from "react-redux";
import ValueEdit from "./ValueEdit";
import EditButton from "../../Elements/Buttons/EditButton";
import Icon from "../../Elements/Icon/Icon";

const useStyles = makeStyles((theme) => ({
  subtitle: {
    color: "black",
    marginLeft: 15,
    minWidth: 200,
    fontWeight: 500,
    fontFamily: "Poppins",
    fontSize: "0.9rem",
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
  },
}));

export default function Value({ value }) {
  const classes = useStyles();
  const [valueData, setValueData] = useState(value);
  const [editing, setEditing] = useState(false);
  const auth = useSelector((state) => state.auth);

  const updateValue = (updateValue) => {
    setValueData(updateValue);
    setEditing(false);
  };

  return (
    <>
      {!editing ? (
        <ListItem>
          <Avatar className={classes.avatar}>
            <Icon icon={valueData.icon} />
          </Avatar>
          <Typography className={classes.subtitle}>
            {valueData.title}
          </Typography>
        </ListItem>
      ) : (
        <div style={{ width: "100%" }}>
          <ValueEdit value={valueData} onUpdate={updateValue} />
        </div>
      )}
      {auth.is_superuser ? (
        <EditButton onClick={() => setEditing(!editing)} editState={editing} />
      ) : null}
    </>
  );
}
