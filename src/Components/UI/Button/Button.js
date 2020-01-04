import React from "react";
import classes from "./Button.css";
const Button = props => {
  let button = null;
  button = (
    <Button className={classes.ButtonElement}> {props.children} </Button>
  );
  return <div className={classes.Button}>{button}</div>;
};
export default Button;
