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

const initialState = {
  user: {},
  authChecked: false,

  addressList: [],
  addressFetchState: "idle",
  addressError: null,

  cardList: [],
  cardFetchState: "idle",
  cardError: null,

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

    case SET_ADDRESS_LIST:
      return {
        ...state,
        addressList: action.payload,
      };

    case SET_ADDRESS_FETCH_STATE:
      return {
        ...state,
        addressFetchState: action.payload,
      };

    case SET_ADDRESS_ERROR:
      return {
        ...state,
        addressError: action.payload,
      };

    case SET_CARD_LIST:
      return {
        ...state,
        cardList: action.payload,
      };

    case SET_CARD_FETCH_STATE:
      return {
        ...state,
        cardFetchState: action.payload,
      };

    case SET_CARD_ERROR:
      return {
        ...state,
        cardError: action.payload,
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
