import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";

export default combineReducers({
  auth: authReducer, // when mapped to props, this will be called with this.props.auth
  errors: errorReducer,
  profile: profileReducer
});
