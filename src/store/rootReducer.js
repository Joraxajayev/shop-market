import { combineReducers } from "redux";
import productsReducer from "./productsReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  products: productsReducer,
  user: userReducer,
});

export default rootReducer;
