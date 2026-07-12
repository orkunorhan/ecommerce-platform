import axiosInstance, {
  clearAuthorizationToken,
  setAuthorizationToken,
} from "../../api/axiosInstance";
import { SET_LANGUAGE, SET_ROLES, SET_THEME, SET_USER } from "../actionTypes";

let rolesRequest = null;

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const setRoles = (roles) => ({
  type: SET_ROLES,
  payload: roles,
});

export const setTheme = (theme) => ({
  type: SET_THEME,
  payload: theme,
});

export const setLanguage = (language) => ({
  type: SET_LANGUAGE,
  payload: language,
});

export const fetchRolesIfNeeded = () => {
  return async (dispatch, getState) => {
    const { roles } = getState().client;

    if (roles.length > 0) {
      return roles;
    }

    if (rolesRequest) {
      return rolesRequest;
    }

    rolesRequest = axiosInstance
      .get("/roles")
      .then((response) => {
        dispatch(setRoles(response.data));

        return response.data;
      })
      .finally(() => {
        rolesRequest = null;
      });

    return rolesRequest;
  };
};

export const loginUser = ({ email, password, rememberMe }) => {
  return async (dispatch) => {
    const response = await axiosInstance.post("/login", {
      email,
      password,
    });

    const user = {
      name: response.data.name,
      email: response.data.email,
      role_id: Number(response.data.role_id),
      token: response.data.token,
    };

    dispatch(setUser(user));
    setAuthorizationToken(response.data.token);

    if (rememberMe) {
      localStorage.setItem("token", response.data.token);
    } else {
      localStorage.removeItem("token");
    }

    return user;
  };
};

export const verifyToken = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");

    if (!token) {
      clearAuthorizationToken();
      return null;
    }

    try {
      setAuthorizationToken(token);

      const response = await axiosInstance.get("/verify");

      const user = {
        name: response.data.name,
        email: response.data.email,
        role_id: Number(response.data.role_id),
        token: response.data.token,
      };

      dispatch(setUser(user));

      localStorage.setItem("token", response.data.token);
      setAuthorizationToken(response.data.token);

      return user;
    } catch (error) {
      localStorage.removeItem("token");
      clearAuthorizationToken();
      dispatch(setUser({}));

      throw error;
    }
  };
};
