import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import { useState } from "react";
import { useSelector } from "react-redux";
import MemberEdit from "./MemberEdit";
import MemberContent from "./MemberContent";
import { baseClasses } from "../../../classes";
import EditDeleteButtonMenu from "../../Elements/Buttons/EditDeleteButtonMenu";
import Flexbox from "../../Elements/Layout/Flexbox/Flexbox";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    maxWidth: 860,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.background.light,
    margin: theme.spacing(2, 2, 2, 2),
  },
  card: {
    backgroundColor: theme.palette.background.light,
    maxWidth: 350,
    borderRadius: theme.spacing(1),
    boxShadow: theme.shadows[2],
    transition: "0.3s",
    "&:hover": {
      transform: "translateY(-10px)",
      boxShadow: theme.shadows[7],
    },
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

const Member = ({ member, newImage }) => {
  const classes = useStyles();
  const { fadeIn } = baseClasses();
  const [editing, setEditing] = useState(false);
  const [memberData, setMemberData] = useState(member);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    setMemberData(member);
  }, [member]);

  const updateMember = (updateMember) => {
    setMemberData(updateMember);
    setEditing(false);
  };

  return (
    <>
      <Flexbox key={memberData.name} className={classes.container}>
        <div xs={12} md={12} key={memberData.name}>
          {!editing ? (
            <Card className={`${classes.card} ${fadeIn}`}>
              <CardHeader
                avatar={
                  <Avatar
                    variant="rounded"
                    src={newImage ? newImage : memberData.image}
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
              {!editing && auth.is_superuser ? (
                <div style={{ marginTop: 4, marginBottom: 4, marginRight: 8 }}>
                  <EditDeleteButtonMenu
                    hideDelete
                    editClick={() => setEditing(!editing)}
                    position="flex-end"
                    placement="bottom"
                  />
                </div>
              ) : null}
            </Card>
          ) : (
            <MemberEdit
              member={memberData}
              onUpdate={updateMember}
              handleCancel={() => setEditing(!editing)}
            />
          )}
        </div>
      </Flexbox>
    </>
  );
};

export default Member;
