import {
  SET_LANGUAGE,
  SET_ROLES,
  SET_THEME,
  SET_USER,
  SET_AUTH_CHECKED,
} from "../actionTypes";

const initialState = {
  user: {},
  authChecked: false,
  addressList: [],
  creditCards: [],
  roles: [],
  theme: "",
  language: "",
};

function clientReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    case SET_AUTH_CHECKED:
      return {
        ...state,
        authChecked: action.payload,
      };

    case SET_ROLES:
      return {
        ...state,
        roles: action.payload,
      };

    case SET_THEME:
      return {
        ...state,
        theme: action.payload,
      };

    case SET_LANGUAGE:
      return {
        ...state,
        language: action.payload,
      };

    default:
      return state;
  }
}

export default clientReducer;
