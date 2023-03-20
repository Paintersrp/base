import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Member from "./Member";
import Flexbox from "../../Elements/Layout/Flexbox/Flexbox";
import { IconButton, Tooltip } from "@material-ui/core";
import { Link } from "react-router-dom";
import AdminButton from "../../Elements/Buttons/AdminButton";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    marginTop: theme.spacing(5),
    backgroundColor: theme.palette.background.light,
  },
  container: {
    display: "flex",
    maxWidth: 860,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.background.light,
    marginTop: 20,
  },
  sectionTitle: {
    marginBottom: theme.spacing(3),
    borderBottom: "1px solid black",
    paddingBottom: theme.spacing(1),
    color: "black",
    display: "flex",
    justifyContent: "space-between",
  },
}));

const Members = ({ membersData, editMode }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {membersData ? (
        <Flexbox className={classes.container}>
          <div xs={12} sm={12}>
            <Typography
              variant="h2"
              className={classes.sectionTitle}
              style={{ width: "100%" }}
            >
              Company Management
              {editMode && (
                <AdminButton link="teammember" tooltipText={"Team Members"} />
              )}
            </Typography>
          </div>
          {membersData.map((member) => (
            <Member member={member} editMode={editMode} />
          ))}
        </Flexbox>
      ) : null}
    </div>
  );
};

export default Members;
