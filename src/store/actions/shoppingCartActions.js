import {
  ADD_TO_CART,
  DECREASE_CART_ITEM,
  INCREASE_CART_ITEM,
  REMOVE_FROM_CART,
  SET_ADDRESS,
  SET_CART,
  SET_PAYMENT,
  TOGGLE_CART_ITEM,
} from "../actionTypes";

export const setCart = (cart) => ({
  type: SET_CART,
  payload: cart,
});

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product,
});

export const increaseCartItem = (productId) => ({
  type: INCREASE_CART_ITEM,
  payload: productId,
});

export const decreaseCartItem = (productId) => ({
  type: DECREASE_CART_ITEM,
  payload: productId,
});

export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId,
});

export const toggleCartItem = (productId) => ({
  type: TOGGLE_CART_ITEM,
  payload: productId,
});

export const setPayment = (payment) => ({
  type: SET_PAYMENT,
  payload: payment,
});

export const setAddress = (address) => ({
  type: SET_ADDRESS,
  payload: address,
});
