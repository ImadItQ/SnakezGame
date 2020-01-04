import React from "react";
import classes from "./HighScores.css";
const HighScores = props => {
  return (
    <div className={classes.HighScores}>
      <h2>HIGH SCORES</h2>
      <ol className={classes.HighScoresList}>
        {props.HighScoresList.map(List => (
          <li key={List.id}> {List.HighScores} </li>
        ))}
      </ol>
    </div>
  );
};
export default HighScores;
