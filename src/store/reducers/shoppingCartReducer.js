import {
  ADD_TO_CART,
  SET_ADDRESS,
  SET_CART,
  SET_PAYMENT,
} from "../actionTypes";

const initialState = {
  cart: [],
  payment: {},
  address: {},
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
