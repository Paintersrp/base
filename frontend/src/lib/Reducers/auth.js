import { SET_AUTH, SET_USER } from "../Actions/auth";

const initialState = {
  is_authenticated: false,
  is_superuser: false,
  is_checked: false,
  username: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        is_authenticated: action.payload.is_authenticated,
        is_checked: true,
      };
    case SET_USER:
      return {
        ...state,
        is_superuser: action.payload.is_superuser,
        username: action.payload.username,
      };
    default:
      return state;
  }
};

export default authReducer;
