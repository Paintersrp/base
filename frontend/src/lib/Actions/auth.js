export const SET_AUTH = "SET_AUTH";
export const SET_USER = "SET_USER";
export const SET_THEME = "SET_THEME";

export const setAuth = (isAuth) => {
  return {
    type: SET_AUTH,
    payload: isAuth,
  };
};

export const setUser = (isUser) => {
  return {
    type: SET_USER,
    payload: isUser,
  };
};

export const setTheme = (isTheme) => {
  return {
    type: SET_THEME,
    payload: isTheme,
  };
};
