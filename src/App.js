import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Gamebuilder from "./Containers/GameBuilder/Gamebuilder";
import SignIn from "./Containers/Sign-in/Sign-in";
import SignUp from "./Containers/Sign-up/Sign-up";
import Landing from "./Containers/Landing/Landing";
import Verify from "./Containers/Verification/Verification";
class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/Game" component={Gamebuilder} />
          <Route path="/signIn" component={SignIn} />
          <Route path="/signUp" component={SignUp} />
          <Route path="/verify" component={Verify} />
          <Route path="/" exact component={Landing} />
        </Switch>
      </div>
    );
  }
}

export default App;
