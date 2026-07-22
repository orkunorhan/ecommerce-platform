import axiosInstance, {
  clearAuthorizationToken,
  setAuthorizationToken,
} from "../../api/axiosInstance";

import {
  SET_LANGUAGE,
  SET_ROLES,
  SET_THEME,
  SET_USER,
  SET_AUTH_CHECKED,
  SET_ADDRESS_LIST,
  SET_ADDRESS_FETCH_STATE,
  SET_ADDRESS_ERROR,
  SET_CARD_LIST,
  SET_CARD_FETCH_STATE,
  SET_CARD_ERROR,
} from "../actionTypes";

const TOKEN_STORAGE_KEY = "token";

let rolesRequest = null;

export const setAuthChecked = (authChecked) => ({
  type: SET_AUTH_CHECKED,
  payload: authChecked,
});

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

export const setAddressList = (addressList) => ({
  type: SET_ADDRESS_LIST,
  payload: addressList,
});

export const setAddressFetchState = (fetchState) => ({
  type: SET_ADDRESS_FETCH_STATE,
  payload: fetchState,
});

export const setAddressError = (error) => ({
  type: SET_ADDRESS_ERROR,
  payload: error,
});

export const setCardList = (cardList) => ({
  type: SET_CARD_LIST,
  payload: cardList,
});

export const setCardFetchState = (fetchState) => ({
  type: SET_CARD_FETCH_STATE,
  payload: fetchState,
});

