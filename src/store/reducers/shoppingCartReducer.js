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

const initialState = {
  cart: [],
  payment: {},
  address: {
    shippingAddress: null,
    billingAddress: null,
    sameAddress: true,
  },
};

function shoppingCartReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CART:
      return {
        ...state,
        cart: action.payload,
      };

    case ADD_TO_CART: {
      const product = action.payload;

      const productExists = state.cart.some(
        (cartItem) => cartItem.product.id === product.id,
      );

      if (productExists) {
        return {
          ...state,
          cart: state.cart.map((cartItem) =>
            cartItem.product.id === product.id
              ? {
                  ...cartItem,
                  count: cartItem.count + 1,
                }
              : cartItem,
          ),
        };
      }

      return {
        ...state,
        cart: [
          ...state.cart,
          {
            count: 1,
            checked: true,
            product,
          },
        ],
      };
    }

    case INCREASE_CART_ITEM:
      return {
        ...state,
        cart: state.cart.map((cartItem) =>
          cartItem.product.id === action.payload
            ? {
                ...cartItem,
                count: cartItem.count + 1,
              }
            : cartItem,
        ),
      };

    case DECREASE_CART_ITEM:
      return {
        ...state,
        cart: state.cart.map((cartItem) =>
          cartItem.product.id === action.payload
            ? {
                ...cartItem,
                count: Math.max(1, cartItem.count - 1),
              }
            : cartItem,
        ),
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(
          (cartItem) => cartItem.product.id !== action.payload,
        ),
      };

    case TOGGLE_CART_ITEM:
      return {
        ...state,
        cart: state.cart.map((cartItem) =>
          cartItem.product.id === action.payload
            ? {
                ...cartItem,
                checked: !cartItem.checked,
              }
            : cartItem,
        ),
      };

    case SET_PAYMENT:
      return {
        ...state,
        payment: action.payload,
      };

    case SET_ADDRESS:
      return {
        ...state,
        address: action.payload,
      };

    default:
      return state;
  }
}

export default shoppingCartReducer;
