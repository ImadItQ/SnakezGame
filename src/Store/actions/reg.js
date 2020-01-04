import * as actionTypes from "./actionTypes";
import axios from "axios";

export const regStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const regSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId
  };
};

export const regFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const register = token => {
  return dispatch => {
    dispatch(regStart());
    const regData = {
      requestType: "VERIFY_EMAIL",
      idToken: token
    };
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCFGa3PegFhY02ihhbbb_QJYklUgLiUVuU",
        regData
      )
      .then(response => {
        dispatch(regSuccess(response.data.idToken, response.data.userId));
      })
      .catch(error => {
        console.log(error);
        dispatch(regFail(error));
      });
  };
};
