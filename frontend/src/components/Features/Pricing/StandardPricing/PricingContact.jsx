import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import Icon from "@material-ui/core/Icon";
import DialogContent from "@material-ui/core/DialogContent";
import { FaTimes } from "react-icons/fa";
import ContactForm from "../../../Forms/Contact/ContactForm";

const useStyles = makeStyles((theme) => ({
  detailsContainer: {
    fontFamily: "Poppins",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingLeft: theme.spacing(3),
    backgroundColor: "#222222",
    color: "white",
    [theme.breakpoints.down("md")]: {
      width: "50%",
    },
  },
  testboi: {
    backgroundColor: "#222222",
    display: "flex",
    padding: 0,
    margin: 0,
    "& .MuiDialogContent-dividers": {
      borderTop: "0px solid white !important",
    },
    "& .MuiDialogContent-root": {
      border: "0px solid black",
    },
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
    padding: 10,
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

export default function PricingContact({ close }) {
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
          <ContactForm
            selectOptions={[
              { label: "Personal Development", value: "Personal Development" },
              {
                label: "Professional Development",
                value: "Professional Development",
              },
              {
                label: "Enterprise Development",
                value: "Enterprise Development",
              },
            ]}
          />
        </DialogContent>
      </div>
    </Dialog>
  );
}
