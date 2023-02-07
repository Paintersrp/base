export const SET_AUTH = "SET_AUTH";
export const SET_USER = "SET_USER";

export const setAuth = (isAuth) => {
  return {
    type: SET_AUTH,
    payload: isAuth,
  };
};

export const setUser = (isUser) => {
  console.log(isUser);
  return {
    type: SET_USER,
    payload: isUser,
  };
};
