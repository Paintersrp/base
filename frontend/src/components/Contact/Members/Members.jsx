import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useState } from "react";
import Member from "./Member";
import Flexbox from "../../Elements/Layout/Flexbox/Flexbox";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    marginTop: theme.spacing(5),
    backgroundColor: "white",
  },
  container: {
    display: "flex",
    maxWidth: 860,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginTop: 20,
  },
  sectionTitle: {
    marginBottom: theme.spacing(3),
    borderBottom: "1px solid black",
    paddingBottom: theme.spacing(1),
    color: "black",
  },
}));

const Members = ({ membersData }) => {
  const classes = useStyles();
  const [members, setMembers] = useState([]);

  useEffect(() => {
    setMembers(membersData);
  }, []);

  return (
    <div className={classes.root}>
      {members ? (
        <Flexbox className={classes.container}>
          <div xs={12} sm={12}>
            <Typography
              variant="h2"
              className={classes.sectionTitle}
              style={{ width: "100%" }}
            >
              Company Management
            </Typography>
          </div>
          {members.map((member) => (
            <Member member={member} />
          ))}
        </Flexbox>
      ) : null}
    </div>
  );
};

export default Members;
