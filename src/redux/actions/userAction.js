export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export const actionLogin = (data) => ({
  type: LOGIN_SUCCESS,
  payload: data,
});

export const actionLogout = (data) => ({
  type: LOGOUT_SUCCESS,
});
