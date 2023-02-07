import { createStore, combineReducers } from "redux";
import authReducer from "../Reducers/auth";
import loadingReducer from "../Reducers/loading";

const rootReducer = combineReducers({
  auth: authReducer,
  loading: loadingReducer,
});

const store = createStore(rootReducer);

export default store;
