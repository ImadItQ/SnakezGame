import React, { Component } from "react";
import Input from "../../Components/UI/Input/Input";
import classes from "./Sign-up.css";
import { connect } from "react-redux";
import * as actions from "../../Store/actions/index";
import { Link } from "react-router-dom";

class Signup extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email"
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password"
        },
        value: "",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    }
  };
  checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  }
  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true
      }
    };
    this.setState({ controls: updatedControls });
  };
  isRegistered() {
    if (this.props.isReg) {
      this.props.history.push("/verify");
    }
  }
  SubmitHandler = event => {
    event.preventDefault();
    this.props.onReg(
      this.state.controls.email.value,
      this.state.controls.password.value
    );
    this.isRegistered();
  };
  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    const form = formElementsArray.map(formElement => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={event => this.inputChangedHandler(event, formElement.id)}
      />
    ));
    return (
      <div>
        <div>
          <div className={classes.Logosnake}></div>
          <div>
            <h1 className={classes.h1}> Instructions to play </h1>
            <ul className={classes.Instructions}>
              <li> The Snake Moves on all directions on screen.</li>
              <li> You can use the arrow keys to move the Snake. </li>
              <li> The Snake grows as it eats the Apples. </li>
              <li> The Snake dies on colliding with itself. </li>
            </ul>
          </div>
          <div>
            <form className={classes.Form} onSubmit={this.SubmitHandler}>
              <h2 className={classes.h2}> SIGN UP</h2>
              {form}
              <button className={classes.Button}>SIGN UP</button>{" "}
              <h3 className={classes.footer}> Verification Sent To Your ID </h3>
            </form>
          </div>
        </div>
        <h4 className={classes.footer2}>V1.0</h4>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    isReg: state.auth.token !== null
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onReg: (email, password) => dispatch(actions.reg(email, password))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);
