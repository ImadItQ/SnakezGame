import React from "react";

import classes from "./Input.css";

const input = props => {
  let inputElement = null;

  inputElement = (
    <input
      className={classes.InputElement}
      {...props.elementConfig}
      value={props.value}
      onChange={props.changed}
    />
  );

  return <div className={classes.Input}>{inputElement}</div>;
};

export default input;