export const setCardError = (error) => ({
  type: SET_CARD_ERROR,
  payload: error,
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

const normalizeEntityResponse = (responseData) => {
  if (Array.isArray(responseData)) {
    return responseData[0] ?? null;
  }

  return responseData?.[0] ?? responseData?.["0"] ?? null;
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
    dispatch(setAuthChecked(true));

    return user;
  };
};

export const verifyToken = () => {
  return async (dispatch) => {
    const storedToken = getStoredToken();

    if (!storedToken) {
      clearAuthorizationToken();
      dispatch(setUser({}));
      dispatch(setAuthChecked(true));

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
    } finally {
      dispatch(setAuthChecked(true));
    }
  };
};

export const fetchAddresses = () => {
  return async (dispatch) => {
    dispatch(setAddressFetchState("fetching"));
    dispatch(setAddressError(null));

    try {
      const response = await axiosInstance.get("/user/address");

      const addressList = Array.isArray(response.data) ? response.data : [];

      dispatch(setAddressList(addressList));
      dispatch(setAddressFetchState("fetched"));

      return addressList;
    } catch (error) {
      dispatch(setAddressFetchState("failed"));
      dispatch(
        setAddressError(
          error.response?.data?.message || "Addresses could not be loaded.",
        ),
      );

      throw error;
    }
  };
};

export const createAddress = (addressData) => {
  return async (dispatch, getState) => {
    dispatch(setAddressFetchState("saving"));
    dispatch(setAddressError(null));

    try {
      const response = await axiosInstance.post("/user/address", addressData);

      const createdAddress = normalizeEntityResponse(response.data);

      if (!createdAddress) {
        throw new Error("The created address could not be read.");
      }

      const currentAddressList = getState().client.addressList;

      dispatch(setAddressList([...currentAddressList, createdAddress]));

      dispatch(setAddressFetchState("fetched"));

      return createdAddress;
    } catch (error) {
      dispatch(setAddressFetchState("failed"));
      dispatch(
        setAddressError(
          error.response?.data?.message ||
            error.message ||
            "Address could not be created.",
        ),
      );

      throw error;
    }
  };
};

export const updateAddress = (addressData) => {
  return async (dispatch, getState) => {
    dispatch(setAddressFetchState("saving"));
    dispatch(setAddressError(null));

    try {
      const response = await axiosInstance.put("/user/address", addressData);

      const updatedAddress = normalizeEntityResponse(response.data);

      if (!updatedAddress) {
        throw new Error("The updated address could not be read.");
      }

      const currentAddressList = getState().client.addressList;

      dispatch(
        setAddressList(
          currentAddressList.map((address) =>
            address.id === updatedAddress.id ? updatedAddress : address,
          ),
        ),
      );

      dispatch(setAddressFetchState("fetched"));

      return updatedAddress;
    } catch (error) {
      dispatch(setAddressFetchState("failed"));
      dispatch(
        setAddressError(
          error.response?.data?.message ||
            error.message ||
            "Address could not be updated.",
        ),
      );

      throw error;
    }
  };
};

export const deleteAddress = (addressId) => {
  return async (dispatch, getState) => {
    dispatch(setAddressFetchState("deleting"));
    dispatch(setAddressError(null));

    try {
      await axiosInstance.delete(`/user/address/${addressId}`);

      const currentAddressList = getState().client.addressList;

      dispatch(
        setAddressList(
          currentAddressList.filter((address) => address.id !== addressId),
        ),
      );

      dispatch(setAddressFetchState("fetched"));

      return addressId;
    } catch (error) {
      dispatch(setAddressFetchState("failed"));
      dispatch(
        setAddressError(
          error.response?.data?.message || "Address could not be deleted.",
        ),
      );

      throw error;
    }
  };
};

export const fetchCards = () => {
  return async (dispatch) => {
    dispatch(setCardFetchState("fetching"));
    dispatch(setCardError(null));

    try {
      const response = await axiosInstance.get("/user/card");

      const cardList = Array.isArray(response.data) ? response.data : [];

      dispatch(setCardList(cardList));
      dispatch(setCardFetchState("fetched"));

      return cardList;
    } catch (error) {
      dispatch(setCardFetchState("failed"));
      dispatch(
        setCardError(
          error.response?.data?.message || "Cards could not be loaded.",
        ),
      );

      throw error;
    }
  };
};

export const createCard = (cardData) => {
  return async (dispatch, getState) => {
    dispatch(setCardFetchState("saving"));
    dispatch(setCardError(null));

    try {
      const response = await axiosInstance.post("/user/card", cardData);

      const createdCard = normalizeEntityResponse(response.data);

      if (!createdCard) {
        throw new Error("The created card could not be read.");
      }

      const currentCardList = getState().client.cardList;

      dispatch(setCardList([...currentCardList, createdCard]));
      dispatch(setCardFetchState("fetched"));

      return createdCard;
    } catch (error) {
      dispatch(setCardFetchState("failed"));
      dispatch(
        setCardError(
          error.response?.data?.message ||
            error.message ||
            "Card could not be created.",
        ),
      );

      throw error;
    }
  };
};

export const updateCard = (cardData) => {
  return async (dispatch, getState) => {
    dispatch(setCardFetchState("saving"));
    dispatch(setCardError(null));

    try {
      const response = await axiosInstance.put("/user/card", cardData);

      const updatedCard = normalizeEntityResponse(response.data);

      if (!updatedCard) {
        throw new Error("The updated card could not be read.");
      }

      const currentCardList = getState().client.cardList;

      dispatch(
        setCardList(
          currentCardList.map((card) =>
            card.id === updatedCard.id ? updatedCard : card,
          ),
        ),
      );

      dispatch(setCardFetchState("fetched"));

      return updatedCard;
    } catch (error) {
      dispatch(setCardFetchState("failed"));
      dispatch(
        setCardError(
          error.response?.data?.message ||
            error.message ||
            "Card could not be updated.",
        ),
      );

      throw error;
    }
  };
};

export const deleteCard = (cardId) => {
  return async (dispatch, getState) => {
    dispatch(setCardFetchState("deleting"));
    dispatch(setCardError(null));

    try {
      await axiosInstance.delete(`/user/card/${cardId}`);

      const currentCardList = getState().client.cardList;

      dispatch(
        setCardList(currentCardList.filter((card) => card.id !== cardId)),
      );

      dispatch(setCardFetchState("fetched"));

      return cardId;
    } catch (error) {
      dispatch(setCardFetchState("failed"));
      dispatch(
        setCardError(
          error.response?.data?.message || "Card could not be deleted.",
        ),
      );

      throw error;
    }
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    clearStoredTokens();
    clearAuthorizationToken();

    dispatch(setUser({}));

    dispatch(setAddressList([]));
    dispatch(setAddressError(null));
    dispatch(setAddressFetchState("idle"));

    dispatch(setCardList([]));
    dispatch(setCardError(null));
    dispatch(setCardFetchState("idle"));

    dispatch(setAuthChecked(true));
  };
};
