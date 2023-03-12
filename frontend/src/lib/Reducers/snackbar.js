import {
  DATA_UPDATED,
  ALERT_SUCCESS,
  ALERT_FAIL,
  ALERT_WARNING,
  ALERT_INFO,
  CLOSE_SNACKBAR,
} from "../Actions/snackbar";

const initialState = {
  open: false,
  message: "",
  type: "",
  errorMessage: "",
};

const snackbarReducer = (state = initialState, action) => {
  switch (action.type) {
    case DATA_UPDATED:
      return {
        ...state,
        open: true,
        type: "success",
        message: `${action.payload.data} has been updated.`,
      };
    case ALERT_SUCCESS:
      return {
        ...state,
        open: true,
        type: "success",
        message: action.message,
      };
    case ALERT_FAIL:
      return {
        ...state,
        open: true,
        type: "error",
        message: `Error: ${action.message}`,
      };
    case ALERT_WARNING:
      return {
        ...state,
        open: true,
        type: "warning",
        message: `Caution: ${action.message}`,
      };
    case ALERT_INFO:
      return {
        ...state,
        open: true,
        type: "info",
        message: `${action.message}`,
      };
    case CLOSE_SNACKBAR:
      return {
        ...state,
        open: false,
        message: "",
        type: "",
      };
    default:
      return state;
  }
};

export default snackbarReducer;
