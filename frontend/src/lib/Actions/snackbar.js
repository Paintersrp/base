export const DATA_UPDATED = "DATA_UPDATED";
export const ALERT_SUCCESS = "ALERT_SUCCESS";
export const ALERT_FAIL = "ALERT_FAIL";
export const ALERT_WARNING = "ALERT_WARNING";
export const ALERT_INFO = "ALERT_INFO";
export const CLOSE_SNACKBAR = "CLOSE_SNACKBAR";

export const dataUpdated = (data) => ({
  type: "DATA_UPDATED",
  payload: { data },
});

export const alertSuccess = (message) => ({
  type: "ALERT_SUCCESS",
  payload: { message },
});

export const alertFail = (message) => ({
  type: "ALERT_FAIL",
  payload: { message },
});
export const alertWarning = (message) => ({
  type: "ALERT_WARNING",
  payload: { message },
});
export const alertInfo = (message) => ({
  type: "ALERT_INFO",
  payload: { message },
});

export const closeSnackbar = () => ({
  type: "CLOSE_SNACKBAR",
});
