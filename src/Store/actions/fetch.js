import * as actionTypes from "./actionTypes";
import axios from "../../axios-scores";

export const setHighscoreStart = () => {
  return {
    type: actionTypes.SET_HIGHSCORE_START
  };
};

export const setHighscoreSuccess = (id, HighScores) => {
  return {
    type: actionTypes.SET_HIGHSCORE_SUCCESS,
    highscoreId: id,
    HighScores: HighScores
  };
};

export const setHighscoreFail = error => {
  return {
    type: actionTypes.SET_HIGHSCORE_FAIL,
    error: error
  };
};
export const fetchHighscoreStart = () => {
  return {
    type: actionTypes.FETCH_HIGHSCORE_START
  };
};
export const fetchHighscoreSuccess = highscores => {
  return {
    type: actionTypes.FETCH_HIGHSCORE_SUCCESS,
    highscores: highscores
  };
};
export const fetchHighscoreFail = error => {
  return {
    type: actionTypes.FETCH_HIGHSCORE_FAIL,
    error: error
  };
};

export const setHighscores = (HighScores, token) => {
  return dispatch => {
    dispatch(setHighscoreStart());
    axios
      .post("/highscores.json?auth=" + token, HighScores)
      .then(response => {
        console.log(response.data);
        dispatch(setHighscoreSuccess(response.data.name, HighScores));
      })
      .catch(error => {
        console.log(error);
        dispatch(setHighscoreFail());
      });
  };
};

export const fetchHighscores = (token, userId) => {
  return dispatch => {
    dispatch(fetchHighscoreStart());
    const queryParams =
      "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios
      .get("/highscores.json" + queryParams)
      .then(response => {
        const scores = [];
        for (let key in response.data) {
          scores.push({
            ...response.data[key],
            id: key
          });
        }
        dispatch(fetchHighscoreSuccess(scores));
      })
      .catch(error => {
        alert("something went wrong unable to load highscores");
        dispatch(fetchHighscoreFail(error));
      });
  };
};
