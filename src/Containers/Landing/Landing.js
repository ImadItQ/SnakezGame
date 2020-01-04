import React, { Component } from "react";
import { Link } from "react-router-dom";
import classes from "./Landing.css";
class Landing extends Component {
  render() {
    return (
      <div>
        <div className={classes.Logo} />
        <div className={classes.Play}>
          <Link to="/signIn">
            <button className={classes.Button}> SIGN IN </button>
          </Link>
          <br></br>
          <Link to="/signUp">
            <button className={classes.Button2}> SIGN UP </button>
          </Link>
          <Link to="/signIn">
            <h2 className={classes.h2}> Login To Play</h2>
          </Link>
          <h4 className={classes.footer}> v1.0</h4>
        </div>
      </div>
    );
  }
}
export default Landing;
