import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { deepPurple } from "@material-ui/core/colors";
import { Divider, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#242424",
    padding: 40,
  },
  card: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: 400,
    minWidth: 400,
    padding: theme.spacing(3),
    margin: theme.spacing(1.5),
    boxShadow: theme.shadows[7],
    backgroundColor: "#202020",
    "&:hover": {
      transform: "scale(1.02)",
      boxShadow: theme.shadows[14],
    },
  },
  avatar: {
    minWidth: 92,
    minHeight: 92,
    marginLeft: theme.spacing(3),
    backgroundColor: deepPurple[500],
    color: theme.palette.common.white,
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  image: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  cardHeader: {
    padding: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  cardContent: {
    flexGrow: 1,
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  gridContainer: {
    alignItems: "center",
  },
  cardContainer: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    marginBottom: 0,
  },
  name: {
    fontWeight: 800,
    marginBottom: theme.spacing(1),
    fontFamily: "Poppins",
    color: "#f9f9f9",
    fontSize: "1.5rem",
    "&:hover": {
      transform: "scale(1.02)",
      opacity: 0.95,
    },
  },
  position: {
    color: "#f9f9f9",
    fontWeight: 450,
    fontSize: "1rem",
    marginBottom: theme.spacing(1),
    fontFamily: "Poppins",
    "&:hover": {
      transform: "scale(1.02)",
      opacity: 0.95,
    },
  },
  bio: {
    color: "#f9f9f9",
    marginTop: theme.spacing(1),
    fontSize: "0.9rem",
    fontWeight: 450,
    fontFamily: "Poppins",
    "&:hover": {
      transform: "scale(1.02)",
      opacity: 0.95,
    },
  },
  title: {
    textAlign: "center",
    color: "#f9f9f9",
    fontWeight: "700",
    fontFamily: "Poppins",
  },
  divider: {
    margin: `${theme.spacing(3)}px 0`,
    color: "white",
    backgroundColor: "white",
  },
  carddivider: {
    marginBottom: 10,
    color: "white",
    backgroundColor: "white",
  },
  paper: {
    padding: 40,
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "#242424",
    boxShadow: theme.spacing(6),
  },
}));

function MemberTiles({ name, position, bio, image }) {
  const classes = useStyles();

  return (
    <Card elevation={9} className={classes.card}>
      <Grid container spacing={0} className={classes.gridContainer}>
        <Grid item xs={4}>
          {image ? (
            <Avatar variant="rounded" src={image} className={classes.avatar} />
          ) : (
            <Avatar variant="rounded" className={classes.avatar}>
              {name[0]}
            </Avatar>
          )}
        </Grid>
        <Grid item xs={8}>
          <CardContent className={classes.cardContent}>
            <Typography variant="h6" className={classes.name}>
              {name}
            </Typography>
            <Typography variant="subtitle1" className={classes.position}>
              {position}
            </Typography>
          </CardContent>
        </Grid>
        <Grid item xs={12}>
          <Divider variant="fullWidth" className={classes.carddivider} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" className={classes.bio}>
            {bio}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
}

export default function TeamMembers({ members }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={9} className={classes.paper}>
        <Grid container spacing={0} justifyContent="center">
          <Grid item xs={12} key="title">
            <Typography variant="h4" className={classes.title}>
              Our Team
            </Typography>
          </Grid>
          <Grid item xs={12} key="divider">
            <Divider variant="fullWidth" className={classes.divider} />
          </Grid>

          {members.map((member) => (
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={6}
              xl={4}
              key={member.name}
              className={classes.cardContainer}
            >
              <MemberTiles {...member} />
            </Grid>
          ))}
        </Grid>
      </Paper>
    </div>
  );
}
