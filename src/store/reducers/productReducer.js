import {
  SET_CATEGORIES,
  SET_FETCH_STATE,
  SET_FILTER,
  SET_LIMIT,
  SET_OFFSET,
  SET_PRODUCT_LIST,
  SET_TOTAL,
  SET_SORT,
  SET_PRODUCT,
  SET_PRODUCT_FETCH_STATE,
} from "../actionTypes";

export const FETCH_STATES = {
  NOT_FETCHED: "NOT_FETCHED",
  FETCHING: "FETCHING",
  FETCHED: "FETCHED",
  FAILED: "FAILED",
};

const initialState = {
  categories: [],
  productList: [],
  product: {},
  total: 0,
  limit: 24,
  offset: 0,
  filter: "",
  sort: "",
  fetchState: FETCH_STATES.NOT_FETCHED,
  productFetchState: FETCH_STATES.NOT_FETCHED,
};

function productReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };

    case SET_PRODUCT_LIST:
      return {
        ...state,
        productList: action.payload,
      };

    case SET_PRODUCT:
      return {
        ...state,
        product: action.payload,
      };

    case SET_PRODUCT_FETCH_STATE:
      return {
        ...state,
        productFetchState: action.payload,
      };

    case SET_TOTAL:
      return {
        ...state,
        total: action.payload,
      };

    case SET_FETCH_STATE:
      return {
        ...state,
        fetchState: action.payload,
      };

    case SET_LIMIT:
      return {
        ...state,
        limit: action.payload,
      };

    case SET_OFFSET:
      return {
        ...state,
        offset: action.payload,
      };

    case SET_FILTER:
      return {
        ...state,
        filter: action.payload,
      };

    case SET_SORT:
      return {
        ...state,
        sort: action.payload,
      };

    default:
      return state;
  }
}

export default productReducer;
