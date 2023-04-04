import { SET_JOBS, SET_USERS, SET_SERVICES } from "../Actions/plugins";

const initialState = {
  jobsPlugin: false,
  usersPlugin: false,
  servicesPlugin: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_JOBS:
      return {
        ...state,
        jobsPlugin: action.payload.jobsPlugin,
      };
    case SET_USERS:
      return {
        ...state,
        usersPlugin: action.payload.usersPlugin,
      };
    case SET_SERVICES:
      return {
        ...state,
        servicesPlugin: action.payload.servicesPlugin,
      };
    default:
      return state;
  }
};

export default authReducer;
