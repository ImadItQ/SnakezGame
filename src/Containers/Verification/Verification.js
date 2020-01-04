import React, { Component } from "react";
import classes from "./Verification.css";
import { connect } from "react-redux";
import * as actions from "../../Store/actions/index";
class Verify extends Component {
  verify = event => {
    event.preventDefault();
    this.props.onRegister(this.props.token);
  };
  render() {
    return (
      <div className={classes.logo}>
        <div className={classes.form}>
          <h1 className={classes.h1}> HI, {this.props.email} </h1>
          <p>
            {" "}
            You have one more step remaining to activate your Snakezz account
            Click on the button below to verify your email address{" "}
          </p>
          <button className={classes.button} onClick={this.verify}>
            {" "}
            VERIFY EMAIL{" "}
          </button>
        </div>
        <h4 className={classes.footer}> v1.0</h4>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    token: state.auth.token,
    email: state.auth.email
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRegister: token => dispatch(actions.register(token))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Verify);
