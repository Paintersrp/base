import { createStore, combineReducers } from "redux";
import authReducer from "../Reducers/auth";
import loadingReducer from "../Reducers/loading";
import snackbarReducer from "../Reducers/snackbar";
import editmodeReducer from "../Reducers/editmode";

const rootReducer = combineReducers({
  auth: authReducer,
  loading: loadingReducer,
  snackbar: snackbarReducer,
  editmode: editmodeReducer,
});

const store = createStore(rootReducer);

export default store;
