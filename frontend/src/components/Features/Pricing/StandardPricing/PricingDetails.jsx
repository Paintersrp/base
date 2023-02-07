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
  testboi: {
    backgroundColor: "#222222",
    display: "flex",
  },
  flexer: {
    display: "flex",
    justifyContent: "center",
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

export default function PricingDetails({ plan, close }) {
  console.log(plan.supportedsites);
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    close();
  };

  return (
    <Dialog
      className={classes.flexer}
      classes={{ root: classes.dialog, paper: classes.paper }}
      open={open}
      onClose={handleClose}
    >
      <div className={classes.testboi}>
        <DialogContent dividers={true} className={classes.detailsContainer}>
          <Icon className={classes.closeIcon} onClick={handleClose}>
            <FaTimes />
          </Icon>
          <Typography gutterBottom={true} className={classes.detailsTitle}>
            {plan.title} Plan
          </Typography>
          <Typography>
            <strong>Best For:</strong> {plan.bestFor}
          </Typography>
          <Typography>
            <strong>Guarantee:</strong> {plan.guarantee}
          </Typography>
          <Typography>
            <strong>Types of Sites Supported:</strong>
          </Typography>
          <List className={classes.detailsList}>
            {plan.supportedsites.map((site, index) => (
              <ListItem key={site.id}>
                <CheckIcon className={classes.checkIcon} />
                {site.site}
              </ListItem>
            ))}
          </List>
          <Button
            className={classes.detailsButton}
            variant="contained"
            onClick={handleClose}
          >
            Close
          </Button>
        </DialogContent>
      </div>
    </Dialog>
  );
}
