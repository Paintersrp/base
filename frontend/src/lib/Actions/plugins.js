export const SET_JOBS = "SET_JOBS";
export const SET_USERS = "SET_USERS";
export const SET_SERVICES = "SET_SERVICES";

export const setJobs = (jobsPlugin) => {
  return {
    type: SET_JOBS,
    payload: jobsPlugin,
  };
};

export const setUsers = (usersPlugin) => {
  return {
    type: SET_USERS,
    payload: usersPlugin,
  };
};

export const setServices = (servicesPlugin) => {
  return {
    type: SET_SERVICES,
    payload: servicesPlugin,
  };
};
