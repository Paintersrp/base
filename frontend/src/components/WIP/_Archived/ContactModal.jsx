import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import Icon from "@material-ui/core/Icon";
import DialogContent from "@material-ui/core/DialogContent";
import { FaTimes } from "react-icons/fa";
import ContactForm from "../../Elements/Forms/ContactForm/ContactForm";

const useStyles = makeStyles((theme) => ({
  detailsContainer: {
    fontFamily: "Poppins",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingLeft: theme.spacing(3),
    backgroundColor: "#222222",
    color: "white",
    width: "100%",
  },
  paper: {
    width: "100%",
    backgroundColor: "#222222",
    borderRadius: "10px",
    overflow: "hidden",
    padding: 10,
    boxShadow: "none",
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

export default function ContactModal({ close }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    close();
  };

  return (
    <Dialog
      classes={{ paper: classes.paper }}
      open={open}
      onClose={handleClose}
    >
      <DialogContent dividers={false} className={classes.detailsContainer}>
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
    </Dialog>
  );
}
