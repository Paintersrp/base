import { makeStyles } from "@material-ui/core/styles";
import { Button, Dialog, DialogContent, Typography } from "@material-ui/core";
import AutoForm from "./AutoForm";
import AutoFormModal from "./AutoFormModal";

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
    padding: 0,
    paddingTop: "0px !important",
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

const AutoFormDialog = ({
  url,
  formData,
  open,
  handleClose,
  handleModalUpdate,
}) => {
  const classes = useStyles();
  console.log(url);
  console.log(formData);

  const endpointUrl = `/${url.model_name.toLowerCase()}/`;

  return (
    <Dialog
      className={classes.flexer}
      classes={{ root: classes.dialog, paper: classes.paper }}
      open={open}
      onClose={handleClose}
      maxWidth="xl"
    >
      <div className={classes.testboi}>
        <DialogContent dividers={true} className={classes.detailsContainer}>
          <div className={classes.buttonContainer}>
            <div className={classes.buttonRow}>
              <AutoFormModal
                endpointUrl={endpointUrl}
                handleModalUpdate={handleModalUpdate}
                variant="modal"
                handleClose={handleClose}
              />
            </div>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default AutoFormDialog;
