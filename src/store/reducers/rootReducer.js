import { combineReducers } from "redux";

const clientReducer = (state = {}) => state;
const productReducer = (state = {}) => state;
const shoppingCartReducer = (state = {}) => state;

const rootReducer = combineReducers({
  client: clientReducer,
  product: productReducer,
  shoppingCart: shoppingCartReducer,
});

export default rootReducer;
