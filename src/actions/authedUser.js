export const SET_AUTHED_USER = "SET_AUTHED_USER";
export const REMOVE_AUTHED_USER = "REMOVE_AUTHED_USER";

export const authenticate = id => {
  return {
    type: SET_AUTHED_USER,
    id
  };
};

export const logout = () => {
  return {
    type: REMOVE_AUTHED_USER
  }
}

