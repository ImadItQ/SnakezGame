import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  token: null,
  userId: null,
  error: null
};

const regStart = (state, action) => {
  return updateObject(state, { error: null });
};

const regSuccess = (state, action) => {
  return updateObject(state, {
    token: action.idToken,
    userId: action.userId,
    error: null
  });
};

const regFail = (state, action) => {
  return updateObject(state, {
    error: action.error
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REG_START:
      return regStart(state, action);
    case actionTypes.REG_SUCCESS:
      return regSuccess(state, action);
    case actionTypes.REG_FAIL:
      return regFail(state, action);
    default:
      return state;
  }
};

export default reducer;
