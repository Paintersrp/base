import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import CheckIcon from "@material-ui/icons/Check";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import { FaTimes } from "react-icons/fa";

const useStyles = makeStyles((theme) => ({
  detailsContainer: {
    fontFamily: "Poppins",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: theme.spacing(3),
    backgroundColor: "#222222",
    color: "white",
    [theme.breakpoints.down("md")]: {
      width: "50%",
    },
  },
  detailsTitle: {
    fontFamily: "Poppins",
    fontWeight: 700,
    fontSize: "1.2rem",
    marginBottom: theme.spacing(2),
    textAlign: "center",
    color: "white",
  },
  detailsList: {
    fontFamily: "Poppins",
    listStyle: "none",
    padding: 0,
    margin: 0,
    marginBottom: theme.spacing(2),
    textAlign: "center",
  },
  detailsButton: {
    fontFamily: "Poppins",
    width: "100%",
    marginTop: theme.spacing(2),
    backgroundColor: "#b71c1c",
    color: "white",
    "&:hover": {
      backgroundColor: "#880e0e",
    },
  },
  container: {
    backgroundColor: "#222222",
    display: "flex",
  },
  dialog: {
    backgroundColor: "transparent",
  },
  paper: {
    backgroundColor: "#222222",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0px 0px 10px #00000066",
  },
  closeIcon: {
    right: 10,
    top: 10,
    position: "absolute",
    fontSize: "1rem",
    color: "white",
    backgroundColor: "inherit",
    justifyContent: "right",
    cursor: "pointer",
    "&:hover": {
      transform: "scale(1.05)",
      color: "red",
    },
  },
}));

export default function DetailsModal({ plan, close, classes }) {
  console.log(plan.supportedsites);
  // const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    close();
  };

  return (
    <Dialog
      classes={{ root: classes.dialog, paper: classes.paper }}
      open={open}
      onClose={handleClose}
    >
      <div className={classes.container}>
        <DialogContent className={classes.detailsContainer}>
          <Icon className={classes.closeIcon} onClick={handleClose}>
            <FaTimes />
          </Icon>
          <Typography
            gutterBottom
            variant="h3"
            className={classes.detailsTitle}
          >
            {plan.title} Plan
          </Typography>
          <Typography variant="h6" className={classes.itemText}>
            <strong>Best For:</strong>{" "}
            <Typography variant="body2" style={{ marginLeft: 16 }}>
              {plan.bestFor}
            </Typography>
          </Typography>
          <Typography variant="h6" className={classes.itemText}>
            <strong>Guarantee:</strong>{" "}
            <Typography variant="body2" style={{ marginLeft: 16 }}>
              {plan.guarantee}
            </Typography>
          </Typography>
          <Typography variant="h6" className={classes.itemText}>
            <strong>Types of Sites Supported:</strong>
            <List dense className={classes.detailsList}>
              {plan.supported_sites.map((site, index) => (
                <ListItem key={site.id}>
                  <CheckIcon className={classes.checkIcon} />
                  <Typography variant="body2" style={{ marginLeft: 16 }}>
                    {site.site}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </Typography>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              className={classes.detailsButton}
              variant="contained"
              onClick={handleClose}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
}
