import React from "react";
import classes from "./HighScore.css";
const HighScore = props => {
  return <p className={classes.HighScore}>HIGHSCORE : {props.HighScore}</p>;
};
export default HighScore;
