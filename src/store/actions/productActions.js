import axiosInstance from "../../api/axiosInstance";
import {
  SET_CATEGORIES,
  SET_FETCH_STATE,
  SET_FILTER,
  SET_LIMIT,
  SET_OFFSET,
  SET_PRODUCT_LIST,
  SET_TOTAL,
} from "../actionTypes";

export const setCategories = (categories) => ({
  type: SET_CATEGORIES,
  payload: categories,
});

export const setProductList = (productList) => ({
  type: SET_PRODUCT_LIST,
  payload: productList,
});

export const setTotal = (total) => ({
  type: SET_TOTAL,
  payload: total,
});

export const setFetchState = (fetchState) => ({
  type: SET_FETCH_STATE,
  payload: fetchState,
});

export const setLimit = (limit) => ({
  type: SET_LIMIT,
  payload: limit,
});

export const setOffset = (offset) => ({
  type: SET_OFFSET,
  payload: offset,
});

export const setFilter = (filter) => ({
  type: SET_FILTER,
  payload: filter,
});

let categoriesRequest = null;

export const fetchCategoriesIfNeeded = () => {
  return async (dispatch, getState) => {
    const { categories } = getState().product;

    if (categories.length > 0) {
      return categories;
    }

    if (categoriesRequest) {
      return categoriesRequest;
    }

    categoriesRequest = axiosInstance
      .get("/categories")
      .then((response) => {
        dispatch(setCategories(response.data));

        return response.data;
      })
      .finally(() => {
        categoriesRequest = null;
      });

    return categoriesRequest;
  };
};

let productsRequest = null;
let activeProductsRequestKey = null;
let lastFetchedProductsKey = null;

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    const { productList, limit, offset, filter } = getState().product;

    const normalizedFilter = filter.trim();

    const requestKey = JSON.stringify({
      limit,
      offset,
      filter: normalizedFilter,
    });

    if (productList.length > 0 && lastFetchedProductsKey === requestKey) {
      return {
        products: productList,
        total: getState().product.total,
      };
    }

    if (productsRequest && activeProductsRequestKey === requestKey) {
      return productsRequest;
    }

    const params = {
      limit,
      offset,
    };

    if (normalizedFilter) {
      params.filter = normalizedFilter;
    }

    dispatch(setFetchState("FETCHING"));

    activeProductsRequestKey = requestKey;

    productsRequest = axiosInstance
      .get("/products", {
        params,
      })
      .then((response) => {
        dispatch(setProductList(response.data.products));

        dispatch(setTotal(response.data.total));
        dispatch(setFetchState("FETCHED"));

        lastFetchedProductsKey = requestKey;

        return response.data;
      })
      .catch((error) => {
        dispatch(setFetchState("FAILED"));

        throw error;
      })
      .finally(() => {
        productsRequest = null;
        activeProductsRequestKey = null;
      });

    return productsRequest;
  };
};
