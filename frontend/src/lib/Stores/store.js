import { createStore, combineReducers } from "redux";
import authReducer from "../Reducers/auth";
import loadingReducer from "../Reducers/loading";
import snackbarReducer from "../Reducers/snackbar";
import editmodeReducer from "../Reducers/editmode";
import pluginsReducer from "../Reducers/plugins";

const rootReducer = combineReducers({
  auth: authReducer,
  loading: loadingReducer,
  snackbar: snackbarReducer,
  editmode: editmodeReducer,
  plugins: pluginsReducer,
});

const store = createStore(rootReducer);

export default store;
