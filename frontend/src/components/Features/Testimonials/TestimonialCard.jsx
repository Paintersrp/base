import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#242424",
  },
  avatar: {
    width: 60,
    height: 60,
    color: "white",
    fontFamily: "Poppins",
    fontWeight: "600",
    borderRadius: "50%",
    marginRight: 10,
  },
  content: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    textAlign: "center",
    color: "white",
  },
  chip: {
    fontFamily: "Poppins",
    fontWeight: "600",
    margin: theme.spacing(0.6),
    minWidth: 90,
    borderRadius: 10,
  },
  chipContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  personInfo: {
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    fontFamily: "Poppins",
    fontWeight: 500,
    letterSpacing: 0.25,
    lineHeight: 1.5,
  },
}));

const TestimonialCard = (props) => {
  const classes = useStyles();
  const {
    name,
    testimonial,
    company,
    textcolor = "white",
    color = "gold",
    defaultColor = "secondary",
  } = props;
  const avatarColor = color || theme.palette[defaultColor].main;
  const chipColor = color || theme.palette[defaultColor].main;
  const textColor = textcolor || "white";

  return (
    <Card className={classes.root} elevation={6}>
      <CardContent className={classes.content}>
        <Grid
          container
          spacing={1}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Grid className={classes.personInfo} item>
            <Avatar
              style={{ backgroundColor: avatarColor, color: textColor }}
              alt={name}
              className={classes.avatar}
            >
              {name[0]}
            </Avatar>
            <Grid className={classes.chipContainer} item xs={12}>
              <Chip
                style={{ backgroundColor: chipColor, color: textColor }}
                label={name}
                className={classes.chip}
              />
              <Chip
                style={{ backgroundColor: chipColor, color: textColor }}
                label={company}
                className={classes.chip}
              />
            </Grid>
          </Grid>
        </Grid>
        <Typography className={classes.body}>"{testimonial}"</Typography>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
