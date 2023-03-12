import { createStore, combineReducers } from "redux";
import authReducer from "../Reducers/auth";
import loadingReducer from "../Reducers/loading";
import snackbarReducer from "../Reducers/snackbar";

const rootReducer = combineReducers({
  auth: authReducer,
  loading: loadingReducer,
  snackbar: snackbarReducer,
});

const store = createStore(rootReducer);

export default store;
