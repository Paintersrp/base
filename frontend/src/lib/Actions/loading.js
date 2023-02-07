export const startLoading = ({ loading }) => {
  return {
    type: "START_LOADING",
    payload: { loading },
  };
};

export const stopLoading = ({ loading }) => {
  return {
    type: "STOP_LOADING",
    payload: { loading },
  };
};
