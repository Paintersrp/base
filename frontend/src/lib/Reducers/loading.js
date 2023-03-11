import {
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
} from "../Actions/loading";

const initialState = {
  isLoading: false,
};

function loadingReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case FETCH_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}

export default loadingReducer;
