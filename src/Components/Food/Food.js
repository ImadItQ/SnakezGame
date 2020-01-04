import React from "react";
import classes from "./Food.css";

export default props => {
  const style = {
    left: `${props.part[0]}%`,
    top: `${props.part[1]}%`
  };
  return <div className={classes.Food} style={style}></div>;
};
