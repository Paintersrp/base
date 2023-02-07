const initialState = {
  loading: false,
};

const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case "START_LOADING":
      return {
        ...state,
        ...action.payload,
      };
    case "STOP_LOADING":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default loadingReducer;
