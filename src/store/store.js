import { applyMiddleware, legacy_createStore as createStore } from "redux";
import { thunk } from "redux-thunk";
import { createLogger } from "redux-logger";

import rootReducer from "./reducers/rootReducer";

const CART_STORAGE_KEY = "shoppingCart";

const logger = createLogger({
  collapsed: true,
});

const loadCartFromStorage = () => {
  try {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);

    if (!storedCart) {
      return [];
    }

    const parsedCart = JSON.parse(storedCart);

    if (!Array.isArray(parsedCart)) {
      localStorage.removeItem(CART_STORAGE_KEY);
      return [];
    }

    return parsedCart;
  } catch (error) {
    console.error(
      "Shopping cart could not be loaded from local storage:",
      error,
    );

    localStorage.removeItem(CART_STORAGE_KEY);

    return [];
  }
};

const saveCartToStorage = (cart) => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error("Shopping cart could not be saved to local storage:", error);
  }
};

const preloadedState = {
  shoppingCart: {
    cart: loadCartFromStorage(),
    payment: {},
    address: {
      shippingAddress: null,
      billingAddress: null,
      sameAddress: true,
    },
  },
};

const store = createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(thunk, logger),
);

let previousCart = store.getState().shoppingCart.cart;

store.subscribe(() => {
  const currentCart = store.getState().shoppingCart.cart;

  if (currentCart === previousCart) {
    return;
  }

  previousCart = currentCart;
  saveCartToStorage(currentCart);
});

export default store;
