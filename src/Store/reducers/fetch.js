import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  highscores: [],
  loading: false
};
const setHighscoreStart = (state, action) => {
  return updateObject(state, {
    loading: false
  });
};
const setHighscoreSuccess = (state, action) => {
  const newScore = updateObject(action.HighScores, { id: action.highscoresId });
  return updateObject(state, {
    loading: false,
    highscores: state.highscores.concat(newScore)
  });
};

const setHighscoreFail = (state, action) => {
  return updateObject(state, {
    loading: false
  });
};
const fetchHighscoreStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchHighscoreSuccess = (state, action) => {
  return updateObject(state, {
    highscores: action.highscores,
    loading: false
  });
};

const fetchHighscoreFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_HIGHSCORE_START:
      return fetchHighscoreStart(state, action);
    case actionTypes.FETCH_HIGHSCORE_SUCCESS:
      return fetchHighscoreSuccess(state, action);
    case actionTypes.FETCH_HIGHSCORE_FAIL:
      return fetchHighscoreFail(state, action);
    case actionTypes.SET_HIGHSCORE_START:
      return setHighscoreStart(state, action);
    case actionTypes.SET_HIGHSCORE_SUCCESS:
      return setHighscoreSuccess(state, action);
    case actionTypes.SET_HIGHSCORE_FAIL:
      return setHighscoreFail(state, action);
    default:
      return state;
  }
};

export default reducer;
