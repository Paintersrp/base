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
  const auth = useSelector((state) => state.auth);

  const updateValue = (updateValue) => {
    setValueData(updateValue);
    setEditing(false);
  };

  return (
    <React.Fragment>
      {!editing ? (
        <ListItem className={classes.fadeIn}>
          <Avatar className={classes.avatar}>
            <Icon icon={valueData.icon} />
          </Avatar>
          <Typography className={classes.subtitle}>
            <Grid container justifyContent="space-between">
              {valueData.title}
              {!editing && auth.is_superuser ? (
                <>
                  <EditDeleteButtonMenu
                    hideDelete
                    editClick={() => setEditing(!editing)}
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
    </React.Fragment>
  );
}
