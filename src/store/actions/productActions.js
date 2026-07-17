import axiosInstance from "../../api/axiosInstance";
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

export const setCategories = (categories) => ({
  type: SET_CATEGORIES,
  payload: categories,
});

export const setProductList = (productList) => ({
  type: SET_PRODUCT_LIST,
  payload: productList,
});

export const setProduct = (product) => ({
  type: SET_PRODUCT,
  payload: product,
});

export const setProductFetchState = (fetchState) => ({
  type: SET_PRODUCT_FETCH_STATE,
  payload: fetchState,
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

export const setSort = (sort) => ({
  type: SET_SORT,
  payload: sort,
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

export const fetchProducts = (categoryId) => {
  return async (dispatch, getState) => {
    const { productList, total, limit, offset, filter, sort } =
      getState().product;

    const normalizedFilter = filter.trim();
    const normalizedSort = sort.trim();
    const normalizedCategoryId = categoryId ? Number(categoryId) : null;

    const requestKey = JSON.stringify({
      category: normalizedCategoryId,
      filter: normalizedFilter,
      sort: normalizedSort,
      limit,
      offset,
    });

    if (productList.length > 0 && lastFetchedProductsKey === requestKey) {
      return {
        products: productList,
        total,
      };
    }

    if (productsRequest && activeProductsRequestKey === requestKey) {
      return productsRequest;
    }

    const params = {
      limit,
      offset,
    };

    if (normalizedCategoryId) {
      params.category = normalizedCategoryId;
    }

    if (normalizedFilter) {
      params.filter = normalizedFilter;
    }

    if (normalizedSort) {
      params.sort = normalizedSort;
    }

    dispatch(setFetchState("FETCHING"));

    activeProductsRequestKey = requestKey;

    productsRequest = axiosInstance
      .get("/products", { params })
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

export const fetchProductById = (productId) => {
  return async (dispatch) => {
    dispatch(setProductFetchState("FETCHING"));

    try {
      const response = await axiosInstance.get(`/products/${productId}`);

      dispatch(setProduct(response.data));
      dispatch(setProductFetchState("FETCHED"));

      return response.data;
    } catch (error) {
      dispatch(setProduct({}));
      dispatch(setProductFetchState("FAILED"));

      throw error;
    }
  };
};
