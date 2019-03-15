import { GET_ERRORS } from "../actions/types";

const initialState = {};

// takes the initial state, and an action to dispatch to reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
}
