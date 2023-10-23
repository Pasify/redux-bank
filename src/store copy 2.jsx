import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { accountReducer } from "./features/accounts/accountSlice";
import { customerReducer } from "./features/customers/customerSlice";

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
}); // for more than 1 reducer

const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
