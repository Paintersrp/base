import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  dialogTitle: {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2),
    '& h2': {
      margin: 0
    }
  },
  closeButton: {
    color: '#fff'
  },
  dialogActions: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2),
    display: 'flex',
    justifyContent: 'flex-end'
  }
}));

const BaseDialog = ({ open, onClose, title, content, primaryButtonText, secondaryButtonText, onPrimaryButtonClick, children }) => {
  const classes = useStyles();

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="dialog-title">
      <DialogTitle className={classes.dialogTitle} id="dialog-title">
        <h2>{title}</h2>
        <IconButton className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {content && <DialogContentText>{content}</DialogContentText>}
        {children}
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        {primaryButtonText && (
          <Button onClick={onPrimaryButtonClick} color="primary">
            {primaryButtonText}
          </Button>
        )}
        {secondaryButtonText && (
          <Button onClick={onClose} color="primary">
            {secondaryButtonText}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default BaseDialog;
