import { makeStyles } from "@material-ui/core/styles";
import { Button, Dialog, DialogContent, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  dialog: {
    backgroundColor: "transparent",
  },
  paper: {
    backgroundColor: "white",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0px 0px 10px #00000066",
  },
  detailsContainer: {
    fontFamily: "Poppins",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "white",
    color: "black",
  },
  container: {
    backgroundColor: "#white",
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
  yesButton: {
    fontFamily: "Poppins",
    width: "100%",
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(1),
    backgroundColor: theme.palette.success.main,
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.success.dark,
    },
  },
  noButton: {
    fontFamily: "Poppins",
    width: "100%",
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
    backgroundColor: theme.palette.error.main,
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.error.dark,
    },
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  buttonRow: {
    width: "15%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
}));

const DeleteConfirmationModal = ({
  open,
  handleClose,
  handleConfirmDelete,
  message = "Are you sure you want to delete this?",
}) => {
  const classes = useStyles();

  return (
    <Dialog
      className={classes.flexer}
      classes={{ root: classes.dialog, paper: classes.paper }}
      open={open}
      onClose={handleClose}
    >
      <div className={classes.testboi}>
        <DialogContent dividers={true} className={classes.detailsContainer}>
          <Typography variant="h4" align="center">
            {message}
          </Typography>
          <div className={classes.buttonContainer}>
            <div className={classes.buttonRow}>
              <Button
                onClick={handleConfirmDelete}
                variant="contained"
                className={classes.yesButton}
              >
                Yes
              </Button>
              <Button
                onClick={handleClose}
                variant="contained"
                className={classes.noButton}
              >
                No
              </Button>
            </div>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default DeleteConfirmationModal;
