import axiosInstance, {
  clearAuthorizationToken,
  setAuthorizationToken,
} from "../../api/axiosInstance";
import { SET_LANGUAGE, SET_ROLES, SET_THEME, SET_USER } from "../actionTypes";

const TOKEN_STORAGE_KEY = "token";

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

const clearStoredTokens = () => {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
  sessionStorage.removeItem(TOKEN_STORAGE_KEY);
};

const storeToken = (token, rememberMe) => {
  clearStoredTokens();

  if (rememberMe) {
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
    return;
  }

  sessionStorage.setItem(TOKEN_STORAGE_KEY, token);
};

const getStoredToken = () => {
  const rememberedToken = localStorage.getItem(TOKEN_STORAGE_KEY);

  if (rememberedToken) {
    return {
      token: rememberedToken,
      storage: localStorage,
    };
  }

  const sessionToken = sessionStorage.getItem(TOKEN_STORAGE_KEY);

  if (sessionToken) {
    return {
      token: sessionToken,
      storage: sessionStorage,
    };
  }

  return null;
};

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

    storeToken(response.data.token, rememberMe);
    setAuthorizationToken(response.data.token);
    dispatch(setUser(user));

    return user;
  };
};

export const verifyToken = () => {
  return async (dispatch) => {
    const storedToken = getStoredToken();

    if (!storedToken) {
      clearAuthorizationToken();
      dispatch(setUser({}));

      return null;
    }

    try {
      setAuthorizationToken(storedToken.token);

      const response = await axiosInstance.get("/verify");

      const user = {
        name: response.data.name,
        email: response.data.email,
        role_id: Number(response.data.role_id),
        token: response.data.token,
      };

      storedToken.storage.setItem(TOKEN_STORAGE_KEY, response.data.token);

      setAuthorizationToken(response.data.token);
      dispatch(setUser(user));

      return user;
    } catch (error) {
      clearStoredTokens();
      clearAuthorizationToken();
      dispatch(setUser({}));

      throw error;
    }
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    clearStoredTokens();
    clearAuthorizationToken();
    dispatch(setUser({}));
  };
};
