import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import MemberEdit from "./MemberEdit";
import EditButton from "../../Elements/Buttons/EditButton";

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
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  socialIcons: {
    marginTop: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
  },
  iconButton: {
    padding: theme.spacing(1),
    color: theme.palette.primary.dark,
  },
  chip: {
    margin: "3px 3px 3px 3px",
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
  body: {
    padding: 0,
    color: "black",
    minHeight: 100,
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: theme.spacing(3),
    borderBottom: "1px solid black",
    paddingBottom: theme.spacing(1),
    color: "black",
  },
}));

const Member = ({ member }) => {
  const classes = useStyles();
  const [editing, setEditing] = useState(false);
  const [memberData, setMemberData] = useState(member);
  const auth = useSelector((state) => state.auth);

  const updateMember = (updateMember) => {
    setMemberData(updateMember);
    setEditing(false);
  };

  const handleEdit = () => {
    setEditing(!editing);
  };

  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={6}
      key={memberData.name}
      className={classes.container}
    >
      {!editing ? (
        <Card className={classes.card}>
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
          <CardContent className={classes.cardContent}>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className={classes.body}
            >
              {memberData.bio}
            </Typography>
            <div className={classes.socialIcons}>
              <IconButton
                className={classes.iconButton}
                href={memberData.linkedIn}
                target="_blank"
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </IconButton>
              <IconButton
                className={classes.iconButton}
                href={memberData.github}
                target="_blank"
                aria-label="GitHub"
              >
                <GitHubIcon />
              </IconButton>
              <IconButton
                className={classes.iconButton}
                href={memberData.twitter}
                target="_blank"
                aria-label="Twitter"
              >
                <TwitterIcon />
              </IconButton>
            </div>
          </CardContent>
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
