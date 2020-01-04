import React from "react";
import classes from "./Snake.css";

export default props => {
  return (
    <div>
      {props.snakesbody.map((part, i) => {
        const style = {
          left: `${part[0]}%`,
          top: `${part[1]}%`
        };
        return <div className={classes.Snake} key={i} style={style}></div>;
      })}
    </div>
  );
};
