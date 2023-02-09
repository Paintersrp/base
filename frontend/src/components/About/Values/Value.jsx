import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import Avatar from "@material-ui/core/Avatar";
import {
  FaUser,
  FaUsers,
  FaShieldAlt,
  FaPencilRuler,
  FaBook,
  FaBalanceScale,
  FaCogs,
  FaGlobe,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import ValueEdit from "./ValueEdit";
import EditButton from "../../Elements/Buttons/EditButton";

const Icon = ({ icon }) => {
  switch (icon) {
    case "FaUser":
      return <FaUser />;
    case "FaUsers":
      return <FaUsers />;
    case "FaShieldAlt":
      return <FaShieldAlt />;
    case "FaPencilRuler":
      return <FaPencilRuler />;
    case "FaBook":
      return <FaBook />;
    case "FaBalanceScale":
      return <FaBalanceScale />;
    case "FaCogs":
      return <FaCogs />;
    case "FaGlobe":
      return <FaGlobe />;
    default:
      return <></>;
  }
};

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: "bold",
    marginBottom: theme.spacing(3),
    borderBottom: "1px solid black",
    paddingBottom: theme.spacing(1),
  },
  subtitle: {
    color: "black",
    marginLeft: 15,
    minWidth: 200,
    fontWeight: 500,
    fontFamily: "Poppins",
    fontSize: "0.9rem",
  },
  avatar: {
    backgroundColor: "#ffe01b",
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

  const handleEdit = () => {
    setEditing(!editing);
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
        <EditButton onEdit={handleEdit} editState={editing} />
      ) : null}
    </>
  );
}
