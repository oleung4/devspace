import isEmpty from "../validation/is-empty";

import { SET_CURRENT_USER } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {}
};

// takes the initial state, and an action to dispatch to reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload), // based on whether there is a payload or not from decoded token
        user: action.payload
      };
    default:
      return state;
  }
}
