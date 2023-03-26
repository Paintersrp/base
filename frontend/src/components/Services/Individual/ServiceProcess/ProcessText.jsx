import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import Icon from "../../../Elements/Icon/Icon";
import ProcessTextEdit from "./ProcessTextEdit";
import EditDeleteButtonMenu from "../../../Elements/Buttons/EditDeleteButtonMenu";

const useStyles = makeStyles((theme) => ({
  processItem: {
    display: "flex",
    marginBottom: theme.spacing(0),
    marginTop: theme.spacing(0),
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0),
    textAlign: "start",
  },
  processIcon: {
    minWidth: 50,
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(0),
    fontSize: "1.5rem",
  },
  processIconSecondary: {
    minWidth: 50,
    color: theme.palette.secondary.main,
    marginBottom: theme.spacing(0),
    fontSize: "1.5rem",
  },
  icon: {
    fontSize: "1.5rem",
  },
}));

function ProcessText({ textItem, index, editMode }) {
  console.log(textItem.title);
  const classes = useStyles();
  const [data, setData] = useState(textItem);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setData(textItem);
  }, [textItem]);

  const updateProcess = (updateProcess) => {
    setData(updateProcess);
    setEditing(false);
  };

  return (
    <>
      <ListItem className={classes.processItem}>
        {!editing ? (
          <>
            <ListItemIcon
              className={
                index % 2 === 0
                  ? classes.processIconSecondary
                  : classes.processIcon
              }
            >
              <Icon icon={data.icon} className={classes.icon} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography
                  variant="body2"
                  align="left"
                  style={{ textDecoration: "underline", fontWeight: "bold" }}
                >
                  {data.title}
                </Typography>
              }
              secondary={
                <Typography variant="body2">{data.description}</Typography>
              }
            />
          </>
        ) : (
          <ProcessTextEdit
            item={data}
            updateProcess={updateProcess}
            handleCancel={() => setEditing(!editing)}
          />
        )}
      </ListItem>
      {!editing && editMode ? (
        <div style={{ width: "100%" }}>
          <EditDeleteButtonMenu
            editClick={() => setEditing(!editing)}
            hideDelete
            position="end"
            adminLink="processtextitem"
            text="Process Text Item"
            obj={data.id}
          />
        </div>
      ) : null}
    </>
  );
}

export default ProcessText;
