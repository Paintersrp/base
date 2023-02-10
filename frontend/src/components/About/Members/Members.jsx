import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useState } from "react";
import Member from "./Member";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100vw",
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
    fontWeight: "bold",
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
        <Grid container spacing={0} className={classes.container}>
          <Grid item xs={12} sm={12}>
            <Typography variant="h3" className={classes.sectionTitle}>
              Company Management
            </Typography>
          </Grid>
          {members.map((member) => (
            <Member member={member} />
          ))}
        </Grid>
      ) : null}
    </div>
  );
};

export default Members;
