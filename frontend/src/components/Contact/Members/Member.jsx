import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import { useState } from "react";
import { useSelector } from "react-redux";
import MemberEdit from "./MemberEdit";
import EditButton from "../../Elements/Buttons/EditButton";
import MemberContent from "./MemberContent";
import { baseClasses } from "../../../classes";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    maxWidth: 860,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginTop: 20,
  },
  card: {
    maxWidth: 350,
    borderRadius: theme.spacing(1),
    boxShadow: theme.shadows[2],
    transition: "0.3s",
    "&:hover": {
      transform: "translateY(-10px)",
      boxShadow: theme.shadows[7],
    },
  },
  cardContent: {
    padding: "0px 16px 0px 16px",
  },
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  title: {
    color: "black",
    fontSize: "1.25rem",
    fontWeight: 600,
    marginBottom: 5,
  },
  subheader: {
    color: theme.palette.primary.dark,
    fontSize: "0.85rem",
    fontWeight: 600,
    fontFamily: "Poppins",
  },
}));

const Member = ({ member }) => {
  const classes = useStyles();
  const { fadeIn } = baseClasses();
  const [editing, setEditing] = useState(false);
  const [memberData, setMemberData] = useState(member);
  const auth = useSelector((state) => state.auth);

  const updateMember = (updateMember) => {
    setMemberData(updateMember);
    setEditing(false);
  };

  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={6}
      key={memberData.name}
      className={`${classes.container}`}
    >
      {!editing ? (
        <Card className={`${classes.card} ${fadeIn}`}>
          <CardHeader
            avatar={
              <Avatar
                variant="rounded"
                src={memberData.image}
                className={classes.avatar}
              />
            }
            title={memberData.name}
            subheader={memberData.role}
            classes={{
              title: classes.title,
              subheader: classes.subheader,
            }}
          />
          <MemberContent member={memberData} />
        </Card>
      ) : (
        <MemberEdit member={memberData} onUpdate={updateMember} />
      )}
      {auth.is_superuser ? (
        <div style={{ marginTop: 10 }}>
          <EditButton
            onClick={() => setEditing(!editing)}
            editState={editing}
          />
        </div>
      ) : null}
    </Grid>
  );
};

export default Member;
